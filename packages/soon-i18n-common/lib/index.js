const s = (e, n) => {
  if (e.indexOf("{") === -1)
    return e;
  let t = e;
  const f = /\{(.*?)\}/g, c = e.match(f);
  return c && c.forEach((r) => {
    if (r.length > 2) {
      const i = r.slice(1, r.length - 1);
      t = t.replace(new RegExp(r, "gm"), n[i] ?? "");
    }
  }), t;
}, o = (e, n = "", t = {}) => {
  for (const f of Object.keys(e)) {
    const c = `${n ? n + "." : ""}${f}`;
    typeof e[f] != "object" ? t[c] = e[f] : o(e[f], c, t);
  }
  return t;
}, u = (e, n, ...t) => {
  if (!e)
    return "";
  const f = e[n] || n;
  return t.length ? typeof f == "function" ? f(...t) : s(f, t[0]) : f;
}, y = (e, n, t, f) => {
  if (f && t && !n[t]) {
    const c = f[t];
    typeof c == "function" ? (n[t] = !0, c().then((r) => {
      e(r.default ?? {});
    }).finally(() => {
      delete n[t];
    })) : e(c ?? {});
  }
}, p = (e, n = {}) => {
  for (const t in e)
    e[t] && typeof e[t] == "object" && (n[t] = o(e[t]));
  return n;
}, h = (e) => {
  const n = o(e);
  return (t, ...f) => u(n, t, ...f);
};
export {
  o as flatTreeKey,
  u as formatObjKey,
  s as formatString,
  y as loadLocale,
  p as loadSyncLocales,
  h as yi
};
