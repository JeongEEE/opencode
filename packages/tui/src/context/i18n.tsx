import { createSignal } from "solid-js"
import { createSimpleContext } from "./helper"
import { en, type Translations } from "../i18n/en"
import { ko } from "../i18n/ko"
import { useKV } from "./kv"

const locales: Record<string, Translations> = { en, ko }

function detectSystemLanguage(): string {
  const locale = process.env.LANG ?? process.env.LC_ALL ?? process.env.LC_MESSAGES ?? process.env.LANGUAGE ?? ""
  if (locale.toLowerCase().startsWith("ko")) return "ko"
  return "en"
}

export const { use: useI18n, provider: I18nProvider } = createSimpleContext({
  name: "I18n",
  init: (props: { language?: string }) => {
    const kv = useKV()
    const initial = (kv.get("language") as string | undefined) ?? props.language ?? detectSystemLanguage()
    const [lang, setLang] = createSignal(initial)
    return {
      t: () => locales[lang()] ?? en,
      setLanguage: setLang,
      lang,
    }
  },
})
