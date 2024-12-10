import { flatTreeKey as _, formatObjKey as f, loadSyncLocales as g } from "soon-i18n-common";
const j = (t) => {
  const a = _(t);
  return (e, ...n) => f(a, e, ...n);
}, b = (t, a) => {
  let e = t.lang ?? "";
  const n = t.fallbacks ?? [], c = {};
  return g(a, c), {
    tLocales: (s) => {
      const o = {};
      return g(s ?? {}, o), (u, ...L) => {
        const r = {};
        return [e, ...n].reverse().forEach((l) => {
          Object.assign(r, c[l], o[l]);
        }), f(r, u, ...L);
      };
    },
    getLang: () => e,
    setLang: (s) => {
      e = s;
    }
  };
}, k = b;
export {
  b as createI18n,
  k as createI18nSafe,
  j as yi
};
