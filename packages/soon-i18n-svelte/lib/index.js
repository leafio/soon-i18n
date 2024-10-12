import { writable as f, derived as v } from "svelte/store";
const w = (e, r) => {
  if (e.indexOf("{") === -1)
    return e;
  let t = e;
  const n = /\{(.*?)\}/g, c = e.match(n);
  return c && c.forEach((s) => {
    if (s.length > 2) {
      const b = s.slice(1, s.length - 1);
      t = t.replace(new RegExp(s, "gm"), r[b] ?? "");
    }
  }), t;
}, u = (e, r = "", t = {}) => {
  for (const n of Object.keys(e)) {
    const c = `${r ? r + "." : ""}${n}`;
    typeof e[n] != "object" ? t[c] = e[n] : u(e[n], c, t);
  }
  return t;
}, I = (e, r, ...t) => {
  if (!e)
    return "";
  const n = e[r] || r;
  return t.length ? typeof n == "function" ? n(...t) : w(n, t[0]) : n;
}, k = (e, r, t, n) => {
  if (n && t && !r[t]) {
    const c = n[t];
    typeof c == "function" ? (r[t] = !0, c().then((s) => {
      e(s.default ?? {});
    }).finally(() => {
      delete r[t];
    })) : e(c ?? {});
  }
}, x = (e, r = {}) => {
  for (const t in e)
    e[t] && typeof e[t] == "object" && (r[t] = u(e[t]));
  return r;
}, R = (e, r = {}) => {
  const t = f(e.lang ?? ""), n = f(e.fallbacks ?? []), c = f(x(r)), s = {};
  return {
    tLocales: (h = {}) => {
      const y = f(
        x(h)
      ), E = {};
      return v(
        [t, n, c, y],
        ([i, m, g, a]) => (j, ...O) => {
          const l = {};
          return [i, ...m].reverse().forEach((o) => {
            Object.assign(l, g[o], a[o]);
          }), (!a[i] || !(j in l)) && [i, ...m].some((o) => {
            if (!a[o])
              return k(
                (p) => {
                  y.update((d) => ({
                    ...d,
                    [o]: u(p)
                  }));
                },
                E,
                o,
                h
              ), !0;
            if (!g[o])
              return k(
                (p) => {
                  c.update((d) => ({
                    ...d,
                    [o]: u(p)
                  }));
                },
                s,
                o,
                r
              ), !0;
          }), I({ ...l }, j, ...O);
        }
      );
    },
    lang: t,
    fallbacks: n
  };
};
export {
  R as createI18n
};
