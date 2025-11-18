import { NextResponse } from "next/server";
import { convertToModelMessages, streamText, UIMessage } from 'ai';

import { generateText } from "ai"
import { anthropic } from "@ai-sdk/anthropic"

export async function POST(req: Request) {
const { text } = await generateText({
model: anthropic("claude-sonnet-4-latest"),
prompt: "What is love?"
})
    const {messages, videoId} = await req.json();

    console.log(messages.parts, " ",videoId);
    messages.map((message: { parts: any; })=>{
        console.log(message.parts.text);
        
    })

    return NextResponse.json({message:"hello"});
}