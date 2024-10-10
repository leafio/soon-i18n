import { flatTreeKey as f, formatObjKey as u, loadSyncLocales as g } from "soon-i18n-common";
const i = (e) => {
  const a = f(e);
  return (t, ...n) => u(a, t, ...n);
}, j = (e, a = {}) => {
  let t = e.lang ?? "";
  const n = e.fallbacks, c = {};
  return g(a, c), {
    tLocales: (s = {}) => {
      const o = {};
      return g(s, o), (L, ..._) => {
        const r = {};
        return [t, ...n].reverse().forEach((l) => {
          Object.assign(r, c[l], o[l]);
        }), u(r, L, ..._);
      };
    },
    getLang: () => t,
    setLang: (s) => {
      t = s;
    }
  };
};
export {
  j as createI18n,
  i as yi
};
