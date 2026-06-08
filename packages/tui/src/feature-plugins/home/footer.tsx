import type { TuiPlugin, TuiPluginApi } from "@opencode-ai/plugin/tui"
import type { BuiltinTuiPlugin } from "../builtins"
import { createMemo, createSignal, Match, Show, Switch } from "solid-js"
import path from "node:path"
import { Global } from "@opencode-ai/core/global"
import { abbreviateHome } from "../../runtime"
import { useTuiPaths } from "../../context/runtime"
import { useHomeSessionDestination } from "../../routes/home/session-destination"

const id = "internal:home-footer"

function Directory(props: { api: TuiPluginApi }) {
  const theme = () => props.api.theme.current
  const destination = useHomeSessionDestination()
  const paths = useTuiPaths()
  const dir = createMemo(() => {
    const selected = destination?.destination()
    if (!selected || selected.type === "new") return
    const out = abbreviateHome(selected.directory, paths.home)
    const branch =
      selected.directory === (props.api.state.path.directory || paths.cwd) ? props.api.state.vcs?.branch : undefined
    if (branch) return out + ":" + branch
    return out
  })

  return <Show when={dir()}>{(value) => <text fg={theme().textMuted}>{value()}</text>}</Show>
}

function Mcp(props: { api: TuiPluginApi }) {
  const theme = () => props.api.theme.current
  const list = createMemo(() => props.api.state.mcp())
  const has = createMemo(() => list().length > 0)
  const err = createMemo(() => list().some((item) => item.status === "failed"))
  const count = createMemo(() => list().filter((item) => item.status === "connected").length)

  return (
    <Show when={has()}>
      <box gap={1} flexDirection="row" flexShrink={0}>
        <text fg={theme().text}>
          <Switch>
            <Match when={err()}>
              <span style={{ fg: theme().error }}>⊙ </span>
            </Match>
            <Match when={true}>
              <span style={{ fg: count() > 0 ? theme().success : theme().textMuted }}>⊙ </span>
            </Match>
          </Switch>
          {count()} MCP
        </text>
        <text fg={theme().textMuted}>/status</text>
      </box>
    </Show>
  )
}

function Version(props: { api: TuiPluginApi }) {
  const theme = () => props.api.theme.current

  return (
    <box flexShrink={0}>
      <text fg={theme().textMuted}>{props.api.app.version}</text>
    </box>
  )
}

function OmaVersion(props: { api: TuiPluginApi; version: () => string | undefined }) {
  const theme = () => props.api.theme.current
  return (
    <Show when={props.version()}>
      <text fg={theme().textMuted}>oma v{props.version()}</text>
    </Show>
  )
}

function View(props: { api: TuiPluginApi; omaVersion: () => string | undefined }) {
  return (
    <box
      width="100%"
      paddingTop={1}
      paddingBottom={1}
      paddingLeft={2}
      flexDirection="row"
      flexShrink={0}
      gap={2}
    >
      <Directory api={props.api} />
      <Mcp api={props.api} />
      <box flexGrow={1} />
      <OmaVersion api={props.api} version={props.omaVersion} />
      <Version api={props.api} />
      <box width={2} />
    </box>
  )
}

const tui: TuiPlugin = async (api) => {
  const [omaVersion, setOmaVersion] = createSignal<string | undefined>(undefined)

  const pkgPath = path.join(
    Global.Path.cache,
    "packages",
    "oh-my-openagent@latest",
    "node_modules",
    "oh-my-openagent",
    "package.json",
  )
  await Bun.file(pkgPath)
    .json()
    .then((pkg: { version?: string }) => {
      if (pkg.version) setOmaVersion(pkg.version)
    })
    .catch(() => {})

  api.slots.register({
    order: 100,
    slots: {
      home_footer() {
        return <View api={api} omaVersion={omaVersion} />
      },
    },
  })
}

const plugin: BuiltinTuiPlugin = {
  id,
  tui,
}

export default plugin
