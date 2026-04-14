import { createOpencodeClient } from "@opencode-ai/sdk/v2"
import { useDialog } from "@tui/ui/dialog"
import { DialogSelect } from "@tui/ui/dialog-select"
import { useRoute } from "@tui/context/route"
import { useSync } from "@tui/context/sync"
import { useProject } from "@tui/context/project"
import { createMemo, createSignal, onMount } from "solid-js"
import { setTimeout as sleep } from "node:timers/promises"
import { useSDK } from "../context/sdk"
import { useToast } from "../ui/toast"
import { useI18n } from "@tui/context/i18n"

function scoped(sdk: ReturnType<typeof useSDK>, sync: ReturnType<typeof useSync>, workspaceID: string) {
  return createOpencodeClient({
    baseUrl: sdk.url,
    fetch: sdk.fetch,
    directory: sync.path.directory || sdk.directory,
    experimental_workspaceID: workspaceID,
  })
}

export async function openWorkspaceSession(input: {
  dialog: ReturnType<typeof useDialog>
  route: ReturnType<typeof useRoute>
  sdk: ReturnType<typeof useSDK>
  sync: ReturnType<typeof useSync>
  toast: ReturnType<typeof useToast>
  workspaceID: string
  errorMessage: string
}) {
  const client = scoped(input.sdk, input.sync, input.workspaceID)
  while (true) {
    const result = await client.session.create({ workspaceID: input.workspaceID }).catch(() => undefined)
    if (!result) {
      input.toast.show({
        message: input.errorMessage,
        variant: "error",
      })
      return
    }
    if (result.response.status >= 500 && result.response.status < 600) {
      await sleep(1000)
      continue
    }
    if (!result.data) {
      input.toast.show({
        message: input.errorMessage,
        variant: "error",
      })
      return
    }
    input.route.navigate({
      type: "session",
      sessionID: result.data.id,
    })
    input.dialog.clear()
    return
  }
}

export function DialogWorkspaceCreate(props: { onSelect: (workspaceID: string) => Promise<void> | void }) {
  const dialog = useDialog()
  const sync = useSync()
  const project = useProject()
  const sdk = useSDK()
  const toast = useToast()
  const { t } = useI18n()
  const [creating, setCreating] = createSignal<string>()

  onMount(() => {
    dialog.setSize("medium")
  })

  const options = createMemo(() => {
    const type = creating()
    if (type) {
      return [
        {
          title: t().workspace_creating_type(type),
          value: "creating" as const,
          description: t().workspace_remote_wait,
        },
      ]
    }
    return [
      {
        title: t().workspace_worktree,
        value: "worktree" as const,
        description: t().workspace_worktree_desc,
      },
    ]
  })

  const create = async (type: string) => {
    if (creating()) return
    setCreating(type)

    const result = await sdk.client.experimental.workspace.create({ type, branch: null }).catch(() => undefined)
    const workspace = result?.data
    if (!workspace) {
      setCreating(undefined)
      toast.show({
        message: t().workspace_failed,
        variant: "error",
      })
      return
    }
    await project.workspace.sync()
    await props.onSelect(workspace.id)
    setCreating(undefined)
  }

  return (
    <DialogSelect
      title={creating() ? t().workspace_creating_title : t().workspace_new}
      skipFilter={true}
      options={options()}
      onSelect={(option) => {
        if (option.value === "creating") return
        void create(option.value)
      }}
    />
  )
}
