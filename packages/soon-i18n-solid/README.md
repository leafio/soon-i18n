# soon-i18n

a lightweight nested messages i18n library with smart ts prompt can be used in react , vue , svelte , solid , etc...

all editions:

- [soon-i18n](https://www.npmjs.com/package/soon-i18n)
- [soon-i18n-react](https://www.npmjs.com/package/soon-i18n-react)
- [soon-i18n-vue](https://www.npmjs.com/package/soon-i18n-vue)
- [soon-i18n-solid](https://www.npmjs.com/package/soon-i18n-solid)
- [soon-i18n-svelte](https://www.npmjs.com/package/soon-i18n-svelte)

## [Full Document](https://leafio.github.io/soon-i18n/)

## [中文文档](https://leafio.github.io/soon-i18n/zh)

## install

```bash
npm install soon-i18n-solid
```

## full example

```bash
npx degit https://github.com/leafio/soon-i18n/packages/soon-i18n-solid/demo
```

## instance usage

### create an instance

```ts
import { createI18n } from "soon-i18n-solid";
const en_global = {
  welcome: "Welcome {name}",
} as const;
const zh_global = {
  welcome: "欢迎 {name}",
} as const;

const global_locales = {
  zh: zh_global,
  en: en_global,
};
export const { tLocales, getLang, setLang } = createI18n(
  { lang: "zh", fallbacks: ["en"] },
  global_locales
);
```

### use in js/ts

```ts
import { tLocales } from "../lang";
export const showToast = () => {
  const t = tLocales({
    zh: { tip: "哈哈，一条中文提醒！！！" },
    en: { tip: "Aha, an English tip" },
  });
  alert(t("tip"));
};
```

### use in components

```tsx
import { tLocales } from "../lang";

const Content = () => {
  const t = tLocales({
    zh: { hello: "你好" },
    en: { hello: "Hello" },
  });
  return <div>{t("hello")}</div>;
};
export default Content;
```

### change lang

```tsx
import { lang, setLang } from "../lang";

const SwitchLang = () => {
  const handleToggle = () => {
    setLang(lang() === "en" ? "zh" : "en");
  };
  return <button onClick={handleToggle}>{lang()}</button>;
};
export default SwitchLang;
```
