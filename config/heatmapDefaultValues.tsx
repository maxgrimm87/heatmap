import {ColorStops} from "@/components/HeatmapLegend";

export const DEFAULT_RADIUS = 10
export const DEFAULT_OPACITY = 0.6
export const DEFAULT_BLUR = 0.75
export const DEFAULT_TOP = 20
export const DEFAULT_BOT = 0
export const DEFAULT_WIDTH = 500
export const DEFAULT_HEIGHT = 500
export const DEFAULT_CENTER: [number,number] = [52.5200, 13.4050]
export const DEFAULT_COLOR_STOPS : ColorStops[] = [
{pos: 0, color: "rgb(0,0,255)"},
{pos: 0.33, color: "rgb(0,255,0)"},
{pos: 0.66, color: "yellow"},
{pos: 1, color: "rgb(255,0,0)"}
]
export const DEFAULT_HEATMAP_VALUES = {DEFAULT_RADIUS,DEFAULT_OPACITY,DEFAULT_BLUR,DEFAULT_TOP,DEFAULT_BOT,DEFAULT_WIDTH,DEFAULT_HEIGHT};