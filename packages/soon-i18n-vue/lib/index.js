import { loadSyncLocales as b, loadLocale as f, flatTreeKey as m, formatObjKey as y } from "soon-i18n-common";
import { ref as r } from "vue";
const K = (s, n = {}) => {
  const l = r(s.lang ?? ""), t = r(s.fallbacks ?? []), o = r({}), d = {};
  return b(n, o.value), {
    tLocales: (v = {}) => {
      const a = r({}), k = {};
      return b(v, a.value), (i, ...p) => {
        const c = {};
        return [l.value, ...t.value].reverse().forEach((e) => {
          Object.assign(c, o.value[e], a.value[e]);
        }), (!a.value[l.value] || !(i in c)) && [l.value, ...t.value].some((e) => {
          if (!a.value[e])
            return f(
              (u) => {
                a.value[e] = m(u);
              },
              k,
              e,
              v
            ), !0;
          if (!o.value[e])
            return f(
              (u) => {
                o.value[e] = m(u);
              },
              d,
              e,
              n
            ), !0;
        }), y({ ...c }, i, ...p);
      };
    },
    lang: l,
    fallbacks: t
  };
};
export {
  K as createI18n
};
