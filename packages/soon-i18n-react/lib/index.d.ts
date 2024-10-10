import { AllPaths, GetParams, GetValue } from 'soon-i18n-common';

export declare const createI18n: <Lang extends string, GlobalLocale>(config: {
    lang?: Lang;
    fallbacks: Lang[];
}, globalLocales?: Partial<Record<Lang, GlobalLocale | (() => Promise<{
    default: GlobalLocale;
}>)>>) => {
    useLocales: <Locale extends Record<string, any>>(locales?: Partial<Record<Lang, Locale | (() => Promise<{
        default: Locale;
    }>)>>) => <ID extends AllPaths<Locale> | AllPaths<GlobalLocale>>(id: ID, ...arg: GetParams<GetValue<Locale, ID> | GetValue<GlobalLocale, ID>>) => string;
    useSoonI18n: () => readonly [Lang, (lang: Lang) => void, number];
    tLocales: <P extends Record<string, any>>(locales?: Record<string, P>) => <ID extends AllPaths<P> | AllPaths<GlobalLocale>>(id: ID, ...arg: GetParams<GetValue<P, ID> | GetValue<GlobalLocale, ID>>) => string;
    getLang: () => Lang;
    setLang: (lang: Lang) => void;
};
