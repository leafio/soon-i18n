<script setup lang="ts">
import Content from "./components/content.vue";

import LangSwitch from "./components/langSwitch.vue";
</script>

<template>
    <div class="app card">
        <div>app.vue</div>

        <LangSwitch />

        <Content />
    </div>
</template>

<style scoped>
.app {
    background-color: lightblue;

}
</style>
