import { AllPaths, GetParams, GetValue, GetLocales, SafeLocales } from 'soon-i18n-common';

export declare const createI18n: <Lang extends string, GlobalLocales extends Partial<Record<Lang, object | (() => Promise<{
    default: object;
}>)>>>(config: {
    lang?: Lang;
    fallbacks?: Lang[];
}, globalLocales?: GlobalLocales) => {
    tLocales: <Locales extends Partial<Record<Lang, object | (() => Promise<{
        default: object;
    }>)>>>(locales?: Locales) => <ID extends AllPaths<GetLocales<Locales>> | AllPaths<GetLocales<GlobalLocales>>>(id: ID, ...arg: GetParams<GetValue<GetLocales<Locales>, ID> | GetValue<GetLocales<GlobalLocales>, ID>>) => string;
    lang: import('solid-js').Accessor<Lang>;
    setLang: import('solid-js').Setter<Lang>;
};
export declare const createI18nSafe: <Lang extends string, GlobalLocales extends Partial<Record<Lang, object | (() => Promise<{
    default: object;
}>)>>>(config: {
    lang?: Lang;
    fallbacks?: Lang[];
}, globalLocales?: GlobalLocales) => {
    tLocales: <Locales extends Partial<Record<Lang, object | (() => Promise<{
        default: object;
    }>)>>>(locales?: Locales) => <ID extends AllPaths<SafeLocales<Locales>> | AllPaths<SafeLocales<GlobalLocales>>>(id: ID, ...arg: GetParams<GetValue<SafeLocales<Locales>, ID> | GetValue<SafeLocales<GlobalLocales>, ID>>) => string;
    lang: import('solid-js').Accessor<Lang>;
    setLang: import('solid-js').Setter<Lang>;
};