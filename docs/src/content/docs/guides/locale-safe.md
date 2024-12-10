---
title: Locale Safe
description: Soon I18n Locale Safe.
---

## Only keys which all locales have in common is type-safe

```ts
const zh = {
  common: "共用",
  niHao: "你好",
};
const en = {
  common: "Common",
  hello: "Hello",
};

const { tLocales } = createI18nSafe({ lang: "zh" }, { zh, en });
const t = tLocales();
t("common"); //success
t("hello"); //type error,because locale zh doesn't have key `hello`

```

