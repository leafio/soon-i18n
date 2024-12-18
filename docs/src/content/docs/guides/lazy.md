---
title: Lazy Loading
description: Soon I18n lazy loading.
---

Lazy loading only can be used in react , vue , solid , svelte

## react

```ts
const t = useLocales({
  zh: () => import("./locales/zh"),
  en: () => import("./locales/en"),
});

//if the locale file is json , and in public file or another server
const t = useLocales({
  zh: () =>
    fetch("any_url/locales/zh.json").then(async (res) => ({
      default: await res.json(),
    })),
  en: () =>
    fetch("any_url/locales/en.json").then(async (res) => ({
      default: await res.json(),
    })),
});
```

## vue , solid , svelte

```ts
const t = tLocales({
  zh: () => import("./locales/zh"),
  en: () => import("./locales/en"),
});

//if the locale file is json , and in public file or another server
const t = tLocales({
  zh: () =>
    fetch("any_url/locales/zh.json").then(async (res) => ({
      default: await res.json(),
    })),
  en: () =>
    fetch("any_url/locales/en.json").then(async (res) => ({
      default: await res.json(),
    })),
});
```

### locales

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
