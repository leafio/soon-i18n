<template>
  <div class="lang-switch card">
    <div>child: langSwitch.vue</div>
    <button @click="handleToggle">{{ t("lang") }} {{ lang }}</button>
  </div>
</template>
<script setup lang="ts">
import { lang, tLocales } from "../lang";

const handleToggle = () => {
  lang.value = lang.value === "zh" ? "en" : "zh";
};
const t = tLocales({
  zh: {
    lang: "中文",
  },
  en: {
    lang: "English",
  },
});
</script>
<style>
.lang-switch {
  background-color: lightpink;
  text-align: right;
}
</style>
