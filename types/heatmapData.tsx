import {LfmSettings, Settings} from "./settingTypes"

export type HeatmapPoint = {
    x : number
    y : number
    value : number
    radius : number|undefined
}
export type coordinates = {
    lat: number
    lng: number
    count: number
}


export type HeatmapData = {
    settings : Settings|undefined
    points : HeatmapPoint[]
}

export type LFHeatmapData = {
    settings? : LfmSettings
    points : coordinates[]
    maxValue?: number
}