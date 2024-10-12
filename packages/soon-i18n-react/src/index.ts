import { useCallback, useEffect, useRef, useState } from "react"
import { AllPaths, GetParams, GetValue, formatObjKey, flatTreeKey, loadLocale, loadSyncLocales } from "soon-i18n-common"

export const createI18n = <Lang extends string, GlobalLocale>(
  config: {
    lang?: Lang
    fallbacks?: Lang[]
  },
  globalLocales: Partial<Record<Lang, GlobalLocale | (() => Promise<{ default: GlobalLocale }>)>> = {},
) => {
  const _fallback_langs = config.fallbacks??[]
  const global_locales_loading: Partial<Record<Lang, boolean | undefined>> = {}
  const global_locales: Partial<Record<Lang, GlobalLocale>> = {}
  //初始化 同步 locales
  loadSyncLocales(globalLocales, global_locales)
  let _lang = config.lang ?? ("" as Lang)

  const callbacks: ((data?: any) => void)[] = []
  const updateKey = () => {
    callbacks.forEach((c) => {
      c()
    })
  }
  const updateLang = (lang: Lang) => {
    _lang = lang
    callbacks.forEach((c) => {
      c(lang);
      c()
    })
  }

  const getLang = () => {
    return _lang
  }

  const useLang = () => {
    const [lang, setLang] = useState(_lang)
    useEffect(() => {
      const callback = (val?: Lang) => {
        if (val) setLang(val)
      }
      callbacks.push(callback)
      return () => {
        const index = callbacks.findIndex((c) => c === callback)
        callbacks.splice(index, 1)
      }
    }, [])
    return [lang, updateLang] as const
  }
  const useKey = () => {
    // const [lang, setLang] = useState(_lang)
    const [key, setKey] = useState(1)
    useEffect(() => {
      const callback = (val?: Lang) => {
        if (!val) {
          setKey((pre) => pre + 1)
        }
      }
      callbacks.push(callback)
      return () => {
        const index = callbacks.findIndex((c) => c === callback)
        callbacks.splice(index, 1)
      }
    }, [])
    return [key, setKey] as const
  }

  const useLocales = <Locale extends Record<string, any>>(
    locales: Partial<Record<Lang, Locale | (() => Promise<{ default: Locale }>)>> = {},
  ) => {
    const cur_locales_ref = useRef<Partial<Record<Lang, GlobalLocale>>>(loadSyncLocales(locales))
    const cur_locales_loading = useRef<Partial<Record<string, boolean | undefined>>>({})
    const [key, setKey] = useKey()


    // useEffect(() => {
    //   loadLocale((res) => {
    //     global_locales[lang] = flatTreeKey(res) as N;
    //     updateKey();
    //   }, global_locales_loading, lang, globalLocales)

    //   loadLocale((res) => {
    //     set_cur_locales({ ...cur_locales, [lang]: flatTreeKey(res) });
    //   }, cur_locales_loading.current, lang, locales)
    // }, [lang]);

    return useCallback(
      ((id: string, ...obj: any) => {
        const locale_data = {}
          //合并所有已加载的locale
          ;[_lang, ..._fallback_langs].reverse().forEach((l) => {
            Object.assign(locale_data, global_locales[l], cur_locales_ref.current[l])
          })

        if (!cur_locales_ref.current[_lang] || !(id in locale_data)) {
          ;[_lang, ..._fallback_langs].some((_f_lang) => {
            if (!cur_locales_ref.current[_f_lang]) {
              loadLocale(
                (res) => {
                  if (!cur_locales_ref.current[_f_lang]) {
                    cur_locales_ref.current = {
                      ...cur_locales_ref.current,
                      [_f_lang]: flatTreeKey(res),
                    }
                    setKey((pre) => pre + 1)
                  }
                },
                cur_locales_loading.current,
                _f_lang,
                locales,
              )
              return true
            }
            if (!global_locales[_f_lang]) {
              loadLocale(
                (res) => {
                  global_locales[_f_lang] = flatTreeKey(res) as GlobalLocale
                  updateKey()
                },
                global_locales_loading,
                _f_lang,
                globalLocales,
              )
              return true
            }
          })
        }
        return formatObjKey(locale_data, id, ...obj)
      }) as <ID extends AllPaths<Locale> | AllPaths<GlobalLocale>>(
        id: ID,
        ...arg: GetParams<GetValue<Locale, ID> | GetValue<GlobalLocale, ID>>
      ) => string,
      [key],
    )
  }
  const tLocales = <Locale extends Record<string, any>>(locales?: Record<Lang, Locale>) => {
    const cur_locales: Partial<Record<Lang, any>> = {}
    loadSyncLocales(locales, cur_locales)
    return ((id: string, ...obj: any) => {
      const locale_data = {}
        //合并所有已加载的locale
        ;[_lang, ..._fallback_langs].reverse().forEach((l) => {
          Object.assign(locale_data, global_locales[l], cur_locales[l])
        })

      return formatObjKey(locale_data, id, ...obj)
    }) as <ID extends AllPaths<Locale> | AllPaths<GlobalLocale>>(
      id: ID,
      ...arg: GetParams<GetValue<Locale, ID> | GetValue<GlobalLocale, ID>>
    ) => string
  }
  return {
    useLocales,
    useLang,
    tLocales,
    getLang,
    setLang: updateLang,
  }
}
