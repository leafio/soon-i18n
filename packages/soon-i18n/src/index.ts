import {
    AllPaths,
    GetParams,
    GetValue,
    flatTreeKey,
    formatObjKey,
    loadSyncLocales,
    GetLocales,
    SafeLocales
} from "soon-i18n-common"



export const yi = <const T extends Record<string, any>>(locale: T) => {
    const flat_messages = flatTreeKey(locale)
    return ((id: string, ...obj: any) => {
        return formatObjKey(flat_messages, id, ...obj)
    }) as <ID extends AllPaths<T>>(
        id: ID,
        ...arg: GetParams<GetValue<T, ID>>
    ) => string
}

export const createI18n = <Lang extends string,
GlobalLocales  extends Partial<Record<Lang, object | (() => Promise<{ default: object }>)>>>(
        config: {
            lang?: Lang
            fallbacks?: Lang[]
        },
        globalLocales?:GlobalLocales
    ) => {
    let _lang = config.lang ?? ""
    const _fallback_langs = config.fallbacks ?? []
    const global_locales: Partial<Record<Lang, any>> = {}
    loadSyncLocales(globalLocales, global_locales)
    const getLang = () => {
        return _lang
    }
    const setLang = (value: string) => {
        _lang = value
    }
    const tLocales = <Locales extends Partial<Record<Lang, object | (() => Promise<{ default: object }>)>>>(locales?: Locales) => {
        const cur_locales: Partial<Record<Lang, any>> = {}
        loadSyncLocales(locales ?? {}, cur_locales)
        return ((id: string, ...obj: any) => {
            const locale_data = {};
            //合并所有已加载的locale
            [_lang, ..._fallback_langs].reverse().forEach((l) => {
                Object.assign(locale_data, global_locales[l as Lang], cur_locales[l as Lang])
            })

            return formatObjKey(locale_data, id, ...obj)
        }) as <ID extends AllPaths<GetLocales<Locales>> | AllPaths<GetLocales<GlobalLocales>>>(
            id: ID,
            ...arg: GetParams<GetValue<GetLocales<Locales>, ID> | GetValue<GetLocales<GlobalLocales>, ID>>
        ) => string
    }
    return {
        tLocales,
        getLang,
        setLang,
    }
}

export const createI18nSafe=createI18n as <Lang extends string, GlobalLocales extends Partial<Record<Lang, object | (() => Promise<{
    default: object;
}>)>>>(config: {
    lang?: Lang;
    fallbacks?: Lang[];
}, globalLocales?: GlobalLocales) => {
    tLocales: <Locales extends Partial<Record<Lang, object | (() => Promise<{
        default: object;
    }>)>>>(locales?: Locales) => <ID extends AllPaths<SafeLocales<Locales>> | AllPaths<SafeLocales<GlobalLocales>>>(id: ID, ...arg: GetParams<GetValue<SafeLocales<Locales>, ID> | GetValue<SafeLocales<GlobalLocales>, ID>>) => string;
    getLang: () => string | Lang;
    setLang: (value: string) => void;
};
