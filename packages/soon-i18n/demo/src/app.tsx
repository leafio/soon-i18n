import "./app.css";
import SwitchLang from "./components/SwitchLang";
import Content from "./components/Content";
import { useEffect, useState } from "react";
import {
    getLang,
    emitter
} from "./lang";

export function App() {
    const [lang, setLang] = useState(getLang());
    useEffect(() => {
        emitter.on('lang-change',()=>{
            setLang(getLang())
        })
    }, []);

    return (
        <>
            <div className="app card" key={lang}>
                <div>app.tsx</div>
                <SwitchLang />
                <Content />
            </div>
        </>
    );
}

