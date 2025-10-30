'use client';

import Link from "next/link";
import AgentPulse from "./AgentPulse";
import { SignedIn } from "@clerk/nextjs";

function Header() {
  return (
    <header className="sticky top-0 left-0 right-0 px-4 md:px-0 bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="container mx-auto">
            <div className="flex items-center justify-between h-16">
                <Link href="/" className="flex items-center gap-4">
                <AgentPulse size="small" color="blue"/>
                <h1 className="text-xl font-semibold bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">AgentTube </h1>
                </Link>
            </div>

            <div>
                <SignedIn>
                    <Link href="/manage-plan">Manage Plan</Link>
                </SignedIn>
            </div>
        </div>
    </header>
  )
}

export default Header