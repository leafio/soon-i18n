import { useState as g, useEffect as d, useRef as p, useCallback as T } from "react";
import { loadSyncLocales as m, loadLocale as I, flatTreeKey as _, formatObjKey as j } from "soon-i18n-common";
import { yi as J } from "soon-i18n-common";
const q = (h, x) => {
  const b = h.fallbacks ?? [], G = {}, u = {};
  m(x, u);
  let o = h.lang ?? "";
  const a = [], K = () => {
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
      const e = p(m(t)), s = p({}), [r, c] = v(), [f, C] = g(0), y = p({ updateGlobal: !1, updateLocal: !1 }), l = p(!1);
      return d(() => (l.current = !0, y.current.updateGlobal ? K() : c((i) => i + 1), () => {
        l.current = !1;
      }), []), d(() => {
        l.current && C(r);
      }, [r]), T(
        (i, ...M) => {
          const L = {};
          return [o, ...b].reverse().forEach((n) => {
            Object.assign(L, u[n], e.current[n]);
          }), (!e.current[o] || !(i in L)) && [o, ...b].some((n) => {
            if (!e.current[n])
              return I(
                (k) => {
                  e.current[n] || (e.current = {
                    ...e.current,
                    [n]: _(k)
                  }, l.current ? c((R) => R + 1) : y.current.updateLocal = !0);
                },
                s.current,
                n,
                t
              ), !0;
            if (!u[n])
              return I(
                (k) => {
                  u[n] = _(k), l.current ? K() : y.current.updateGlobal = !0;
                },
                G,
                n,
                x
              ), !0;
          }), j(L, i, ...M);
        },
        [f]
      );
    },
    useLang: S,
    tLocales: (t) => {
      const e = {};
      return m(t, e), (s, ...r) => {
        const c = {};
        return [o, ...b].reverse().forEach((f) => {
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
  D as createI18nSafe,
  J as yi
};
