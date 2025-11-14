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

        const channelDetails = channelResponse.data.items?.[0];

        console.log("fetched successfully");

        const video: VideoDetails = {
            title: videoDetails.snippet?.title || 'No title',
            thumbnail: videoDetails.snippet?.thumbnails?.high?.url || videoDetails.snippet?.thumbnails?.default?.url || videoDetails.snippet?.thumbnails?.maxres?.url || '',
            publishedAt: videoDetails.snippet?.publishedAt || new Date().toISOString(),
            views: videoDetails.statistics?.viewCount || '0',
            likes: videoDetails.statistics?.likeCount || '0',
            comments: videoDetails.statistics?.commentCount || '0',

            channel:{
                title:videoDetails.snippet?.channelTitle || 'No channel title',
                thumbnail: channelDetails?.snippet?.thumbnails?.default?.url || '',
                subscribers: channelDetails?.statistics?.subscriberCount || '0',
            }
        };
        
        return video;
        
    } catch (error) {
        console.log("Error fetching video details: ",error);
        
        return null;
    }
    
}