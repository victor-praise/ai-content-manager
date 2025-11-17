"use client";

import {useChat} from "@ai-sdk/react";
import { DefaultChatTransport } from 'ai';
import { useState } from "react";

function AIAgentChat({videoId}: {videoId:string}) {

    const [input, setInput] = useState('');
    const {messages, sendMessage, setMessages, status} = useChat({
        transport: new DefaultChatTransport({
            body: {
                videoId,
            },
        }),
    });
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
                    <div>
                        
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default AIAgentChat