"use client";

import {useChat} from "@ai-sdk/react";
import { DefaultChatTransport } from 'ai';
import { useState } from "react";
import { Button } from "./ui/button";
import ReactMarkdown from "react-markdown";

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
                    <div key={message.id} className={`flex ${message.role==="user" ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[85%] ${message.role === "user" ? "bg-blue-500" : "bg-gray-100"} rounded-2xl px-4 py-3`}>
                            {message.role==="assistant" ? (     
                                <div className="space-y-3"> 
                                <div className="prose prose-sm max-w-none">
                            {message.parts.map((part, index) =>
            part.type === 'text' ? <ReactMarkdown>{part.text}</ReactMarkdown> : part.type==='tool-invocation' ? (
                <div className="bg-white/50 rounded-lg p-2 space-y-2 text-gray-800">

                </div>
            ):null
          )}
          </div>
          </div>
        ): (         <div className="prose prose-sm max-w-none text-white">
                            {message.parts.map((part, index) =>
            part.type === 'text' ? <ReactMarkdown>{part.text}</ReactMarkdown> : null,
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
            </div>
        </div>
    </div>
  )
}

export default AIAgentChat