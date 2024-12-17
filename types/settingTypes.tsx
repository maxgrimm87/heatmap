export type Settings =  {
    blur: number; //For adjusting the blur of a dot (default 1)
    box: string; //North west latitude and longitude, south east latitude und longitude; Comma separated (default "75,-180,-65,180")
    dotsize: number; //Defines the value of one heatmap dot (default 100)
    effect: number; //For adjusting the scale (default 0.5)
    height: number; //Height of the resulting image (default 800)
    width: number;  //Width of the resulting image (default 1280)
    opacity: number; //Defines the intensity of heatmap (default 128)
    precision: number; //Location aggregation precision between 1 and 12 (default 8)
    query: string; //Set the query string (default "_exists_:_index")
    url: string; //Defines the url of elastic (default "http://localhost:9200")
}