import {MapSettings} from "./settingTypes"

export type Coordinates = {
    lat: number
    lng: number
    count: number
}

export type HeatmapData = {
    settings? : MapSettings
    points : Coordinates[]
    maxValue?: number
}
export type ServiceStatus = {
    elasticsearch : boolean
}

export type GlobalDataStruct = {
    TopValue?: number,
    LocalExtremeValue?: number
    LocalExtremeOn?: boolean
}