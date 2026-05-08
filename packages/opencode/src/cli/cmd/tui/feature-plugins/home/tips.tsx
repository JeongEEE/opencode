import type { TuiPlugin, TuiPluginApi, TuiPluginModule } from "@opencode-ai/plugin/tui"
import { createMemo, Show } from "solid-js"
import { Tips } from "./tips-view"
import { useI18n } from "@tui/context/i18n"
import { useBindings } from "../../keymap"

const id = "internal:home-tips"

function View(props: { api: TuiPluginApi; hidden: boolean; show: boolean; connected: boolean }) {
  const { t } = useI18n()
  useBindings(() => ({
    commands: [
      {
        name: "tips.toggle",
        title: props.hidden ? t().tips_show : t().tips_hide,
        category: t().cat_system,
        namespace: "palette",
        run() {
          props.api.kv.set("tips_hidden", !props.api.kv.get("tips_hidden", false))
          props.api.ui.dialog.clear()
        },
      },
    ],
    bindings: props.api.tuiConfig.keymap.sections.home_tips,
  }))

  return (
    <box minHeight={0} width="100%" maxWidth={75} alignItems="center" paddingTop={3} flexShrink={1}>
      <Show when={props.show}>
        <Tips connected={props.connected} />
      </Show>
    </box>
  )
}

const tui: TuiPlugin = async (api) => {
  api.slots.register({
    order: 100,
    slots: {
      home_bottom() {
        const hidden = createMemo(() => api.kv.get("tips_hidden", false))
        const first = createMemo(() => api.state.session.count() === 0)
        const connected = createMemo(() =>
          api.state.provider.some(
            (item) => item.id !== "opencode" || Object.values(item.models).some((model) => model.cost?.input !== 0),
          ),
        )
        const show = createMemo(() => (!first() || !connected()) && !hidden())
        return <View api={api} hidden={hidden()} show={show()} connected={connected()} />
      },
    },
  })
}

const plugin: TuiPluginModule & { id: string } = {
  id,
  tui,
}

export default plugin
