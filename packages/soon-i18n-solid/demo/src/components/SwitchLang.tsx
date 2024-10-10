import { lang, setLang, tLocales } from "../lang";

const SwitchLang = () => {
  const t = tLocales({
    zh: {
      lang: "中文",
    },
    en: {
      lang: "English",
    },
  });
  return (
    <div class="lang-switch card">
      <div>child: SwitchLang.tsx</div>
      <button
        onClick={() => {
          setLang(lang() === "en" ? "zh" : "en");
        }}
      >
        {lang()} {t("lang")}
      </button>
    </div>
  );
};
export default SwitchLang;
