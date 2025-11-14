'use server';

import {google} from "googleapis";
import { VideoDetails } from '@/types/types';

const youtube = google.youtube({version:"v3",auth:process.env.YOUTUBE_API_KEY});


export async function getVideoDetails(videoId:string){
    console.log("fetching video details for: ",videoId);

    try {
        const videoResponse = await youtube.videos.list({
            part:["statistics","snippet"],
            id:[videoId]
        });

        const videoDetails = videoResponse.data.items?.[0];

        if(!videoDetails) throw new Error("Video not found");


        const channelResponse = await youtube.channels.list({
            part:["snippet","statistics"],
            id:[videoDetails.snippet?.channelId || ''],
            key: process.env.YOUTUBE_API_KEY,
        });
        
    } catch (error) {
        console.log("Error fetching video details: ",error);
        
        return null;
    }
    
}