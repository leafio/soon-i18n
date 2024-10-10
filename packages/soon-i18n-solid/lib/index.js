import { createSignal as a } from "solid-js";
const x = (e, r) => {
  if (e.indexOf("{") === -1)
    return e;
  let t = e;
  const n = /\{(.*?)\}/g, c = e.match(n);
  return c && c.forEach((o) => {
    if (o.length > 2) {
      const f = o.slice(1, o.length - 1);
      t = t.replace(new RegExp(o, "gm"), r[f] ?? "");
    }
  }), t;
}, u = (e, r = "", t = {}) => {
  for (const n of Object.keys(e)) {
    const c = `${r ? r + "." : ""}${n}`;
    typeof e[n] != "object" ? t[c] = e[n] : u(e[n], c, t);
  }
  return t;
}, E = (e, r, ...t) => {
  if (!e)
    return "";
  const n = e[r] || r;
  return t.length ? typeof n == "function" ? n(...t) : x(n, t[0]) : n;
}, y = (e, r, t, n) => {
  if (n && t && !r[t]) {
    const c = n[t];
    typeof c == "function" ? (r[t] = !0, c().then((o) => {
      e(o.default ?? {});
    }).finally(() => {
      delete r[t];
    })) : e(c ?? {});
  }
}, d = (e, r = {}) => {
  for (const t in e)
    e[t] && typeof e[t] == "object" && (r[t] = u(e[t]));
  return r;
}, L = (e, r = {}) => {
  const [t, n] = a(e.lang ?? ""), [c] = a(e.fallbacks), [o, f] = a(d(r), { equals: !1 }), m = {};
  return {
    tLocales: (p = {}) => {
      const [b, _] = a(d(p), { equals: !1 }), j = {};
      return (h, ...k) => {
        const i = {};
        return [t(), ...c()].reverse().forEach((s) => {
          Object.assign(
            i,
            o()[s],
            b()[s]
          );
        }), h in i || [t(), ...c()].some((s) => {
          if (!b()[s])
            return y(
              (g) => {
                _((l) => (l[s] = u(g), l));
              },
              j,
              s,
              p
            ), !0;
          if (!o()[s])
            return y(
              (g) => {
                f((l) => (l[s] = u(g), l));
              },
              m,
              s,
              r
            ), !0;
        }), E(i, h, ...k);
      };
    },
    lang: t,
    setLang: n
  };
};
export {
  L as createI18n
};
