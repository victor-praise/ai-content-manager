import { error } from "console";
import {ConvexHttpClient} from "convex/browser";


export const getConvexClient = () => {
    if(!process.env.NEXT_PUBLIC_CONVEX_URL){
        throw new Error("No Token is set");
    }

    return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL);
}