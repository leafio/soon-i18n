import { AllPaths, GetParams, GetValue } from 'soon-i18n-common';

export declare const createI18n: <Lang extends string, GlobalLocale extends Record<string, any> | undefined>(config: {
    lang?: Lang;
    fallbacks?: Lang[];
}, globalLocales?: Partial<Record<Lang, GlobalLocale | (() => Promise<{
    default: GlobalLocale;
}>)>>) => {
    tLocales: <Locale extends Record<string, any>>(locales?: Partial<Record<Lang, Locale | (() => Promise<{
        default: Locale;
    }>)>>) => import('svelte/store').Readable<(id: AllPaths<Locale> | AllPaths<GlobalLocale>, ...arg: GetParams<GetValue<Locale, AllPaths<Locale> | AllPaths<GlobalLocale>> | GetValue<GlobalLocale, AllPaths<Locale> | AllPaths<GlobalLocale>>>) => string>;
    lang: import('svelte/store').Writable<Lang>;
    fallbacks: import('svelte/store').Writable<Lang[]>;
};
