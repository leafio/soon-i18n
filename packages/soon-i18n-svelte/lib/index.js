import { writable as u, derived as v } from "svelte/store";
const w = (e, r) => {
  if (e.indexOf("{") === -1)
    return e;
  let t = e;
  const c = /\{(.*?)\}/g, n = e.match(c);
  return n && n.forEach((s) => {
    if (s.length > 2) {
      const p = s.slice(1, s.length - 1);
      t = t.replace(new RegExp(s, "gm"), r[p] ?? "");
    }
  }), t;
}, f = (e, r = "", t = {}) => {
  for (const c of Object.keys(e)) {
    const n = `${r ? r + "." : ""}${c}`;
    typeof e[c] != "object" ? t[n] = e[c] : f(e[c], n, t);
  }
  return t;
}, I = (e, r, ...t) => {
  if (!e)
    return "";
  const c = e[r] || r;
  return t.length ? typeof c == "function" ? c(...t) : w(c, t[0]) : c;
}, k = (e, r, t, c) => {
  if (c && t && !r[t]) {
    const n = c[t];
    typeof n == "function" ? (r[t] = !0, n().then((s) => {
      e(s.default ?? {});
    }).finally(() => {
      delete r[t];
    })) : e(n ?? {});
  }
}, x = (e, r = {}) => {
  for (const t in e)
    e[t] && typeof e[t] == "object" && (r[t] = f(e[t]));
  return r;
}, R = (e, r = {}) => {
  const t = u(e.lang ?? ""), c = u(e.fallbacks), n = u(x(r)), s = {};
  return {
    tLocales: (d = {}) => {
      const b = u(
        x(d)
      ), E = {};
      return v(
        [t, c, n, b],
        ([h, y, g, m]) => (j, ...O) => {
          const a = {};
          return [h, ...y].reverse().forEach((o) => {
            Object.assign(a, g[o], m[o]);
          }), j in a || [h, ...y].some((o) => {
            if (!m[o])
              return k(
                (i) => {
                  b.update((l) => ({
                    ...l,
                    [o]: f(i)
                  }));
                },
                E,
                o,
                d
              ), !0;
            if (!g[o])
              return k(
                (i) => {
                  n.update((l) => ({
                    ...l,
                    [o]: f(i)
                  }));
                },
                s,
                o,
                r
              ), !0;
          }), I({ ...a }, j, ...O);
        }
      );
    },
    lang: t,
    fallbacks: c
  };
};
export {
  R as createI18n
};
