"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Mic, MicOff } from "lucide-react"
import { menuGroups } from "@/lib/docs-config"
import { cn } from "@/lib/utils"
import { useGlobalVoice } from "@/components/providers/global-voice-provider"

export default function DocsVoiceProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const { voice, voiceStatus, lastCommand, toggleListening } = useGlobalVoice()
    const router = useRouter()

    React.useEffect(() => {
        if (!voice) return;

        // Register Navigation Commands for Docs
        menuGroups.forEach(group => {
            group.items.forEach(item => {
                const phrase = item.title.toLowerCase()

                voice.addCommand(`go to ${phrase}`, () => {
                    router.push(item.href);
                })

                voice.addCommand(`open ${phrase}`, () => {
                    router.push(item.href);
                })
            })
        })

        // We don't need a cleanup that stops the voice here, 
        // because the voice is global. We just leave the commands there
        // or we could remove them if we wanted to be perfectly clean.
        // But for a demo, keeping them is fine as long as they don't clash.
    }, [voice, router])

    return (
        <>
            {/* We don't need a separate status indicator here if we have a global one, 
                but we can keep a subtle one or just rely on the homepage global one.
                Actually, the user said 'implement everywhere', so a consistent global indicator is better.
                I'll remove the local indicator to avoid clutter. */}
            {children}
        </>
    )
}
