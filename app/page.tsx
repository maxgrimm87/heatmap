"use client"

import {getElasticData} from "@/api/elastic";
import {useEffect, useMemo, useState} from "react";
import {HeatmapData} from "@/types/heatmapData";
import {DEFAULT_HEATMAP_VALUES, DEFAULT_WIDTH} from "@/config/heatmapDefaultValues";
import MapSettingPage from "@/components/MapSettings";
import {MapSettings} from "@/types/settingTypes";
import SearchForm from "@/components/searchForm";
import dynamic from "next/dynamic";
import HeatmapLegend from "@/components/HeatmapLegend";

const Map = dynamic(
    () => import('@/components/Map'),
    {
        loading: () => <p>A map is loading</p>,
        ssr: false
    }
)
export default function Home() {
    const [data, setData] = useState<HeatmapData>()
    const [buttonName, setButtonName] = useState<string>("ausklappen")
    const [settings, setSettings] = useState<MapSettings>()

    const toggleVisibility = () => {
        setButtonName((prev) => (prev === "ausklappen" ? "einklappen" : "ausklappen"));
    };
    useEffect(() => {
        console.log("Home rendered")
    }, []);

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
                            <MapSettingPage setSettings={setSettings}/>}
                    </div>
                    <HeatmapLegend width={300} height={70} />
                    <Map points={data.points} settings={settings}/>
                </div>
            )}

        </div>
    );
}
