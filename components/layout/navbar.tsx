'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Github, Search, ChevronDown } from 'lucide-react';
import { SearchDialog } from '@/components/ui/search-dialog';

export function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

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
                        <div className="w-10 h-10 rounded-lg gradient-orange flex items-center justify-center glow-orange group-hover:glow-orange-lg transition-all">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
                                    fill="white"
                                />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-white hidden sm:block">
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
                            <span className="text-sm">GitHub</span>
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
