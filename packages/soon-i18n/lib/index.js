import { loadSyncLocales as r, formatObjKey as _ } from "soon-i18n-common";
import { yi as k } from "soon-i18n-common";
const b = (e, l) => {
  let t = e.lang ?? "";
  const g = e.fallbacks ?? [], n = {};
  return r(l, n), {
    tLocales: (a) => {
      const o = {};
      return r(a ?? {}, o), (L, ...f) => {
        const c = {};
        return [t, ...g].reverse().forEach((s) => {
          Object.assign(c, n[s], o[s]);
        }), _(c, L, ...f);
      };
    },
    getLang: () => t,
    setLang: (a) => {
      t = a;
    }
  };
}, d = b;
export {
  b as createI18n,
  d as createI18nSafe,
  k as yi
};
