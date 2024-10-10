<template>
  <div class="content card">
    <div>child: content.vue</div>
    <div>{{ t("g_welcome", { name: t("world") }) }}</div>
    <div class="state card">
      <div>{{ t("keepState") }}</div>
      <div>
        {{ t("appleNum") }}:
        <input type="number" v-model="appleNum" min="0" max="10" />
      </div>
      <div>{{ t("own", appleNum) }}</div>
    </div>

    <select>
      <option v-for="item in options">{{ item.label }}</option>
    </select>
    <div>{{ t("eat", 1, 2) }}</div>
    <div>
    <!-- no key err demo -->
    <button @click="showToast">{{ t("show tip") }}</button>
    </div>

  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { showToast, tLocales } from "../lang";
import { ref } from "vue";
import zh_content from "../lang/locales/zh_content";

const appleNum = ref(1);
const t = tLocales({
  zh: zh_content,
  en: () => import("../lang/locales/en_content"),
});
const options = computed(() => [
  {
    label: t("list.apple"),
    value: 0,
  },
  {
    label: t("list.orange"),
    value: 1,
  },
  {
    label: t("list.pear"),
    value: 2,
  },
]);
</script>
<style>
.content {
  background-color: aquamarine;
}
.state {
  background-color: darksalmon;
}
</style>
