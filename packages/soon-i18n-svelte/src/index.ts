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
  yi,
} from "soon-i18n-common";
import { derived, Readable, Writable, writable } from "svelte/store";

 const createI18n = <
  Lang extends string,
  GlobalLocales  extends Partial<Record<Lang, object | (() => Promise<{ default: object }>)>>
>(
  config: {
    lang?: Lang;
    fallbacks?: Lang[];
  },
  globalLocales?: GlobalLocales 
) => {
  const _lang = writable<Lang>(config.lang ?? ("" as Lang));
  const _fallback_langs = writable<Lang[]>(config.fallbacks ?? []);
  const global_locales = writable<any>(loadSyncLocales(globalLocales));
  const global_locales_loading: Partial<Record<Lang, boolean | undefined>> =
    {};

  const tLocales = <Locales extends Partial<Record<Lang, object | (() => Promise<{ default: object }>)>>>(
    locales?:Locales
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

          if (!$cur_locales[$lang] || !(id in locale_data)) {
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
        }) 
      }
    )as Readable<<ID extends AllPaths<GetLocales<Locales>> | AllPaths<GetLocales<GlobalLocales>>>(
      id: ID,
      ...arg: GetParams<GetValue<GetLocales<Locales>, ID> | GetValue<GetLocales<GlobalLocales>, ID>>
    ) => string>
  };
  return {
    tLocales,
    lang: _lang,
    fallbacks: _fallback_langs,
  };
};


 const createI18nSafe=createI18n as <Lang extends string, GlobalLocales extends Partial<Record<Lang, object | (() => Promise<{
  default: object;
}>)>>>(config: {
  lang?: Lang;
  fallbacks?: Lang[];
}, globalLocales?: GlobalLocales) => {
  tLocales: <Locales extends Partial<Record<Lang, object | (() => Promise<{
      default: object;
  }>)>>>(locales?: Locales) => Readable<(<ID extends AllPaths<SafeLocales<Locales>> | AllPaths<SafeLocales<GlobalLocales>>>(id: ID, ...arg: GetParams<GetValue<SafeLocales<Locales>, ID> | GetValue<SafeLocales<GlobalLocales>, ID>>) => string)>;
  lang: Writable<Lang>;
  fallbacks: Writable<Lang[]>;
};

export { yi, createI18n, createI18nSafe }