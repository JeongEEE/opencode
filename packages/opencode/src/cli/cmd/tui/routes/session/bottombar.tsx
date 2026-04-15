import { createMemo, Show } from "solid-js"
import { useSync } from "@tui/context/sync"
import { useTheme } from "@tui/context/theme"
import { Global } from "@/global"
import { UsageBar } from "@tui/component/usage-bar"
import type { AssistantMessage } from "@opencode-ai/sdk/v2"

export function BottomBar(props: { sessionID: string }) {
  const sync = useSync()
  const { theme } = useTheme()
  const session = createMemo(() => sync.session.get(props.sessionID))

  const dir = createMemo(() => {
    const raw = (process.cwd() ?? "").replace(Global.Path.home, "~")
    const parts = raw.split("/")
    return { parent: parts.slice(0, -1).join("/"), name: parts.at(-1) ?? "" }
  })

  const hasUsage = createMemo(() => {
    const msgs = sync.data.message[props.sessionID] ?? []
    const last = msgs.findLast(
      (m): m is AssistantMessage => m.role === "assistant" && m.tokens.output > 0,
    )
    return !!last
  })

  return (
    <Show when={session()}>
      <box flexDirection="row" gap={2} paddingLeft={1} paddingRight={3} paddingTop={1}>
        <text fg={theme.text} wrapMode="none">
          <b>{session()!.title}</b>
        </text>

        <text fg={theme.textMuted}>·</text>

        <text wrapMode="none">
          <span style={{ fg: theme.textMuted }}>{dir().parent}/</span>
          <span style={{ fg: theme.text }}>{dir().name}</span>
          <Show when={sync.data.vcs?.branch}>
            <span style={{ fg: theme.textMuted }}>:{sync.data.vcs!.branch}</span>
          </Show>
        </text>

        <Show when={hasUsage()}>
          <text fg={theme.textMuted}>·</text>
          <UsageBar sessionID={props.sessionID} />
        </Show>
      </box>
    </Show>
  )
}
