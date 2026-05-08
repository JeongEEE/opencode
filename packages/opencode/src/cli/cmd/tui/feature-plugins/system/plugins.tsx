import type { TuiPlugin, TuiPluginApi, TuiPluginModule, TuiPluginStatus } from "@opencode-ai/plugin/tui"
import { useTerminalDimensions } from "@opentui/solid"
import { fileURLToPath } from "url"
import { DialogSelect, type DialogSelectOption } from "@tui/ui/dialog-select"
import { Show, createEffect, createMemo, createSignal } from "solid-js"
import { useI18n } from "@tui/context/i18n"
import { useBindings } from "../../keymap"

const id = "internal:plugin-manager"

function state(api: TuiPluginApi, item: TuiPluginStatus) {
  const { t } = useI18n()
  if (!item.enabled) {
    return <span style={{ fg: api.theme.current.textMuted }}>{t().plugin_state_disabled}</span>
  }

  return (
    <span style={{ fg: item.active ? api.theme.current.success : api.theme.current.error }}>
      {item.active ? t().plugin_state_active : t().plugin_state_inactive}
    </span>
  )
}

function source(spec: string) {
  if (!spec.startsWith("file://")) return
  return fileURLToPath(spec)
}

function meta(item: TuiPluginStatus, width: number, t: ReturnType<typeof useI18n>["t"]) {
  if (item.source === "internal") {
    if (width >= 120) return t().plugin_builtin
    return t().plugin_builtin_short
  }
  const next = source(item.spec)
  if (next) return next
  return item.spec
}

function Install(props: { api: TuiPluginApi }) {
  const { t } = useI18n()
  const [global, setGlobal] = createSignal(false)
  const [busy, setBusy] = createSignal(false)

  useBindings(() => ({
    enabled: !busy(),
    bindings: [{ key: "tab", cmd: () => setGlobal((value) => !value) }],
  }))

  return (
    <props.api.ui.DialogPrompt
      title={t().plugin_install_title}
      placeholder={t().plugin_install_placeholder}
      busy={busy()}
      busyText={t().plugin_installing}
      description={() => (
        <box flexDirection="row" gap={1}>
          <text fg={props.api.theme.current.textMuted}>{t().plugin_scope}</text>
          <text fg={busy() ? props.api.theme.current.textMuted : props.api.theme.current.text}>
            {global() ? t().plugin_scope_global : t().plugin_scope_local}
          </text>
          <Show when={!busy()}>
            <text fg={props.api.theme.current.textMuted}>(tab {t().plugin_scope_toggle})</text>
          </Show>
        </box>
      )}
      onConfirm={(raw) => {
        if (busy()) return
        const mod = raw.trim()
        if (!mod) {
          props.api.ui.toast({
            variant: "error",
            message: t().plugin_name_required,
          })
          return
        }

        setBusy(true)
        void props.api.plugins
          .install(mod, { global: global() })
          .then((out) => {
            if (!out.ok) {
              props.api.ui.toast({
                variant: "error",
                message: out.message,
              })
              if (out.missing) {
                props.api.ui.toast({
                  variant: "info",
                  message: t().plugin_npm_check,
                })
              }
              show(props.api)
              return
            }

            props.api.ui.toast({
              variant: "success",
              message: t().plugin_installed(mod, global() ? t().plugin_scope_global : t().plugin_scope_local, out.dir),
            })
            if (!out.tui) {
              props.api.ui.toast({
                variant: "info",
                message: t().plugin_no_tui,
              })
              show(props.api)
              return
            }

            return props.api.plugins.add(mod).then((ok) => {
              if (!ok) {
                props.api.ui.toast({
                  variant: "warning",
                  message: t().plugin_load_failed,
                })
                show(props.api)
                return
              }

              props.api.ui.toast({
                variant: "success",
                message: t().plugin_loaded(mod),
              })
              show(props.api)
            })
          })
          .finally(() => {
            setBusy(false)
          })
      }}
      onCancel={() => {
        show(props.api)
      }}
    />
  )
}

function row(api: TuiPluginApi, item: TuiPluginStatus, width: number, t: ReturnType<typeof useI18n>["t"]): DialogSelectOption<string> {
  return {
    title: item.id,
    value: item.id,
    category: item.source === "internal" ? t().plugin_category_internal : t().plugin_category_external,
    description: meta(item, width, t),
    footer: state(api, item),
    disabled: item.id === id,
  }
}

function showInstall(api: TuiPluginApi) {
  api.ui.dialog.replace(() => <Install api={api} />)
}

function View(props: { api: TuiPluginApi }) {
  const { t } = useI18n()
  const size = useTerminalDimensions()
  const [list, setList] = createSignal(props.api.plugins.list())
  const [cur, setCur] = createSignal<string | undefined>()
  const [lock, setLock] = createSignal(false)

  createEffect(() => {
    const width = size().width
    if (width >= 128) {
      props.api.ui.dialog.setSize("xlarge")
      return
    }
    if (width >= 96) {
      props.api.ui.dialog.setSize("large")
      return
    }
    props.api.ui.dialog.setSize("medium")
  })

  const rows = createMemo(() =>
    [...list()]
      .sort((a, b) => {
        const x = a.source === "internal" ? 1 : 0
        const y = b.source === "internal" ? 1 : 0
        if (x !== y) return x - y
        return a.id.localeCompare(b.id)
      })
      .map((item) => row(props.api, item, size().width, t)),
  )

  const flip = (x: string) => {
    if (lock()) return
    const item = list().find((entry) => entry.id === x)
    if (!item) return
    setLock(true)
    const task = item.active ? props.api.plugins.deactivate(x) : props.api.plugins.activate(x)
    void task
      .then((ok) => {
        if (!ok) {
          props.api.ui.toast({
            variant: "error",
            message: t().plugin_update_failed(item.id),
          })
        }
        setList(props.api.plugins.list())
      })
      .finally(() => {
        setLock(false)
      })
  }

  return (
    <DialogSelect
      title={t().plugin_list_title}
      options={rows()}
      current={cur()}
      onMove={(item) => setCur(item.value)}
      actions={[
        {
          title: t().hint_toggle,
          command: "dialog.action.toggle",
          disabled: lock(),
          onTrigger: (item) => {
            setCur(item.value)
            flip(item.value)
          },
        },
        {
          title: t().plugin_install_title,
          command: "plugin.dialog.install",
          disabled: lock(),
          onTrigger: () => {
            showInstall(props.api)
          },
        },
      ]}
      bindings={props.api.tuiConfig.keymap.pick("plugins", ["plugin.dialog.install"])}
      onSelect={(item) => {
        setCur(item.value)
        flip(item.value)
      }}
    />
  )
}

function show(api: TuiPluginApi) {
  api.ui.dialog.replace(() => <View api={api} />)
}

const tui: TuiPlugin = async (api) => {
  api.keymap.registerLayer({
    commands: [
      {
        name: "plugins.list",
        title: "Plugins",
        category: "System",
        namespace: "palette",
        run() {
          show(api)
        },
      },
      {
        name: "plugins.install",
        title: "Install plugin",
        category: "System",
        namespace: "palette",
        run() {
          showInstall(api)
        },
      },
    ],
    bindings: api.tuiConfig.keymap.omit("plugins", ["plugin.dialog.install"]),
  })
}

const plugin: TuiPluginModule & { id: string } = {
  id,
  tui,
}

export default plugin
