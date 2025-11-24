import {getConvexClient} from "@/lib/convex";
import { currentUser } from "@clerk/nextjs/server";


const IMAGE_SIZE = "1792x1024" as const;
const convexClient = getConvexClient();
export const dalleImageGeneration = async (promp:string,videoId:string)=>{

    const user = await currentUser();

    if(!user?.id){
        throw new Error("User not found");
    }
}