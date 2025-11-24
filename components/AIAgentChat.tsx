"use client";

import {useChat} from "@ai-sdk/react";
import { DefaultChatTransport, UIMessage } from 'ai';
import { useState } from "react";
import { Button } from "./ui/button";
import ReactMarkdown from "react-markdown";
import { useSchematicFlag } from "@schematichq/schematic-react";
import { FeatureFlag } from "@/features/flags";
import { ImageIcon, LetterText, PenIcon } from "lucide-react";


function AIAgentChat({videoId}: {videoId:string}) {

    const [input, setInput] = useState('');
    const {messages, sendMessage, setMessages, status} = useChat({
        transport: new DefaultChatTransport({
            body: {
                videoId,
            },
        }),
    });

    const isScriptGenerationEnabled = useSchematicFlag(FeatureFlag.SCRIPT_GENERATION);
    const isImageGenerationEnabled = useSchematicFlag(FeatureFlag.IMAGE_GENERATION);
    const isTitleGenerationEnabled = useSchematicFlag(FeatureFlag.TITLE_GENERATION);
    const isVideoAnalysisEnabled = useSchematicFlag(FeatureFlag.ANALYSE_VIDEO);


    const generateScript = async () => {
        const randomId = Math.random().toString(36).substring(2,15);

        const userMessage: UIMessage = {
            id:`generate-script-${randomId}`,
            role:"user",
            parts:[{type:'text', text:"Generate a step-by-step shooting script for this video that i can use on my own channel to produce a video that is similar to this one, don't do any other steps such as generating an image, just generate the script only."}],
        }

        // setMessages((prev)=>[...prev, userMessage]);
        sendMessage(userMessage);
    }
    const generateImage = async () => {
        const randomId = Math.random().toString(36).substring(2,15);

        const userMessage: UIMessage = {
            id:`generate-script-${randomId}`,
            role:"user",
            parts:[{type:'text', text:"Generate a thumbnail for this video"}],
        }

        // setMessages((prev)=>[...prev, userMessage]);
        sendMessage(userMessage);
    }
    const generateTitle = async () => {
        const randomId = Math.random().toString(36).substring(2,15);

        const userMessage: UIMessage = {
            id:`generate-script-${randomId}`,
            role:"user",
            parts:[{type:'text', text:"Generate a title for this video"}],
        }

        // setMessages((prev)=>[...prev, userMessage]);
        sendMessage(userMessage);
    }
  return (
    <div className="flex flex-col h-full">
        <div className="hidden lg:block px-4 pb-3 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">AI Agent</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="space-y-6">
                {messages.length===0 && (
                    <div className="flex items-center justify-center h-full min-h-[200px]">
                    <div className="text-lg font-medium text-gray-700">
                        <h3>Welcome to AI Agent Chat</h3>
                        <p className="text-sm text-gray-500">
                        Ask any question about your video!
                    </p>
                    </div>
                    </div>
                    
                )}

                {messages.map((message,index)=> (
                    
                    <div key={message.id} className={`flex ${message.role==="user" ? "justify-end" : "justify-start"}`}>
                      
                        <div className={`max-w-[85%] ${message.role === "user" ? "bg-blue-500" : "bg-gray-100"} rounded-2xl px-4 py-3`}>
                            {message.role==="assistant" ? (     
                                <div className="space-y-3"> 
                                
                            {message.parts.map((part, index) =>
                            
                        
            part.type === 'text' ? <div key={index} className="prose prose-sm max-w-none"> <ReactMarkdown>{part.text}</ReactMarkdown> </div> : part.type==='tool-fetchTranscript' ? (
                <div key={index} className="bg-white/50 rounded-lg p-2 space-y-2 text-gray-800">
                        <div className="font-medium text-xs">
                            Tool Name: GetTranscript
                            
                           
                        </div>
                       
                            <pre className="text-xs bg-white/75 p-2 rounded overflow-auto max-h-40">
                                {JSON.stringify(
                                    part.output,null,2
                                )}
                            </pre>
                        
                </div>
            ):null
          )}
          
          </div>
        ): (         <div className="prose prose-sm max-w-none text-white">
                            {message.parts.map((part, index) =>
            part.type === 'text' ? <ReactMarkdown key={index}>{part.text}</ReactMarkdown> : null,
          )}
          </div>)}
               
          </div>
                    </div>
                ))}
            </div>
        </div>

        <div className="border-t border-gray-100 p-4 bg-white">
            <div className="space-y-3">
                <form
                className="flex gap-2"
                      onSubmit={e => {
          e.preventDefault();
          if (input.trim()) {
            sendMessage({ text: input });
            setInput('');
          }
        }}
                >
                <input className="flex-1 px-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={input}
          onChange={e => setInput(e.target.value)}
          
          placeholder="Enter a question...."
        />
       <Button type="submit" className="px-4 py-2 bg-blue-500 text-white text-sm rounded-full hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" >Send</Button>
                </form>
                <div className="flex gap-2">
                    <button className="text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={generateScript} type="button" disabled={!isScriptGenerationEnabled}
                    >
                        <LetterText className="w-4 h-4" />
                        {isScriptGenerationEnabled ? (<span>Generate Script</span>):(<span>Upgrade to generate a script</span>)}
                    </button>
                    <button className="text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={generateTitle} type="button" disabled={!isTitleGenerationEnabled}
                    >
                        <PenIcon className="w-4 h-4" />
                       Generate Title
                    </button>
                    <button className="text-xs xl:text-sm w-full flex items-center justify-center gap-2 py-2 px-4 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={generateImage} type="button" disabled={!isImageGenerationEnabled}
                    >
                        <ImageIcon className="w-4 h-4" />
                       Generate Image
                    </button>


                </div>
            </div>
        </div>
    </div>
  )
}

export default AIAgentChat