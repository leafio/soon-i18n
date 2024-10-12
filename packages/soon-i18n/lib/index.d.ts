import { AllPaths, GetParams, GetValue } from 'soon-i18n-common';

export declare const yi: <const T extends Record<string, any>>(locale: T) => <ID extends AllPaths<T>>(id: ID, ...arg: GetParams<GetValue<T, ID>>) => string;
export declare const createI18n: <Lang extends string, GlobalLocale extends Record<string, any> | undefined>(config: {
    lang?: Lang;
    fallbacks?: Lang[];
}, globalLocales?: Partial<Record<Lang, GlobalLocale>>) => {
    tLocales: <Locale extends Record<string, any>>(locales?: Partial<Record<Lang, Locale>>) => <ID extends AllPaths<Locale> | AllPaths<GlobalLocale>>(id: ID, ...arg: GetParams<GetValue<Locale, ID> | GetValue<GlobalLocale, ID>>) => string;
    getLang: () => string | Lang;
    setLang: (value: string) => void;
};
