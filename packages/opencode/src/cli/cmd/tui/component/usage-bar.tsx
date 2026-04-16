import type { AssistantMessage } from "@opencode-ai/sdk/v2"
import { createMemo, Show } from "solid-js"
import { RGBA } from "@opentui/core"
import { useSync } from "@tui/context/sync"
import { useTheme } from "@tui/context/theme"
import { Locale } from "@/util"

const money = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" })
const PURPLE = RGBA.fromInts(179, 151, 215, 255)
const BAR = 12

export function UsageBar(props: { sessionID: string }) {
  const sync = useSync()
  const { theme } = useTheme()
  const msgs = createMemo(() => sync.data.message[props.sessionID] ?? [])

  const state = createMemo(() => {
    const last = msgs().findLast(
      (m): m is AssistantMessage => m.role === "assistant" && m.tokens.output > 0,
    )
    if (!last) return null
    const tokens =
      last.tokens.input +
      last.tokens.output +
      last.tokens.reasoning +
      last.tokens.cache.read +
      last.tokens.cache.write
    if (tokens <= 0) return null
    const model = sync.data.provider.find((p) => p.id === last.providerID)?.models[last.modelID]
    const cost = msgs().reduce((sum, m) => sum + (m.role === "assistant" ? m.cost : 0), 0)
    return {
      label: Locale.number(tokens),
      pct: model?.limit.context ? Math.round((tokens / model.limit.context) * 100) : null,
      cost: cost > 0 ? money.format(cost) : null,
    }
  })

  return (
    <Show when={state()}>
      {(s) => (
        <box flexDirection="row" gap={2} alignItems="center">
          <text fg={theme.textMuted} wrapMode="none">
            {s().label}
          </text>
          <Show when={s().pct !== null}>
            {(() => {
              const p = s().pct!
              const filled = Math.max(1, Math.round((p / 100) * BAR))
              return (
                <text wrapMode="none">
                  <span style={{ fg: PURPLE }}>{"▓".repeat(filled)}</span>
                  <span style={{ fg: theme.textMuted }}>{"░".repeat(BAR - filled)}</span>
                  <span style={{ fg: PURPLE }}> {p}%</span>
                </text>
              )
            })()}
          </Show>
          <Show when={s().cost}>
            <text fg={theme.textMuted} wrapMode="none">
              · {s().cost}
            </text>
          </Show>
        </box>
      )}
    </Show>
  )
}
