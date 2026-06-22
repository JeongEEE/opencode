export const en = {
  // provider
  provider_connect: "Connect a provider",
  provider_auth_select: "Select auth method",
  provider_api_key: "API key",
  provider_recommended: "(Recommended)",
  provider_popular: "Popular",
  provider_other: "Other",
  provider_waiting: "Waiting for authorization...",
  provider_invalid_code: "Invalid code",
  provider_auth_code: "Authorization code",
  provider_copy: "copy",

  // model
  model_select: "Select model",
  model_popular_providers: "Popular providers",
  model_view_all: "View all providers",
  model_favorite: "Favorite",
  model_favorites: "Favorites",
  model_recent: "Recent",
  model_pinned: "Pinned",
  model_free: "Free",
  model_today: "Today",

  // session
  session_list: "Sessions",
  session_switch: "Switch session",
  session_new: "New session",
  session_deleted: "The current session was deleted",
  session_fork_failed: "Failed to fork session",
  session_not_found: (id: string): string => `Session not found: ${id}`,

  // footer
  footer_get_started: "Get started",
  footer_permission: (n: number): string => `${n} Permission${n > 1 ? "s" : ""}`,

  // permission
  permission_required: "Permission required",
  permission_allow_always: "Allow always",
  permission_allow_once: "Allow once",
  permission_always_allow: "Always allow",
  permission_reject: "Reject",
  permission_reject_title: "Reject permission",
  permission_reject_hint: "Tell OpenCode what to do differently",
  permission_shell_command: "Shell command",
  permission_tool: "Tool: ",
  permission_path: "Path: ",
  permission_pattern: "Pattern: ",
  permission_query: "Query: ",
  permission_url: "URL: ",
  permission_unknown: "Unknown",
  permission_will_allow: "This will allow ",
  permission_will_allow_patterns: "This will allow the following patterns until OpenCode is restarted",
  permission_continue_failures: "Continue after repeated failures",
  permission_doom_loop_desc: "This keeps the session running despite repeated failures.",
  permission_no_diff: "No diff provided",
  permission_patterns: "Patterns",
  permission_ext_dir: (dir: string): string => `Access external directory ${dir}`,
  permission_call_tool: (name: string): string => `Call tool ${name}`,

  // question
  question_answer: "ANSWER",
  question_reject: "REJECT",
  question_custom: "Type your own answer",
  question_review: "Review",
  question_not_answered: "(not answered)",
  question_multi_hint: " (select all that apply)",

  // startup
  startup_finishing: "Finishing startup...",
  startup_plugins: "Loading plugins...",

  // toast / clipboard
  copied_clipboard: "Copied to clipboard",
  error_unknown: "An unknown error has occurred",

  // update
  update_available: "Update Available",
  update_available_msg: (v: string) => `A new release v${v} is available. Would you like to update now?`,
  update_updating: (v: string) => `Updating to v${v}...`,
  update_failed_title: "Update Failed",
  update_failed_msg: "Update failed",
  update_complete_title: "Update Complete",
  update_complete_msg: (v: string) => `Successfully updated to OpenCode v${v}. Please restart the application.`,

  // app commands — titles
  cmd_model_list: "Switch model",
  cmd_model_cycle: "Model cycle",
  cmd_model_cycle_rev: "Model cycle reverse",
  cmd_favorite_cycle: "Favorite cycle",
  cmd_favorite_cycle_rev: "Favorite cycle reverse",
  cmd_mcp_list: "Toggle MCPs",
  cmd_agent_list: "Switch agent",
  cmd_agent_cycle: "Agent cycle",
  cmd_agent_cycle_rev: "Agent cycle reverse",
  cmd_variant_cycle: "Variant cycle",
  cmd_variant_list: "Switch model variant",
  cmd_provider_connect: "Connect provider",
  cmd_org_switch: "Switch org",
  cmd_status: "View status",
  cmd_theme_switch: "Switch theme",
  cmd_theme_mode: "Toggle theme mode",
  cmd_theme_lock: (locked: boolean): string => (locked ? "Unlock theme mode" : "Lock theme mode"),
  cmd_help: "Help",
  cmd_docs: "Open docs",
  cmd_exit: "Exit the app",
  cmd_debug: "Toggle debug panel",
  cmd_console: "Toggle console",
  cmd_heap: "Write heap snapshot",
  cmd_suspend: "Suspend terminal",
  cmd_title_toggle: (on: boolean): string => (on ? "Disable terminal title" : "Enable terminal title"),
  cmd_animations_toggle: (on: boolean): string => (on ? "Disable animations" : "Enable animations"),
  cmd_diffwrap_toggle: (word: boolean): string => (word ? "Disable diff wrapping" : "Enable diff wrapping"),

  // command palette
  cmd_palette_title: "Commands",
  cmd_palette_show: "Show command palette",
  cmd_language: "Switch language",
  cmd_clear_prompt: "Clear prompt",
  cmd_submit_prompt: "Submit prompt",
  cmd_paste: "Paste",
  cmd_interrupt: "Interrupt session",
  cmd_open_editor: "Open editor",
  cmd_skills: "Skills",
  cmd_stash_prompt: "Stash prompt",
  cmd_stash_pop: "Stash pop",
  cmd_stash_list: "Stash list",
  cmd_prompt_remove_editor_ctx: "Remove editor context",
  cmd_workspace_warp: "Warp",
  cmd_workspace_warp_desc: "Change the workspace for the session",
  cmd_file_context_toggle: (on: boolean): string => (on ? "Disable file context" : "Enable file context"),
  cmd_paste_summary_toggle: (on: boolean): string => (on ? "Disable paste summary" : "Enable paste summary"),
  cmd_session_filter_toggle: (on: boolean): string =>
    on ? "Disable session directory filtering" : "Enable session directory filtering",

  // command categories
  cat_suggested: "Suggested",
  cat_session: "Session",
  cat_agent: "Agent",
  cat_provider: "Provider",
  cat_system: "System",
  cat_prompt: "Prompt",

  // languages
  lang_en: "English",
  lang_ko: "한국어",

  // home tips
  tips_show: "Show tips",
  tips_hide: "Hide tips",
  tip_fix_todo: "Fix a TODO in the codebase",
  tip_fix_tests: "Fix broken tests",
  tip_tech_stack: "What is the tech stack of this project?",

  // session commands
  cmd_session_share: (url: boolean): string => (url ? "Copy share link" : "Share session"),
  cmd_session_rename: "Rename session",
  cmd_session_timeline: "Jump to message",
  cmd_session_fork: "Fork from message",
  cmd_session_compact: "Compact session",
  cmd_session_unshare: "Unshare session",
  cmd_session_undo: "Undo previous message",
  cmd_session_redo: "Redo",
  cmd_session_sidebar: (visible: boolean): string => (visible ? "Hide sidebar" : "Show sidebar"),
  cmd_session_bottombar: (visible: boolean): string => (visible ? "Hide bottom bar" : "Show bottom bar"),
  cmd_session_conceal: (on: boolean): string => (on ? "Disable code concealment" : "Enable code concealment"),
  cmd_session_timestamps: (on: boolean): string => (on ? "Hide timestamps" : "Show timestamps"),
  cmd_session_thinking: (on: boolean): string => (on ? "Hide thinking" : "Show thinking"),
  cmd_session_details: (on: boolean): string => (on ? "Hide tool details" : "Show tool details"),
  cmd_session_scrollbar: "Toggle session scrollbar",
  cmd_session_generic: (on: boolean): string => (on ? "Hide generic tool output" : "Show generic tool output"),
  cmd_session_page_up: "Page up",
  cmd_session_page_down: "Page down",
  cmd_session_line_up: "Line up",
  cmd_session_line_down: "Line down",
  cmd_session_half_up: "Half page up",
  cmd_session_half_down: "Half page down",
  cmd_session_first: "First message",
  cmd_session_last: "Last message",
  cmd_session_last_user: "Jump to last user message",
  cmd_session_next: "Next message",
  cmd_session_prev: "Previous message",
  cmd_session_copy_last: "Copy last assistant message",
  cmd_session_copy_transcript: "Copy session transcript",
  cmd_session_export: "Export session transcript",
  cmd_session_child: "Go to child session",
  cmd_session_parent: "Go to parent session",
  cmd_session_next_child: "Next child session",
  cmd_session_prev_child: "Previous child session",

  // session dialogs / toasts
  dlg_share_title: "Share Session",
  dlg_share_confirm: "Are you sure you want to share it?",
  toast_share_copied: "Share URL copied to clipboard!",
  toast_share_copy_failed: "Failed to copy URL to clipboard",
  toast_share_failed: "Failed to share session",
  toast_compact_no_provider: "Connect a provider to summarize this session",
  toast_unshare_success: "Session unshared successfully",
  toast_unshare_failed: "Failed to unshare session",
  toast_copy_no_messages: "No assistant messages found",
  toast_copy_no_parts: "No text parts found in last assistant message",
  toast_copy_no_content: "No text content found in last assistant message",
  toast_copy_success: "Message copied to clipboard!",
  toast_copy_failed: "Failed to copy to clipboard",
  toast_transcript_copied: "Session transcript copied to clipboard!",
  toast_transcript_failed: "Failed to copy session transcript",
  toast_export_failed: "Failed to export session",

  // agent / variant
  agent_select: "Select agent",
  variant_select: "Select variant",
  variant_default: "Default",

  // dialog-session-rename
  dlg_session_rename: "Rename Session",

  // dialog-status
  dlg_status_title: "Status",
  status_connected: "Connected",
  status_disabled_config: "Disabled in configuration",
  status_no_mcp: "No MCP Servers",
  status_no_formatters: "No Formatters",
  status_formatters: "Formatters",
  status_no_plugins: "No Plugins",
  status_plugins: "Plugins",

  // dialog-mcp
  mcp_loading: "⋯ Loading",
  mcp_enabled: "✓ Enabled",
  mcp_disabled: "○ Disabled",
  mcp_title: "MCPs",
  toast_mcp_refresh_failed: "Failed to refresh MCP status: no data returned",
  toast_mcp_toggle_failed: (name: string): string => `Failed to toggle MCP: ${name}`,

  // dialog-skill
  skill_title: "Skills",
  skill_search: "Search skills...",

  // dialog-go-upsell
  upsell_title: "Free limit reached",
  upsell_desc: "Subscribe to OpenCode Go to keep going with reliable access to the best open-source models, starting at $5/month.",
  upsell_subscribe: "subscribe",
  upsell_dont_show: "don't show again",

  // dialog-help
  help_desc: (key: string): string => `Press ${key} to see all available actions and commands in any context.`,

  // dialog-prompt
  prompt_placeholder: "Enter text",
  status_working: "Working...",
  status_processing: "processing...",

  // dialog-export
  export_title: "Export Options",
  export_filename: "Filename:",
  export_filename_placeholder: "Enter filename",
  export_include_thinking: "Include thinking",
  export_include_details: "Include tool details",
  export_include_metadata: "Include assistant metadata",
  export_open_nosave: "Open without saving",
  export_hint_toggle: (space: string, ret: string): string => `Press ${space} to toggle, ${ret} to confirm`,
  export_hint_confirm: (ret: string, tab: string): string => `Press ${ret} to confirm, ${tab} for options`,

  // sidebar
  sidebar_modified_files: "Modified Files",
  sidebar_getting_started: "Getting started",
  sidebar_free_models_desc: "OpenCode includes free models so you can start immediately.",
  sidebar_connect_desc: "Connect from 75+ providers to use other models, including Claude, GPT, Gemini etc",
  sidebar_open: "Open",
  sidebar_context: "Context",
  sidebar_tokens: "tokens",
  sidebar_pct_used: "% used",
  sidebar_spent: "spent",
  sidebar_lsp_disabled: "LSPs have been disabled in settings",
  sidebar_lsp_inactive: "LSPs will activate as files are read",
  sidebar_mcp_needs_auth: "Needs auth",
  sidebar_mcp_needs_client_id: "Needs client ID",
  sidebar_todo: "Todo",
  sidebar_mcp_active: (n: number): string => `${n} active`,
  sidebar_mcp_errors: (n: number): string => `${n} ${n === 1 ? "error" : "errors"}`,

  // session list
  session_list_delete: "delete",
  session_list_rename: "rename",
  session_list_new_workspace: "new workspace",
  session_list_unknown: "unknown",

  // subagent
  subagent_actions: "Subagent Actions",
  subagent_session: "the subagent's session",
  subagent_label: "Subagent",
  subagent_parent: "Parent",
  subagent_prev: "Prev",
  subagent_next: "Next",

  // keyboard hints
  hint_fullscreen: "fullscreen",
  hint_minimize: "minimize",
  hint_select: "select",
  hint_confirm: "confirm",
  hint_submit: "submit",
  hint_toggle: "toggle",
  hint_dismiss: "dismiss",

  // general
  ok: "ok",
  cancel: "cancel",
  confirm: "Confirm",
  skip: "skip",
  invalid_model: (m: string) => `Invalid model format: ${m}`,
  heap_snapshot: (files: string) => `Heap snapshot written to ${files}`,

  // org
  org_loading: "Loading orgs...",
  org_none: "No orgs found",
  org_load_error: "Could not load orgs",
  org_switched: (name: string): string => `Switched to ${name}`,

  // stash
  stash_title: "Stash",
  stash_delete: "delete",
  stash_confirm_delete: (key: string): string => `Press ${key} again to confirm`,

  // tag
  tag_autocomplete: "Autocomplete",

  // theme
  theme_title: "Themes",

  // workspace
  workspace_new: "New Workspace",
  workspace_creating_title: "Creating Workspace",
  workspace_creating_type: (type: string): string => `Creating ${type} workspace...`,
  workspace_remote_wait: "This can take a while for remote environments",
  workspace_worktree: "Worktree",
  workspace_worktree_desc: "Create a local git worktree",
  workspace_loading: "Loading workspaces...",
  workspace_loading_desc: "Fetching available workspace adaptors",
  workspace_failed: "Failed to create workspace",
  workspace_session_failed: "Failed to create workspace session",

  // message actions
  msg_actions: "Message Actions",
  msg_revert: "Revert",
  msg_revert_desc: "undo messages and file changes",
  msg_copy: "Copy",
  msg_copy_desc: "message text to clipboard",
  msg_fork: "Fork",
  msg_fork_desc: "create a new session",

  // timeline
  timeline_title: "Timeline",

  // error screen
  error_report: "Please report an issue.",
  error_copy_issue: "Copy issue URL (exception info pre-filled)",
  error_copy_success: "Successfully copied",
  error_fatal: "A fatal error occurred!",
  error_reset: "Reset TUI",
  error_exit: "Exit",

  // plugin
  plugin_route_missing: (id: string): string => `Unknown plugin route: ${id}`,
  plugin_go_home: "go home",
  plugin_builtin: "Built-in plugin",
  plugin_builtin_short: "Built-in",
  plugin_state_disabled: "disabled",
  plugin_state_active: "active",
  plugin_state_inactive: "inactive",
  plugin_install_title: "Install plugin",
  plugin_install_placeholder: "npm package name",
  plugin_installing: "Installing plugin...",
  plugin_scope: "scope:",
  plugin_scope_global: "global",
  plugin_scope_local: "local",
  plugin_scope_toggle: "toggle",
  plugin_name_required: "Plugin package name is required",
  plugin_npm_check: "Check npm registry/auth settings and try again.",
  plugin_installed: (mod: string, scope: string, dir: string): string => `Installed ${mod} (${scope}: ${dir})`,
  plugin_no_tui: "Package has no TUI target to load in this app.",
  plugin_load_failed: "Installed plugin, but runtime load failed. See console/logs; restart TUI to retry.",
  plugin_loaded: (mod: string): string => `Loaded ${mod} in current session.`,
  plugin_update_failed: (id: string): string => `Failed to update plugin ${id}`,
  plugin_refreshed: (name: string, version: string): string => `${name} updated to v${version}`,
  plugin_list_title: "Plugins",
  plugin_category_internal: "Internal",
  plugin_category_external: "External",

  // prompt status bar
  prompt_interrupt: "interrupt",
  prompt_interrupt_again: "again to interrupt",
  prompt_exit_shell: "exit shell mode",
  prompt_agents: "agents",
  prompt_commands: "commands",
  prompt_exit: "exit",
  prompt_click_expand: "(click to expand)",
  prompt_retry: (duration: string, attempt: number): string =>
    `retrying${duration ? ` in ${duration}` : ""} attempt #${attempt}`,
  prompt_retry_gemini: "gemini is way too hot right now",
  retry_error_title: "Retry Error",

  // session message states
  session_queued: "QUEUED",
  session_compaction: "Compaction",
  session_view_subagents: "view subagents",
  session_interrupted: "interrupted",
  session_msg_reverted: (n: number): string => `${n} message${n > 1 ? "s" : ""} reverted`,
  session_redo_hint: (key: string): string => `${key} or /redo to restore`,
  session_thinking: "_Thinking:_ ",
  session_redo_confirm_title: "Confirm Redo",
  session_redo_confirm_msg: "Are you sure you want to restore the reverted messages?",

  // tool pending states
  tool_shell_title: "# Shell",
  tool_writing_cmd: "Writing command...",
  tool_preparing_write: "Preparing write...",
  tool_finding_files: "Finding files...",
  tool_reading_file: "Reading file...",
  tool_searching_content: "Searching content...",
  tool_listing_dir: "Listing directory...",
  tool_fetching_web: "Fetching from the web...",
  tool_searching_code: "Searching code...",
  tool_searching_web: "Searching web...",
  tool_delegating: "Delegating...",
  tool_preparing_edit: "Preparing edit...",
  tool_preparing_patch: "Preparing patch...",
  tool_patch_failed: "Patch failed",
  tool_updating_todos: "Updating todos...",
  tool_todos_update_failed: "Todo update failed",
  tool_asking_questions: "Asking questions...",
  tool_todos_title: "# Todos",
  tool_questions_title: "# Questions",
  tool_loading_skill: "Loading skill...",

  // task tool
  task_toolcalls: (n: number): string => `${n} toolcall${n !== 1 ? "s" : ""}`,

  // additional toast messages
  toast_connect_provider: "Connect a provider to send prompts",
  toast_session_create_failed: "Creating a session failed. Open console for more details.",
  toast_no_favorites: "Add a favorite model to use this shortcut",
  toast_export_success: (filename: string): string => `Session exported to ${filename}`,

  // tips
  tip_theme: (n: number, s?: string): string =>
    s
      ? `Use {highlight}/themes{/highlight} or {highlight}${s}{/highlight} to switch between ${n} built-in themes`
      : `Use {highlight}/themes{/highlight} to switch between ${n} built-in themes`,
  tip_agent_cycle: (s: string): string | undefined =>
    s ? `Press {highlight}${s}{/highlight} to cycle between Build and Plan agents` : undefined,
  tip_input_paste: (s: string): string | undefined =>
    s ? `Press {highlight}${s}{/highlight} to paste images from your clipboard into the prompt` : undefined,
  tip_editor_open: (s: string): string =>
    s
      ? `Use {highlight}/editor{/highlight} or {highlight}${s}{/highlight} to compose messages in your external editor`
      : `Use {highlight}/editor{/highlight} to compose messages in your external editor`,
  tip_model_list: (s: string): string =>
    s
      ? `Use {highlight}/models{/highlight} or {highlight}${s}{/highlight} to see and switch between available AI models`
      : `Use {highlight}/models{/highlight} to see and switch between available AI models`,
  tip_session_new: (s: string): string =>
    s
      ? `Use {highlight}/new{/highlight} or {highlight}${s}{/highlight} to start a fresh conversation session`
      : `Use {highlight}/new{/highlight} to start a fresh conversation session`,
  tip_session_list: (s: string): string =>
    s
      ? `Use {highlight}/sessions{/highlight} or {highlight}${s}{/highlight} to list and continue previous conversations`
      : `Use {highlight}/sessions{/highlight} to list and continue previous conversations`,
  tip_session_export: (s: string): string =>
    s
      ? `Use {highlight}/export{/highlight} or {highlight}${s}{/highlight} to save the conversation as Markdown`
      : `Use {highlight}/export{/highlight} to save the conversation as Markdown`,
  tip_messages_copy: (s: string): string | undefined =>
    s ? `Press {highlight}${s}{/highlight} to copy the assistant's last message to clipboard` : undefined,
  tip_command_list: (s: string): string | undefined =>
    s ? `Press {highlight}${s}{/highlight} to see all available actions and commands` : undefined,
  tip_leader_key: (s: string): string =>
    s
      ? `The leader key is {highlight}${s}{/highlight}; combine with other keys for quick actions`
      : `Use {highlight}Ctrl+X{/highlight} as the leader key; combine with other keys for quick actions`,
  tip_model_cycle_recent: (s: string): string | undefined =>
    s ? `Press {highlight}${s}{/highlight} to quickly switch between recently used models` : undefined,
  tip_session_sidebar: (s: string): string | undefined =>
    s ? `Press {highlight}${s}{/highlight} in a session to show or hide the sidebar panel` : undefined,
  tip_messages_page: (up: string, down: string): string | undefined =>
    up && down
      ? `Use {highlight}${up}{/highlight}/{highlight}${down}{/highlight} to navigate through conversation history`
      : undefined,
  tip_messages_first: (s: string): string | undefined =>
    s ? `Press {highlight}${s}{/highlight} to jump to the beginning of the conversation` : undefined,
  tip_messages_last: (s: string): string | undefined =>
    s ? `Press {highlight}${s}{/highlight} to jump to the most recent message` : undefined,
  tip_input_newline: (s: string): string | undefined =>
    s ? `Press {highlight}${s}{/highlight} to add newlines in your prompt` : undefined,
  tip_input_clear: (s: string): string | undefined =>
    s ? `Press {highlight}${s}{/highlight} when typing to clear the input field` : undefined,
  tip_session_interrupt: (s: string): string | undefined =>
    s ? `Press {highlight}${s}{/highlight} to stop the AI mid-response` : undefined,
  tip_session_nav: (parent: string, first: string, prev: string, next: string): string | undefined => {
    const items = [parent, first, prev, next].filter(Boolean)
    return items.length
      ? `Use ${items.map((v) => `{highlight}${v}{/highlight}`).join(" / ")} to move between parent and child sessions`
      : undefined
  },
  tip_timeline: (s: string): string =>
    s
      ? `Use {highlight}/timeline{/highlight} or {highlight}${s}{/highlight} to jump to specific messages`
      : `Use {highlight}/timeline{/highlight} to jump to specific messages`,
  tip_toggle_conceal: (s: string): string | undefined =>
    s ? `Press {highlight}${s}{/highlight} to toggle code block visibility in messages` : undefined,
  tip_status: (s: string): string =>
    s
      ? `Use {highlight}/status{/highlight} or {highlight}${s}{/highlight} to see system status info`
      : `Use {highlight}/status{/highlight} to see system status info`,
  tip_toggle_username: (s: string): string =>
    s
      ? `Toggle username display in chat via the command palette ({highlight}${s}{/highlight})`
      : "Toggle username display in chat via the command palette",
  tip_help: (s: string): string =>
    s
      ? `Use {highlight}/help{/highlight} or {highlight}${s}{/highlight} to show the help dialog`
      : `Use {highlight}/help{/highlight} to show the help dialog`,
  tip_session_pin: (s: string): string | undefined =>
    s
      ? `Press {highlight}${s}{/highlight} in the session list to pin a session so it stays at the top`
      : undefined,
  tip_session_quickswitch: (s1: string, s9: string): string | undefined =>
    s1 && s9
      ? `Pinned and recent sessions are bound to {highlight}${s1}{/highlight} through {highlight}${s9}{/highlight} for one-press switching`
      : undefined,
  tip_session_cycle: (fwd: string, rev: string): string | undefined =>
    fwd && rev
      ? `Press {highlight}${fwd}{/highlight} / {highlight}${rev}{/highlight} to cycle through recently visited sessions`
      : undefined,
  tip_session_toggle_recent: (s: string): string | undefined =>
    s
      ? `Press {highlight}${s}{/highlight} in the session list to show or hide a session in the Recent group`
      : undefined,
  tip_suspend_term: "Press {highlight}Ctrl+Z{/highlight} to suspend the terminal and return to your shell",
  tip_undo_prompt: "Press {highlight}Ctrl+Z{/highlight} to undo changes in your prompt",
  tips_list: [
    "Type {highlight}@{/highlight} followed by a filename to fuzzy search and attach files",
    "Start a message with {highlight}!{/highlight} to run shell commands directly (e.g., {highlight}!ls -la{/highlight})",

    "Use {highlight}/undo{/highlight} to revert the last message and file changes",
    "Use {highlight}/redo{/highlight} to restore previously undone messages and file changes",
    "Run {highlight}/share{/highlight} to create a public link to your conversation at opencode.ai",
    "Drag and drop images or PDFs into the terminal to add them as context",
    "Run {highlight}/init{/highlight} to auto-generate project rules based on your codebase",
    "Run {highlight}/compact{/highlight} to summarize long sessions near context limits",
    "Run {highlight}/connect{/highlight} to add API keys for 75+ supported LLM providers",
    "Switch to {highlight}Plan{/highlight} agent to get suggestions without making actual changes",
    "Use {highlight}@agent-name{/highlight} in prompts to invoke specialized subagents",
    "Create {highlight}opencode.json{/highlight} for server settings and {highlight}tui.json{/highlight} for TUI settings",
    "Place TUI settings in {highlight}~/.config/opencode/tui.json{/highlight} for global config",
    "Add {highlight}$schema{/highlight} to your config for autocomplete in your editor",
    "Configure {highlight}model{/highlight} in config to set your default model",
    "Override any keybind in {highlight}tui.json{/highlight} via the {highlight}keybinds{/highlight} section",
    "Set any keybind to {highlight}none{/highlight} to disable it completely",
    "Configure local or remote MCP servers in the {highlight}mcp{/highlight} config section",
    "purplecode auto-handles OAuth for remote MCP servers requiring auth",
    "Add {highlight}.md{/highlight} files to {highlight}.opencode/commands/{/highlight} to define reusable custom prompts",
    "Use {highlight}$ARGUMENTS{/highlight}, {highlight}$1{/highlight}, {highlight}$2{/highlight} in custom commands for dynamic input",
    "Use backticks in commands to inject shell output (e.g., {highlight}`git status`{/highlight})",
    "Add {highlight}.md{/highlight} files to {highlight}.opencode/agents/{/highlight} for specialized AI personas",
    "Configure per-agent permissions for {highlight}edit{/highlight}, {highlight}bash{/highlight}, and {highlight}webfetch{/highlight} tools",
    'Use patterns like {highlight}"git *": "allow"{/highlight} for granular bash permissions',
    'Set {highlight}"rm -rf *": "deny"{/highlight} to block destructive commands',
    'Configure {highlight}"git push": "ask"{/highlight} to require approval before pushing',
    "purplecode auto-formats files using prettier, gofmt, ruff, and more",
    'Set {highlight}"formatter": false{/highlight} in config to disable all auto-formatting',
    "Define custom formatter commands with file extensions in config",
    "purplecode uses LSP servers for intelligent code analysis",
    "Create {highlight}.ts{/highlight} files in {highlight}.opencode/tools/{/highlight} to define new LLM tools",
    "Tool definitions can invoke scripts written in Python, Go, etc",
    "Add {highlight}.ts{/highlight} files to {highlight}.opencode/plugins/{/highlight} for event hooks",
    "Use plugins to send OS notifications when sessions complete",
    "Create a plugin to prevent purplecode from reading sensitive files",
    "Use {highlight}pcode run{/highlight} for non-interactive scripting",
    "Use {highlight}pcode --continue{/highlight} to resume the last session",
    "Use {highlight}pcode run -f file.ts{/highlight} to attach files via CLI",
    "Use {highlight}--format json{/highlight} for machine-readable output in scripts",
    "Run {highlight}pcode serve{/highlight} for headless API access to purplecode",
    "Use {highlight}pcode run --attach{/highlight} to connect to a running server",
    "Run {highlight}pcode upgrade{/highlight} to update to the latest version",
    "Run {highlight}pcode auth list{/highlight} to see all configured providers",
    "Run {highlight}pcode agent create{/highlight} for guided agent creation",
    "Use {highlight}/opencode{/highlight} in GitHub issues/PRs to trigger AI actions",
    "Run {highlight}pcode github install{/highlight} to set up the GitHub workflow",
    "Comment {highlight}/opencode fix this{/highlight} on issues to auto-create PRs",
    "Comment {highlight}/oc{/highlight} on PR code lines for targeted code reviews",
    'Use {highlight}"theme": "system"{/highlight} to match your terminal\'s colors',
    "Create JSON theme files in {highlight}.opencode/themes/{/highlight} directory",
    "Themes support dark/light variants for both modes",
    "Reference ANSI colors 0-255 in custom themes",
    "Use {highlight}{env:VAR_NAME}{/highlight} syntax to reference environment variables in config",
    "Use {highlight}{file:path}{/highlight} to include file contents in config values",
    "Use {highlight}instructions{/highlight} in config to load additional rules files",
    "Set agent {highlight}temperature{/highlight} from 0.0 (focused) to 1.0 (creative)",
    "Configure {highlight}steps{/highlight} to limit agentic iterations per request",
    'Set {highlight}"tools": {"bash": false}{/highlight} to disable specific tools',
    'Set {highlight}"mcp_*": false{/highlight} to disable all tools from an MCP server',
    "Override global tool settings per agent configuration",
    'Set {highlight}"share": "auto"{/highlight} to automatically share all sessions',
    'Set {highlight}"share": "disabled"{/highlight} to prevent any session sharing',
    "Run {highlight}/unshare{/highlight} to remove a session from public access",
    "Permission {highlight}doom_loop{/highlight} prevents infinite tool call loops",
    "Permission {highlight}external_directory{/highlight} protects files outside project",
    "Run {highlight}pcode debug config{/highlight} to troubleshoot configuration",
    "Use {highlight}--print-logs{/highlight} flag to see detailed logs in stderr",
    "Press {highlight}Ctrl+X G{/highlight} or {highlight}/timeline{/highlight} to jump to specific messages",
    "Press {highlight}Ctrl+X H{/highlight} to toggle code block visibility in messages",
    "Press {highlight}Ctrl+X S{/highlight} or {highlight}/status{/highlight} to see system status info",
    "Enable {highlight}scroll_acceleration{/highlight} in {highlight}tui.json{/highlight} for smooth macOS-style scrolling",
    "Toggle username display in chat via command palette ({highlight}Ctrl+P{/highlight})",
    "Run {highlight}docker run -it --rm ghcr.io/anomalyco/opencode{/highlight} for containerized use",
    "Use {highlight}/connect{/highlight} with Opencode Zen for curated, tested models",
    "Commit your project's {highlight}AGENTS.md{/highlight} file to Git for team sharing",
    "Use {highlight}/review{/highlight} to review uncommitted changes, branches, or PRs",
    "Run {highlight}/help{/highlight} or {highlight}Ctrl+X H{/highlight} to show the help dialog",
    "Use {highlight}/rename{/highlight} to rename the current session",
    "Press {highlight}Ctrl+F{/highlight} in the session list to pin a session so it stays at the top",
    "Pinned and recent sessions are bound to {highlight}Ctrl+X 1{/highlight} through {highlight}Ctrl+X 9{/highlight} for one-press switching",
    "Press {highlight}Ctrl+X ]{/highlight} / {highlight}Ctrl+X [{/highlight} to cycle through recently visited sessions",
    "Press {highlight}Ctrl+H{/highlight} in the session list to show or hide a session in the Recent group",
  ],
}

export type Translations = typeof en
