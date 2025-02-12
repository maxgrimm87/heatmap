export type Settings = {
    blur: number; //For adjusting the blur of a dot (default 1)
    dotsize: number; //Defines the value of one heatmap dot (default 100)
    bottomValue: number;
    topValue: number;
    height: number; //Height of the resulting image (default 800)
    width: number;  //Width of the resulting image (default 1280)
    opacity: number; //Defines the intensity of heatmap (default 128)
    precision: number; //Location aggregation precision between 1 and 12 (default 8)
}

export type LfmSettings = {
    height: number;
    width: number;
    topValue: number;
    maxZoom: number;
    opacity: number;
    radius: number;
    scaleRadius:boolean;
    localExtremes: boolean;
}