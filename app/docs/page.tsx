import type { Metadata } from 'next';

import { DocsHeader, DocsSection, CodeBlock } from "@/components/docs/page-template"
import Link from "next/link"
import { ArrowRight, Mic, Speaker, Sparkles } from "lucide-react"

export const metadata: Metadata = {
    title: "Introduction to Voice Control | JSVoice",
    description: "Get started with JSVoice - the zero-dependency JavaScript voice command library. Learn about voice recognition, speech synthesis, and natural language processing features.",
    openGraph: {
        title: "Introduction to Voice Control | JSVoice",
        description: "Zero-dependency voice control for web apps. Add voice commands to React, Vue, or Vanilla JS in minutes.",
    }
};

export default function IntroductionPage() {
    return (
        <div className="min-h-screen">
            <DocsHeader
                title="Introduction"
                description="JSVoice is a lightweight, zero-dependency JavaScript library that brings voice command and speech synthesis capabilities to web applications."
                badges={["v0.2.1", "Zero Dependencies", "< 2KB gzipped"]}
            />

            <DocsSection>
                <p>
                    Built on top of the generic Web Speech API, JSVoice provides a unified, coherent interface for adding voice capabilities to your React, Vue, or vanilla JS applications. It handles the complexity of browser differences, permission management, and state handling so you can focus on building magic.
                </p>
            </DocsSection>

            <div className="grid md:grid-cols-3 gap-6 mb-16">
                {[
                    {
                        icon: Mic,
                        title: "Voice Recognition",
                        desc: "Convert speech to text in real-time with continuous listening support."
                    },
                    {
                        icon: Speaker,
                        title: "Speech Synthesis",
                        desc: "Make your app talk back with customizable voices, pitch, and rate."
                    },
                    {
                        icon: Sparkles,
                        title: "Pattern Matching",
                        desc: "Extract variables from commands like 'Order {quantity} pizzas'."
                    }
                ].map((feature, i) => (
                    <div key={i} className="p-8 rounded-2xl bg-[#141414] border border-white/5 hover:border-[#CC5500]/30 transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#CC5500]/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#CC5500]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                            <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:border-[#CC5500]/30">
                                <feature.icon className="w-6 h-6 text-[#CC5500]" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
                            <p className="text-base text-gray-400 leading-relaxed font-light">{feature.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

            <DocsSection title="Why JSVoice?">
                <ul className="grid gap-3">
                    {[
                        "Zero external dependencies - keeps your bundle light",
                        "Built-in wake word detection ('Hey Computer')",
                        "Real-time audio visualization hooks",
                        "TypeScript ready with full type definitions",
                        "Works offline (depending on browser engine)"
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#CC5500] shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </DocsSection>

            <DocsSection title="Browser Support">
                <div className="overflow-x-auto rounded-xl border border-white/5 bg-[#0A0A0A] no-scrollbar shadow-xl">
                    <table className="w-full text-sm text-left border-collapse min-w-[500px]">
                        <thead className="bg-white/[0.02] text-gray-400 font-mono">
                            <tr className="border-b border-white/5">
                                <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]">Browser</th>
                                <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]">Support</th>
                                <th className="px-6 py-4 font-black uppercase tracking-widest text-[10px]">Notes</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5 text-gray-400">
                            <tr className="hover:bg-white/[0.01] transition-colors">
                                <td className="px-6 py-4 text-white font-medium">Chrome / Edge</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-[10px] font-bold uppercase">Full Support</span>
                                </td>
                                <td className="px-6 py-4 text-xs">Best experience (Google Chromium Engine)</td>
                            </tr>
                            <tr className="hover:bg-white/[0.01] transition-colors">
                                <td className="px-6 py-4 text-white font-medium">Safari</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 text-[10px] font-bold uppercase">Partial</span>
                                </td>
                                <td className="px-6 py-4 text-xs">Requires user gesture for activation</td>
                            </tr>
                            <tr className="hover:bg-white/[0.01] transition-colors">
                                <td className="px-6 py-4 text-white font-medium">Firefox</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-red-500/10 text-red-500 text-[10px] font-bold uppercase">None</span>
                                </td>
                                <td className="px-6 py-4 text-xs">Speech Recognition API currently disabled</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </DocsSection>

            <div className="flex justify-end pt-8">
                <Link
                    href="/docs/get-started/installation"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#CC5500] text-white font-medium hover:bg-[#CC5500]/90 transition-colors hover:pr-8 duration-300"
                >
                    Next: Installation
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </div>
    )
}
