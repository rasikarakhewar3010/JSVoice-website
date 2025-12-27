"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Mic, Volume2, Command, Zap, Code, Terminal, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const textVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
}

import { menuGroups } from "@/lib/docs-config"

export function DocsSidebar() {
    const pathname = usePathname()
    const [isMobileOpen, setIsMobileOpen] = React.useState(false)

    // Close mobile menu on path change
    React.useEffect(() => {
        setIsMobileOpen(false)
    }, [pathname])

    return (
        <>
            {/* Mobile Toggle */}
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#CC5500] text-white shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform"
            >
                {isMobileOpen ? <X /> : <Menu />}
            </button>

            {/* Sidebar Container */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-40 w-64 bg-[#050505]/95 border-r border-[#CC5500]/20 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:fixed lg:top-24 lg:bottom-0 lg:left-0 lg:h-auto backdrop-blur-xl",
                isMobileOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="h-full overflow-y-auto p-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/5 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#CC5500]/50 transition-colors">
                    {/* Brand/Home Link could go here if not in main Nav */}

                    <div className="space-y-8">
                        {menuGroups.map((group, i) => (
                            <div key={group.title} className="space-y-3">
                                <div className="flex items-center space-x-2 text-[#CC5500] font-semibold tracking-wider text-sm uppercase">
                                    <group.icon className="w-4 h-4" />
                                    <span>{group.title}</span>
                                </div>
                                <ul className="space-y-1 border-l border-[#CC5500]/10 ml-2 pl-2">
                                    {group.items.map((item) => {
                                        const isActive = pathname === item.href
                                        return (
                                            <li key={item.href}>
                                                <Link
                                                    href={item.href}
                                                    className={cn(
                                                        "group flex items-center justify-between py-1.5 px-3 rounded-md text-sm transition-all duration-200",
                                                        isActive
                                                            ? "bg-[#CC5500]/10 text-white font-medium"
                                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                                    )}
                                                >
                                                    <span>{item.title}</span>
                                                    {isActive && (
                                                        <motion.div
                                                            layoutId="active-pill"
                                                            className="w-1.5 h-1.5 rounded-full bg-[#CC5500] shadow-[0_0_8px_#CC5500]"
                                                        />
                                                    )}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </>
    )
}
