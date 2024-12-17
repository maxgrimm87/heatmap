import { Settings } from "@/types/settingTypes"
import { useCallback, useState } from "react";

type SettingPageProps = {
setSettings: (settings: Settings) => void;
};

export default function SettingPage({ setSettings }: SettingPageProps) {
    const [blur, setBlur] = useState<number>(1);
    const [box, setBox] = useState<string>("75,-180,-65,180");
    const [dotsize, setDotsize] = useState<number>(100);
    const [effect, setEffect] = useState<number>(0.5);
    const [height, setHeight] = useState<number>(800);
    const [width, setWidth] = useState<number>(1280);
    const [opacity, setOpacity] = useState<number>(128);
    const [precision, setPrecision] = useState<number>(8);
    const [query, setQuery] = useState<string>("_exists_:_index");
    const [url, setUrl] = useState<string>("http://localhost:9200");

    const handleSubmit = useCallback((e : React.FormEvent) => {
        e.preventDefault()
        
        setSettings({blur,box,dotsize,effect,height,width,opacity,precision,query,url})
    },[blur, box, dotsize, effect, height, width, opacity, precision, query, url, setSettings])

    return (
        <div>
            <form>
                <div>
                    <label>Blur:</label>
                    <input
                        type="number"
                        value={blur}
                        step={0.1}
                        onChange={(e) => setBlur(Number(e.target.value))}
                    />
                </div>

                <div>
                    <label>Box:</label>
                    <input
                        type="text"
                        value={box}
                        onChange={(e) => setBox(e.target.value)}
                    />
                </div>

                <div>
                    <label>Dotsize:</label>
                    <input
                        type="number"
                        value={dotsize}
                        step={20}
                        onChange={(e) => setDotsize(Number(e.target.value))}
                    />
                </div>

                <div>
                    <label>Effect:</label>
                    <input
                        type="number"
                        value={effect}
                        step={0.1}
                        onChange={(e) => setEffect(Number(e.target.value))}
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
                        step={20}
                        onChange={(e) => setOpacity(Number(e.target.value))}
                    />
                </div>

                <div>
                    <label>Precision:</label>
                    <input
                        type="number"
                        value={precision}
                        step={1}
                        max={12}
                        min={1}
                        onChange={(e) => setPrecision(Number(e.target.value))}
                    />
                </div>

                <div>
                    <label>Query:</label>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <div>
                    <label>URL:</label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>Änderungen speichern</button>
            </form>
        </div>
    )
}