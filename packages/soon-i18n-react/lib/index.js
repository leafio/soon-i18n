import { useState as L, useEffect as I, useRef as O } from "react";
import { loadSyncLocales as p, loadLocale as k, flatTreeKey as h, formatObjKey as E } from "soon-i18n-common";
const v = (y, g = {}) => {
  const i = y.fallbacks, K = {}, r = {};
  p(g, r);
  let n = y.lang ?? "", d = 0;
  const a = [], j = () => {
    d++, a.forEach((e) => {
      e(d);
    });
  }, m = (e) => {
    n = e, a.forEach((c) => {
      c(e);
    });
  }, x = () => n, _ = () => {
    const [e, c] = L(n), [l, u] = L(d);
    return I(() => {
      const t = (s) => {
        typeof s == "number" ? u(s) : c(s);
      };
      return a.push(t), () => {
        const s = a.findIndex((f) => f === t);
        a.splice(s, 1);
      };
    }, []), [e, m, l];
  };
  return {
    useLocales: (e = {}) => {
      const [c, l] = L(
        () => {
          const t = {};
          return p(e, t), t;
        }
      ), u = O({});
      return _(), (t, ...s) => {
        const f = {};
        return [n, ...i].reverse().forEach((o) => {
          Object.assign(f, r[o], c[o]);
        }), t in f || [n, ...i].some((o) => {
          if (!c[o])
            return k(
              (b) => {
                l({
                  ...c,
                  [o]: h(b)
                });
              },
              u,
              o,
              e
            ), !0;
          if (!r[o])
            return k(
              (b) => {
                r[o] = h(b), j();
              },
              K,
              o,
              g
            ), !0;
        }), E(f, t, ...s);
      };
    },
    useSoonI18n: _,
    tLocales: (e) => {
      const c = {};
      return p(e, c), (l, ...u) => {
        const t = {};
        return [n, ...i].reverse().forEach((s) => {
          Object.assign(t, r[s], c[s]);
        }), E(t, l, ...u);
      };
    },
    getLang: x,
    setLang: m
  };
};
export {
  v as createI18n
};
