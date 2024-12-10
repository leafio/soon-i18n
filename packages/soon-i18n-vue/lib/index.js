import { loadSyncLocales as i, loadLocale as b, flatTreeKey as m, formatObjKey as y } from "soon-i18n-common";
import { ref as t } from "vue";
const L = (s, n) => {
  const l = t(s.lang ?? ""), r = t(s.fallbacks ?? []), o = t({}), d = {};
  return i(n, o.value), {
    tLocales: (v) => {
      const a = t({}), k = {};
      return i(v, a.value), (f, ...p) => {
        const c = {};
        return [l.value, ...r.value].reverse().forEach((e) => {
          Object.assign(c, o.value[e], a.value[e]);
        }), (!a.value[l.value] || !(f in c)) && [l.value, ...r.value].some((e) => {
          if (!a.value[e])
            return b(
              (u) => {
                a.value[e] = m(u);
              },
              k,
              e,
              v
            ), !0;
          if (!o.value[e])
            return b(
              (u) => {
                o.value[e] = m(u);
              },
              d,
              e,
              n
            ), !0;
        }), y({ ...c }, f, ...p);
      };
    },
    lang: l,
    fallbacks: r
  };
}, K = L;
export {
  L as createI18n,
  K as createI18nSafe
};
