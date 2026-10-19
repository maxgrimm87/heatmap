import { HeatmapData } from "@/types/heatmapData";
import axios from "axios";
import {DEFAULT_ELASTIC_SETTINGS} from "@/config/elasticConfig";

type elasticData = {
    username?: string,
    password?: string,
    url?: string,
    index: string,
    searchquery?: string,
    precision?: number,
}

export async function getElasticData(inData: elasticData): Promise<HeatmapData> {
    try {

        const { data } = await axios.post(`/api/elastic/${inData?.index || DEFAULT_ELASTIC_SETTINGS.index}`, {
            username: inData?.username || DEFAULT_ELASTIC_SETTINGS.username,
            password: inData?.password || DEFAULT_ELASTIC_SETTINGS.password,
            precision: inData?.precision || 7,
            url: inData?.url || DEFAULT_ELASTIC_SETTINGS.url,
            searchquery: inData.searchquery,

        });

        return {
            points: data.points.map((point: { lat: number; lng: number; count: number }) => ({
                lat: point.lat,
                lng: point.lng,
                count: point.count,
            })),
        };
    } catch (error) {
        console.error("Fehler beim Abrufen von Daten vom Proxy:", error);
        throw new Error("Fehler beim Abrufen von Daten.");
    }
}

export async function getIndices(inData: elasticData): Promise<string[]> {
    try {
        const {data} = await axios.post(`/api/elastic/getIndices`, {
            username: inData?.username || DEFAULT_ELASTIC_SETTINGS.username,
            password: inData?.password || DEFAULT_ELASTIC_SETTINGS.password,
            url: inData?.url || DEFAULT_ELASTIC_SETTINGS.url,
        })
        console.log(data)
        const res =  data.map((item: {index: string}) => {
            if (item.index.charAt(0) !== ".") {
                return item.index;
            }
        }).filter((element:string) => {
            return element !== undefined && element !== null;
        })
        return res;

    } catch (error) {
        console.error("Fehler beim Abrufen der Indices.");
        throw new Error("Fehler beim Abrufen der Indices.");
    }
}
