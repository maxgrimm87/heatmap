declare module 'heatmap.js/plugins/leaflet-heatmap' {
    import { Layer, Map, LatLngBoundsExpression } from 'leaflet';

    interface HeatmapOptions {
        radius?: number;
        maxOpacity?: number;
        scaleRadius?: boolean;
        useLocalExtrema?: boolean;
        latField?: string;
        lngField?: string;
        valueField?: string;
    }

    interface HeatmapData {
        max: number;
        data: Array<{
            lat: number;
            lng: number;
            count?: number;
            [key: string]: any;
        }>;
    }

    export default class HeatmapOverlay extends Layer {
        constructor(config: HeatmapOptions);

        onAdd(map: Map): void; // Diese Methode ist erforderlich
        onRemove(map: Map): void; // Diese Methode ist ebenfalls erforderlich

        setData(data: HeatmapData): void;
        addData(dataPoint: { lat: number; lng: number; count: number }): void;
    }
}
