import AgentPulse from "@/components/AgentPulse";
import YouTubeVideoForm from "@/components/YouTubeVideoForm";
import { Brain, Image as ImageIcon, MessageSquare, Sparkles, Video } from "lucide-react";


const steps = [
  {
    title: "1. Connect Your Content",
    description:"Share your YouTube video URL and let your agent get to work",
    icon: Video,
  },
  {
    title: "2. AI Agent Analysis",
    description:"Watch as your AI agent analyzes your content and generates insights",
    icon: Brain,
  },
  {
    title: "3. Review Interactive Report",
    description:"Receive a detailed report with actionable recommendations to enhance your content",
    icon:MessageSquare,
  }
]
const features = [
  {
    title: "AI Analysis",
    description: "Get deep insights into your video content with our advanced AI analysis. Understand viewer engagement and content quality.",
    icon: Brain,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Smart Transcription",
    description: "Get accurate transcription of your videos. Perfect for creating subtitiles, blog posts, or repurposing content.",
    icon: MessageSquare,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Thumbnail Generation",
    description: "Automatically generate eye-catching thumbnails for your videos to boost click-through rates and viewer engagement.",
    icon: ImageIcon,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    title: "Title Generation",
    description: "create attention-grabing titles for your videos using AI to attract more viewers and increase watch time.",
    icon: MessageSquare,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title:"Shot Script",
    description:"Get detailed, step-by-step instructions to create viral videos. Learn shooting techniques, angles, and editing tips.",
    icon: Video,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    title: "Discuss with your AI Agent",
    description: "Interact with your AI agent to brainstorm ideas, get feedback, and improve your content strategy.",
    icon: Sparkles,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  }

]
export default function Home() {
  return (
    <div className="min-h-screen">

      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-10 text-center mb-12">
            <AgentPulse size="large" color="blue" />
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Meet Your Personal{" "}
              <span className="bg-linear-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">AI Content Agent</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your video content with AI-powered analysis, transcription, and insights. Get started in seconds!
            </p>
            <YouTubeVideoForm/>

          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl ">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for Content Creators</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
{features.map(feature=>{
  const Icon = feature.icon;
  return (
    <div key={feature.title} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-blue-500 transition-all duation-300">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.iconBg} `}>
        <Icon className={`w-6 h-6 ${feature.iconColor}`} />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
        <p className="text-gray-600">{feature.description}</p>
      </div>
    </div>
  );
})}
        </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Meet your AI Agent in 3 Simple Steps</h2>
           <div className="grid md:grid-cols-3 gap-8">
{steps.map(step=>{  const Icon = step.icon;
 return (
  <div key={step.title} className="text-center p-6 rounded-xl bg-white shadow-md hover:shadow-lg transition-all">
    <div className={`w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full flex items-center justify-center mx-auto mb-4`}>
      <Icon className={`w-6 h-6 text-white `} />
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
      <p className="text-gray-600">{step.description}</p>
    </div>
  </div>
);
})} 
          </div>

        </div>
      </section>
      

      <section className="py-20 px-4 md:px-0 bg-gradient-to-r from-blue-600 to-blue-400">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Meet Your AI Content Agent?</h2>
          <p className="text-xl text-blue-50">Join creators leveraging AI to unlock content insights</p>
        </div>
        </section>
    </div>
  );
}
