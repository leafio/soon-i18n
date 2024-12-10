import { createSignal } from "solid-js";
import {
  AllPaths,
  GetParams,
  GetValue,
  formatObjKey,
  flatTreeKey,
  loadLocale,
  loadSyncLocales,
  GetLocales,
  SafeLocales,
} from "soon-i18n-common";

export const createI18n = <Lang extends string,
GlobalLocales  extends Partial<Record<Lang, object | (() => Promise<{ default: object }>)>>>(
    config: {
      lang?: Lang;
      fallbacks?: Lang[];
    },
    globalLocales?: GlobalLocales
  ) => {
  const [_lang, set_lang] = createSignal<Lang>(config.lang ?? ("" as Lang));
  const [_fallback_langs] = createSignal<Lang[]>(config.fallbacks??[]);
  const [global_locales, set_global_locales] = createSignal<any>(loadSyncLocales(globalLocales), { equals: false });
  const global_locales_loading: Partial<
    Record<Lang, boolean | undefined>
  > = {};

  const tLocales = <Locales extends Partial<Record<Lang, object | (() => Promise<{ default: object }>)>>>(
    locales?:Locales
  ) => {

    const [cur_locales, set_cur_locales] = createSignal<any>(loadSyncLocales(locales), { equals: false });
    const cur_locales_loading: Partial<
      Record<string, boolean | undefined>
    > = {};
    // createEffect(
    //   on(_lang, () => {
    //     console.log('lang-change', _lang())
    //     loadLocale(global_locales_loading, _lang(), globalLocales).then((res) => {
    //       console.log('set--')
    //       set_global_locales((g: any) => {
    //         g[_lang()] = flatTreeKey(res);
    //         return g
    //       });
    //     });
    //     loadLocale(cur_locales_loading, _lang(), locales).then((res) => {
    //       set_cur_locales((c: any) => {
    //         c[_lang()] = flatTreeKey(res);
    //         return c
    //       });
    //     });
    //   })
    // );


    return ((id: string, ...obj: any) => {

      const locale_data = {};
      //合并所有已加载的locale
      [_lang(), ..._fallback_langs()].reverse().forEach((l) => {
        Object.assign(
          locale_data,
          global_locales()[l],
          cur_locales()[l]
        );
      });


      if (!cur_locales()[_lang()] ||!(id in locale_data)) {
        [_lang(), ..._fallback_langs()].some((_f_lang) => {
          if (!cur_locales()[_f_lang]) {
            loadLocale(
              (res) => {
                set_cur_locales((c: any) => {
                  c[_f_lang] = flatTreeKey(res);
                  return c
                });

              },
              cur_locales_loading,
              _f_lang,
              locales
            );
            return true;
          }
          if (!global_locales()[_f_lang]) {
            loadLocale(
              (res) => {
                set_global_locales((c: any) => {
                  c[_f_lang] = flatTreeKey(res);
                  return c
                });
              },
              global_locales_loading,
              _f_lang,
              globalLocales
            );
            return true;
          }
        });
      }

      return formatObjKey(locale_data, id, ...obj);
    }) as <ID extends AllPaths<GetLocales<Locales>> | AllPaths<GetLocales<GlobalLocales>>>(
      id: ID,
      ...arg: GetParams<GetValue<GetLocales<Locales>, ID> | GetValue<GetLocales<GlobalLocales>, ID>>
    ) => string;
  };
  return {
    tLocales,
    lang: _lang,
    setLang: set_lang,
  };
};

export const createI18nSafe=createI18n as <Lang extends string, GlobalLocales extends Partial<Record<Lang, object | (() => Promise<{
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
