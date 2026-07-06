import type { TuiPluginApi } from "@opencode-ai/plugin/tui"
import { createMemo, For } from "solid-js"
import { DEFAULT_THEMES, useTheme } from "../../context/theme"
import { useCommandShortcut } from "../../keymap"
import { useI18n } from "../../context/i18n"

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

const NO_MODELS_TIP = "Run {highlight}/connect{/highlight} to add an AI provider and start coding"
const NO_MODELS_PARTS = parse(NO_MODELS_TIP)

function configShortcut(api: TuiPluginApi, command: string): () => string {
  return () =>
    api.tuiConfig.keybinds
      .get(command)
      .map((binding) => api.keys.formatSequence(Array.from(api.keymap.parseKeySequence(binding.key))))
      .filter(Boolean)
      .join(", ")
}

export function Tips(props: { api: TuiPluginApi; connected?: boolean }) {
  const theme = useTheme().theme
  const { t } = useI18n()
  const tipOffset = Math.random()

  const shortcuts = {
    agentCycle: useCommandShortcut("agent.cycle"),
    childFirst: configShortcut(props.api, "session.child.first"),
    childNext: configShortcut(props.api, "session.child.next"),
    childPrevious: configShortcut(props.api, "session.child.previous"),
    commandList: useCommandShortcut("command.palette.show"),
    editorOpen: useCommandShortcut("prompt.editor"),
    helpShow: useCommandShortcut("help.show"),
    inputClear: useCommandShortcut("prompt.clear"),
    inputNewline: useCommandShortcut("input.newline"),
    inputPaste: useCommandShortcut("prompt.paste"),
    inputUndo: useCommandShortcut("input.undo"),
    leader: configShortcut(props.api, "leader"),
    messagesCopy: configShortcut(props.api, "messages.copy"),
    messagesFirst: configShortcut(props.api, "session.first"),
    messagesLast: configShortcut(props.api, "session.last"),
    messagesPageDown: configShortcut(props.api, "session.page.down"),
    messagesPageUp: configShortcut(props.api, "session.page.up"),
    messagesToggleConceal: configShortcut(props.api, "session.toggle.conceal"),
    modelCycleRecent: useCommandShortcut("model.cycle_recent"),
    modelList: useCommandShortcut("model.list"),
    sessionExport: configShortcut(props.api, "session.export"),
    sessionInterrupt: configShortcut(props.api, "session.interrupt"),
    sessionList: useCommandShortcut("session.list"),
    sessionNew: useCommandShortcut("session.new"),
    sessionParent: configShortcut(props.api, "session.parent"),
    sessionPinToggle: configShortcut(props.api, "session.pin.toggle"),
    sessionQuickSwitch1: useCommandShortcut("session.quick_switch.1"),
    sessionQuickSwitch9: useCommandShortcut("session.quick_switch.9"),
    sessionSidebarToggle: configShortcut(props.api, "session.sidebar.toggle"),
    sessionTimeline: configShortcut(props.api, "session.timeline"),
    statusView: useCommandShortcut("opencode.status"),
    terminalSuspend: useCommandShortcut("terminal.suspend"),
    themeList: useCommandShortcut("theme.switch"),
  }

  type Shortcuts = typeof shortcuts
  type TipI18n = ReturnType<ReturnType<typeof useI18n>["t"]>

  function buildTips(ti: TipI18n, s: Shortcuts): Array<string | undefined> {
    return [
      ...ti.tips_list,
      ti.tip_agent_cycle(s.agentCycle()),
      ti.tip_input_paste(s.inputPaste()),
      ti.tip_editor_open(s.editorOpen()),
      ti.tip_model_list(s.modelList()),
      ti.tip_theme(themeCount, s.themeList()),
      ti.tip_session_new(s.sessionNew()),
      ti.tip_session_list(s.sessionList()),
      ti.tip_session_export(s.sessionExport()),
      ti.tip_messages_copy(s.messagesCopy()),
      ti.tip_command_list(s.commandList()),
      ti.tip_leader_key(s.leader()),
      ti.tip_model_cycle_recent(s.modelCycleRecent()),
      ti.tip_session_sidebar(s.sessionSidebarToggle()),
      ti.tip_messages_page(s.messagesPageUp(), s.messagesPageDown()),
      ti.tip_messages_first(s.messagesFirst()),
      ti.tip_messages_last(s.messagesLast()),
      ti.tip_input_newline(s.inputNewline()),
      ti.tip_input_clear(s.inputClear()),
      ti.tip_session_interrupt(s.sessionInterrupt()),
      ti.tip_session_nav(s.sessionParent(), s.childFirst(), s.childPrevious(), s.childNext()),
      ti.tip_timeline(s.sessionTimeline()),
      ti.tip_toggle_conceal(s.messagesToggleConceal()),
      ti.tip_status(s.statusView()),
      ti.tip_toggle_username(s.commandList()),
      ti.tip_help(s.helpShow()),
      ti.tip_session_pin(s.sessionPinToggle()),
      ti.tip_session_quickswitch(s.sessionQuickSwitch1(), s.sessionQuickSwitch9()),
      process.platform === "win32" ? ti.tip_undo_prompt : ti.tip_suspend_term,
    ]
  }

  const tip = createMemo(() => {
    if (props.connected === false) return NO_MODELS_TIP
    const tips = buildTips(t(), shortcuts).filter((v): v is string => v !== undefined)
    return tips[Math.floor(tipOffset * tips.length)] ?? NO_MODELS_TIP
  }, NO_MODELS_TIP)
  // Solid can expose a memo's initial value while a pure computation is pending.
  const parts = createMemo(() => {
    const value = tip()
    if (typeof value === "string") return parse(value)
    return NO_MODELS_PARTS
  }, NO_MODELS_PARTS)

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
