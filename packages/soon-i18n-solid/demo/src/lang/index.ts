import { createI18n } from "soon-i18n-solid"

const global_locales = {
    zh: { g_welcome: '全局：欢迎 {name}' },
    en: { g_welcome: 'Global: Welcome {name}' },
} as const
type Lang = 'zh' | 'en'

export const { tLocales, lang, setLang, } = createI18n(
    { lang: "zh" as Lang, fallbacks: ["en"] },
    global_locales
)

export const showToast = () => {
    const t = tLocales({ zh: { 'tip': "哈哈，一条中文提醒！！！" }, en: { 'tip': "Aha, an English tip" } })
    alert(t('tip'))

}