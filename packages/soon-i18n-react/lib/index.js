import { useState as g, useEffect as d, useRef as b, useCallback as T } from "react";
import { loadSyncLocales as h, loadLocale as I, flatTreeKey as _, formatObjKey as j } from "soon-i18n-common";
const q = (m, K) => {
  const p = m.fallbacks ?? [], G = {}, u = {};
  h(K, u);
  let o = m.lang ?? "";
  const a = [], x = () => {
    a.forEach((t) => {
      t();
    });
  }, E = (t) => {
    o = t, a.forEach((e) => {
      e(t), e();
    });
  }, O = () => o, S = () => {
    const [t, e] = g(o);
    return d(() => {
      const s = (r) => {
        r && e(r);
      };
      return a.push(s), () => {
        const r = a.findIndex((c) => c === s);
        a.splice(r, 1);
      };
    }, []), [t, E];
  }, v = () => {
    const [t, e] = g(1);
    return d(() => {
      const s = (r) => {
        r || e((c) => c + 1);
      };
      return a.push(s), () => {
        const r = a.findIndex((c) => c === s);
        a.splice(r, 1);
      };
    }, []), [t, e];
  };
  return {
    useLocales: (t) => {
      const e = b(h(t)), s = b({}), [r, c] = v(), [f, C] = g(0), L = b({ updateGlobal: !1, updateLocal: !1 }), l = b(!1);
      return d(() => (l.current = !0, L.current.updateGlobal ? x() : c((i) => i + 1), () => {
        l.current = !1;
      }), []), d(() => {
        l.current && C(r);
      }, [r]), T(
        (i, ...M) => {
          const k = {};
          return [o, ...p].reverse().forEach((n) => {
            Object.assign(k, u[n], e.current[n]);
          }), (!e.current[o] || !(i in k)) && [o, ...p].some((n) => {
            if (!e.current[n])
              return I(
                (y) => {
                  e.current[n] || (e.current = {
                    ...e.current,
                    [n]: _(y)
                  }, l.current ? c((R) => R + 1) : L.current.updateLocal = !0);
                },
                s.current,
                n,
                t
              ), !0;
            if (!u[n])
              return I(
                (y) => {
                  u[n] = _(y), l.current ? x() : L.current.updateGlobal = !0;
                },
                G,
                n,
                K
              ), !0;
          }), j(k, i, ...M);
        },
        [f]
      );
    },
    useLang: S,
    tLocales: (t) => {
      const e = {};
      return h(t, e), (s, ...r) => {
        const c = {};
        return [o, ...p].reverse().forEach((f) => {
          Object.assign(c, u[f], e[f]);
        }), j(c, s, ...r);
      };
    },
    getLang: O,
    setLang: E
  };
}, D = q;
export {
  q as createI18n,
  D as createI18nSafe
};
