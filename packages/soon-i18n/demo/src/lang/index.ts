import { createI18n } from "soon-i18n";

const en_global = {
    g_welcome: 'Global: Welcome {name}'
} as const
const zh_global = {
    g_welcome: '全局：欢迎 {name}'
} as const

const global_locales = {
    zh: zh_global,
    en: en_global,
}
type Lang='zh' | 'en'
export const {
    tLocales,
    getLang,
    setLang,
} = createI18n({ lang: "zh" as Lang, fallbacks: ["en"] }, global_locales);

import mitt from 'mitt'
export const emitter = mitt()
export const showToast = () => {
    const t = tLocales({ zh: { 'tip': "哈哈，一条中文提醒！！！" }, en: { 'tip': "Aha, an English tip" } })
    alert(t('tip'))

}

