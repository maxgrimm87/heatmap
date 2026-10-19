"use client"

import {ServiceStatus} from "@/types/heatmapData";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import axios from "axios";

const defaultStatus: ServiceStatus = {
    elasticsearch:false
}
const ServiceStatusContext = createContext<ServiceStatus>(defaultStatus)

export function ServiceStatusProvider({ children }: { children: ReactNode }) {
    const [serviceStatus, setServiceStatus] = useState<ServiceStatus>(defaultStatus)

        useEffect(() => {
            const getServiceStatus = async () => {
                try {
                    const response = await axios.get("/api/status")
                    setServiceStatus(response.data)
                } catch (error) {
                    console.log(error)
                }
            }

            getServiceStatus()

            const interval = setInterval(getServiceStatus, 8000)

            return () => clearInterval(interval)
        }, [])

    return (
            <ServiceStatusContext.Provider value={serviceStatus}>
                {children}
            </ServiceStatusContext.Provider>
    )

}

export function useServiceStatus() {
    return useContext(ServiceStatusContext)
}