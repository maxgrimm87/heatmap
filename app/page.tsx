"use client"

import {getElasticData} from "@/api/elastic";
import {useEffect, useState} from "react";
import {LFHeatmapData} from "@/types/heatmapData";
import Heatmap from "@/components/leafMapGen";
import {DEFAULT_HEATMAP_VALUES, DEFAULT_WIDTH} from "@/config/heatmapDefaultValues";
import LfmSettingPage from "@/components/lfSettings";
import {LfmSettings} from "@/types/settingTypes";
import SearchForm from "@/components/searchForm";


export default function Home() {
    const [data, setData] = useState<LFHeatmapData>()
    const [buttonName, setButtonName] = useState<string>("ausklappen")
    const [settings, setSettings] = useState<LfmSettings>()


    const toggleVisibility = () => {
        setButtonName((prev) => (prev === "ausklappen" ? "einklappen" : "ausklappen"));
    };


    return (
        <div>
            {!data ? (<SearchForm setHeatmapData={setData}/>) : (
                <div>
                    <button onClick={toggleVisibility} className="button-12">{buttonName}</button>
                    <div style={{
                        width: settings?.width || DEFAULT_WIDTH,
                        maxWidth: "640px",
                        minWidth: "560px",
                        marginBottom: "10px"
                    }}>
                        {buttonName === "einklappen" &&
                            <LfmSettingPage setSettings={setSettings} foundMaxValue={data?.maxValue}/>}
                    </div>
                    {data && <Heatmap points={data.points} settings={settings}/>}</div>
            )}

        </div>
    );
}
