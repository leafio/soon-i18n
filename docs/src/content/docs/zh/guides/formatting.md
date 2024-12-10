---
title: 格式化
description: Soon I18n 格式化.
---

## 模板插值

```ts
import { yi } from "soon-i18n";

const t = yi({ hello: "Hello {name} !" });
console.log(t("hello", { name: "world" })); //Hello world !
```

## 函数

```ts
import { yi } from "soon-i18n";

const t = yi({
  hello: (name) => `Hello ${name} !`,
  msg: (num) => {
    if (num === 0) return "I have no apples.";
    if (num === 1) return "I have an apple.";
    return `I have ${num} apples`;
  },
});
console.log(t("hello", "world")); //Hello world !
console.log(t("msg", 2)); // I have 2 apples
```
