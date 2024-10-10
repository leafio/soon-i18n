# soon-i18n

a lightweight nested messages i18n library with smart ts prompt can be used in react , vue , svelte , solid , etc...

all editions:

- soon-i18n
- soon-i18n-react
- soon-i18n-vue
- soon-i18n-solid
- soon-i18n-react

## [Full Document](https://leafio.github.io/soon-i18n/)

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
export const { tLocales, getLang, setLang, useLocales, useSoonI18n } =
  createI18n({ lang: "zh", fallbacks: ["en"] }, global_locales);
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
import { useSoonI18n } from "../lang";

const SwitchLang = () => {
  const [lang, setLang] = useSoonI18n();
  const handleToggle = () => {
    setLang(lang === "en" ? "zh" : "en");
  };
  return <button onClick={handleToggle}>{lang}</button>;
};
export default SwitchLang;
```
