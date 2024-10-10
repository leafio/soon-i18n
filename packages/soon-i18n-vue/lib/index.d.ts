import { AllPaths, GetParams, GetValue } from 'soon-i18n-common';

export declare const createI18n: <Lang extends string, GlobalLocale extends Record<string, any> | undefined>(config: {
    lang?: Lang;
    fallbacks: Lang[];
}, globalLocales?: Partial<Record<Lang, GlobalLocale | (() => Promise<{
    default: GlobalLocale;
}>)>>) => {
    tLocales: <Locale extends Record<string, any>>(locales?: Partial<Record<Lang, Locale | (() => Promise<{
        default: Locale;
    }>)>>) => <ID extends AllPaths<Locale> | AllPaths<GlobalLocale>>(id: ID, ...arg: GetParams<GetValue<Locale, ID> | GetValue<GlobalLocale, ID>>) => string;
    lang: [Lang] extends [import('vue').Ref<any, any>] ? import('@vue/shared').IfAny<Lang, import('vue').Ref<Lang, Lang>, Lang> : import('vue').Ref<import('vue').UnwrapRef<Lang>, Lang | import('vue').UnwrapRef<Lang>>;
    fallbacks: import('vue').Ref<import('@vue/reactivity').UnwrapRefSimple<Lang>[], Lang[] | import('@vue/reactivity').UnwrapRefSimple<Lang>[]>;
};
