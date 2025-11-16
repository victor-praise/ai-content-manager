"use client"

import { FeatureFlag } from "@/features/flags"
import { useSchematicEntitlement } from "@schematichq/schematic-react"
import { useState } from "react";
import Usage from "./Usage";


interface TranscriptEntry{
    text:string;
    timestamp:string;
}
function Transcriptions({videoId}: {videoId: string}) {
    const [transcript,setTranscript] = useState<{transcript: TranscriptEntry[]; cache:string} | null>(null);
    const {featureUsageExceeded} = useSchematicEntitlement(FeatureFlag.TRANSCRIPTION);
  return (
    <div className="border p-4 pb-0 rounded-xl gap-4 flex flex-col">
        <Usage featureFlag={FeatureFlag.TRANSCRIPTION} title="Transcriptions" />


        {!featureUsageExceeded ? (
            <div className="space-y-3 mt-4 max-h-[280px] overflow-y-auto rounded-md p-4">
                    {
                        transcript ? (
                            transcript.transcript.map((entry, index)=> (
                                <div key={index} className="flex gap-2">
                                    <span className="text-sm text-gray-400 min-w-[50px]">{entry.timestamp}</span>
                                    <p className="text-sm text-gray-500">{entry.text}</p>
                                </div>
                            ))
                        ) : (<p className="text-sm text-gray-500">No transcription available</p>)
                    }
            </div>
        ): null}
    </div>
  )
}

export default Transcriptions;