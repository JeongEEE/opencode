import type { TuiPlugin, TuiPluginModule } from "@opencode-ai/plugin/tui"
import { createMemo, Show } from "solid-js"
import { Tips } from "./tips-view"
import { useI18n } from "@tui/context/i18n"

const id = "internal:home-tips"

function View(props: { show: boolean; connected: boolean }) {
  return (
    <box minHeight={0} width="100%" maxWidth={75} alignItems="center" paddingTop={3} flexShrink={1}>
      <Show when={props.show}>
        <Tips connected={props.connected} />
      </Show>
    </box>
  )
}

const tui: TuiPlugin = async (api) => {
  api.command.register(() => {
    const { t } = useI18n()
    return [
      {
        title: api.kv.get("tips_hidden", false) ? t().tips_show : t().tips_hide,
        value: "tips.toggle",
        keybind: "tips_toggle",
        category: "System",
        hidden: api.route.current.name !== "home",
        onSelect() {
          api.kv.set("tips_hidden", !api.kv.get("tips_hidden", false))
          api.ui.dialog.clear()
        },
      },
    ]
  })

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
        return <View show={show()} connected={connected()} />
      },
    },
  })
}

const plugin: TuiPluginModule & { id: string } = {
  id,
  tui,
}

export default plugin
