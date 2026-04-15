import { For, createMemo } from "solid-js"
import { DEFAULT_THEMES, useTheme } from "@tui/context/theme"
import { useI18n } from "@tui/context/i18n"

const themeCount = Object.keys(DEFAULT_THEMES).length

type TipPart = { text: string; highlight: boolean }

function parse(tip: string): TipPart[] {
  const parts: TipPart[] = []
  const regex = /\{highlight\}(.*?)\{\/highlight\}/g
  const found = Array.from(tip.matchAll(regex))
  const state = found.reduce(
    (acc, match) => {
      const start = match.index ?? 0
      if (start > acc.index) {
        acc.parts.push({ text: tip.slice(acc.index, start), highlight: false })
      }
      acc.parts.push({ text: match[1], highlight: true })
      acc.index = start + match[0].length
      return acc
    },
    { parts, index: 0 },
  )

  if (state.index < tip.length) {
    parts.push({ text: tip.slice(state.index), highlight: false })
  }

  return parts
}

export function Tips() {
  const theme = useTheme().theme
  const { t } = useI18n()
  const all = createMemo(() => [
    ...t().tips_list,
    t().tip_theme(themeCount),
    process.platform === "win32" ? t().tip_undo_prompt : t().tip_suspend_term,
  ])
  const parts = createMemo(() => parse(all()[Math.floor(Math.random() * all().length)]))

  return (
    <box flexDirection="row" width="100%">
      <text flexShrink={0} style={{ fg: theme.accent }}>
        ● Tip{" "}
      </text>
      <text flexShrink={1} wrapMode="word">
        <For each={parts()}>
          {(part) => <span style={{ fg: part.highlight ? theme.text : theme.textMuted }}>{part.text}</span>}
        </For>
      </text>
    </box>
  )
}
