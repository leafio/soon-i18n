import { loadSyncLocales as i, loadLocale as m, flatTreeKey as b, formatObjKey as k } from "soon-i18n-common";
import { yi as S } from "soon-i18n-common";
import { ref as r } from "vue";
const L = (s, n) => {
  const l = r(s.lang ?? ""), t = r(s.fallbacks ?? []), o = r({}), d = {};
  return i(n, o.value), {
    tLocales: (v) => {
      const a = r({}), p = {};
      return i(v, a.value), (f, ...y) => {
        const c = {};
        return [l.value, ...t.value].reverse().forEach((e) => {
          Object.assign(c, o.value[e], a.value[e]);
        }), (!a.value[l.value] || !(f in c)) && [l.value, ...t.value].some((e) => {
          if (!a.value[e])
            return m(
              (u) => {
                a.value[e] = b(u);
              },
              p,
              e,
              v
            ), !0;
          if (!o.value[e])
            return m(
              (u) => {
                o.value[e] = b(u);
              },
              d,
              e,
              n
            ), !0;
        }), k({ ...c }, f, ...y);
      };
    },
    lang: l,
    fallbacks: t
  };
}, I = L;
export {
  L as createI18n,
  I as createI18nSafe,
  S as yi
};
