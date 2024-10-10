import { useState } from "react";
import { showToast, useLocales } from "../lang";


export default function Content() {
    const t = useLocales({ zh: () => import('../lang/locales/zh_content'), en: () => import("../lang/locales/en_content") });

    const options = [
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
    ];

    const [appleNum, setAppleNum] = useState(1);
    return (
        <div className="content card">
            <div>child: Content.tsx</div>
            <span>{t("g_welcome",{name:t('world')})}</span>

            <div className="state card">
                <div>{t("keepState")}</div>
                <div>
                    {t("appleNum")}:
                    <input
                        type="number"
                        value={appleNum}
                        onChange={(e) => setAppleNum(Number(e.target.value))}
                        min="0"
                        max="10"
                    />
                </div>
                <div>{t("own", appleNum)}</div>
            </div>

            <div>{t("eat", 1, 2)}</div>
            <select>
                {options.map((p) => (
                    <option v-for="item in options" key={p.value}>{p.label}</option>
                ))}
            </select>
            <div>
                {/* no key err demo */}
                <button onClick={showToast}>{t("show tip")}</button>
            </div>
        </div>
    );
}
