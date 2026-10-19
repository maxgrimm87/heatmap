"use client"

import {createContext , useContext, useState} from "react";
import {GlobalDataStruct} from "@/types/heatmapData";
import {ReactNode} from "react";

type GlobalDataProps = {
    globalData: GlobalDataStruct
    setDataByKey: (key: string, value: any) => void
    setGlobalData: (data : GlobalDataStruct) => void
}

const GlobalDataContext = createContext<GlobalDataProps | null>(null);

export function GlobalDataProvider({ children } : { children: ReactNode } ) {
    const [globalData, setGlobalData] = useState<GlobalDataStruct>({});

    const setDataByKey = (key: string, value :any) => {
        setGlobalData((prevState) => ({
            ...prevState,
            [key]: value
        }));
    }
    return (<GlobalDataContext.Provider value={{globalData, setDataByKey, setGlobalData}}>{children}</GlobalDataContext.Provider>)
}

export function useGlobalData() {
    const context = useContext(GlobalDataContext)
    if (!context) {
        throw new Error('useGlobalData must be used within the GlobalDataProvider')
    }
    return context;
}