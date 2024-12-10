import { AllPaths, GetParams, GetValue, SafeLocales, GetLocales } from 'soon-i18n-common';

export declare const createI18n: <Lang extends string, GlobalLocales extends Partial<Record<Lang, object | (() => Promise<{
    default: object;
}>)>>>(config: {
    lang?: Lang;
    fallbacks?: Lang[];
}, globalLocales?: GlobalLocales) => {
    tLocales: <Locales extends Partial<Record<Lang, object | (() => Promise<{
        default: object;
    }>)>>>(locales?: Locales) => <ID extends AllPaths<GetLocales<Locales>> | AllPaths<GetLocales<GlobalLocales>>>(id: ID, ...arg: GetParams<GetValue<GetLocales<Locales>, ID> | GetValue<GetLocales<GlobalLocales>, ID>>) => string;
    lang: [Lang] extends [import('vue').Ref<any, any>] ? import('@vue/shared').IfAny<Lang, import('vue').Ref<Lang, Lang>, Lang> : import('vue').Ref<import('vue').UnwrapRef<Lang>, Lang | import('vue').UnwrapRef<Lang>>;
    fallbacks: import('vue').Ref<import('@vue/reactivity').UnwrapRefSimple<Lang>[], Lang[] | import('@vue/reactivity').UnwrapRefSimple<Lang>[]>;
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
    lang: [Lang] extends [import('vue').Ref<any, any>] ? import('@vue/shared').IfAny<Lang, import('vue').Ref<Lang, Lang>, Lang> : import('vue').Ref<import('vue').UnwrapRef<Lang>, Lang | import('vue').UnwrapRef<Lang>>;
    fallbacks: import('vue').Ref<import('@vue/reactivity').UnwrapRefSimple<Lang>[], Lang[] | import('@vue/reactivity').UnwrapRefSimple<Lang>[]>;
};
