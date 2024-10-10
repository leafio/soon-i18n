/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import {
  AllPaths,
  GetParams,
  GetValue,
  formatObjKey,
  flatTreeKey,
  loadLocale,
  loadSyncLocales,
} from "soon-i18n-common";

export const createI18n = <Lang extends string, GlobalLocale>(
  config: {
    lang?: Lang;
    fallbacks: Lang[];
  },
  globalLocales: Partial<Record<Lang, GlobalLocale | (() => Promise<{ default: GlobalLocale }>)>> = {}
) => {
  const _fallback_langs = config.fallbacks;
  const global_locales_loading: Partial<Record<Lang, boolean | undefined>> =
    {};
  const global_locales: Partial<Record<Lang, GlobalLocale>> = {};
  //初始化 同步 locales
  loadSyncLocales(globalLocales, global_locales);
  let _lang = config.lang ?? ("" as Lang);
  let _key = 0;
  const callbacks: ((data: any) => void)[] = [];
  const updateKey = () => {
    _key++;
    callbacks.forEach((c) => {
      c(_key);
    });
  };
  const updateLang = (lang: Lang) => {
    _lang = lang;
    callbacks.forEach((c) => {
      c(lang);
    });
  };

  const getLang = () => {
    return _lang;
  }
  const useSoonI18n = () => {
    const [lang, setLang] = useState(_lang);
    const [key, setKey] = useState(_key);
    useEffect(() => {
      const callback = (val: number | Lang) => {
        if (typeof val == "number") {
          setKey(val);
        } else {
          setLang(val);
        }
      };
      callbacks.push(callback);
      return () => {
        const index = callbacks.findIndex((c) => c === callback);
        callbacks.splice(index, 1);
      };
    }, []);
    return [lang, updateLang, key] as const;
  };

  const useLocales = <Locale extends Record<string, any>>(
    locales: Partial<Record<Lang, Locale | (() => Promise<{ default: Locale }>)>> = {}
  ) => {
    const [cur_locales, set_cur_locales] = useState<Partial<Record<Lang, GlobalLocale>>>(
      () => {
        const _cur_locales = {};
        loadSyncLocales(locales, _cur_locales);
        return _cur_locales;
      }
    );
    const cur_locales_loading = useRef<
      Partial<Record<string, boolean | undefined>>
    >({});
    useSoonI18n();

    // useEffect(() => {
    //   loadLocale((res) => {
    //     global_locales[lang] = flatTreeKey(res) as N;
    //     updateKey();
    //   }, global_locales_loading, lang, globalLocales)

    //   loadLocale((res) => {
    //     set_cur_locales({ ...cur_locales, [lang]: flatTreeKey(res) });
    //   }, cur_locales_loading.current, lang, locales)
    // }, [lang]);

    return ((id: string, ...obj: any) => {
      const locale_data = {};
      //合并所有已加载的locale
      [_lang, ..._fallback_langs].reverse().forEach((l) => {
        Object.assign(locale_data, global_locales[l], cur_locales[l]);
      });

      if (!(id in locale_data)) {
        [_lang, ..._fallback_langs].some((_f_lang) => {
          if (!cur_locales[_f_lang]) {
            loadLocale(
              (res) => {
                set_cur_locales({
                  ...cur_locales,
                  [_f_lang]: flatTreeKey(res),
                });
              },
              cur_locales_loading,
              _f_lang,
              locales
            );
            return true;
          }
          if (!global_locales[_f_lang]) {
            loadLocale(
              (res) => {
                global_locales[_f_lang] = flatTreeKey(res) as GlobalLocale;
                updateKey();
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
  const tLocales = <P extends Record<string, any>>(
    locales?: Record<string, P>
  ) => {
    const cur_locales: Record<string, any> = {};
    loadSyncLocales(locales, cur_locales);
    return ((id: string, ...obj: any) => {
      const locale_data = {};
      //合并所有已加载的locale
      [_lang, ..._fallback_langs].reverse().forEach((l) => {
        Object.assign(locale_data, global_locales[l], cur_locales[l]);
      });

      return formatObjKey(locale_data, id, ...obj);
    }) as <ID extends AllPaths<P> | AllPaths<GlobalLocale>>(
      id: ID,
      ...arg: GetParams<GetValue<P, ID> | GetValue<GlobalLocale, ID>>
    ) => string;
  };
  return {
    useLocales,
    useSoonI18n,
    tLocales,
    getLang,
    setLang: updateLang
  };
};
