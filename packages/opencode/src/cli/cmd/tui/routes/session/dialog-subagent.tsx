import { DialogSelect } from "@tui/ui/dialog-select"
import { useRoute } from "@tui/context/route"
import { useI18n } from "../../context/i18n"

export function DialogSubagent(props: { sessionID: string }) {
  const { t } = useI18n()
  const route = useRoute()

  return (
    <DialogSelect
      title={t().subagent_actions}
      options={[
        {
          title: t().sidebar_open,
          value: "subagent.view",
          description: t().subagent_session,
          onSelect: (dialog) => {
            route.navigate({
              type: "session",
              sessionID: props.sessionID,
            })
            dialog.clear()
          },
        },
      ]}
    />
  )
}
