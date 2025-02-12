import { LFHeatmapData } from "@/types/heatmapData";
import axios from "axios";
import {DEFAULT_ELASTIC_SETTINGS} from "@/config/elasticConfig";

type elasticData = {
    username?: string,
    password?: string,
    url?: string,
    index: string,
    searchquery: string,
}

export async function getElasticData(inData: elasticData): Promise<LFHeatmapData> {
    try {
        const requestBody = {
            query: {
                query_string: {
                    query: inData.searchquery,
                },
            },
            size: DEFAULT_ELASTIC_SETTINGS.resultSize
        };

        const { data } = await axios.post(`/api/elastic/${inData?.index || DEFAULT_ELASTIC_SETTINGS.index}`, {
            username: inData?.username || DEFAULT_ELASTIC_SETTINGS.username,
            password: inData?.password || DEFAULT_ELASTIC_SETTINGS.password,
            url: inData?.url || DEFAULT_ELASTIC_SETTINGS.url,
            requestBody: requestBody,
        });

        return {
            maxValue: data.maxValue,
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
