"use client"

import {useEffect, useRef, useState} from "react";
import {useGlobalData} from "@/context/GlobalData";
import {DEFAULT_COLOR_STOPS} from "@/config/heatmapDefaultValues";

export type ColorStops = {
    pos: number,
    color: string
}

type HeatmapLegendProps = {
    width: number;
    height: number;
    colorStops?: ColorStops[];
    topValue?: number;
}

export default function HeatmapLegend(props: HeatmapLegendProps) {
    const canvasEle = useRef<HTMLCanvasElement>(null);
    const globalData = useGlobalData()
    const [legendMaxValue, setLegendMaxValue] = useState<number>(0)

    useEffect(() => {
        if (globalData.globalData.LocalExtremeOn && globalData.globalData.LocalExtremeValue) {
            setLegendMaxValue(globalData.globalData.LocalExtremeValue);
        } else if (globalData.globalData.TopValue) {
            setLegendMaxValue(globalData.globalData.TopValue);
        } else return;
    }, [globalData.globalData.TopValue, globalData.globalData.LocalExtremeValue]);

    useEffect(() => {
        if (!canvasEle.current) return;

        const canvas = canvasEle.current;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        const colorstops = props?.colorStops || DEFAULT_COLOR_STOPS;

        const grad = ctx.createLinearGradient(6, props.height, props.width, props.height);

        colorstops.map(cs => grad.addColorStop(cs.pos, cs.color));

        ctx.fillStyle = grad;
        ctx.fillRect(6, 10, canvas.width, 20);

        ctx.fillStyle = "white";
        ctx.textAlign = "right";
        ctx.font = "20px Arial";
        ctx.fillText(legendMaxValue.toString(), canvas.width - 4, 27);

        ctx.textAlign = "left";
        ctx.fillText((legendMaxValue / 4).toString(), 10, 27);


    }, [legendMaxValue]);

    return (<canvas ref={canvasEle} width={props.width} height={props.height}></canvas>)

}