import {LfmSettings} from "@/types/settingTypes";
import {
    DEFAULT_HEIGHT,
    DEFAULT_OPACITY,
    DEFAULT_RADIUS,
    DEFAULT_TOP,
    DEFAULT_WIDTH
} from "@/config/heatmapDefaultValues";
import React, {useCallback, useEffect, useState} from "react";

type LfmSettingPageProps = {
    setSettings: (settings: LfmSettings) => void;
    foundMaxValue?: number;
};
export default function LfmSettingPage({setSettings, foundMaxValue}: LfmSettingPageProps) {
    const [height, setHeight] = useState<number>(DEFAULT_HEIGHT);
    const [width, setWidth] = useState<number>(DEFAULT_WIDTH);
    const [topValue, setTopValue] = useState<number>(DEFAULT_TOP);
    const [maxZoom, setMaxZoom] = useState<number>(18);
    const [maxValue,setMaxValue] = useState<number>(foundMaxValue || 100);
    const [opacity, setOpacity] = useState<number>(DEFAULT_OPACITY);
    const [radius, setRadius] = useState<number>(DEFAULT_RADIUS);
    const [scaleRadius, setScaleRadius] = useState<boolean>(true);
    const [localExtremes, setLocalExtremes] = useState<boolean>(false);

    useEffect(() => {
        if (foundMaxValue) {
            setMaxValue(foundMaxValue);
        }
    }, [foundMaxValue]);

    const handleSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault()

        setSettings({height, width, topValue, maxZoom, opacity, radius, scaleRadius, localExtremes})
    }, [height, width, topValue, maxZoom, opacity, radius, scaleRadius, localExtremes])

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
                            defaultValue={height}
                            onChange={(e) => {
                                setHeight(Number(e.currentTarget.value))
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
                            defaultValue={width}
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
                            defaultValue={topValue}
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
                            defaultValue={opacity}
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
                            defaultValue={radius}
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
                                onClick={() => setLocalExtremes(!localExtremes)}>local
                            Extremes {localExtremes ? "on" : "off"}</button>
                        <input type="submit" hidden/></td>
                </tr>
                </tbody>
            </table>
        </form>
    )
}