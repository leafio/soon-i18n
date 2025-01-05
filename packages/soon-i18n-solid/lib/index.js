import { createSignal as u } from "solid-js";
const E = (e, n) => {
  if (e.indexOf("{") === -1)
    return e;
  let t = e;
  const o = /\{(.*?)\}/g, c = e.match(o);
  return c && c.forEach((r) => {
    if (r.length > 2) {
      const f = r.slice(1, r.length - 1);
      t = t.replace(new RegExp(r, "gm"), n[f] ?? "");
    }
  }), t;
}, a = (e, n = "", t = {}) => {
  for (const o of Object.keys(e)) {
    const c = `${n ? n + "." : ""}${o}`;
    typeof e[o] != "object" ? t[c] = e[o] : a(e[o], c, t);
  }
  return t;
}, m = (e, n, ...t) => {
  if (!e)
    return "";
  const o = e[n] || n;
  return t.length ? typeof o == "function" ? o(...t) : E(o, t[0]) : o;
}, y = (e, n, t, o) => {
  if (o && t && !n[t]) {
    const c = o[t];
    typeof c == "function" ? (n[t] = !0, c().then((r) => {
      e(r.default ?? {});
    }).finally(() => {
      delete n[t];
    })) : e(c ?? {});
  }
}, d = (e, n = {}) => {
  for (const t in e)
    e[t] && typeof e[t] == "object" && (n[t] = a(e[t]));
  return n;
}, L = (e) => {
  const n = a(e);
  return (t, ...o) => m(n, t, ...o);
}, O = (e, n) => {
  const [t, o] = u(e.lang ?? ""), [c] = u(e.fallbacks ?? []), [r, f] = u(d(n), { equals: !1 }), _ = {};
  return {
    tLocales: (b) => {
      const [i, j] = u(d(b), { equals: !1 }), k = {};
      return (h, ...x) => {
        const g = {};
        return [t(), ...c()].reverse().forEach((s) => {
          Object.assign(
            g,
            r()[s],
            i()[s]
          );
        }), (!i()[t()] || !(h in g)) && [t(), ...c()].some((s) => {
          if (!i()[s])
            return y(
              (p) => {
                j((l) => (l[s] = a(p), l));
              },
              k,
              s,
              b
            ), !0;
          if (!r()[s])
            return y(
              (p) => {
                f((l) => (l[s] = a(p), l));
              },
              _,
              s,
              n
            ), !0;
        }), m(g, h, ...x);
      };
    },
    lang: t,
    setLang: o
  };
}, S = O;
export {
  O as createI18n,
  S as createI18nSafe,
  L as yi
};
