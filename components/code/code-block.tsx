'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';
import { useToast } from '@/components/ui/toast';

interface CodeBlockProps {
    code: string;
    language: string;
    filename?: string;
    showLineNumbers?: boolean;
}

export function CodeBlock({
    code,
    language,
    filename,
    showLineNumbers = true,
}: CodeBlockProps) {
    const [isCopied, setIsCopied] = useState(false);
    const { toast } = useToast();

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        toast("Code copied to clipboard", "success");
        setTimeout(() => setIsCopied(false), 2000);
    };

    return (
        <div className="relative group rounded-lg overflow-hidden border border-[#CC5500]/20 bg-[#1F1F1F]">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#141414] border-b border-[#CC5500]/20">
                <div className="flex items-center space-x-2">
                    {filename && (
                        <span className="text-sm text-gray-400 font-mono">{filename}</span>
                    )}
                    <span className="px-2 py-0.5 text-xs rounded bg-[#CC5500]/20 text-[#E67300] font-mono">
                        {language}
                    </span>
                </div>
                <button
                    onClick={handleCopy}
                    className="relative flex items-center justify-center w-20 h-8 rounded text-xs font-medium text-gray-400 hover:text-[#E67300] hover:bg-[#CC5500]/10 transition-colors"
                    aria-label="Copy code"
                    suppressHydrationWarning
                >
                    <AnimatePresence mode='wait'>
                        {isCopied ? (
                            <motion.div
                                key="copied"
                                initial={{ opacity: 0, scale: 0.8, y: 5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: -5 }}
                                className="flex items-center space-x-1 text-[#E67300]"
                            >
                                <Check className="w-3.5 h-3.5" />
                                <span>Copied!</span>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="copy"
                                initial={{ opacity: 0, scale: 0.8, y: 5 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8, y: -5 }}
                                className="flex items-center space-x-1"
                            >
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Code */}
            <div className="overflow-x-auto">
                <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    showLineNumbers={showLineNumbers}
                    customStyle={{
                        margin: 0,
                        padding: '1rem',
                        background: '#1F1F1F',
                        fontSize: '0.875rem',
                    }}
                    lineNumberStyle={{
                        color: '#666',
                        paddingRight: '1rem',
                        minWidth: '2.5rem',
                    }}
                    wrapLines={true}
                    wrapLongLines={true}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
}
