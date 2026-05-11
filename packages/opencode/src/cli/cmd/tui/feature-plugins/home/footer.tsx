import type { TuiPlugin, TuiPluginApi } from "@opencode-ai/plugin/tui"
import type { InternalTuiPlugin } from "../../plugin/internal"
import { createMemo, createSignal, Match, Show, Switch } from "solid-js"
import { Global } from "@opencode-ai/core/global"
import path from "path"

const id = "internal:home-footer"

function Directory(props: { api: TuiPluginApi }) {
  const theme = () => props.api.theme.current
  const dir = createMemo(() => {
    const dir = props.api.state.path.directory || process.cwd()
    const out = dir.replace(Global.Path.home, "~")
    const branch = props.api.state.vcs?.branch
    if (branch) return out + ":" + branch
    return out
  })

  return <text fg={theme().textMuted}>{dir()}</text>
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

const plugin: InternalTuiPlugin = {
  id,
  tui,
}

export default plugin
