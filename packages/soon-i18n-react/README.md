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
npm install soon-i18n-react
```

## full example

[soon-admin-react-nextjs](https://github.com/leafio/soon-admin-react-nextjs)  
or

```bash
npx degit https://github.com/leafio/soon-i18n/packages/soon-i18n-react/demo
```

## instance usage

### create an instance

```ts
import { createI18n } from "soon-i18n-react";
const global_locales = {
  zh: { g_welcome: "全局：欢迎 {name}" },
  en: { g_welcome: "Global: Welcome {name}" },
} as const;
type Lang = "zh" | "en";

export const { tLocales, useLocales, useLang, getLang, setLang } = createI18n(
  { lang: "zh" as Lang, fallbacks: ["en"] },
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
import { useLocales } from "../lang";

const Content = () => {
  const t = useLocales({
    zh: { hello: "你好" },
    en: { hello: "Hello" },
  });
  return <div>{t("hello")}</div>;
};
export default Content;
```

### change lang

```tsx
import { useLang } from "../lang";

const SwitchLang = () => {
  const [lang, setLang] = useLang();
  const handleToggle = () => {
    setLang(lang === "en" ? "zh" : "en");
  };
  return <button onClick={handleToggle}>{lang}</button>;
};
export default SwitchLang;
```
