import type { Translations } from "./en"

export const ko: Translations = {
  // provider
  provider_connect: "공급자 연결",
  provider_auth_select: "인증 방법 선택",
  provider_api_key: "API 키",
  provider_recommended: "(추천)",
  provider_popular: "인기",
  provider_other: "기타",
  provider_waiting: "인증 대기 중...",
  provider_invalid_code: "잘못된 코드",
  provider_auth_code: "인증 코드",
  provider_copy: "복사",

  // model
  model_select: "모델 선택",
  model_popular_providers: "인기 공급자",
  model_view_all: "모든 공급자 보기",
  model_favorite: "즐겨찾기",
  model_favorites: "즐겨찾기",
  model_recent: "최근",
  model_pinned: "고정됨",
  model_free: "무료",
  model_today: "오늘",

  // session
  session_list: "세션",
  session_switch: "세션 변경",
  session_new: "새 세션",
  session_deleted: "현재 세션이 삭제되었습니다",
  session_fork_failed: "세션 포크에 실패했습니다",
  session_not_found: (id) => `세션을 찾을 수 없습니다: ${id}`,

  // footer
  footer_get_started: "시작하기",
  footer_permission: (n) => `${n}개의 권한 요청`,

  // permission
  permission_required: "권한 필요",
  permission_allow_always: "항상 허용",
  permission_allow_once: "한 번만 허용",
  permission_always_allow: "항상 허용",
  permission_reject: "거부",
  permission_reject_title: "권한 거부",
  permission_reject_hint: "OpenCode에게 다른 방법을 알려주세요",
  permission_shell_command: "셸 명령어",
  permission_tool: "도구: ",
  permission_path: "경로: ",
  permission_pattern: "패턴: ",
  permission_query: "쿼리: ",
  permission_url: "URL: ",
  permission_unknown: "알 수 없음",
  permission_will_allow: "다음을 허용합니다: ",
  permission_will_allow_patterns: "OpenCode가 재시작될 때까지 다음 패턴을 허용합니다",
  permission_continue_failures: "반복 실패 후 계속",
  permission_doom_loop_desc: "반복 실패에도 세션을 계속 실행합니다.",
  permission_no_diff: "diff 없음",
  permission_patterns: "패턴",
  permission_ext_dir: (dir) => `외부 디렉토리 접근: ${dir}`,
  permission_call_tool: (name) => `도구 호출: ${name}`,

  // question
  question_answer: "ANSWER",
  question_reject: "REJECT",
  question_custom: "직접 답변 입력",
  question_review: "검토",
  question_not_answered: "(미답변)",
  question_multi_hint: " (해당되는 것 모두 선택)",

  // startup
  startup_finishing: "시작 완료 중...",
  startup_plugins: "플러그인 로딩 중...",

  // toast / clipboard
  copied_clipboard: "클립보드에 복사됨",
  error_unknown: "알 수 없는 오류가 발생했습니다",

  // update
  update_available: "업데이트 가능",
  update_available_msg: (v) => `새 릴리스 v${v}가 있습니다. 지금 업데이트하시겠습니까?`,
  update_updating: (v) => `v${v}로 업데이트 중...`,
  update_failed_title: "업데이트 실패",
  update_failed_msg: "업데이트에 실패했습니다",
  update_complete_title: "업데이트 완료",
  update_complete_msg: (v) => `OpenCode v${v}로 업데이트되었습니다. 앱을 재시작해 주세요.`,

  // app commands — titles
  cmd_model_list: "모델 변경",
  cmd_model_cycle: "모델 순환",
  cmd_model_cycle_rev: "모델 역순환",
  cmd_favorite_cycle: "즐겨찾기 순환",
  cmd_favorite_cycle_rev: "즐겨찾기 역순환",
  cmd_mcp_list: "MCP 변경",
  cmd_agent_list: "에이전트 변경",
  cmd_agent_cycle: "에이전트 순환",
  cmd_agent_cycle_rev: "에이전트 역순환",
  cmd_variant_cycle: "변형 순환",
  cmd_variant_list: "모델 변형 변경",
  cmd_provider_connect: "공급자 연결",
  cmd_org_switch: "조직 변경",
  cmd_status: "상태 보기",
  cmd_theme_switch: "테마 변경",
  cmd_theme_mode: "테마 모드 전환",
  cmd_theme_lock: (locked) => (locked ? "테마 모드 잠금 해제" : "테마 모드 잠금"),
  cmd_help: "도움말",
  cmd_docs: "문서 열기",
  cmd_exit: "앱 종료",
  cmd_debug: "디버그 패널 전환",
  cmd_console: "콘솔 전환",
  cmd_heap: "힙 스냅샷 저장",
  cmd_suspend: "터미널 일시 중단",
  cmd_title_toggle: (on) => (on ? "터미널 제목 비활성화" : "터미널 제목 활성화"),
  cmd_animations_toggle: (on) => (on ? "애니메이션 비활성화" : "애니메이션 활성화"),
  cmd_diffwrap_toggle: (word) => (word ? "diff 줄바꿈 비활성화" : "diff 줄바꿈 활성화"),

  // command palette
  cmd_palette_title: "커맨드",
  cmd_palette_show: "커맨드 팔레트 열기",
  cmd_language: "언어 변경",
  cmd_clear_prompt: "프롬프트 지우기",
  cmd_submit_prompt: "프롬프트 제출",
  cmd_paste: "붙여넣기",
  cmd_interrupt: "세션 중단",
  cmd_open_editor: "에디터 열기",
  cmd_skills: "스킬",
  cmd_stash_prompt: "프롬프트 임시저장",
  cmd_stash_pop: "임시저장 복원",
  cmd_stash_list: "임시저장 목록",
  cmd_prompt_remove_editor_ctx: "에디터 컨텍스트 제거",
  cmd_workspace_warp: "워크스페이스 변경",
  cmd_workspace_warp_desc: "세션의 워크스페이스를 변경합니다",
  cmd_file_context_toggle: (on) => (on ? "파일 컨텍스트 비활성화" : "파일 컨텍스트 활성화"),
  cmd_paste_summary_toggle: (on) => (on ? "붙여넣기 요약 비활성화" : "붙여넣기 요약 활성화"),
  cmd_session_filter_toggle: (on) => (on ? "세션 디렉터리 필터 비활성화" : "세션 디렉터리 필터 활성화"),

  // command categories
  cat_suggested: "추천",
  cat_session: "세션",
  cat_agent: "에이전트",
  cat_provider: "공급자",
  cat_system: "시스템",
  cat_prompt: "프롬프트",

  // languages
  lang_en: "English",
  lang_ko: "한국어",

  // home tips
  tips_show: "팁 표시",
  tips_hide: "팁 숨기기",
  tip_fix_todo: "코드베이스에서 TODO 수정하기",
  tip_fix_tests: "실패한 테스트 수정하기",
  tip_tech_stack: "이 프로젝트의 기술 스택은 무엇인가요?",

  // session commands
  cmd_session_share: (url) => (url ? "공유 링크 복사" : "세션 공유"),
  cmd_session_rename: "세션 이름 변경",
  cmd_session_timeline: "메시지로 이동",
  cmd_session_fork: "메시지에서 포크",
  cmd_session_compact: "세션 압축",
  cmd_session_unshare: "세션 공유 해제",
  cmd_session_undo: "이전 메시지 취소",
  cmd_session_redo: "다시 실행",
  cmd_session_sidebar: (visible) => (visible ? "사이드바 숨기기" : "사이드바 표시"),
  cmd_session_bottombar: (visible: boolean): string => (visible ? "바텀바 숨기기" : "바텀바 표시"),
  cmd_session_conceal: (on) => (on ? "코드 숨김 비활성화" : "코드 숨김 활성화"),
  cmd_session_timestamps: (on) => (on ? "타임스탬프 숨기기" : "타임스탬프 표시"),
  cmd_session_thinking: (on) => (on ? "생각 숨기기" : "생각 표시"),
  cmd_session_details: (on) => (on ? "도구 세부 정보 숨기기" : "도구 세부 정보 표시"),
  cmd_session_scrollbar: "세션 스크롤바 전환",
  cmd_session_generic: (on) => (on ? "일반 도구 출력 숨기기" : "일반 도구 출력 표시"),
  cmd_session_page_up: "페이지 위로",
  cmd_session_page_down: "페이지 아래로",
  cmd_session_line_up: "한 줄 위로",
  cmd_session_line_down: "한 줄 아래로",
  cmd_session_half_up: "반 페이지 위로",
  cmd_session_half_down: "반 페이지 아래로",
  cmd_session_first: "첫 번째 메시지",
  cmd_session_last: "마지막 메시지",
  cmd_session_last_user: "마지막 사용자 메시지로 이동",
  cmd_session_next: "다음 메시지",
  cmd_session_prev: "이전 메시지",
  cmd_session_copy_last: "마지막 어시스턴트 메시지 복사",
  cmd_session_copy_transcript: "세션 대화록 복사",
  cmd_session_export: "세션 대화록 내보내기",
  cmd_session_child: "하위 세션으로 이동",
  cmd_session_parent: "상위 세션으로 이동",
  cmd_session_next_child: "다음 하위 세션",
  cmd_session_prev_child: "이전 하위 세션",

  // session dialogs / toasts
  dlg_share_title: "세션 공유",
  dlg_share_confirm: "정말로 공유하시겠습니까?",
  toast_share_copied: "공유 URL이 클립보드에 복사됐습니다!",
  toast_share_copy_failed: "URL을 클립보드에 복사하지 못했습니다",
  toast_share_failed: "세션 공유에 실패했습니다",
  toast_compact_no_provider: "세션을 요약하려면 공급자를 연결하세요",
  toast_unshare_success: "세션 공유가 해제됐습니다",
  toast_unshare_failed: "세션 공유 해제에 실패했습니다",
  toast_copy_no_messages: "어시스턴트 메시지를 찾을 수 없습니다",
  toast_copy_no_parts: "마지막 어시스턴트 메시지에서 텍스트를 찾을 수 없습니다",
  toast_copy_no_content: "마지막 어시스턴트 메시지에서 텍스트 내용을 찾을 수 없습니다",
  toast_copy_success: "메시지가 클립보드에 복사됐습니다!",
  toast_copy_failed: "클립보드에 복사하지 못했습니다",
  toast_transcript_copied: "세션 대화록이 클립보드에 복사됐습니다!",
  toast_transcript_failed: "세션 대화록 복사에 실패했습니다",
  toast_export_failed: "세션 내보내기에 실패했습니다",

  // agent / variant
  agent_select: "에이전트 선택",
  variant_select: "변형 선택",
  variant_default: "기본값",

  // dialog-session-rename
  dlg_session_rename: "세션 이름 변경",

  // dialog-status
  dlg_status_title: "상태",
  status_connected: "연결됨",
  status_disabled_config: "설정에서 비활성화됨",
  status_no_mcp: "MCP 서버 없음",
  status_no_formatters: "포매터 없음",
  status_formatters: "포매터",
  status_no_plugins: "플러그인 없음",
  status_plugins: "플러그인",

  // dialog-mcp
  mcp_loading: "⋯ 로딩 중",
  mcp_enabled: "✓ 활성화됨",
  mcp_disabled: "○ 비활성화됨",
  mcp_title: "MCPs",
  toast_mcp_refresh_failed: "MCP 상태를 새로고침하지 못했습니다: 데이터 없음",
  toast_mcp_toggle_failed: (name) => `MCP 전환 실패: ${name}`,

  // dialog-skill
  skill_title: "스킬",
  skill_search: "스킬 검색...",
  skill_load_error: "스킬을 불러올 수 없습니다",

  // dialog-go-upsell
  upsell_title: "무료 한도 초과",
  upsell_desc: "OpenCode Go를 구독하면 월 $5부터 오픈소스 최고 모델을 안정적으로 계속 사용할 수 있습니다.",
  upsell_subscribe: "구독하기",
  upsell_dont_show: "다시 보지 않기",

  // dialog-help
  help_desc: (key) => `${key}를 눌러 현재 컨텍스트의 모든 작업과 커맨드를 확인하세요.`,

  // dialog-prompt
  prompt_placeholder: "텍스트 입력",
  status_working: "처리 중...",
  status_processing: "처리 중...",

  // dialog-export
  export_title: "내보내기 옵션",
  export_filename: "파일 이름:",
  export_filename_placeholder: "파일 이름 입력",
  export_include_thinking: "생각 포함",
  export_include_details: "도구 세부 정보 포함",
  export_include_metadata: "어시스턴트 메타데이터 포함",
  export_open_nosave: "저장하지 않고 열기",
  export_hint_toggle: (space, ret) => `${space} 토글, ${ret} 확인`,
  export_hint_confirm: (ret, tab) => `${ret} 확인, ${tab} 옵션`,

  // sidebar
  sidebar_modified_files: "수정된 파일",
  sidebar_getting_started: "시작하기",
  sidebar_free_models_desc: "OpenCode에는 무료 모델이 포함되어 있어 즉시 시작할 수 있습니다.",
  sidebar_connect_desc: "Claude, GPT, Gemini 등 75개 이상의 공급자에 연결하세요",
  sidebar_open: "열기",
  sidebar_context: "컨텍스트",
  sidebar_tokens: "토큰",
  sidebar_pct_used: "% 사용됨",
  sidebar_spent: "사용된 비용",
  sidebar_lsp_disabled: "설정에서 LSP가 비활성화되었습니다",
  sidebar_lsp_inactive: "파일을 읽으면 LSP가 활성화됩니다",
  sidebar_mcp_needs_auth: "인증 필요",
  sidebar_mcp_needs_client_id: "클라이언트 ID 필요",
  sidebar_todo: "할 일",
  sidebar_mcp_active: (n) => `${n}개 활성`,
  sidebar_mcp_errors: (n) => `오류 ${n}개`,

  // session list
  session_list_delete: "삭제",
  session_list_rename: "이름 변경",
  session_list_new_workspace: "새 워크스페이스",
  session_list_unknown: "알 수 없음",

  // subagent
  subagent_actions: "서브에이전트 작업",
  subagent_session: "서브에이전트의 세션",
  subagent_label: "서브에이전트",
  subagent_parent: "부모",
  subagent_prev: "이전",
  subagent_next: "다음",

  // keyboard hints
  hint_fullscreen: "전체화면",
  hint_minimize: "최소화",
  hint_select: "선택",
  hint_confirm: "확인",
  hint_submit: "제출",
  hint_toggle: "토글",
  hint_dismiss: "닫기",

  // general
  ok: "확인",
  cancel: "취소",
  confirm: "확인",
  skip: "건너뛰기",
  invalid_model: (m) => `잘못된 모델 형식: ${m}`,
  heap_snapshot: (files) => `힙 스냅샷이 저장되었습니다: ${files}`,

  // org
  org_loading: "조직 로딩 중...",
  org_none: "조직 없음",
  org_load_error: "조직을 불러오지 못했습니다",
  org_switched: (name) => `${name}으로 전환됨`,

  // stash
  stash_title: "스태시",
  stash_delete: "삭제",
  stash_confirm_delete: (key) => `${key}를 다시 눌러 확인`,

  // tag
  tag_autocomplete: "자동완성",

  // theme
  theme_title: "테마",

  // workspace
  workspace_new: "새 워크스페이스",
  workspace_creating_title: "워크스페이스 생성 중",
  workspace_creating_type: (type) => `${type} 워크스페이스 생성 중...`,
  workspace_remote_wait: "원격 환경에서는 시간이 걸릴 수 있습니다",
  workspace_worktree: "워크트리",
  workspace_worktree_desc: "로컬 git 워크트리 생성",
  workspace_loading: "워크스페이스 불러오는 중...",
  workspace_loading_desc: "사용 가능한 워크스페이스 어댑터를 가져오는 중",
  workspace_failed: "워크스페이스 생성에 실패했습니다",
  workspace_session_failed: "워크스페이스 세션 생성에 실패했습니다",

  // message actions
  msg_actions: "메시지 작업",
  msg_revert: "되돌리기",
  msg_revert_desc: "메시지 및 파일 변경 취소",
  msg_copy: "복사",
  msg_copy_desc: "메시지 텍스트를 클립보드에 복사",
  msg_fork: "포크",
  msg_fork_desc: "새 세션 생성",

  // timeline
  timeline_title: "타임라인",

  // error screen
  error_report: "이슈를 보고해 주세요.",
  error_copy_issue: "이슈 URL 복사 (예외 정보 포함)",
  error_copy_success: "복사 완료",
  error_fatal: "치명적인 오류가 발생했습니다!",
  error_reset: "TUI 초기화",
  error_exit: "종료",

  // plugin
  plugin_route_missing: (id) => `알 수 없는 플러그인 라우트: ${id}`,
  plugin_go_home: "홈으로",
  plugin_builtin: "내장 플러그인",
  plugin_builtin_short: "내장",
  plugin_state_disabled: "비활성화됨",
  plugin_state_active: "활성",
  plugin_state_inactive: "비활성",
  plugin_install_title: "플러그인 설치",
  plugin_install_placeholder: "npm 패키지 이름",
  plugin_installing: "플러그인 설치 중...",
  plugin_scope: "범위:",
  plugin_scope_global: "전역",
  plugin_scope_local: "로컬",
  plugin_scope_toggle: "전환",
  plugin_name_required: "플러그인 패키지 이름이 필요합니다",
  plugin_npm_check: "npm 레지스트리/인증 설정을 확인하고 다시 시도하세요.",
  plugin_installed: (mod, scope, dir) => `${mod} 설치 완료 (${scope}: ${dir})`,
  plugin_no_tui: "패키지에 이 앱에서 로드할 TUI 대상이 없습니다.",
  plugin_load_failed: "플러그인이 설치되었지만 런타임 로드에 실패했습니다. 콘솔/로그를 확인하고 TUI를 재시작하세요.",
  plugin_loaded: (mod) => `현재 세션에서 ${mod}을(를) 로드했습니다.`,
  plugin_update_failed: (id) => `플러그인 ${id} 업데이트에 실패했습니다`,
  plugin_refreshed: (name, version) => `${name} v${version}으로 업데이트되었습니다`,
  plugin_list_title: "플러그인",
  plugin_category_internal: "내부",
  plugin_category_external: "외부",

  // prompt status bar
  prompt_interrupt: "중단",
  prompt_interrupt_again: "다시 눌러 중단",
  prompt_exit_shell: "shell 모드 종료",
  prompt_agents: "에이전트",
  prompt_commands: "커맨드",
  prompt_exit: "종료",
  prompt_click_expand: "(클릭하여 펼치기)",
  prompt_retry: (duration, attempt) => `재시도${duration ? ` ${duration} 후` : ""} #${attempt}번째 시도`,
  prompt_retry_gemini: "gemini가 너무 과부하 상태입니다",
  retry_error_title: "재시도 오류",

  // session message states
  session_queued: "대기 중",
  session_compaction: "압축",
  session_view_subagents: "서브에이전트 보기",
  session_interrupted: "중단됨",
  session_msg_reverted: (n) => `${n}개의 메시지가 되돌려졌습니다`,
  session_redo_hint: (key) => `${key} 또는 /redo로 복원`,
  session_thinking: "_생각 중:_ ",
  session_redo_confirm_title: "다시 실행 확인",
  session_redo_confirm_msg: "되돌린 메시지를 복원하시겠습니까?",

  // tool pending states
  tool_shell_title: "# Shell",
  tool_writing_cmd: "명령어 작성 중...",
  tool_preparing_write: "파일 쓰기 준비 중...",
  tool_finding_files: "파일 찾는 중...",
  tool_reading_file: "파일 읽는 중...",
  tool_searching_content: "내용 검색 중...",
  tool_listing_dir: "디렉토리 나열 중...",
  tool_fetching_web: "웹에서 가져오는 중...",
  tool_searching_code: "코드 검색 중...",
  tool_searching_web: "웹 검색 중...",
  tool_delegating: "위임 중...",
  tool_preparing_edit: "편집 준비 중...",
  tool_preparing_patch: "패치 준비 중...",
  tool_patch_failed: "패치 실패",
  tool_updating_todos: "할 일 업데이트 중...",
  tool_todos_update_failed: "할 일 업데이트 실패",
  tool_asking_questions: "질문 중...",
  tool_todos_title: "# 할 일",
  tool_questions_title: "# 질문",
  tool_loading_skill: "스킬 로딩 중...",

  // task tool
  task_toolcalls: (n) => `도구 호출 ${n}회`,

  // additional toast messages
  toast_connect_provider: "프롬프트를 전송하려면 공급자를 연결하세요",
  toast_session_create_failed: "세션 생성에 실패했습니다. 콘솔에서 자세한 내용을 확인하세요.",
  toast_no_favorites: "이 단축키를 사용하려면 즐겨찾기 모델을 추가하세요",
  toast_export_success: (filename) => `세션이 ${filename}으로 내보내졌습니다`,

  // tips
  tip_theme: (n, s) =>
    s
      ? `{highlight}/themes{/highlight} 또는 {highlight}${s}{/highlight}로 ${n}개의 기본 테마를 변경할 수 있습니다`
      : `{highlight}/themes{/highlight}로 ${n}개의 기본 테마를 변경할 수 있습니다`,
  tip_agent_cycle: (s) =>
    s ? `{highlight}${s}{/highlight}를 눌러 Build와 Plan 에이전트를 전환할 수 있습니다` : undefined,
  tip_input_paste: (s) =>
    s ? `{highlight}${s}{/highlight}를 눌러 클립보드의 이미지를 프롬프트에 붙여넣을 수 있습니다` : undefined,
  tip_editor_open: (s) =>
    s
      ? `{highlight}/editor{/highlight} 또는 {highlight}${s}{/highlight}로 외부 에디터에서 메시지를 작성할 수 있습니다`
      : `{highlight}/editor{/highlight}로 외부 에디터에서 메시지를 작성할 수 있습니다`,
  tip_model_list: (s) =>
    s
      ? `{highlight}/models{/highlight} 또는 {highlight}${s}{/highlight}로 사용 가능한 AI 모델을 확인하고 변경할 수 있습니다`
      : `{highlight}/models{/highlight}로 사용 가능한 AI 모델을 확인하고 변경할 수 있습니다`,
  tip_session_new: (s) =>
    s
      ? `{highlight}/new{/highlight} 또는 {highlight}${s}{/highlight}로 새 대화 세션을 시작할 수 있습니다`
      : `{highlight}/new{/highlight}로 새 대화 세션을 시작할 수 있습니다`,
  tip_session_list: (s) =>
    s
      ? `{highlight}/sessions{/highlight} 또는 {highlight}${s}{/highlight}로 이전 대화 목록을 보고 이어갈 수 있습니다`
      : `{highlight}/sessions{/highlight}로 이전 대화 목록을 보고 이어갈 수 있습니다`,
  tip_session_export: (s) =>
    s
      ? `{highlight}/export{/highlight} 또는 {highlight}${s}{/highlight}로 대화를 Markdown으로 저장할 수 있습니다`
      : `{highlight}/export{/highlight}로 대화를 Markdown으로 저장할 수 있습니다`,
  tip_messages_copy: (s) =>
    s ? `{highlight}${s}{/highlight}를 눌러 어시스턴트의 마지막 메시지를 클립보드에 복사할 수 있습니다` : undefined,
  tip_command_list: (s) =>
    s ? `{highlight}${s}{/highlight}를 눌러 모든 사용 가능한 작업과 커맨드를 확인할 수 있습니다` : undefined,
  tip_leader_key: (s) =>
    s
      ? `리더 키는 {highlight}${s}{/highlight}입니다; 다른 키와 조합하여 빠른 동작을 수행하세요`
      : `{highlight}Ctrl+X{/highlight}를 리더 키로 사용합니다; 다른 키와 조합하여 빠른 동작을 수행하세요`,
  tip_model_cycle_recent: (s) =>
    s ? `{highlight}${s}{/highlight}를 눌러 최근 사용한 모델로 빠르게 변경할 수 있습니다` : undefined,
  tip_session_sidebar: (s) =>
    s ? `세션에서 {highlight}${s}{/highlight}를 눌러 사이드바 패널을 표시하거나 숨길 수 있습니다` : undefined,
  tip_messages_page: (up, down) =>
    up && down
      ? `{highlight}${up}{/highlight}/{highlight}${down}{/highlight}으로 대화 내역을 탐색할 수 있습니다`
      : undefined,
  tip_messages_first: (s) =>
    s ? `{highlight}${s}{/highlight}를 눌러 대화의 처음으로 이동할 수 있습니다` : undefined,
  tip_messages_last: (s) =>
    s ? `{highlight}${s}{/highlight}를 눌러 가장 최근 메시지로 이동할 수 있습니다` : undefined,
  tip_input_newline: (s) =>
    s ? `{highlight}${s}{/highlight}를 눌러 프롬프트에 줄바꿈을 추가할 수 있습니다` : undefined,
  tip_input_clear: (s) =>
    s ? `입력 중 {highlight}${s}{/highlight}를 눌러 입력창을 지울 수 있습니다` : undefined,
  tip_session_interrupt: (s) =>
    s ? `{highlight}${s}{/highlight}를 눌러 AI 응답을 중간에 중단할 수 있습니다` : undefined,
  tip_session_nav: (parent, first, prev, next) => {
    const items = [parent, first, prev, next].filter(Boolean)
    return items.length
      ? `${items.map((v) => `{highlight}${v}{/highlight}`).join(" / ")}로 부모 세션과 자식 세션을 탐색할 수 있습니다`
      : undefined
  },
  tip_timeline: (s) =>
    s
      ? `{highlight}/timeline{/highlight} 또는 {highlight}${s}{/highlight}로 특정 메시지로 이동할 수 있습니다`
      : `{highlight}/timeline{/highlight}으로 특정 메시지로 이동할 수 있습니다`,
  tip_toggle_conceal: (s) =>
    s ? `{highlight}${s}{/highlight}를 눌러 메시지의 코드 블록 가시성을 전환할 수 있습니다` : undefined,
  tip_status: (s) =>
    s
      ? `{highlight}/status{/highlight} 또는 {highlight}${s}{/highlight}로 시스템 상태 정보를 볼 수 있습니다`
      : `{highlight}/status{/highlight}로 시스템 상태 정보를 볼 수 있습니다`,
  tip_toggle_username: (s) =>
    s
      ? `커맨드 팔레트({highlight}${s}{/highlight})로 채팅의 사용자명 표시를 전환할 수 있습니다`
      : "커맨드 팔레트로 채팅의 사용자명 표시를 전환할 수 있습니다",
  tip_help: (s) =>
    s
      ? `{highlight}/help{/highlight} 또는 {highlight}${s}{/highlight}를 실행하면 도움말 다이얼로그가 표시됩니다`
      : `{highlight}/help{/highlight}를 실행하면 도움말 다이얼로그가 표시됩니다`,
  tip_session_pin: (s) =>
    s
      ? `세션 목록에서 {highlight}${s}{/highlight}를 눌러 세션을 고정하면 항상 상단에 표시됩니다`
      : undefined,
  tip_session_quickswitch: (s1, s9) =>
    s1 && s9
      ? `고정 및 최근 세션은 {highlight}${s1}{/highlight}~{highlight}${s9}{/highlight}로 바로 전환할 수 있습니다`
      : undefined,
  tip_session_cycle: (fwd, rev) =>
    fwd && rev
      ? `{highlight}${fwd}{/highlight} / {highlight}${rev}{/highlight}를 눌러 최근 방문한 세션을 순환할 수 있습니다`
      : undefined,
  tip_session_toggle_recent: (s) =>
    s
      ? `세션 목록에서 {highlight}${s}{/highlight}를 눌러 세션의 최근 그룹 표시 여부를 전환할 수 있습니다`
      : undefined,
  tip_suspend_term: "{highlight}Ctrl+Z{/highlight}를 눌러 터미널을 일시 중단하고 쉘로 돌아갈 수 있습니다",
  tip_undo_prompt: "{highlight}Ctrl+Z{/highlight}를 눌러 프롬프트 입력을 되돌릴 수 있습니다",
  tips_list: [
    "{highlight}@{/highlight} 뒤에 파일명을 입력하면 퍼지 검색으로 파일을 첨부할 수 있습니다",
    "메시지를 {highlight}!{/highlight}로 시작하면 셸 명령을 직접 실행합니다 (예: {highlight}!ls -la{/highlight})",
    "{highlight}/undo{/highlight}로 마지막 메시지와 파일 변경을 되돌릴 수 있습니다",
    "{highlight}/redo{/highlight}로 취소된 메시지와 파일 변경을 복원할 수 있습니다",
    "{highlight}/share{/highlight}를 실행하면 opencode.ai에 대화 공개 링크를 생성합니다",
    "이미지나 PDF를 터미널에 드래그 앤 드롭하여 컨텍스트로 추가할 수 있습니다",
    "{highlight}/init{/highlight}을 실행하면 코드베이스 기반으로 프로젝트 규칙을 자동 생성합니다",
    "{highlight}/compact{/highlight}를 실행하면 컨텍스트 한도에 가까운 긴 세션을 요약합니다",
    "{highlight}/connect{/highlight}를 실행하여 75개 이상의 LLM 공급자 API 키를 추가할 수 있습니다",
    "{highlight}Plan{/highlight} 에이전트로 전환하면 실제 변경 없이 제안만 받을 수 있습니다",
    "프롬프트에서 {highlight}@agent-name{/highlight}을 사용하여 특수 서브에이전트를 호출할 수 있습니다",
    "서버 설정은 {highlight}opencode.json{/highlight}에, TUI 설정은 {highlight}tui.json{/highlight}에 저장합니다",
    "전역 TUI 설정은 {highlight}~/.config/opencode/tui.json{/highlight}에 저장합니다",
    "설정 파일에 {highlight}$schema{/highlight}를 추가하면 에디터 자동완성이 활성화됩니다",
    "설정의 {highlight}model{/highlight} 항목으로 기본 모델을 지정할 수 있습니다",
    "{highlight}tui.json{/highlight}의 {highlight}keybinds{/highlight} 섹션에서 키 바인딩을 재정의할 수 있습니다",
    "키 바인딩을 {highlight}none{/highlight}으로 설정하면 완전히 비활성화됩니다",
    "설정의 {highlight}mcp{/highlight} 섹션에서 로컬 또는 원격 MCP 서버를 구성할 수 있습니다",
    "purplecode는 인증이 필요한 원격 MCP 서버의 OAuth를 자동으로 처리합니다",
    "{highlight}.opencode/commands/{/highlight}에 {highlight}.md{/highlight} 파일을 추가하여 재사용 가능한 커스텀 프롬프트를 정의할 수 있습니다",
    "커스텀 명령에서 {highlight}$ARGUMENTS{/highlight}, {highlight}$1{/highlight}, {highlight}$2{/highlight}를 동적 입력으로 사용할 수 있습니다",
    "명령에서 백틱을 사용하여 셸 출력을 삽입할 수 있습니다 (예: {highlight}`git status`{/highlight})",
    "{highlight}.opencode/agents/{/highlight}에 {highlight}.md{/highlight} 파일을 추가하여 특수화된 AI 페르소나를 만들 수 있습니다",
    "{highlight}edit{/highlight}, {highlight}bash{/highlight}, {highlight}webfetch{/highlight} 도구에 에이전트별 권한을 설정할 수 있습니다",
    '{highlight}"git *": "allow"{/highlight}와 같은 패턴으로 세부적인 bash 권한을 설정할 수 있습니다',
    '{highlight}"rm -rf *": "deny"{/highlight}로 파괴적인 명령을 차단할 수 있습니다',
    '{highlight}"git push": "ask"{/highlight}로 푸시 전에 승인을 요구하도록 설정할 수 있습니다',
    "purplecode는 prettier, gofmt, ruff 등으로 파일을 자동 포맷합니다",
    '설정에서 {highlight}"formatter": false{/highlight}로 자동 포맷을 비활성화할 수 있습니다',
    "설정에서 파일 확장자별 커스텀 포맷터 명령을 정의할 수 있습니다",
    "purplecode는 지능형 코드 분석을 위해 LSP 서버를 사용합니다",
    "{highlight}.opencode/tools/{/highlight}에 {highlight}.ts{/highlight} 파일을 추가하여 새로운 LLM 도구를 정의할 수 있습니다",
    "도구 정의는 Python, Go 등으로 작성된 스크립트를 호출할 수 있습니다",
    "{highlight}.opencode/plugins/{/highlight}에 {highlight}.ts{/highlight} 파일을 추가하여 이벤트 훅을 만들 수 있습니다",
    "플러그인을 사용하여 세션 완료 시 OS 알림을 보낼 수 있습니다",
    "플러그인을 만들어 purplecode가 민감한 파일을 읽지 못하도록 방지할 수 있습니다",
    "비대화형 스크립팅에는 {highlight}pcode run{/highlight}을 사용합니다",
    "{highlight}pcode --continue{/highlight}로 마지막 세션을 이어서 실행할 수 있습니다",
    "{highlight}pcode run -f file.ts{/highlight}로 CLI에서 파일을 첨부할 수 있습니다",
    "스크립트에서 기계 읽기 가능한 출력을 얻으려면 {highlight}--format json{/highlight}을 사용합니다",
    "헤드리스 API 접근에는 {highlight}pcode serve{/highlight}를 실행합니다",
    "실행 중인 서버에 연결하려면 {highlight}pcode run --attach{/highlight}를 사용합니다",
    "{highlight}pcode upgrade{/highlight}를 실행하여 최신 버전으로 업데이트할 수 있습니다",
    "{highlight}pcode auth list{/highlight}를 실행하여 설정된 공급자를 모두 확인할 수 있습니다",
    "{highlight}pcode agent create{/highlight}를 실행하면 안내에 따라 에이전트를 만들 수 있습니다",
    "GitHub 이슈/PR에서 {highlight}/opencode{/highlight}를 사용하여 AI 작업을 트리거할 수 있습니다",
    "{highlight}pcode github install{/highlight}을 실행하여 GitHub 워크플로를 설정할 수 있습니다",
    "이슈에 {highlight}/opencode fix this{/highlight}를 댓글로 달면 PR이 자동 생성됩니다",
    "PR 코드 라인에 {highlight}/oc{/highlight}를 댓글로 달면 코드 리뷰를 받을 수 있습니다",
    '{highlight}"theme": "system"{/highlight}으로 터미널 색상에 맞는 테마를 사용할 수 있습니다',
    "{highlight}.opencode/themes/{/highlight} 디렉토리에 JSON 테마 파일을 생성할 수 있습니다",
    "테마는 다크/라이트 두 모드의 변형을 지원합니다",
    "커스텀 테마에서 ANSI 색상 0-255를 참조할 수 있습니다",
    "설정에서 {highlight}{env:VAR_NAME}{/highlight} 문법으로 환경 변수를 참조할 수 있습니다",
    "설정값에 {highlight}{file:path}{/highlight}를 사용하여 파일 내용을 포함할 수 있습니다",
    "설정의 {highlight}instructions{/highlight}로 추가 규칙 파일을 로드할 수 있습니다",
    "에이전트 {highlight}temperature{/highlight}를 0.0(집중)에서 1.0(창의적)으로 설정할 수 있습니다",
    "{highlight}steps{/highlight}를 설정하여 요청당 에이전트 반복 횟수를 제한할 수 있습니다",
    '{highlight}"tools": {"bash": false}{/highlight}로 특정 도구를 비활성화할 수 있습니다',
    '{highlight}"mcp_*": false{/highlight}로 MCP 서버의 모든 도구를 비활성화할 수 있습니다',
    "에이전트 설정에서 전역 도구 설정을 재정의할 수 있습니다",
    '{highlight}"share": "auto"{/highlight}로 모든 세션을 자동으로 공유할 수 있습니다',
    '{highlight}"share": "disabled"{/highlight}로 세션 공유를 완전히 차단할 수 있습니다',
    "{highlight}/unshare{/highlight}를 실행하여 세션을 공개 접근에서 제거할 수 있습니다",
    "{highlight}doom_loop{/highlight} 권한은 무한 도구 호출 루프를 방지합니다",
    "{highlight}external_directory{/highlight} 권한은 프로젝트 외부 파일을 보호합니다",
    "{highlight}pcode debug config{/highlight}를 실행하여 설정을 디버깅할 수 있습니다",
    "{highlight}--print-logs{/highlight} 플래그로 stderr에서 상세 로그를 볼 수 있습니다",
    "{highlight}tui.json{/highlight}에서 {highlight}scroll_acceleration{/highlight}을 활성화하면 macOS 스타일 스크롤이 됩니다",
    "{highlight}docker run -it --rm ghcr.io/anomalyco/opencode{/highlight}으로 컨테이너 환경에서 실행할 수 있습니다",
    "{highlight}/connect{/highlight}로 Opencode Zen의 큐레이션된 테스트 모델을 사용할 수 있습니다",
    "팀 공유를 위해 프로젝트의 {highlight}AGENTS.md{/highlight} 파일을 Git에 커밋하세요",
    "{highlight}/review{/highlight}로 커밋되지 않은 변경사항, 브랜치, PR을 검토할 수 있습니다",
    "{highlight}/rename{/highlight}으로 현재 세션의 이름을 변경할 수 있습니다",
    "{highlight}Ctrl+X G{/highlight} 또는 {highlight}/timeline{/highlight}으로 특정 메시지로 이동할 수 있습니다",
    "{highlight}Ctrl+X H{/highlight}를 눌러 메시지의 코드 블록 표시를 토글할 수 있습니다",
    "{highlight}Ctrl+X S{/highlight} 또는 {highlight}/status{/highlight}로 시스템 상태 정보를 확인할 수 있습니다",
    "명령 팔레트({highlight}Ctrl+P{/highlight})에서 채팅의 사용자 이름 표시를 토글할 수 있습니다",
    "{highlight}/help{/highlight} 또는 {highlight}Ctrl+X H{/highlight}로 도움말 다이얼로그를 열 수 있습니다",
    "세션 목록에서 {highlight}Ctrl+F{/highlight}를 눌러 세션을 고정할 수 있습니다",
    "고정된 최근 세션은 {highlight}Ctrl+X 1{/highlight}부터 {highlight}Ctrl+X 9{/highlight}에 바인딩되어 빠르게 전환할 수 있습니다",
    "{highlight}Ctrl+X ]{/highlight} / {highlight}Ctrl+X [{/highlight}를 눌러 최근 방문한 세션을 순환할 수 있습니다",
    "세션 목록에서 {highlight}Ctrl+H{/highlight}를 눌러 세션을 최근 그룹에서 숨기거나 표시할 수 있습니다",
  ],
}
