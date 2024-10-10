const y = (e, n) => {
  if (e.indexOf("{") === -1)
    return e;
  let t = e;
  const f = /\{(.*?)\}/g, c = e.match(f);
  return c && c.forEach((o) => {
    if (o.length > 2) {
      const i = o.slice(1, o.length - 1);
      t = t.replace(new RegExp(o, "gm"), n[i] ?? "");
    }
  }), t;
}, r = (e, n = "", t = {}) => {
  for (const f of Object.keys(e)) {
    const c = `${n ? n + "." : ""}${f}`;
    typeof e[f] != "object" ? t[c] = e[f] : r(e[f], c, t);
  }
  return t;
}, u = (e, n, ...t) => {
  if (!e)
    return "";
  const f = e[n] || n;
  return t.length ? typeof f == "function" ? f(...t) : y(f, t[0]) : f;
}, p = (e, n, t, f) => {
  if (f && t && !n[t]) {
    const c = f[t];
    typeof c == "function" ? (n[t] = !0, c().then((o) => {
      e(o.default ?? {});
    }).finally(() => {
      delete n[t];
    })) : e(c ?? {});
  }
}, s = (e, n = {}) => {
  for (const t in e)
    e[t] && typeof e[t] == "object" && (n[t] = r(e[t]));
  return n;
};
export {
  r as flatTreeKey,
  u as formatObjKey,
  y as formatString,
  p as loadLocale,
  s as loadSyncLocales
};
