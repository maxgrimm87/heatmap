import {HeatmapData} from "@/types/heatmapData";
import React, { useEffect, useState} from "react";
import {getElasticData, getIndices} from "@/api/elastic";
import {useServiceStatus} from "@/context/ServiceStatus";

type SearchFormProps = {
    setHeatmapData: (heatmapData: HeatmapData) => void;
}
export default function SearchForm(sq : SearchFormProps) {
    const [searchQuery, setSearchQuery] = useState<string>("location.country_name:Germany");
    const [index, setIndex] = useState<string>("raw_mumble-64738_20250112_6210");
    const [showSearchButton, setShowSearchButton] = useState(false);
    const [precision, setPrecision] = useState<number>(7);
    const [indices, setIndices] = useState<string[]>([]);
    const {elasticsearch} = useServiceStatus()

    useEffect(() => {
        if (elasticsearch) {
            const importedIndices = getIndices({index: ""})

            importedIndices.then((value) =>setIndices(value))
                .catch((error) => console.log(error))
        }
    }, [elasticsearch])

    useEffect(() => {
        if (indices.length > 0) {
            setShowSearchButton(true);
            return
        }
        setShowSearchButton(false);
    }, [indices]);

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const coordinates = await getElasticData({
            index: index,
            searchquery: searchQuery,
            precision: precision,
        })
        sq.setHeatmapData(coordinates)
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label htmlFor="index">Index: </label>
                <select id="index" onChange={(e) => setIndex(e.target.value)}>
                    {indices.map((index) => (
                        <option key={index} value={index}>{index}</option>
                    ))}
                </select>
                <label htmlFor="searchQuery">Search Query: </label>
                <input type="text" name="searchQuery" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
                <label htmlFor="precision">Precision: </label>
                <input
                    name="precisionSlider"
                    type="range"
                    min={1}
                    max={12}
                    step={1}
                    defaultValue={precision}
                    onChange={(e) => {setPrecision(Number(e.currentTarget.value))}}
                />
                <input
                type="number"
                min={1}
                max={12}
                step={1}
                value={precision}
                onChange={(e) => {setPrecision(Number(e.currentTarget.value))}}/>

                {showSearchButton? <button type="submit">Submit</button>:<p className="text-rose-600">elasticsearch not available</p>}
            </form>
        </div>
    )
}