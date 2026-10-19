import {NextRequest, NextResponse} from 'next/server';
import {Client} from "@elastic/elasticsearch";
import {loadElasticCert} from "@/utlis/server-side/elasticCert";

export async function POST(req: NextRequest, {params}: { params: { index: string } }) {
    const {index} = await params; //await ist NICHT obsolet

    const {username, password, precision, url, searchquery} = await req.json();

    const client = new Client({
        node: url,
        ssl: {
            ca: loadElasticCert(),
            rejectUnauthorized: true,
        },
        auth: {
            username: username,
            password: password,
        }
    })

    if (index === "getIndices") {
        try {
            const {body} = await client.cat.indices({format: "json"})

            return NextResponse.json(body)
        }
        catch (error) {
            console.error("Fehler beim suchen der Indices")
        }
    }

    const searchQueryStringSearch = {
        index: index,
        size: 0,
        body: {
            query: {
                query_string: {
                    query: searchquery,
                },
            },
            aggregations: {
                grid: {
                    geohash_grid: {
                        field: "location.location",
                        precision: precision
                    },
                    aggregations: {
                        center: {
                            geo_centroid: {
                                field: "location.location",
                            }
                        }
                    }
                }
            }
        }
    }


    try {
        const response = await client.search(searchQueryStringSearch);

        const points = response.body.aggregations.grid.buckets.map((bucket: {
            center: {
                location: {
                    lat: number;
                    lon: number;
                };
            };
            doc_count: number;
        }) => ({
            lat: bucket.center.location.lat,
            lng: bucket.center.location.lon,
            count: bucket.doc_count,
        }))

        return NextResponse.json({points});
    } catch (error) {
        console.error("Fehler beim Abrufen von Daten von Elasticsearch:", error);
        return NextResponse.json({error: "Fehler beim Abrufen von Daten von Elasticsearch"}, {status: 500});
    }
}
