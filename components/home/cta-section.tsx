'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Silk from '@/components/Silk';
import { motion } from 'framer-motion';

export function CTASection() {
    return (
        <section className="relative py-12 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto max-w-7xl">
                <div className="relative w-full overflow-hidden rounded-[2.5rem] bg-[#0A0A0A] border border-white/5 shadow-2xl shadow-[#CC5500]/10 group">

                    {/* Background: Silk with overlay */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="w-full h-full opacity-50 mix-blend-hard-light">
                            <Silk
                                speed={10}
                                scale={1}
                                rotation={0.2}
                                noiseIntensity={0.5}
                                color="#CC5500"
                            />
                        </div>
                        {/* Gradient slightly reduced to show more silk */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center justify-center text-center py-12 px-6 sm:px-12 lg:py-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight drop-shadow-lg">
                                Start Exploring
                            </h2>

                            <p className="text-gray-300 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto">
                                Animations, Components, Backgrounds - <span className="text-[#FF8A3D] font-medium">One Click Away</span>
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="mt-8"
                        >
                            <Link href="/docs/get-started/installation" className="relative inline-flex group cursor-pointer">
                                {/* Outer Glow Ring 1 - Furthest (Orange tinted) */}
                                <div className="absolute -inset-8 bg-[#CC5500]/10 rounded-full blur-3xl opacity-20 group-hover:opacity-40 group-hover:-inset-10 transition-all duration-700"></div>

                                {/* Outer Glow Ring 2 - Mid (Orange tinted) */}
                                <div className="absolute -inset-4 bg-[#FF8A3D]/15 rounded-full blur-2xl opacity-25 group-hover:opacity-50 group-hover:-inset-6 transition-all duration-500"></div>

                                {/* Outer Glow Ring 3 - Close (Warm white) */}
                                <div className="absolute -inset-2 bg-white/20 rounded-full blur-xl opacity-30 group-hover:opacity-60 group-hover:-inset-3 transition-all duration-300"></div>

                                {/* Gradient Border Container with Orange Accent */}
                                <div className="relative p-[2px] rounded-full bg-gradient-to-r from-[#CC5500]/30 via-white to-[#CC5500]/30 group-hover:from-[#CC5500]/50 group-hover:via-white group-hover:to-[#CC5500]/50 transition-all duration-300 shadow-[0_0_20px_rgba(204,85,0,0.2)] group-hover:shadow-[0_0_35px_rgba(204,85,0,0.3)]">
                                    {/* Inner Button with Glass Effect */}
                                    <button className="relative inline-flex items-center justify-center px-14 py-4.5 text-xl font-bold text-black transition-all duration-300 bg-gradient-to-br from-white via-white to-gray-50 rounded-full focus:outline-none group-hover:scale-[1.02] active:scale-95 cursor-pointer overflow-hidden backdrop-blur-sm">
                                        {/* Animated Gradient Overlay with Orange Tint */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF8A3D]/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>

                                        {/* Top Highlight */}
                                        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white to-transparent opacity-50"></div>

                                        {/* Bottom Shadow */}
                                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-t from-black/5 to-transparent rounded-b-full"></div>

                                        {/* Text Content */}
                                        <span className="relative z-10 flex items-center gap-3 tracking-tight drop-shadow-sm">
                                            <span className="bg-gradient-to-r from-black via-gray-900 to-black bg-clip-text text-transparent font-extrabold">
                                                Browse Components
                                            </span>
                                            <ArrowRight className="w-5 h-5 text-[#CC5500] group-hover:translate-x-1 transition-transform duration-300" />
                                        </span>

                                        {/* Inner Shine Effect with Orange Tint */}
                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#FF8A3D]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    </button>
                                </div>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
