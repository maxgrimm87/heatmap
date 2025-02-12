import {LFHeatmapData} from "@/types/heatmapData";
import React, {useCallback, useState} from "react";
import {getElasticData} from "@/api/elastic";

type SearchFormProps = {
    setHeatmapData: (heatmapData: LFHeatmapData) => void;
}
export default function SearchForm(sq : SearchFormProps) {
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [index, setIndex] = useState<string>("");

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const coordinates = await getElasticData({
            index: index,
            searchquery: searchQuery,
        })

        sq.setHeatmapData(coordinates)

    }


    return (
        <div>
            <form onSubmit={submitHandler}>
                <label htmlFor="index">Index: </label>
                <input type="text" name="index" value={index} onChange={(e) => setIndex(e.target.value)}/>
                <label htmlFor="searchQuery">Search Query: </label>
                <input type="text" name="searchQuery" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}