export * as Npm from "./npm"

import path from "path"
import npa from "npm-package-arg"
import { Effect, Schema, Context, Layer, Option, FileSystem } from "effect"
import { NodeFileSystem } from "@effect/platform-node"
import { FSUtil } from "./fs-util"
import { Global } from "./global"
import { EffectFlock } from "./util/effect-flock"
import { LayerNode } from "./effect/layer-node"
import { filesystem } from "./effect/layer-node-platform"
import { makeRuntime } from "./effect/runtime"
import { NpmConfig } from "./npm-config"

export class InstallFailedError extends Schema.TaggedErrorClass<InstallFailedError>()("NpmInstallFailedError", {
  add: Schema.Array(Schema.String).pipe(Schema.optional),
  dir: Schema.String,
  cause: Schema.optional(Schema.Defect),
}) {}

export interface EntryPoint {
  readonly directory: string
  readonly entrypoint: Option.Option<string>
}

export interface AddOptions {
  readonly refresh?: {
    readonly ttl: number
    readonly onRefreshed?: (version: string) => void
  }
}

export interface Interface {
  readonly add: (pkg: string, options?: AddOptions) => Effect.Effect<EntryPoint, InstallFailedError | EffectFlock.LockError>
  readonly install: (
    dir: string,
    input?: {
      add: {
        name: string
        version?: string
      }[]
    },
  ) => Effect.Effect<void, EffectFlock.LockError | InstallFailedError>
  readonly which: (pkg: string, bin?: string) => Effect.Effect<Option.Option<string>>
}

export class Service extends Context.Service<Service, Interface>()("@opencode/Npm") {}

const illegal = process.platform === "win32" ? new Set(["<", ">", ":", '"', "|", "?", "*"]) : undefined

export function sanitize(pkg: string) {
  if (!illegal) return pkg
  return Array.from(pkg, (char) => (illegal.has(char) || char.charCodeAt(0) < 32 ? "_" : char)).join("")
}

const resolveEntryPoint = (name: string, dir: string): EntryPoint => {
  let entrypoint: Option.Option<string>
  try {
    const resolved = typeof Bun !== "undefined" ? import.meta.resolve(name, dir) : import.meta.resolve(dir)
    entrypoint = Option.some(resolved)
  } catch {
    entrypoint = Option.none()
  }
  return {
    directory: dir,
    entrypoint,
  }
}

interface ArboristNode {
  name: string
  path: string
  version?: string
}

interface ArboristTree {
  edgesOut: Map<string, { to?: ArboristNode }>
}

// same logic as @/util/record — duplicated here because core cannot import from opencode
function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

export const layer = Layer.effect(
  Service,
  Effect.gen(function* () {
    const afs = yield* FSUtil.Service
    const global = yield* Global.Service
    const fs = yield* FileSystem.FileSystem
    const flock = yield* EffectFlock.Service
    const directory = (pkg: string) => path.join(global.cache, "packages", sanitize(pkg))
    const refreshStamp = (dir: string) => path.join(dir, ".refresh-check.json")
    const resolveInstalled = (name: string, dir: string) => resolveEntryPoint(name, path.join(dir, "node_modules", name))
    const writeRefreshStamp = Effect.fnUntraced(function* (dir: string, version?: string) {
      yield* afs
        .writeJson(refreshStamp(dir), version ? { checked_at: Date.now(), version } : { checked_at: Date.now() })
        .pipe(Effect.orElseSucceed(() => {}))
    })
    const shouldRefresh = Effect.fnUntraced(function* (dir: string, ttl: number) {
      const stamp = yield* afs.readJson(refreshStamp(dir)).pipe(Effect.orElseSucceed(() => undefined))
      if (!isRecord(stamp)) return { yes: true, prevVersion: undefined as string | undefined }
      if (typeof stamp.checked_at !== "number") return { yes: true, prevVersion: undefined as string | undefined }
      return {
        yes: Date.now() - stamp.checked_at >= ttl,
        prevVersion: typeof stamp.version === "string" ? stamp.version : undefined,
      }
    })
    const reify = (input: { dir: string; add?: string[] }) =>
      Effect.gen(function* () {
        yield* flock.acquire(`npm-install:${input.dir}`)
        const { Arborist } = yield* Effect.promise(() => import("@npmcli/arborist"))
        const add = input.add ?? []
        const npmOptions = yield* NpmConfig.load(input.dir)
        const arborist = new Arborist({
          ...npmOptions,
          path: input.dir,
          binLinks: true,
          progress: false,
          savePrefix: "",
          ignoreScripts: true,
        })
        return yield* Effect.tryPromise({
          try: () =>
            arborist.reify({
              ...npmOptions,
              add,
              save: true,
              saveType: "prod",
            }),
          catch: (cause) =>
            new InstallFailedError({
              cause,
              add,
              dir: input.dir,
            }),
        }) as Effect.Effect<ArboristTree, InstallFailedError>
      }).pipe(
        Effect.withSpan("Npm.reify", {
          attributes: input,
        }),
      )

    const add = Effect.fn("Npm.add")(function* (pkg: string, options?: AddOptions) {
      const dir = directory(pkg)
      const name = (() => {
        try {
          return npa(pkg).name ?? pkg
        } catch {
          return pkg
        }
      })()
      const installed = path.join(dir, "node_modules", name)
      const cached = yield* afs.existsSafe(installed)

      if (cached) {
        const ttl = options?.refresh?.ttl
        if (!ttl) return resolveInstalled(name, dir)
        const check = yield* shouldRefresh(dir, ttl)
        if (!check.yes) return resolveInstalled(name, dir)

        const refreshed = yield* reify({ dir, add: [pkg] }).pipe(Effect.option)
        if (Option.isNone(refreshed)) return resolveInstalled(name, dir)
        const first = refreshed.value.edgesOut.values().next().value?.to
        yield* writeRefreshStamp(dir, first?.version)
        // onRefreshed must be a sync callback — no async side effects
        if (check.prevVersion && first?.version && first.version !== check.prevVersion)
          yield* Effect.sync(() => options?.refresh?.onRefreshed?.(first.version!))
        if (first) return resolveEntryPoint(first.name, first.path)
        const result = resolveInstalled(name, dir)
        if (Option.isSome(result.entrypoint)) return result
        return yield* new InstallFailedError({ add: [pkg], dir })
      }

      const tree = yield* reify({ dir, add: [pkg] })
      if (options?.refresh) yield* writeRefreshStamp(dir, tree.edgesOut.values().next().value?.to?.version)
      const first = tree.edgesOut.values().next().value?.to
      if (first) return resolveEntryPoint(first.name, first.path)
      const result = resolveInstalled(name, dir)
      if (Option.isSome(result.entrypoint)) return result
      return yield* new InstallFailedError({ add: [pkg], dir })
    }, Effect.scoped)

    const install: Interface["install"] = Effect.fn("Npm.install")(function* (dir, input) {
      const canWrite = yield* afs.access(dir, { writable: true }).pipe(
        Effect.as(true),
        Effect.orElseSucceed(() => false),
      )
      if (!canWrite) return

      const add = input?.add.map((pkg) => [pkg.name, pkg.version].filter(Boolean).join("@")) ?? []
      if (
        yield* Effect.gen(function* () {
          const nodeModulesExists = yield* afs.existsSafe(path.join(dir, "node_modules"))
          if (!nodeModulesExists) {
            yield* reify({ add, dir })
            return true
          }
          return false
        }).pipe(Effect.withSpan("Npm.checkNodeModules"))
      )
        return

      yield* Effect.gen(function* () {
        const pkg = yield* afs.readJson(path.join(dir, "package.json")).pipe(Effect.orElseSucceed(() => ({})))
        const lock = yield* afs.readJson(path.join(dir, "package-lock.json")).pipe(Effect.orElseSucceed(() => ({})))

        const pkgAny = pkg as any
        const lockAny = lock as any
        const declared = new Set([
          ...Object.keys(pkgAny?.dependencies || {}),
          ...Object.keys(pkgAny?.devDependencies || {}),
          ...Object.keys(pkgAny?.peerDependencies || {}),
          ...Object.keys(pkgAny?.optionalDependencies || {}),
          ...(input?.add || []).map((pkg) => pkg.name),
        ])

        const root = lockAny?.packages?.[""] || {}
        const locked = new Set([
          ...Object.keys(root?.dependencies || {}),
          ...Object.keys(root?.devDependencies || {}),
          ...Object.keys(root?.peerDependencies || {}),
          ...Object.keys(root?.optionalDependencies || {}),
        ])

        for (const name of declared) {
          if (!locked.has(name)) {
            yield* reify({ dir, add })
            return
          }
        }
      }).pipe(Effect.withSpan("Npm.checkDirty"))

      return
    }, Effect.scoped)

    const which = Effect.fn("Npm.which")(function* (pkg: string, bin?: string) {
      const dir = directory(pkg)
      const binDir = path.join(dir, "node_modules", ".bin")

      const pick = Effect.fnUntraced(function* () {
        const files = yield* fs.readDirectory(binDir).pipe(Effect.catch(() => Effect.succeed([] as string[])))

        if (files.length === 0) return Option.none<string>()
        // Caller picked a specific bin (e.g. pyright exposes both `pyright` and
        // `pyright-langserver`); trust the hint if the package provides it.
        if (bin) return files.includes(bin) ? Option.some(bin) : Option.none<string>()
        if (files.length === 1) return Option.some(files[0])

        const pkgJson = yield* afs.readJson(path.join(dir, "node_modules", pkg, "package.json")).pipe(Effect.option)

        if (Option.isSome(pkgJson)) {
          const parsed = pkgJson.value as { bin?: string | Record<string, string> }
          if (parsed?.bin) {
            const unscoped = pkg.startsWith("@") ? pkg.split("/")[1] : pkg
            const parsedBin = parsed.bin
            if (typeof parsedBin === "string") return Option.some(unscoped)
            const keys = Object.keys(parsedBin)
            if (keys.length === 1) return Option.some(keys[0])
            return parsedBin[unscoped] ? Option.some(unscoped) : Option.some(keys[0])
          }
        }

        return Option.some(files[0])
      })

      return yield* Effect.gen(function* () {
        const bin = yield* pick()
        if (Option.isSome(bin)) {
          return Option.some(path.join(binDir, bin.value))
        }

        yield* fs.remove(path.join(dir, "package-lock.json")).pipe(Effect.orElseSucceed(() => {}))

        yield* add(pkg)

        const resolved = yield* pick()
        if (Option.isNone(resolved)) return Option.none<string>()
        return Option.some(path.join(binDir, resolved.value))
      }).pipe(
        Effect.scoped,
        Effect.orElseSucceed(() => Option.none<string>()),
      )
    })

    return Service.of({
      add,
      install,
      which,
    })
  }),
)

export const defaultLayer = layer.pipe(
  Layer.provide(EffectFlock.layer),
  Layer.provide(FSUtil.layer),
  Layer.provide(Global.layer),
  Layer.provide(NodeFileSystem.layer),
)
export const node = LayerNode.make(layer, [FSUtil.node, Global.node, filesystem, EffectFlock.node])

const { runPromise } = makeRuntime(Service, defaultLayer)

export async function install(...args: Parameters<Interface["install"]>) {
  return runPromise((svc) => svc.install(...args))
}

export async function add(...args: Parameters<Interface["add"]>) {
  const entry = await runPromise((svc) => svc.add(...args))
  return {
    directory: entry.directory,
    entrypoint: Option.getOrUndefined(entry.entrypoint),
  }
}

export async function which(...args: Parameters<Interface["which"]>) {
  const resolved = await runPromise((svc) => svc.which(...args))
  return Option.getOrUndefined(resolved)
}
