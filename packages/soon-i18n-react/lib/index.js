import { useState as k, useEffect as g, useRef as h, useCallback as R } from "react";
import { loadSyncLocales as b, loadLocale as m, flatTreeKey as K, formatObjKey as x } from "soon-i18n-common";
const z = (L, p = {}) => {
  const i = L.fallbacks ?? [], E = {}, u = {};
  b(p, u);
  let a = L.lang ?? "";
  const o = [], j = () => {
    o.forEach((t) => {
      t();
    });
  }, y = (t) => {
    a = t, o.forEach((e) => {
      e(t), e();
    });
  }, I = () => a, O = () => {
    const [t, e] = k(a);
    return g(() => {
      const n = (c) => {
        c && e(c);
      };
      return o.push(n), () => {
        const c = o.findIndex((r) => r === n);
        o.splice(c, 1);
      };
    }, []), [t, y];
  }, S = () => {
    const [t, e] = k(1);
    return g(() => {
      const n = (c) => {
        c || e((r) => r + 1);
      };
      return o.push(n), () => {
        const c = o.findIndex((r) => r === n);
        o.splice(c, 1);
      };
    }, []), [t, e];
  };
  return {
    useLocales: (t = {}) => {
      const e = h(b(t)), n = h({}), [c, r] = S();
      return R(
        (l, ...v) => {
          const f = {};
          return [a, ...i].reverse().forEach((s) => {
            Object.assign(f, u[s], e.current[s]);
          }), (!e.current[a] || !(l in f)) && [a, ...i].some((s) => {
            if (!e.current[s])
              return m(
                (d) => {
                  e.current[s] || (e.current = {
                    ...e.current,
                    [s]: K(d)
                  }, r((C) => C + 1));
                },
                n.current,
                s,
                t
              ), !0;
            if (!u[s])
              return m(
                (d) => {
                  u[s] = K(d), j();
                },
                E,
                s,
                p
              ), !0;
          }), x(f, l, ...v);
        },
        [c]
      );
    },
    useLang: O,
    tLocales: (t) => {
      const e = {};
      return b(t, e), (n, ...c) => {
        const r = {};
        return [a, ...i].reverse().forEach((l) => {
          Object.assign(r, u[l], e[l]);
        }), x(r, n, ...c);
      };
    },
    getLang: I,
    setLang: y
  };
};
export {
  z as createI18n
};
