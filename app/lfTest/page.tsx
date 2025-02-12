"use client"

import SettingPage from "@/components/settings";
import {LfmSettings, Settings} from "@/types/settingTypes";
import {useEffect, useState} from "react";
import {coordinates, HeatmapPoint} from "@/types/heatmapData";
import Heatmap from "@/components/leafMapGen";
import {exportFromLocalJson} from "@/api/getData";
import LfmSettingPage from "@/components/lfSettings";
import {DEFAULT_WIDTH} from "@/config/heatmapDefaultValues";

export default function Testpage() {

    const [buttonName, setButtonName] = useState<string>("ausklappen")
    const [settings, setSettings] = useState<LfmSettings>()
    const [heatmapPoints,setHeatmapPoints] = useState<coordinates[]>([])


    useEffect(() => {
        const getPoints = async () => {
            const points = await exportFromLocalJson()
            setHeatmapPoints(points)
        }
        getPoints()
    },[])

    const toggleVisibility = () => {
        setButtonName((prev) => (prev === "ausklappen" ? "einklappen" : "ausklappen"));
    };

    return (
        <div>
            <button onClick={toggleVisibility} className="button-12">{buttonName}</button>
            <div style={{width: settings?.width || DEFAULT_WIDTH, maxWidth: "640px", minWidth: "560px", marginBottom: "10px"}}>
                {buttonName === "einklappen" && <LfmSettingPage setSettings={setSettings}/>}
            </div>
            <Heatmap points={heatmapPoints} settings={settings}/>


        </div>

    )
}