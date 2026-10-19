import { NextResponse } from "next/server";
import {DEFAULT_ELASTIC_SETTINGS} from "@/config/elasticConfig";
import axios from "axios";
import * as https from "node:https";
import {loadElasticCert} from "@/utlis/server-side/elasticCert";

async function areYouReady(url?: string): Promise<boolean> {
    const httpsAgent = new https.Agent({ca: loadElasticCert()})
    try {
        const result = await axios.get(url||DEFAULT_ELASTIC_SETTINGS.url, {httpsAgent, validateStatus: (state) => state >= 200 && state < 500 });

        return result.status == 200 || result.status == 401;
    } catch (error) {
        return false;
    }
}

export async function GET() {

    const elasticsearch = await areYouReady()

    return NextResponse.json({ elasticsearch });
}
