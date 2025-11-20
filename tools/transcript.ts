import { getYoutubeTranscript } from "@/actions/getYoutubeTranscript";
import { tool } from "ai";
import {z} from "zod";

export const fetchTranscript = tool({
    description: "Fetch the transcript of a youtube video for",
    inputSchema: z.object({
        videoId:z.string().describe("The video ID to fetch the transcript for"),
    }),
    execute:async({videoId}) => {
        const transcript = await getYoutubeTranscript(videoId);
        return {
            transcript: transcript.transcript,
            cache:transcript.cache
        };
    },

});

export default fetchTranscript;