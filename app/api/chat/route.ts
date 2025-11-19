import { NextResponse } from "next/server";
import { convertToModelMessages, streamText, UIMessage } from 'ai';

import { generateText } from "ai"
import { createAnthropic } from "@ai-sdk/anthropic"
import { currentUser } from "@clerk/nextjs/server";
import { getVideoDetails } from "@/actions/getVideoDetails";

const anthropic = createAnthropic({
    apiKey: process.env.CLAUDE_API_KEY,
    headers:{
        "anthropic-beta": "token-efficient-tools-2025-02-19"
    }
})

export async function POST(req: Request) {

const model = anthropic("claude-3-5-haiku-20241022");

    const {messages, videoId}:{messages: UIMessage[]; videoId:string;} = await req.json();

    const user = await currentUser();

    if(!user){
        return NextResponse.json({error:"Unauthorized"}, {status:401});
    }
    const videoDetails = await getVideoDetails(videoId);

    const systemMessage = `You are an AI agent ready to accept questions from the user about ONE specific video. the video ID in question is ${videoId} but you'll refer to this as ${videoDetails?.title || "Selected Video"}. Use emojis to make the conversation more engaging. If an error occurs, explain it to the user and ask them to try again later. If the error suggest the user upgrade, explain that they must upgrade to use the feature, tell them to go 'Manage Plan' in the header and upgrade. If any tool is used, analyse the response and if it contains a cache, explain that the transcript is cached because they previously transcribed the video saving the user a token - use words like database instead of cache to make it more easy to understand. Format for notion.` 

    const result = streamText({
        model,
        system:systemMessage,
        messages: convertToModelMessages(messages),
});

   

    return result.toUIMessageStreamResponse();
}