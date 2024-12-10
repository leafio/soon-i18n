import { createSignal as a } from "solid-js";
const x = (e, n) => {
  if (e.indexOf("{") === -1)
    return e;
  let t = e;
  const r = /\{(.*?)\}/g, c = e.match(r);
  return c && c.forEach((o) => {
    if (o.length > 2) {
      const f = o.slice(1, o.length - 1);
      t = t.replace(new RegExp(o, "gm"), n[f] ?? "");
    }
  }), t;
}, u = (e, n = "", t = {}) => {
  for (const r of Object.keys(e)) {
    const c = `${n ? n + "." : ""}${r}`;
    typeof e[r] != "object" ? t[c] = e[r] : u(e[r], c, t);
  }
  return t;
}, E = (e, n, ...t) => {
  if (!e)
    return "";
  const r = e[n] || n;
  return t.length ? typeof r == "function" ? r(...t) : x(r, t[0]) : r;
}, y = (e, n, t, r) => {
  if (r && t && !n[t]) {
    const c = r[t];
    typeof c == "function" ? (n[t] = !0, c().then((o) => {
      e(o.default ?? {});
    }).finally(() => {
      delete n[t];
    })) : e(c ?? {});
  }
}, d = (e, n = {}) => {
  for (const t in e)
    e[t] && typeof e[t] == "object" && (n[t] = u(e[t]));
  return n;
}, O = (e, n) => {
  const [t, r] = a(e.lang ?? ""), [c] = a(e.fallbacks ?? []), [o, f] = a(d(n), { equals: !1 }), m = {};
  return {
    tLocales: (b) => {
      const [i, _] = a(d(b), { equals: !1 }), j = {};
      return (h, ...k) => {
        const g = {};
        return [t(), ...c()].reverse().forEach((s) => {
          Object.assign(
            g,
            o()[s],
            i()[s]
          );
        }), (!i()[t()] || !(h in g)) && [t(), ...c()].some((s) => {
          if (!i()[s])
            return y(
              (p) => {
                _((l) => (l[s] = u(p), l));
              },
              j,
              s,
              b
            ), !0;
          if (!o()[s])
            return y(
              (p) => {
                f((l) => (l[s] = u(p), l));
              },
              m,
              s,
              n
            ), !0;
        }), E(g, h, ...k);
      };
    },
    lang: t,
    setLang: r
  };
}, L = O;
export {
  O as createI18n,
  L as createI18nSafe
};
