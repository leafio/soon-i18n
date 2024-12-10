import { AllPaths, GetParams, GetValue, formatObjKey, flatTreeKey, loadLocale, loadSyncLocales, SafeLocales, GetLocales } from "soon-i18n-common"
import { ref } from "vue"

export const createI18n = <Lang extends string, GlobalLocales  extends Partial<Record<Lang, object | (() => Promise<{ default: object }>)>>>(
  config: {
    lang?: Lang
    fallbacks?: Lang[]
  },
  globalLocales?: GlobalLocales,
) => {
  const _lang = ref<Lang>(config.lang ?? ("" as Lang))
  const _fallback_langs = ref<Lang[]>(config.fallbacks ?? [])
  const global_locales = ref<any>({})
  const global_locales_loading: Partial<Record<Lang, boolean | undefined>> = {}

  //初始化 同步 locales
  loadSyncLocales(globalLocales, global_locales.value)

  const tLocales = <Locales extends Partial<Record<Lang, object | (() => Promise<{ default: object }>)>>>(locales?:Locales) => {
    const cur_locales = ref<Partial<Record<Lang, any>>>({})
    const cur_locales_loading: Partial<Record<Lang, boolean | undefined>> = {}
    //初始化 同步 locales

    loadSyncLocales(locales, cur_locales.value)

    // watch(
    //     () => _lang.value,
    //     () => {
    //         if (!cur_locales.value[_lang.value])
    //             //加载异步locales
    //             loadLocale(
    //                 (res) => {
    //                     cur_locales.value[_lang.value] = flatTreeKey(res);
    //                 },
    //                 cur_locales_loading,
    //                 _lang.value,
    //                 locales
    //             );
    //     },
    //     { immediate: true }
    // );

    return ((id: string, ...obj: any) => {
      const locale_data = {}
        //合并所有已加载的locale
        ;[_lang.value, ..._fallback_langs.value].reverse().forEach((l) => {
          Object.assign(locale_data, global_locales.value[l], cur_locales.value[l])
        })

      if (!cur_locales.value[_lang.value] || !(id in locale_data)) {
        [_lang.value, ..._fallback_langs.value].some((_f_lang) => {
          if (!cur_locales.value[_f_lang]) {
            loadLocale(
              (res) => {
                cur_locales.value[_f_lang] = flatTreeKey(res)
              },
              cur_locales_loading,
              _f_lang,
              locales,
            )
            return true
          }
          if (!global_locales.value[_f_lang]) {
            loadLocale(
              (res) => {
                global_locales.value[_f_lang] = flatTreeKey(res)
              },
              global_locales_loading,
              _f_lang,
              globalLocales,
            )
            return true
          }
        })
      }

      return formatObjKey({ ...locale_data }, id, ...obj)
    }) as <ID extends AllPaths<GetLocales<Locales>> | AllPaths<GetLocales<GlobalLocales>>>(id: ID, ...arg: GetParams<GetValue<GetLocales<Locales>, ID> | GetValue<GetLocales<GlobalLocales>, ID>>) => string
  }
  return {
    tLocales,
    lang: _lang,
    fallbacks: _fallback_langs,
  }
}


export const createI18nSafe=createI18n  as <Lang extends string, GlobalLocales extends Partial<Record<Lang, object | (() => Promise<{
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
// type xxx<Lang extends string>= Partial<Record<Lang, object | (() => Promise<{ default: object }>)>>

// let x:xxx<'zh'|"en">={}
// const i18n=createI18n({
//   lang:'zh',
//   fallbacks:['zh','en'],

// },{})


// const t=i18n.tLocales({zh:{hh:''},en:{zz:''}})
// t('hh')