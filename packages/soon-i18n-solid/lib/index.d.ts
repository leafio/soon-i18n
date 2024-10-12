import { AllPaths, GetParams, GetValue } from 'soon-i18n-common';

export declare const createI18n: <Lang extends string, GlobalLocale extends Record<string, any> | undefined>(config: {
    lang?: Lang;
    fallbacks?: Lang[];
}, globalLocales?: Partial<Record<Lang, GlobalLocale | (() => Promise<{
    default: GlobalLocale;
}>)>>) => {
    tLocales: <Locale extends Record<string, any>>(locales?: Partial<Record<Lang, Locale | (() => Promise<{
        default: Locale;
    }>)>>) => <ID extends AllPaths<Locale> | AllPaths<GlobalLocale>>(id: ID, ...arg: GetParams<GetValue<Locale, ID> | GetValue<GlobalLocale, ID>>) => string;
    lang: import('solid-js').Accessor<Lang>;
    setLang: import('solid-js').Setter<Lang>;
};
