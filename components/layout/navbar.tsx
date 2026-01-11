'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Github, Search, ChevronDown, Zap, Ghost, Sun, Moon, Settings, Check } from 'lucide-react';
import { SearchDialog } from '@/components/ui/search-dialog';
import { useGlobalVoice } from '@/components/providers/global-voice-provider';

export function Navbar() {
    const { matrixMode, setMatrixMode, ghostMode, setGhostMode } = useGlobalVoice();
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 20);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Keyboard shortcut for search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 
                ${isScrolled ? 'glass py-3' : 'bg-[#0A0A0A]/95 md:bg-transparent py-4'}`}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="relative w-10 h-10 group-hover:scale-110 transition-transform duration-300">
                            <Image
                                src="/logo.png"
                                alt="JSVoice Logo"
                                fill
                                className="object-contain drop-shadow-[0_0_8px_rgba(204,85,0,0.5)]"
                                priority
                            />
                        </div>
                        <span className="text-xl font-bold text-white hidden sm:block tracking-tight">
                            JSVoice
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-2">
                        {[
                            { name: 'Documentation', href: '/docs' },
                            { name: 'Playground', href: '/playground' },
                            { name: 'Showcase', href: '/showcase' }
                        ].map((item) => {
                            const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`
                                        relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                                        ${isActive
                                            ? 'text-white bg-white/10 border border-[#CC5500]/50 shadow-[0_0_20px_rgba(204,85,0,0.3)]'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
                                        }
                                    `}
                                >
                                    {item.name}
                                    {isActive && (
                                        <div className="absolute inset-0 rounded-full bg-[#CC5500]/10 blur-sm -z-10" />
                                    )}
                                </Link>
                            )
                        })}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center space-x-4">
                        {/* Unified System Settings Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                                className={`p-2.5 rounded-full border transition-all duration-300 ${isSettingsOpen ? 'bg-[#CC5500]/20 border-[#CC5500] text-[#CC5500] glow-orange' : 'bg-[#1F1F1F] border-[#CC5500]/20 text-gray-400 hover:border-[#CC5500]/50 hover:text-white'}`}
                                title="System Settings & Modes"
                            >
                                <Settings className="w-5 h-5" />
                            </button>

                            {isSettingsOpen && (
                                <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-[#141414] border border-[#CC5500]/20 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                                    <div className="px-4 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-white/5 mb-1">System Control</div>

                                    {/* Appearance / Theme Row */}
                                    <button
                                        onClick={() => { setMatrixMode(!matrixMode); setIsSettingsOpen(false); }}
                                        className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white/5 transition-all group"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className={`p-2 rounded-lg ${matrixMode ? 'bg-yellow-500/10' : 'bg-blue-500/10'}`}>
                                                {matrixMode ? <Sun className="w-4 h-4 text-yellow-500" /> : <Moon className="w-4 h-4 text-blue-400" />}
                                            </div>
                                            <div className="text-left">
                                                <div className="text-sm font-medium text-white">{matrixMode ? 'Light Mode' : 'Dark Mode'}</div>
                                                <div className="text-[10px] text-gray-500">Global sight preference</div>
                                            </div>
                                        </div>
                                        <div className={`w-8 h-4 rounded-full relative transition-colors ${matrixMode ? 'bg-[#CC5500]' : 'bg-gray-700'}`}>
                                            <div className={`absolute top-1 w-2 h-2 rounded-full bg-white transition-all ${matrixMode ? 'left-5' : 'left-1'}`} />
                                        </div>
                                    </button>

                                    {/* Ghost Mode Row */}
                                    <button
                                        onClick={() => { setGhostMode(!ghostMode); setIsSettingsOpen(false); }}
                                        className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white/5 transition-all group"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className={`p-2 rounded-lg ${ghostMode ? 'bg-[#CC5500]/10' : 'bg-white/5'}`}>
                                                <Ghost className={`w-4 h-4 ${ghostMode ? 'text-[#CC5500]' : 'text-gray-400'}`} />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-sm font-medium text-white">Ghost Mode</div>
                                                <div className="text-[10px] text-gray-500">UI transparency shift</div>
                                            </div>
                                        </div>
                                        {ghostMode && <Check className="w-4 h-4 text-[#CC5500]" />}
                                    </button>

                                    {/* Matrix Mode Row */}
                                    <button
                                        onClick={() => { setMatrixMode(!matrixMode); setIsSettingsOpen(false); }}
                                        className="w-full flex items-center justify-between px-3 py-3 rounded-xl hover:bg-white/5 transition-all group"
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className={`p-2 rounded-lg ${matrixMode ? 'bg-[#CC5500]/10' : 'bg-white/5'}`}>
                                                <Zap className={`w-4 h-4 ${matrixMode ? 'text-[#CC5500]' : 'text-gray-400'}`} />
                                            </div>
                                            <div className="text-left">
                                                <div className="text-sm font-medium text-white">Matrix Mode</div>
                                                <div className="text-[10px] text-gray-500">Reality inversion</div>
                                            </div>
                                        </div>
                                        {matrixMode && <Check className="w-4 h-4 text-[#CC5500]" />}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Search Button - Only on Documentation Page */}
                        {pathname.startsWith('/docs') && (
                            <button
                                onClick={() => setIsSearchOpen(true)}
                                className="hidden md:flex items-center justify-between px-4 py-2 rounded-lg bg-[#1F1F1F] border border-[#CC5500]/20 text-gray-400 hover:border-[#CC5500]/50 hover:text-white hover:shadow-lg hover:shadow-[#CC5500]/20 transition-all group whitespace-nowrap"
                                aria-label="Search"
                            >
                                <div className="flex items-center space-x-2">
                                    <Search className="w-4 h-4 group-hover:text-[#CC5500] transition-colors" />
                                    <span className="text-sm">Search documentation...</span>
                                </div>
                                <div className="flex items-center space-x-1 ml-4">
                                    <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-[#141414] rounded border border-[#CC5500]/20 text-gray-500">
                                        Ctrl
                                    </kbd>
                                    <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-[#141414] rounded border border-[#CC5500]/20 text-gray-500">
                                        K
                                    </kbd>
                                </div>
                            </button>
                        )}

                        {/* GitHub Link */}
                        <a
                            href="https://github.com/VoiceUI-js/VoiceUI"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#1F1F1F] border border-[#CC5500]/20 text-white hover:border-[#CC5500] hover:glow-orange hover:scale-105 transition-all duration-200"
                        >
                            <Github className="w-4 h-4" />
                            <span className="text-sm font-medium">GitHub</span>
                        </a>

                        {/* Get Started Button - Hide on Documentation Page */}
                        {pathname !== '/docs' && (
                            <Link
                                href="/docs"
                                className="group hidden md:block px-4 py-2 rounded-lg gradient-orange text-white font-medium hover:glow-orange hover:scale-105 transition-all duration-200 relative overflow-hidden"
                            >
                                <span className="relative z-10">Get Started</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 rounded-lg bg-[#1F1F1F] border border-[#CC5500]/20 text-white hover:border-[#CC5500] transition-all"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 p-4 rounded-lg bg-[#141414]/98 border border-[#CC5500]/20 animate-in fade-in slide-in-from-top-5 duration-300">
                        <div className="flex flex-col space-y-2">
                            {[
                                { name: 'Documentation', href: '/docs' },
                                { name: 'Playground', href: '/playground' },
                                { name: 'Showcase', href: '/showcase' }
                            ].map((item) => {
                                const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`
                                            px-4 py-3 rounded-lg text-sm font-medium transition-colors
                                            ${isActive
                                                ? 'bg-[#CC5500]/10 text-white border border-[#CC5500]/20'
                                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }
                                        `}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            })}

                            {/* Mobile Utility Toggles */}
                            <div className="flex items-center space-x-2 p-2 pt-4 border-t border-[#CC5500]/10">
                                <button
                                    onClick={() => setMatrixMode(!matrixMode)}
                                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-300 ${matrixMode ? 'bg-[#CC5500]/20 border-[#CC5500] text-[#CC5500]' : 'bg-[#1F1F1F] border-white/5 text-gray-400'}`}
                                >
                                    <Zap className="w-4 h-4" />
                                    <span className="text-xs font-medium">Matrix</span>
                                </button>
                                <button
                                    onClick={() => setGhostMode(!ghostMode)}
                                    className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-300 ${ghostMode ? 'bg-[#CC5500]/20 border-[#CC5500] text-[#CC5500]' : 'bg-[#1F1F1F] border-white/5 text-gray-400'}`}
                                >
                                    <Ghost className="w-4 h-4" />
                                    <span className="text-xs font-medium">Ghost</span>
                                </button>
                            </div>

                            <div className="pt-4 border-t border-[#CC5500]/20">
                                <a
                                    href="https://github.com/VoiceUI-js/VoiceUI"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 text-gray-300 hover:text-[#E67300] transition-colors py-2"
                                >
                                    <Github className="w-4 h-4" />
                                    <span>GitHub</span>
                                </a>
                            </div>
                            {pathname !== '/docs' && (
                                <Link
                                    href="/docs"
                                    className="px-4 py-2 rounded-lg gradient-orange text-white font-medium text-center hover:glow-orange transition-all"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Get Started
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Search Dialog */}
            <SearchDialog isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </nav>
    );
}
