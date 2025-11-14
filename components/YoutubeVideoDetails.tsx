'use client';

import { VideoDetails } from "@/types/types";
import { useEffect, useState } from "react";

function YoutubeVideoDetails({ videoId }: { videoId: string }) {

 const [video, setVideo] = useState<VideoDetails | null>(null);

 useEffect(()=>{
    const fetchVideoDetails = async ()=>{
        const video = await getVideoDetails(videoId);
        setVideo(video);
    }
    fetchVideoDetails();
 },[videoId]);
  return (
    <div>YoutubeVideoDetails</div>
  )
}

export default YoutubeVideoDetails