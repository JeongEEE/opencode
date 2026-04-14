import { createSignal } from "solid-js"
import { createSimpleContext } from "./helper"
import { en, type Translations } from "@tui/i18n/en"
import { ko } from "@tui/i18n/ko"
import { useKV } from "./kv"

const locales: Record<string, Translations> = { en, ko }

export const { use: useI18n, provider: I18nProvider } = createSimpleContext({
  name: "I18n",
  init: (props: { language?: string }) => {
    const kv = useKV()
    const initial = (kv.get("language") as string | undefined) ?? props.language ?? "en"
    const [lang, setLang] = createSignal(initial)
    return {
      t: () => locales[lang()] ?? en,
      setLanguage: setLang,
      lang,
    }
  },
})
