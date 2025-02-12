"use client";

import React, {useEffect} from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import HeatmapOverlay from 'heatmap.js/plugins/leaflet-heatmap';
import {LFHeatmapData} from "@/types/heatmapData";
import {
    DEFAULT_HEIGHT,
    DEFAULT_OPACITY,
    DEFAULT_RADIUS,
    DEFAULT_TOP,
    DEFAULT_WIDTH
} from "@/config/heatmapDefaultValues";

export default function Heatmap(heatmapData: LFHeatmapData) {

    useEffect(() => {
        const inData = {
            max: heatmapData.settings?.topValue || DEFAULT_TOP,
            data: heatmapData.points,
        };

        const baseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 18,
            minZoom: 5,
        });

        const cfg = {
            radius: (heatmapData.settings?.radius || DEFAULT_RADIUS)/100,
            maxOpacity: heatmapData.settings?.opacity || DEFAULT_OPACITY,
            scaleRadius: heatmapData.settings?.scaleRadius || true,
            useLocalExtrema: heatmapData.settings?.localExtremes || false,
            latField: 'lat',
            lngField: 'lng',
            valueField: 'count',
        };

        const heatmapLayer = new HeatmapOverlay(cfg);

        const map = new L.Map('map-canvas', {
            center: new L.LatLng(52.5200, 13.4050),
            zoom: 8,
            layers: [baseLayer, heatmapLayer],
        });

        heatmapLayer.setData(inData);

        return () => {
            map.remove();
        };
    }, [heatmapData.points, heatmapData.settings]);

    return <div id="map-canvas"
                style={{
                    height: heatmapData.settings?.height || DEFAULT_HEIGHT,
                    width: heatmapData.settings?.width || DEFAULT_WIDTH,}} />;
};