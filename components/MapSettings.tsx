import {MapSettings} from "@/types/settingTypes";
import {
    DEFAULT_HEIGHT,
    DEFAULT_OPACITY,
    DEFAULT_RADIUS,
    DEFAULT_TOP,
    DEFAULT_WIDTH
} from "@/config/heatmapDefaultValues";
import React, {useCallback, useEffect, useState} from "react";
import {useGlobalData} from "@/context/GlobalData";

//TODO:
//  FEHLER: Slider springt in Firefox zurück auf letzten Wert. Chromium funktioniert. Number Input auch


type SettingPageProps = {
    setSettings: (settings: MapSettings) => void;

};
export default function MapSettingPage({setSettings}: SettingPageProps) {
    const [height, setHeight] = useState<number>(DEFAULT_HEIGHT);
    const [width, setWidth] = useState<number>(DEFAULT_WIDTH);
    const [maxZoom, setMaxZoom] = useState<number>(18);
    const [maxValue,setMaxValue] = useState<number>(100);
    const [topValue, setTopValue] = useState<number>(DEFAULT_TOP);
    const [opacity, setOpacity] = useState<number>(DEFAULT_OPACITY);
    const [radius, setRadius] = useState<number>(DEFAULT_RADIUS);
    const [scaleRadius, setScaleRadius] = useState<boolean>(true);
    const [localExtremes, setLocalExtremes] = useState<boolean>(false);
    const { globalData, setDataByKey }  = useGlobalData()


    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault()

        setSettings({height, width, topValue, maxZoom, opacity, radius, scaleRadius, localExtremes})
    }, [height, width, topValue, maxZoom, opacity, radius, scaleRadius, localExtremes])

    useEffect(() => {
        if (globalData.TopValue) {
            setMaxValue(globalData.TopValue)
            setTopValue(globalData.TopValue)
        }
    }, [globalData.TopValue]);

    return (<form onSubmit={handleSubmit}>
            <table>
                <tbody>
                <tr>
                    <td style={{ width: "50%" }}>
                        <label htmlFor="heightSlider">Height: </label>
                        <input
                            name="heightSlider"
                            type="range"
                            min={200}
                            max={2000}
                            step={20}
                            value={height}
                            onChange={(e) => {
                                setTimeout(() => {setHeight(Number(e.currentTarget.value))}, 10)

                            }}
                            onMouseUp={handleSubmit}
                        />
                        <input
                            type="number"
                            min={200}
                            max={2000}
                            step={20}
                            value={height}
                            onChange={(e) => {
                                setHeight(Number(e.target.value));
                            }}
                        />
                    </td>
                    <td style={{ width: "50%" }}>
                        <label htmlFor="widthSlider">Width: </label>
                        <input
                            name="widthSlider"
                            type="range"
                            min={200}
                            max={2000}
                            step={20}
                            value={width}
                            onChange={(e) => {
                                setWidth(Number(e.currentTarget.value))
                            }}
                            onMouseUp={handleSubmit}
                        />
                        <input
                            type="number"
                            min={200}
                            max={2000}
                            step={20}
                            value={width}
                            onChange={(e) => {
                                setWidth(Number(e.target.value));
                            }}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="topSlider">Top Value: </label>
                        <input
                            name="topSlider"
                            type="range"
                            min={10}
                            max={maxValue}
                            step={1}
                            value={topValue}
                            onChange={(e) => {
                                setTopValue(Number(e.currentTarget.value))
                            }}
                            onMouseUp={handleSubmit}
                        />
                        <input
                            type="number"
                            min={10}
                            max={maxValue}
                            step={1}
                            value={topValue}
                            onChange={(e) => {
                                setTopValue(Number(e.target.value));
                            }}
                        />
                    </td>
                    <td>
                        <label htmlFor="opacitySlider">Opacity: </label>
                        <input
                            name="opacitySlider"
                            type="range"
                            min={0}
                            max={1}
                            step={0.05}
                            value={opacity}
                            onChange={(e) => {
                                setOpacity(Number(e.currentTarget.value))
                            }}
                            onMouseUp={handleSubmit}
                        />
                        <input
                            type="number"
                            min={0}
                            max={1}
                            step={0.05}
                            value={opacity}
                            onChange={(e) => {
                                setOpacity(Number(e.target.value));
                            }}
                        /></td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <label htmlFor="radiusSlider">Radius: </label>
                        <input
                            name="radiusSlider"
                            type="range"
                            min={1}
                            max={50}
                            step={1}
                            value={radius}
                            onChange={(e) => {
                                setRadius(Number(e.currentTarget.value))
                            }}
                            onMouseUp={handleSubmit}
                        />
                        <input
                            type="number"
                            min={1}
                            max={50}
                            step={1}
                            value={radius}
                            onChange={(e) => {
                                setRadius(Number(e.target.value));
                            }}
                        /></td>
                </tr>
                    <tr>
                    <td colSpan={2}>
                        <button type="submit" className="button-74" onClick={() => setScaleRadius(!scaleRadius)}>scale
                            radius {scaleRadius ? "on" : "off"}</button>
                        <button type="submit" className="button-74"
                                onClick={() => {
                                    setLocalExtremes(!localExtremes)
                                    setDataByKey("LocalExtremeOn", !localExtremes)
                                }}>local
                            Extremes {localExtremes ? "on" : "off"}</button>
                        <input type="submit" hidden/></td>
                </tr>
                </tbody>
            </table>
        </form>
    )
}