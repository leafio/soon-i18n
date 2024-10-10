<script lang="ts">
  import { derived } from "svelte/store";
  import { showToast, tLocales } from "../lang/index";
  import zh_content from "../lang/locales/zh_content";

  const t = tLocales({
    zh: zh_content,
    en: () => import("../lang/locales/en_content"),
  });

  const options = derived(t, ($t) => [
    {
      label: $t("list.apple"),
      value: 0,
    },
    {
      label: $t("list.orange"),
      value: 1,
    },
    {
      label: $t("list.pear"),
      value: 2,
    },
  ]);

  let appleNum = 1;

  const onInputChange = (e: { target: any }) => {
    appleNum = Number(e?.target?.value ?? 0);
  };
</script>

<div class="content card">
  <div>child: Content.svelte</div>
  <span>{$t("g_welcome")}</span>

  <div class="state card">
    <div>{$t("keepState")}</div>
    <div>
      {$t("appleNum")}:
      <input
        type="number"
        value={appleNum}
        on:change={onInputChange}
        min="0"
        max="10"
      />
    </div>
    <div>{$t("own", appleNum)}</div>
  </div>

  <div>{$t("eat", 1, 2)}</div>
  <select>
    {#each $options as p}
      <option>{p.label}</option>
    {/each}
  </select>

  <div>
    <!-- no key err demo -->
    <button on:click={showToast}>{$t("show tip")}</button>
  </div>
</div>
