import { createSignal } from "solid-js";
import {
  AllPaths,
  GetParams,
  GetValue,
  formatObjKey,
  flatTreeKey,
  loadLocale,
  loadSyncLocales,
} from "soon-i18n-common";

export const createI18n = <Lang extends string,
  GlobalLocale extends Record<string, any> | undefined>(
    config: {
      lang?: Lang;
      fallbacks: Lang[];
    },
    globalLocales: Partial<Record<Lang, GlobalLocale | (() => Promise<{ default: GlobalLocale }>)>>={}
  ) => {
  const [_lang, set_lang] = createSignal<Lang>(config.lang ?? ("" as Lang));
  const [_fallback_langs] = createSignal<Lang[]>(config.fallbacks);
  const [global_locales, set_global_locales] = createSignal<any>(loadSyncLocales(globalLocales), { equals: false });
  const global_locales_loading: Partial<
    Record<Lang, boolean | undefined>
  > = {};

  const tLocales = <Locale extends Record<string, any>>(
    locales: Partial<Record<Lang, Locale | (() => Promise<{ default: Locale }>)>>={}
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


      if (!(id in locale_data)) {
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
    }) as <ID extends AllPaths<Locale> | AllPaths<GlobalLocale>>(
      id: ID,
      ...arg: GetParams<GetValue<Locale, ID> | GetValue<GlobalLocale, ID>>
    ) => string;
  };
  return {
    tLocales,
    lang: _lang,
    setLang: set_lang,
  };
};
