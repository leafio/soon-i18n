---
title: 语言类型安全
description: Soon I18n 语言类型安全.
---

## 所有语言均包含的 key 值，才是类型安全的

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
t("common"); //正常
t("hello"); //会类型报错，因为中文语言包文件zh不含`hello`
```
