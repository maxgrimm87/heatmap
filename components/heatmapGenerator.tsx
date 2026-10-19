"use client";

import React, {useEffect, useRef, useState} from 'react';
import L, {LeafletMouseEvent} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import HeatmapOverlay from 'heatmap.js/plugins/leaflet-heatmap';
import {HeatmapData} from "@/types/heatmapData";
import {
    DEFAULT_COLOR_STOPS,
    DEFAULT_HEIGHT,
    DEFAULT_OPACITY,
    DEFAULT_RADIUS,
    DEFAULT_TOP,
    DEFAULT_WIDTH
} from "@/config/heatmapDefaultValues";
import HeatmapLegend, {ColorStops} from "@/components/HeatmapLegend";
import {useGlobalData} from "@/context/GlobalData";
import {useMapEvents} from "react-leaflet";


export default function Heatmap(heatmapData: HeatmapData) {
    const [testvalue, setTestvalue] = useState<number>(0)
    const [maxLocalMaxValue, setLocalMaxValue] = useState<number>(0)
    const [zoom, setZoom] = useState<number>(8)
    const [center, setCenter] = useState<L.LatLng>(new L.LatLng(52.5200, 13.4050))
    const mapDivRef = useRef<HTMLDivElement>(null);
    const LMapRef = useRef<L.Map | null>(null);
    const globalData = useGlobalData()

    useEffect(() => {
        setLocalMaxValue(testvalue)
    }, [testvalue]);

    useEffect(() => {
        if (!LMapRef.current && mapDivRef.current) {
            const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 18,
                minZoom: 5,
            });

            LMapRef.current = new L.Map(mapDivRef.current, {
                center: center,
                zoom: zoom,
                layers: [baseLayer],
            });

        }
    }, []);

    useEffect(() => {
        if (!LMapRef.current) {
            return;
        }
        const inData = {
            max: heatmapData.settings?.topValue || DEFAULT_TOP,
            data: heatmapData.points,
        };

        const cfg = {
            radius: (heatmapData.settings?.radius || DEFAULT_RADIUS)/100,
            maxOpacity: heatmapData.settings?.opacity || DEFAULT_OPACITY,
            scaleRadius: heatmapData.settings?.scaleRadius || true,
            useLocalExtrema: heatmapData.settings?.localExtremes || false,
            latField: 'lat',
            lngField: 'lng',
            valueField: 'count',
            onExtremaChange: function (){
                if(heatmapLayer) {
                     setTestvalue(heatmapLayer._heatmap._store._max);
                }
            }
        };

        const heatmapLayer = new HeatmapOverlay(cfg);
        heatmapLayer.setData(inData);

        const topValue = heatmapLayer._data[heatmapLayer._data.length - 1].count

        if (globalData?.globalData.TopValue !== topValue) {
            globalData?.setDataByKey("TopValue", topValue);
            heatmapLayer.setData({max: topValue, data: heatmapData.points});
        }

        console.log(heatmapLayer);

        LMapRef.current.addLayer(heatmapLayer);
        LMapRef.current.invalidateSize(true)

        return () => {
                LMapRef.current?.removeLayer(heatmapLayer);
        };
    }, [heatmapData.points, heatmapData.settings]);

    return(
    <div>
    <HeatmapLegend width={300} height={70} colorStops={DEFAULT_COLOR_STOPS} topValue={maxLocalMaxValue} />
    <div ref={mapDivRef}
                style={{
                    height: heatmapData.settings?.height || DEFAULT_HEIGHT,
                    width: heatmapData.settings?.width || DEFAULT_WIDTH,}} >
    </div>
        </div>)
};