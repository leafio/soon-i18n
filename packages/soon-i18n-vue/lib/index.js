import { loadSyncLocales as b, loadLocale as f, flatTreeKey as m, formatObjKey as y } from "soon-i18n-common";
import { ref as o } from "vue";
const K = (u, n = {}) => {
  const r = o(u.lang ?? ""), t = o(u.fallbacks), a = o({}), d = {};
  return b(n, a.value), {
    tLocales: (v = {}) => {
      const l = o({}), k = {};
      return b(v, l.value), (i, ...p) => {
        const c = {};
        return [r.value, ...t.value].reverse().forEach((e) => {
          Object.assign(
            c,
            a.value[e],
            l.value[e]
          );
        }), i in c || [r.value, ...t.value].some((e) => {
          if (!l.value[e])
            return f(
              (s) => {
                l.value[e] = m(s);
              },
              k,
              e,
              v
            ), !0;
          if (!a.value[e])
            return f(
              (s) => {
                a.value[e] = m(s);
              },
              d,
              e,
              n
            ), !0;
        }), y({ ...c }, i, ...p);
      };
    },
    lang: r,
    fallbacks: t
  };
};
export {
  K as createI18n
};
