import {useMap} from "react-leaflet";
import {useCallback, useEffect, useRef} from "react";
import {LeafletMouseEvent, Point} from "leaflet";
import {DEFAULT_CENTER} from "@/config/heatmapDefaultValues";

type TooltiplayerProps = {
    setTooltipPoints : (points: {x: number,y: number}) => void;
    heatmapValue: number
}
export default function TooltipLayer({setTooltipPoints, heatmapValue}: TooltiplayerProps) {
    const map = useMap();
    const tooltipRef = useRef<L.Tooltip | null>(null);

    const clickHandler = (event: LeafletMouseEvent) => {
        setTooltipPoints(event.containerPoint)
        console.log("I am here now")
        if (tooltipRef.current) {
            console.log("Hi there!")
            tooltipRef.current.setLatLng(event.latlng);
        }
    }

    useEffect(() => {
        if(!map) return;

        if (!tooltipRef.current) {
            console.log("I was here")
            tooltipRef.current = L.tooltip({
                interactive: true,
                offset: [-15, -10],
                sticky: true,
            }).setLatLng(DEFAULT_CENTER).setContent("Start!")
            map.addLayer(tooltipRef.current)
        } else {
            tooltipRef.current.setContent("value:"+heatmapValue.toString())
        }

        map.on("click", clickHandler)


        return () => {
            map.off("click", clickHandler)
            if(tooltipRef.current) {
            map.removeLayer(tooltipRef.current)
            }
        }

    }, [map, heatmapValue]);

    return null
}