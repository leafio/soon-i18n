---
title: Lazy Loading
description: Soon I18n lazy loading.
---

Lazy loading is only valid in react , vue , solid , svelte

## react

```ts
const t = useLocales({
  zh: () => import("./locales/zh"),
  en: () => import("./locales/en"),
});
```

## vue , solid , svelte

```ts
const t = tLocales({
  zh: () => import("./locales/zh"),
  en: () => import("./locales/en"),
});
```

## locales

./locales/en.ts

```ts
const en_locale = {
  world: "World",
};
export default en_locale;
```

./locales/zh.ts

```ts
const zh_locale = {
  world: "世界",
};
export default zh_locale;
```
