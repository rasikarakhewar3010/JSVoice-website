"use client"

import { DocsSidebar } from "@/components/docs/docs-sidebar"
import { motion } from "framer-motion"
import DocsVoiceProvider from "@/components/docs/docs-voice-provider"

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <DocsVoiceProvider>
            <div className="flex min-h-screen bg-[#050505] pt-24 relative overflow-x-hidden">
                {/* Ambient Backgrounds */}
                <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-[#CC5500]/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-[#CC5500]/5 blur-[120px] rounded-full pointer-events-none" />

                <DocsSidebar />
                <main className="flex-1 w-full lg:max-w-[100vw] min-h-screen relative z-10 lg:pl-64 flex flex-col">
                    <div className="max-w-4xl mx-auto px-4 py-8 lg:px-12 lg:py-12 flex-1 w-full">
                        {children}
                    </div>
                </main>
            </div>
        </DocsVoiceProvider>
    )
}
