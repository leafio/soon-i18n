import {
  AllPaths,
  GetParams,
  GetValue,
  formatObjKey,
  flatTreeKey,
  loadLocale,
  loadSyncLocales,
} from "soon-i18n-common";
import { derived, writable } from "svelte/store";

export const createI18n = <
  Lang extends string,
  GlobalLocale extends Record<string, any> | undefined
>(
  config: {
    lang?: Lang;
    fallbacks: Lang[];
  },
  globalLocales: Partial<Record<Lang, GlobalLocale | (() => Promise<{ default: GlobalLocale }>)>> = {}
) => {
  const _lang = writable<Lang>(config.lang ?? ("" as Lang));
  const _fallback_langs = writable<Lang[]>(config.fallbacks);
  const global_locales = writable<any>(loadSyncLocales(globalLocales));
  const global_locales_loading: Partial<Record<Lang, boolean | undefined>> =
    {};

  const tLocales = <Locale extends Record<string, any>>(
    locales: Partial<Record<Lang, Locale | (() => Promise<{ default: Locale }>)>> = {}
  ) => {
    const cur_locales = writable<Partial<Record<Lang, any>>>(
      loadSyncLocales(locales)
    );
    const cur_locales_loading: Partial<Record<Lang, boolean | undefined>> =
      {};

    return derived(
      [_lang, _fallback_langs, global_locales, cur_locales],
      ([$lang, $fallback_langs, $global_locales, $cur_locales]) => {
        return ((id: string, ...obj: any) => {
          const locale_data = {};
          //合并所有已加载的locale
          [$lang, ...$fallback_langs].reverse().forEach((l) => {
            Object.assign(locale_data, $global_locales[l], $cur_locales[l]);
          });

          if (!(id in locale_data)) {
            [$lang, ...$fallback_langs].some((_f_lang) => {
              if (!$cur_locales[_f_lang]) {
                loadLocale(
                  (res) => {
                    // cur_locales[_f_lang] = flatTreeKey(res);
                    cur_locales.update((c) => ({
                      ...c,
                      [_f_lang]: flatTreeKey(res),
                    }));
                  },
                  cur_locales_loading,
                  _f_lang,
                  locales
                );
                return true;
              }
              if (!$global_locales[_f_lang]) {
                loadLocale(
                  (res) => {
                    // global_locales[_f_lang] = flatTreeKey(res);
                    global_locales.update((c) => ({
                      ...c,
                      [_f_lang]: flatTreeKey(res),
                    }));
                  },
                  global_locales_loading,
                  _f_lang,
                  globalLocales
                );
                return true;
              }
            });
          }

          return formatObjKey({ ...locale_data }, id, ...obj);
        }) as <ID extends AllPaths<Locale> | AllPaths<GlobalLocale>>(
          id: ID,
          ...arg: GetParams<GetValue<Locale, ID> | GetValue<GlobalLocale, ID>>
        ) => string;
      }
    );
  };
  return {
    tLocales,
    lang: _lang,
    fallbacks: _fallback_langs,
  };
};
