import {MapContainer, TileLayer} from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import {DEFAULT_CENTER, DEFAULT_HEIGHT, DEFAULT_WIDTH} from "@/config/heatmapDefaultValues";
import {HeatmapData} from "@/types/heatmapData";
import HeatmapLayer from "@/components/HeatmapLayer";
import TooltipLayer from "@/components/TooltipLayer";
import {useEffect, useState} from "react";


export default function MainMap(heatmapData: HeatmapData) {
    const settings = heatmapData.settings;
    const position = DEFAULT_CENTER;
    const [tooltipPoint, setTooltipPoint] = useState<{x: number, y: number}>();
    const [heatmapValue, setHeatmapValue] = useState<number>(0);
    const zoom = 8;

    useEffect(() => {
        console.log("ToolTipPoint"+tooltipPoint);
    }, [tooltipPoint]);

    useEffect(() => {
        console.log("Heatmapvalue"+heatmapValue)
    }, [heatmapValue]);


    return (
        <div style={{height: settings?.height || DEFAULT_HEIGHT, width: settings?.width || DEFAULT_WIDTH}}>
        <MapContainer center={position} zoom={zoom} scrollWheelZoom={true} style={{height: '100%', width: '100%'}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <TooltipLayer setTooltipPoints={setTooltipPoint} heatmapValue={heatmapValue} />
            <HeatmapLayer points={heatmapData.points} settings={heatmapData.settings} setHeatmapValue={setHeatmapValue} TooltipPointer={tooltipPoint}/>
        </MapContainer>
    </div>
    )
}