"use client";


import {useFormStatus} from "react-dom"; 
import { useUser } from "@clerk/nextjs";

function AnalyseButton() {

   const { user, isSignedIn } = useUser();

    const {pending} = useFormStatus();

    const isDisabled = pending || !isSignedIn;
  return (
    <button type="submit" disabled={isDisabled} className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium">
       {pending
        ? "Analysing..."
        : isSignedIn
        ? "Analyse Video"
        : "Sign in to analyze video"}
    </button>
  )
}

export default AnalyseButton