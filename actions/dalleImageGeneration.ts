import { api } from "@/convex/_generated/api";
import { FeatureFlag, featureFlagEvents } from "@/features/flags";
import {getConvexClient} from "@/lib/convex";
import { client } from "@/lib/schematic";
import { currentUser } from "@clerk/nextjs/server";
import OpenAI from "openai";

const IMAGE_SIZE = "1792x1024" as const;
const convexClient = getConvexClient();
export const dalleImageGeneration = async (prompt:string,videoId:string)=>{

    const user = await currentUser();

    if(!user?.id){
        throw new Error("User not found");
    }

    const openai = new OpenAI({
        apiKey:process.env.OPENAI_API_KEY
    });

    if(!prompt){
        throw new Error("Failed to generate image prompt"); 
    }
      const imageResponse = await openai.images.generate({
            model:"dall-e-3",
            prompt:prompt,
            n:1,
            
            size:IMAGE_SIZE,
            quality:"standard",
            style:"vivid"
        })

        
        const imageUrl = imageResponse.data?.[0].url;

        if(!imageUrl){
            throw new Error("Failed to generate image");            
        }
         console.log("Getting upload url");
            const postUrl = await convexClient.mutation(api.images.generateUploadUrl);
            console.log("gotten URL");

            const image: Blob = await fetch(imageUrl).then((res)=>res.blob());
            console.log("Downloaded image");
            
            const result = await fetch(postUrl, {
                method:"POST",
                headers:{"Content-Type": image!.type},
                body:image,
            })
            console.log("uploaded image to storage...");
            
        const {storageId} = await result.json();


        await convexClient.mutation(api.images.storeImage,{
            storageId:storageId,
            videoId,
            userId:user.id,
        });

        console.log("Saved image reference to database");

        const dbImageUrl = await convexClient.query(api.images.getImages,{
            videoId,
            userId:user.id,
        });

           await client.track({
                    event: featureFlagEvents[FeatureFlag.IMAGE_GENERATION].event,
                    company:{id:user.id},
                    user:{
                        id:user.id,
                    }
                 })
        

                 return {
                    imageUrl: dbImageUrl
                 }

}