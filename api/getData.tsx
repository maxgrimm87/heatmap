import {coordinates} from "@/types/heatmapData";

export async function exportFromLocalJson() : Promise<coordinates[]> {
    const response = await fetch('/updated_heatmap_points_brandenburg_v2.json');
    return await response.json();

}

