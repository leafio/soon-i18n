import { AllPaths, GetParams, GetValue, GetLocales, SafeLocales } from 'soon-i18n-common';

export declare const createI18n: <Lang extends string, GlobalLocales extends Partial<Record<Lang, object | (() => Promise<{
    default: object;
}>)>>>(config: {
    lang?: Lang;
    fallbacks?: Lang[];
}, globalLocales?: GlobalLocales) => {
    tLocales: <Locales extends Partial<Record<Lang, object | (() => Promise<{
        default: object;
    }>)>>>(locales?: Locales) => import('svelte/store').Readable<(id: AllPaths<GetLocales<Locales>> | AllPaths<GetLocales<GlobalLocales>>, ...arg: GetParams<GetValue<GetLocales<Locales>, AllPaths<GetLocales<Locales>> | AllPaths<GetLocales<GlobalLocales>>> | GetValue<GetLocales<GlobalLocales>, AllPaths<GetLocales<Locales>> | AllPaths<GetLocales<GlobalLocales>>>>) => string>;
    lang: import('svelte/store').Writable<Lang>;
    fallbacks: import('svelte/store').Writable<Lang[]>;
};
export declare const createI18nSafe: <Lang extends string, GlobalLocales extends Partial<Record<Lang, object | (() => Promise<{
    default: object;
}>)>>>(config: {
    lang?: Lang;
    fallbacks?: Lang[];
}, globalLocales?: GlobalLocales) => {
    tLocales: <Locales extends Partial<Record<Lang, object | (() => Promise<{
        default: object;
    }>)>>>(locales?: Locales) => import('svelte/store').Readable<(id: AllPaths<SafeLocales<Locales>> | AllPaths<SafeLocales<GlobalLocales>>, ...arg: GetParams<GetValue<SafeLocales<Locales>, AllPaths<SafeLocales<Locales>> | AllPaths<SafeLocales<GlobalLocales>>> | GetValue<SafeLocales<GlobalLocales>, AllPaths<SafeLocales<Locales>> | AllPaths<SafeLocales<GlobalLocales>>>>) => string>;
    lang: import('svelte/store').Writable<Lang>;
    fallbacks: import('svelte/store').Writable<Lang[]>;
};
