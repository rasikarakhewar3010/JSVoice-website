'use client';

import Link from 'next/link';
import { Github, Twitter, MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface FooterProps {
    className?: string;
    forceVisible?: boolean;
}

export function Footer({ className, forceVisible = false }: FooterProps) {
    const currentYear = new Date().getFullYear();
    const pathname = usePathname();

    // Hide globally on docs pages unless forced (e.g., inside docs layout)
    if (pathname?.startsWith('/docs') && !forceVisible) {
        return null;
    }

    return (
        <footer className={cn("relative border-t border-white/5 bg-[#050505] overflow-hidden", className)}>
            {/* Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#CC5500]/10 blur-[100px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Brand */}
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#CC5500] to-[#E67300] flex items-center justify-center shadow-[0_0_20px_rgba(204,85,0,0.3)]">
                            <span className="font-bold text-white text-lg">JS</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-white tracking-tight">JSVoice</span>
                            <span className="text-xs text-gray-500 font-medium">Voice Commands Made Simple</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
                        <Link href="/docs" className="text-sm font-medium text-gray-400 hover:text-[#FF8A3D] transition-colors">
                            Documentation
                        </Link>
                        <Link href="/playground" className="text-sm font-medium text-gray-400 hover:text-[#FF8A3D] transition-colors">
                            Playground
                        </Link>
                        <Link href="/showcase" className="text-sm font-medium text-gray-400 hover:text-[#FF8A3D] transition-colors">
                            Showcase
                        </Link>
                        <a href="https://github.com/VoiceUI-js/VoiceUI" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-400 hover:text-[#FF8A3D] transition-colors">
                            GitHub
                        </a>
                    </nav>

                    {/* Socials & Copyright */}
                    <div className="flex flex-col items-center md:items-end gap-4">
                        <div className="flex items-center gap-3">
                            <a
                                href="https://github.com/VoiceUI-js/VoiceUI"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-[#141414] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#CC5500] hover:bg-[#CC5500] transition-all duration-300"
                                aria-label="GitHub"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                            <a
                                href="https://twitter.com/jsvoice"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-[#141414] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#CC5500] hover:bg-[#CC5500] transition-all duration-300"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a
                                href="https://discord.gg/jsvoice"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-[#141414] border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#CC5500] hover:bg-[#CC5500] transition-all duration-300"
                                aria-label="Discord"
                            >
                                <MessageCircle className="w-4 h-4" />
                            </a>
                        </div>
                        <div className="text-xs text-gray-600">
                            © {currentYear} JSVoice. MIT License.
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
