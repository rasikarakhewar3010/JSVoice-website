"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { CodeBlock as EnhancedCodeBlock } from "@/components/code/code-block"

interface DocsHeaderProps {
    title: string
    description?: string
    badges?: string[]
}

export function DocsHeader({ title, description, badges }: DocsHeaderProps) {
    return (
        <div className="relative space-y-6 mb-16 pb-10 border-b border-white/5">
            {/* Ambient Background for Header */}
            <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-[#CC5500]/10 blur-[100px] rounded-full pointer-events-none opacity-50" />

            <div className="relative z-10 flex flex-wrap gap-3 mb-4">
                {badges?.map((badge) => (
                    <span
                        key={badge}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-[#CC5500]/5 text-[#FF8A3D] border border-[#CC5500]/20 shadow-[0_0_10px_rgba(204,85,0,0.1)]"
                    >
                        {badge}
                    </span>
                ))}
            </div>
            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg"
            >
                {title}
            </motion.h1>
            {description && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl"
                >
                    {description}
                </motion.p>
            )}
        </div>
    )
}

export function DocsSection({ title, children, className }: { title?: string, children: React.ReactNode, className?: string }) {
    return (
        <section className={cn("mb-16 space-y-6 relative group/section", className)}>
            {title && (
                <h2 className="text-2xl font-bold text-white flex items-center gap-3 relative inline-flex">
                    <div className="absolute -left-6 top-1.5 w-1 h-5 rounded-full bg-[#CC5500] group-hover/section:h-8 transition-all duration-300 opacity-0 lg:opacity-100" />
                    <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        {title}
                    </span>
                </h2>
            )}
            <div className="text-gray-300 leading-8 text-lg font-light tracking-wide space-y-6">
                {children}
            </div>
        </section>
    )
}

export const CodeBlock = EnhancedCodeBlock;
