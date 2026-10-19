declare module 'heatmap.js/plugins/leaflet-heatmap' {
    import { Layer, Map, LatLngBoundsExpression } from 'leaflet';
    import {Coordinates} from "@/types/heatmapData";

    interface HeatmapOptions {
        radius?: number;
        maxOpacity?: number;
        scaleRadius?: boolean;
        useLocalExtrema?: boolean;
        latField?: string;
        lngField?: string;
        valueField?: string;
        onExtremaChange?: () => void;
        gradient?: {[key: string]: string};
    }

    interface HeatmapData {
        max: number;
        min?: number;
        data: Array<{
            lat: number;
            lng: number;
            count?: number;
            [key: string]: any;
        }>;
    }

    export default class HeatmapOverlay extends Layer {
        constructor(config: HeatmapOptions);

        onAdd(map: Map): Layer;
        onRemove(map: Map): Layer;

        setData(data: HeatmapData): void;
        addData(points: Coordinates|Coordinates[]): void;

        _data: {
            latlng: {lat: number; lng: number};
            count: number;
        }[]

        _heatmap: {
            _store: {
                _max: number;
            }
            setDataMax(number: number): void;
            setDataMin(min: number): void;

            configure(data: HeatmapData): void;
            getValueAt(point: {x: number, y: number});
            getData();
            getDataURL();
            repaint();
        }
    }
}
