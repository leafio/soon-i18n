---
title: 按需加载
description: Soon I18n 按需加载.
---

按需加载仅能在 react , vue , solid , svelte 中使用。

## react

```ts
const t = useLocales({
  zh: () => import("./locales/zh"),
  en: () => import("./locales/en"),
});

//如果locale文件为json ，并且位于public文件夹中或在另一个服务器上
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

//如果locale文件为json ，并且位于public文件夹中或在另一个服务器上
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

## locale 文件

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
