import { tLocales, useSoonI18n } from "../lang";

const SwitchLang = () => {
    const [lang, setLang] = useSoonI18n();
    const t = tLocales({
        zh: {
            lang: "中文",
        },
        en: {
            lang: "English",
        },
    });
    return (
        <div className="lang-switch card">
            <div>child: SwitchLang.tsx</div>
            <button
                onClick={() => {
                    setLang(lang === "en" ? "zh" : "en");
                }}
            >
                {lang} {t("lang")}
            </button>
        </div>
    );
};
export default SwitchLang;
