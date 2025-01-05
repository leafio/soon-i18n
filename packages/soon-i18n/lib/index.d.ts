import { AllPaths, GetParams, GetValue, GetLocales, SafeLocales, yi } from 'soon-i18n-common';

declare const createI18n: <Lang extends string, GlobalLocales extends Partial<Record<Lang, object | (() => Promise<{
    default: object;
}>)>>>(config: {
    lang?: Lang;
    fallbacks?: Lang[];
}, globalLocales?: GlobalLocales) => {
    tLocales: <Locales extends Partial<Record<Lang, object | (() => Promise<{
        default: object;
    }>)>>>(locales?: Locales) => <ID extends AllPaths<GetLocales<Locales>> | AllPaths<GetLocales<GlobalLocales>>>(id: ID, ...arg: GetParams<GetValue<GetLocales<Locales>, ID> | GetValue<GetLocales<GlobalLocales>, ID>>) => string;
    getLang: () => string | Lang;
    setLang: (value: string) => void;
};
declare const createI18nSafe: <Lang extends string, GlobalLocales extends Partial<Record<Lang, object | (() => Promise<{
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
export { yi, createI18n, createI18nSafe };
