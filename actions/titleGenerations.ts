'use server';

import { getConvexClient } from "@/lib/convex";
import OpenAI from "openai";
import { currentUser } from "@clerk/nextjs/server";
import { api } from "@/convex/_generated/api";

const convexClient = getConvexClient();

export async function titleGenerations(videoId:string,videoSummary:string,considerations:string){
    const user = await currentUser();

    if(!user?.id){
        throw new Error("user not found");
    }

     const openai = new OpenAI({
            apiKey:process.env.OPENAI_API_KEY
        });

        try{
                console.log("Summary", videoSummary);
                console.log("Generating title for video", videoId);
                console.log("Considerations: ", considerations);
                
                const response = await openai.chat.completions.create({
                    model: 'gpt-4o-mini',
                    messages:[
                        {
                            role:"system",
                            content:"You are a helpful YouTube video creator assitant that creates high quality SEO friendly concise video titles.",
                        },
                        {
                            role:"user",
                            content:`Please provide ONE concise YouTube title (and nothing else) for this video. Focus on the main points and key takeaways, it should be SEO friendly and 100 characters or less:\n\n${videoSummary}\n\n${considerations}`
                        },
                        
                    ],
                    temperature:0.7,
                    max_completion_tokens:500,
                });
                const title = response.choices[0]?.message?.content || "Unable to generate title";

                if(!title){
                    return {
                        error:"failed to generate title"
                    }
                }

                await convexClient.mutation(api.titles.generate, {
                    videoId,
                    userId:user.id,
                    title:title,
                })
        }catch(error){
            console.error("Error generating title", error);
            throw new Error("Failed to gnerate title");
        }
}