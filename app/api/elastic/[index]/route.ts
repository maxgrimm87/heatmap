// app/api/elastic/[index]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import https from 'https';

export async function POST(req: NextRequest, { params }: { params: { index: string } }) {
    const { username, password, url, requestBody } = await req.json();

    const { index } = await params; //await ist NICHT obsolet, Webstorm spinnt hier

    const agent = new https.Agent({
        rejectUnauthorized: false,
    });

    try {
        const response = await axios.post(`${url}/${index}/_search`, requestBody, {
            auth: {
                username,
                password,
            },
            httpsAgent: agent,
        });

        const hits = response.data.hits.hits;
        let maxValue = 0
        const points = hits.map((hit: { _source: { location: { latitude: number; longitude: number; accuracy_radius: number } } }) => {
            const lat = hit._source.location.latitude;
            const lng = hit._source.location.longitude;
            const count = hit._source.location.accuracy_radius;

            if (maxValue < count) {
                maxValue = count;
            }

            return { lat, lng, count };
        });

        return NextResponse.json({ points, maxValue });
    } catch (error) {
        console.error("Fehler beim Abrufen von Daten von Elasticsearch:", error);
        return NextResponse.json({ error: "Fehler beim Abrufen von Daten von Elasticsearch" }, { status: 500 });
    }
}
