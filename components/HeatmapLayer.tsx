import {useMap} from "react-leaflet";
import {Coordinates} from "@/types/heatmapData";
import {useGlobalData} from "@/context/GlobalData";
import {useEffect, useRef} from "react";
import {DEFAULT_OPACITY, DEFAULT_RADIUS, DEFAULT_TOP} from "@/config/heatmapDefaultValues";
import HeatmapOverlay from "heatmap.js/plugins/leaflet-heatmap";
import {MapSettings} from "@/types/settingTypes";

type HeatmapLayerProps = {
    TooltipPointer?: {
        x: number;
        y: number;
    }
    setHeatmapValue: (val: number) => void;
    settings?: MapSettings
    points: Coordinates[]
}

export default function HeatmapLayer({setHeatmapValue, points, settings, TooltipPointer}: HeatmapLayerProps){
    const map = useMap()
    const globalData = useGlobalData();
    const heatmapLayerRef = useRef<HeatmapOverlay | null>(null)

    // Für den Mouseover-Layer.
    useEffect(()=>{
        if(heatmapLayerRef.current && TooltipPointer){
            const pointerValue = heatmapLayerRef.current._heatmap.getValueAt({x: TooltipPointer.x, y: TooltipPointer.y})
            setHeatmapValue(pointerValue)
        }
    },[TooltipPointer?.x, TooltipPointer?.y])

    //Konstruktion des heatmap-Objekts
    useEffect(() => {
        if (!map) return;

        const cfg = {
            radius: (settings?.radius || DEFAULT_RADIUS)/100,
            maxOpacity: settings?.opacity || DEFAULT_OPACITY,
            scaleRadius: settings?.scaleRadius || false,
            useLocalExtrema: settings?.localExtremes || false,
            latField: 'lat',
            lngField: 'lng',
            valueField: 'count',

            //Löst bei verändertem Local Extreme aus. Setzt Wert für Legende in global Context
            onExtremaChange: function (){
                if(heatmapLayer) {
                    globalData.setDataByKey("LocalExtremeValue",heatmapLayer._heatmap._store._max);
                }
            }
        };
        const heatmapLayer = new HeatmapOverlay(cfg);

        const heatmapPoints = {
            max: settings?.topValue || DEFAULT_TOP,
            data: points,
        };
        heatmapLayer.setData(heatmapPoints);
        heatmapLayerRef.current = heatmapLayer;

        //Ermittlung des allgemeinen Spitzenwertes (praktischerweise ist _data nach count sortiert) für Top-Value-Einstellung
        const topValue = heatmapLayer._data[heatmapLayer._data.length - 1].count
        if (globalData.globalData.TopValue !== topValue) {
            globalData.setDataByKey("TopValue", topValue);
            heatmapLayer.setData({max: topValue, data: points});
        }

        map.addLayer(heatmapLayer);
        map.invalidateSize(true)

        return () => {
            map.removeLayer(heatmapLayer)
        };
    }, [settings, points]);

    return null
}