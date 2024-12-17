"use client"

import SettingPage from "@/components/settings";
import { Settings } from "@/types/settingTypes";
import { useState } from "react";

export default function Testpage() {
    const [buttonName, setButtonName] = useState<string>("ausklappen")
    const [settings, setSettings] = useState<Settings>()

    const toggleVisibility = () => {
        setButtonName((prev) => (prev === "ausklappen" ? "einklappen" : "ausklappen"));
    };


    return (
        <div>
            <button onClick={toggleVisibility}>{buttonName}</button>
            {buttonName === "einklappen" && <SettingPage setSettings={setSettings} />}
            {settings && (
                <div>
                    <h3>Einstellungen:</h3>
                    <pre>{JSON.stringify(settings, null, 2)}</pre>
                </div>
            )}
        </div>

    )
}