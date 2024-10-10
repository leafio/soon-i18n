import { getLang, setLang, tLocales, emitter } from "../lang";

const SwitchLang = () => {
    const t = tLocales({
        zh: { lang: "中文", }, en: { lang: "English", },
    });
    return (
        <div className="lang-switch card">
            <div>child: SwitchLang.tsx</div>
            <button
                onClick={() => {
                    setLang(getLang() === "en" ? "zh" : "en");
                    emitter.emit('lang-change')
                }}
            >
                {getLang()} {t("lang")}
            </button>
        </div>
    );
};
export default SwitchLang;


