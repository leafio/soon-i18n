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
npm install soon-i18n-svelte
```

## full example

```bash
npx degit https://github.com/leafio/soon-i18n/packages/soon-i18n-svelte/demo
```

## instance usage

### create an instance

```ts
import { createI18n } from "soon-i18n-svelte";
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
export const { tLocales, lang } = createI18n(
  { lang: "zh", fallbacks: ["en"] },
  global_locales
);
```

### use in js/ts

```ts
import { get } from "svelte/store";
import { tLocales } from "../lang";
export const showToast = () => {
  const t = get(
    tLocales({
      zh: { tip: "哈哈，一条中文提醒！！！" },
      en: { tip: "Aha, an English tip" },
    })
  );
  alert(t("tip"));
};
```

### use in components

```svelte
<script>
import { tLocales } from "../lang";
const t = tLocales({
  zh: { hello: "你好" },
  en: { hello: "Hello" },
});
</script>
 <div>{$t("hello")}</div>
```

### change lang

```svelte
<script>
import { lang } from "../lang";
const t = tLocales({
  zh: { hello: "你好" },
  en: { hello: "Hello" },
});
const handleToggle = () => {
     lang.update((_lang) => (_lang === "en" ? "zh" : "en"));
};
</script>
  <button on:click={handleToggle}>{ $lang }</button>
```
