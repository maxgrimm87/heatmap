import { Settings } from "@/types/settingTypes"
import React, { useCallback, useState } from "react";

import {
    DEFAULT_BLUR,
    DEFAULT_BOT,
    DEFAULT_HEIGHT,
    DEFAULT_OPACITY, DEFAULT_RADIUS,
    DEFAULT_TOP,
    DEFAULT_WIDTH
} from "@/config/heatmapDefaultValues";

type SettingPageProps = {
setSettings: (settings: Settings) => void;
};


export default function SettingPage({ setSettings }: SettingPageProps) {
    const [blur, setBlur] = useState<number>(DEFAULT_BLUR);
    const [dotsize, setDotsize] = useState<number>(DEFAULT_RADIUS);
    const [bottomValue, setBottomValue] = useState<number>(DEFAULT_BOT);
    const [topValue, setTopValue] = useState<number>(DEFAULT_TOP)
    const [height, setHeight] = useState<number>(DEFAULT_HEIGHT);
    const [width, setWidth] = useState<number>(DEFAULT_WIDTH);
    const [opacity, setOpacity] = useState<number>(DEFAULT_OPACITY);
    const [precision, setPrecision] = useState<number>(8);

    const handleSubmit = useCallback((e : React.FormEvent) => {
        e.preventDefault()
        
        setSettings({blur, dotsize, bottomValue, topValue, height, width, opacity, precision})
    },[blur, dotsize, bottomValue, topValue, height, width, opacity, precision, setSettings])

    return (
        <div>
            <form>
                <div>
                    <label>Blur:</label>
                    <input
                        type="number"
                        value={blur}
                        step={0.05}
                        onChange={(e) => setBlur(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label>Bottom Value:</label>
                    <input
                        type="number"
                        value={bottomValue}
                        step={1}
                        onChange={(e) => setBottomValue(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label>Top Value:</label>
                    <input
                        type="number"
                        value={topValue}
                        step={1}
                        onChange={(e) => setTopValue(Number(e.target.value))}
                    />
                </div>
                <div>
                    <label>Dotsize:</label>
                    <input
                        type="number"
                        value={dotsize}
                        step={5}
                        onChange={(e) => setDotsize(Number(e.target.value))}
                    />
                </div>

                <div>
                    <label>Height:</label>
                    <input
                        type="number"
                        value={height}
                        step={20}
                        onChange={(e) => setHeight(Number(e.target.value))}
                    />
                </div>

                <div>
                    <label>Width:</label>
                    <input
                        type="number"
                        value={width}
                        step={20}
                        onChange={(e) => setWidth(Number(e.target.value))}
                    />
                </div>

                <div>
                    <label>Opacity:</label>
                    <input
                        type="number"
                        value={opacity}
                        step={0.05}
                        onChange={(e) => setOpacity(Number(e.target.value))}
                    />
                </div>

                <div>
                    <label>Precision (no function):</label>
                    <input
                        type="number"
                        value={precision}
                        step={1}
                        max={12}
                        min={1}
                        onChange={(e) => setPrecision(Number(e.target.value))}
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>Änderungen speichern</button>
            </form>
        </div>
    )
}