"use server";

import { getVideoFromUrl } from "@/lib/getVideoFromUrl";
import {redirect} from "next/navigation";

export async function analyseYoutubeVideo(formData: FormData) {
    const url = formData.get("url")?.toString();

    if (!url) return;

    const videoId = getVideoFromUrl(url);

    console.log("Extracted video ID:", videoId);
    
    if(!videoId) return;

    redirect(`/video/${videoId}/analysis`);
}