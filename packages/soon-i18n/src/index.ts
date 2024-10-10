import {
    AllPaths,
    GetParams,
    GetValue,
    flatTreeKey,
    formatObjKey,
    loadSyncLocales,
} from "soon-i18n-common";

export const yi = <const T extends Record<string, any>>(locale: T) => {
    const flat_messages = flatTreeKey(locale);
    return ((id: string, ...obj: any) => {
        return formatObjKey(flat_messages, id, ...obj);
    }) as <ID extends AllPaths<T>>(
        id: ID,
        ...arg: GetParams<GetValue<T, ID>>
    ) => string;
};

export const createI18n = <Lang extends string,
    GlobalLocale extends Record<string, any> | undefined>(
        config: {
            lang?: Lang;
            fallbacks: Lang[];
        },
        globalLocales: Partial<Record<Lang, GlobalLocale>> = {}
    ) => {
    let _lang = config.lang ?? "";
    const _fallback_langs = config.fallbacks;
    const global_locales: Partial<Record<Lang, any>> = {};
    loadSyncLocales(globalLocales, global_locales);
    const getLang = () => {
        return _lang;
    };
    const setLang = (value: string) => {
        _lang = value;
    };
    const tLocales = <Locale extends Record<string, any>>(locales: Partial<Record<Lang, Locale>> = {}) => {
        const cur_locales: Partial<Record<Lang, any>> = {};
        loadSyncLocales(locales, cur_locales);
        return ((id: string, ...obj: any) => {
            const locale_data= {};
            //合并所有已加载的locale
            [_lang, ..._fallback_langs].reverse().forEach((l) => {
                Object.assign(locale_data, global_locales[l as Lang], cur_locales[l as Lang]);
            });

            return formatObjKey(locale_data, id, ...obj);
        }) as <ID extends AllPaths<Locale> | AllPaths<GlobalLocale>>(
            id: ID,
            ...arg: GetParams<GetValue<Locale, ID> | GetValue<GlobalLocale, ID>>
        ) => string;
    };
    return {
        tLocales,
        getLang,
        setLang,
    };
};
