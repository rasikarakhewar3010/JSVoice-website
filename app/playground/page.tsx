'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Download, Share2, Mic, Terminal, Settings, Command, Activity, Volume2, Sparkles, AlertCircle, Trophy, Zap, MessageSquare, Check, FileCode, BarChart3, Radio, Headphones } from 'lucide-react';
import { CodeBlock } from '@/components/code/code-block';
import { VoiceOrb } from '@/components/hero/voice-orb';
import { useGlobalVoice } from '@/components/providers/global-voice-provider';
import { motion, AnimatePresence } from 'framer-motion';

export default function PlaygroundPage() {
    const { voiceStatus, transcript, lastCommand, toggleListening } = useGlobalVoice();
    const [selectedPreset, setSelectedPreset] = useState('basic');
    const [consoleOutput, setConsoleOutput] = useState<{ msg: string, type: 'system' | 'voice' | 'user' | 'transcript' }[]>([]);
    const [isMounted, setIsMounted] = useState(false);
    const [sensitivity, setSensitivity] = useState(0);
    const consoleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
        setConsoleOutput([
            { msg: 'JSVoice Environment v2.4 initialized', type: 'system' },
            { msg: 'Global Voice Context secured.', type: 'system' },
            { msg: 'Ready for Wake Word: "Hello Voice"', type: 'system' }
        ]);
    }, []);

    const presets = {
        basic: `// Simple command registration
voice.addCommand('hello', () => {
  voice.speak('Hello! How can I help?');
});`,
        advanced: `// Pattern matching with variables
voice.addPatternCommand('search for {query}', (args) => {
  window.open(\`https://google.com/search?q=\${args.query}\`);
});`,
        effects: `// Site-wide visual effects
voice.addCommand('matrix mode', () => {
  document.body.style.filter = 'invert(1) hue-rotate(180deg)';
});`
    };

    // Simulated sensitivity meter (actual sensitivity is in VoiceOrb, but we show a visual proxy here)
    useEffect(() => {
        if (voiceStatus === 'listening') {
            const interval = setInterval(() => {
                setSensitivity(Math.random() * 100);
            }, 100);
            return () => clearInterval(interval);
        } else {
            setSensitivity(0);
        }
    }, [voiceStatus]);

    useEffect(() => {
        if (lastCommand) {
            setConsoleOutput(prev => [...prev, { msg: `Command Recognized: "${lastCommand}"`, type: 'voice' }]);
        }
    }, [lastCommand]);

    useEffect(() => {
        if (transcript) {
            setConsoleOutput(prev => {
                const displayTranscript = transcript.length > 50 ? '...' + transcript.slice(-50) : transcript;
                const last = prev[prev.length - 1];
                if (last?.type === 'transcript') {
                    const newLogs = [...prev];
                    newLogs[newLogs.length - 1] = { msg: displayTranscript, type: 'transcript' };
                    return newLogs;
                }
                return [...prev, { msg: displayTranscript, type: 'transcript' }];
            });
        }
    }, [transcript]);

    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }
    }, [consoleOutput]);

    const runCode = () => {
        setConsoleOutput(prev => [...prev, { msg: 'Pushing changes to Global Controller...', type: 'system' }, { msg: 'Live reload successful.', type: 'system' }]);
    };

    const challenges = [
        { id: 1, text: 'Activate: "Hello Voice"', completed: voiceStatus === 'listening' },
        { id: 2, text: 'Execute: "Scroll Down"', completed: lastCommand === 'scroll down' },
        { id: 3, text: 'Magic: "Matrix Mode"', completed: lastCommand === 'matrix mode' },
    ];

    const suggestions = [
        "Go to Docs",
        "Scroll Down",
        "Matrix Mode",
        "Open Installation",
        "Start Recording"
    ];

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col relative overflow-hidden">
            {/* Ambient Background Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#CC5500]/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FF8D3D]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-24 flex-grow flex flex-col relative z-10">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 relative z-10">
                    <div className="space-y-4 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CC5500]/10 border border-[#CC5500]/20 text-[#CC5500] text-[10px] font-black uppercase tracking-widest">
                            <Radio className="w-3 h-3 animate-pulse" />
                            <span>Real-time Voice Node</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tight">
                            Voice <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#CC5500] to-[#FF8D3D]">Lab</span>
                        </h1>
                        <p className="text-lg text-gray-400 leading-relaxed font-light">
                            Experience the future of browsing. Speak naturally and watch the environment react to your every word.
                        </p>
                    </div>

                    <div className="flex gap-4 w-full lg:w-auto">
                        <div className="w-full lg:w-64 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl group hover:border-[#CC5500]/30 transition-all duration-500">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <Trophy className="w-4 h-4 text-yellow-500" />
                                    <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Missions</span>
                                </div>
                                <span className="text-[10px] font-mono text-yellow-500/50">{challenges.filter(c => c.completed).length}/{challenges.length} Done</span>
                            </div>
                            <div className="space-y-3">
                                {challenges.map(c => (
                                    <div key={c.id} className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all duration-300 ${c.completed ? 'bg-green-500/20 border-green-500/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 'border-white/10'}`}>
                                            {c.completed && <Check className="w-3 h-3 text-green-400" />}
                                        </div>
                                        <span className={`text-xs font-medium tracking-wide transition-all ${c.completed ? 'text-gray-500 line-through' : 'text-white'}`}>{c.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow">

                    {/* Left Panel: Logic & Logs */}
                    <div className="lg:col-span-7 space-y-6">
                        {/* Interactive Editor Container */}
                        <div className="group rounded-3xl overflow-hidden border border-white/10 bg-[#0A0A0A] flex flex-col shadow-2xl transition-all duration-500 hover:border-[#CC5500]/20">
                            <div className="flex items-center justify-between px-6 py-4 bg-[#111] border-b border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#CC5500]/20 to-transparent flex items-center justify-center border border-[#CC5500]/10">
                                        <FileCode className="w-5 h-5 text-[#CC5500]" />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Scripting Path</div>
                                        <div className="text-xs font-mono text-gray-400">voice-controller.ts</div>
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    <select
                                        value={selectedPreset}
                                        onChange={(e) => setSelectedPreset(e.target.value)}
                                        className="bg-white/5 px-3 py-1.5 rounded-lg text-[10px] text-gray-300 font-bold uppercase tracking-wider focus:outline-none cursor-pointer hover:bg-white/10 transition-all border border-white/5 w-full sm:w-auto"
                                    >
                                        <option value="basic">Standard API</option>
                                        <option value="advanced">Patterns</option>
                                        <option value="effects">Global FX</option>
                                    </select>
                                    <button onClick={runCode} className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#CC5500] text-white text-xs font-black uppercase tracking-widest hover:bg-[#E67300] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#CC5500]/20">
                                        <Zap className="w-3 h-3 fill-current" />
                                        Commit
                                    </button>
                                </div>
                            </div>
                            <div className="p-4 bg-[#050505] min-h-[200px] max-h-[300px] overflow-auto custom-scrollbar">
                                <CodeBlock
                                    code={presets[selectedPreset as keyof typeof presets]}
                                    language="javascript"
                                    showLineNumbers={true}
                                />
                            </div>
                        </div>

                        {/* Professional Process Terminal */}
                        <div className="rounded-3xl bg-[#0A0A0A] border border-white/10 overflow-hidden flex flex-col shadow-2xl h-[280px]">
                            <div className="flex items-center justify-between px-6 py-3 bg-[#111] border-b border-white/5">
                                <div className="flex items-center gap-3 text-xs text-gray-400 font-bold uppercase tracking-[0.2em]">
                                    <Terminal className="w-4 h-4 text-[#CC5500]" />
                                    <span>Live Process Log</span>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => setConsoleOutput([])} className="text-[10px] font-black text-gray-600 hover:text-white transition-colors uppercase tracking-widest">Clear Buffer</button>
                                </div>
                            </div>
                            <div
                                className="flex-grow p-6 overflow-y-auto font-mono text-[11px] space-y-2 scrollbar-hide bg-[radial-gradient(ellipse_at_top_right,rgba(204,85,0,0.03),transparent)]"
                                ref={consoleRef}
                            >
                                {consoleOutput.map((log, i) => (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        key={i}
                                        className="flex items-start gap-4"
                                    >
                                        <span className="opacity-20 select-none text-gray-500 whitespace-nowrap">
                                            [{isMounted ? new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '--:--:--'}]
                                        </span>
                                        <span className={`flex items-center gap-2 ${log.type === 'voice' ? 'text-[#CC5500] font-bold' :
                                            log.type === 'system' ? 'text-blue-400' :
                                                log.type === 'transcript' ? 'text-gray-500 italic' : 'text-gray-400'
                                            }`}>
                                            <span className="px-1.5 py-0.5 rounded bg-white/5 text-[9px] uppercase tracking-tighter opacity-50">{log.type}</span>
                                            {log.msg}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Visualization & Interaction */}
                    <div className="lg:col-span-5 flex flex-col gap-6">

                        {/* Audio Visualization Reactor */}
                        <div className="relative flex-grow rounded-[2.5rem] bg-[#0A0A0A] border border-white/10 overflow-hidden group shadow-2xl flex flex-col">

                            {/* HUD Overlays */}
                            <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 pointer-events-none">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <motion.div
                                            animate={{ scale: voiceStatus === 'listening' ? [1, 1.3, 1] : 1 }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                            className={`w-3 h-3 rounded-full ${voiceStatus === 'listening' ? 'bg-[#CC5500] shadow-[0_0_15px_#CC5500]' : 'bg-white/10'}`}
                                        />
                                        {voiceStatus === 'listening' && (
                                            <motion.div
                                                animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                                className="absolute inset-0 rounded-full bg-[#CC5500]"
                                            />
                                        )}
                                    </div>
                                    <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] drop-shadow-lg">
                                        {voiceStatus === 'listening' ? 'Node: Receiving' : 'Node: Dormant'}
                                    </span>
                                </div>
                                <div className="flex gap-2 pointer-events-auto">
                                    <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-white/50">44.1 kHz</div>
                                    <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[9px] font-bold text-white/50">Mono</div>
                                </div>
                            </div>

                            {/* 3D Orb Scene */}
                            <div className="absolute inset-0 z-0">
                                <VoiceOrb isListening={voiceStatus === 'listening'} />
                            </div>

                            {/* Command Suggestions (Floating) */}
                            <div className="absolute top-1/2 right-6 -translate-y-1/2 flex flex-col gap-3 z-10">
                                {suggestions.map((s, i) => (
                                    <motion.div
                                        key={s}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 1 + i * 0.1 }}
                                        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-[#CC5500]/50 backdrop-blur-md cursor-pointer group/item"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Sparkles className="w-2.5 h-2.5 text-[#CC5500] opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                            <span className="text-[9px] font-bold text-white/40 group-hover/item:text-white transition-colors uppercase tracking-widest">{s}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Interactive Core */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none mt-12">
                                <div className="relative group/core pointer-events-auto cursor-pointer" onClick={toggleListening}>
                                    <motion.div
                                        animate={voiceStatus === 'listening' ? { scale: [1, 1.05, 1], rotate: 360 } : {}}
                                        transition={{ rotate: { repeat: Infinity, duration: 20, ease: "linear" } }}
                                        className="absolute -inset-8 rounded-full border border-dashed border-[#CC5500]/10"
                                    />
                                    <motion.div
                                        animate={voiceStatus === 'listening' ? {
                                            scale: 1.1,
                                            boxShadow: '0 0 80px rgba(204, 85, 0, 0.4)'
                                        } : {
                                            scale: 1,
                                            boxShadow: '0 0 0px rgba(204, 85, 0, 0)'
                                        }}
                                        className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-700 relative backdrop-blur-3xl ${voiceStatus === 'listening' ? 'bg-[#CC5500]' : 'bg-white/5 border border-white/10 shadow-inner'
                                            }`}
                                    >
                                        <Mic className={`w-12 h-12 transition-all duration-500 ${voiceStatus === 'listening' ? 'text-white scale-110' : 'text-gray-600'}`} />

                                        {/* Status Indicators */}
                                        <AnimatePresence>
                                            {voiceStatus === 'listening' && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.5 }}
                                                    className="absolute -top-4 bg-black text-[#CC5500] text-[9px] font-black px-2 py-0.5 rounded border border-[#CC5500]/30 uppercase tracking-widest"
                                                >
                                                    Active
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                </div>
                                <div className="mt-10 flex flex-col items-center gap-2">
                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] text-center">
                                        {voiceStatus === 'listening' ? 'Listening for input...' : 'Initialize Node'}
                                    </p>
                                    <div className="w-12 h-1 rounded-full bg-white/5 overflow-hidden">
                                        <motion.div
                                            animate={{ width: voiceStatus === 'listening' ? '100%' : '0%' }}
                                            className="h-full bg-[#CC5500]"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Sensitivity Bar & Real-time Info */}
                            <div className="mt-auto p-8 relative z-20">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between text-[10px] font-bold text-white/30 uppercase tracking-widest">
                                        <div className="flex items-center gap-2">
                                            <Activity className="w-3 h-3" />
                                            <span>Spectral Gain</span>
                                        </div>
                                        <span>{Math.round(sensitivity)}db</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden flex gap-0.5">
                                        {Array.from({ length: 20 }).map((_, i) => (
                                            <motion.div
                                                key={i}
                                                animate={{
                                                    height: voiceStatus === 'listening' ? `${Math.max(20, Math.random() * 100)}%` : '100%',
                                                    backgroundColor: i > 15 ? '#CC5500' : '#FFF',
                                                    opacity: (i / 20) * (sensitivity / 100) + 0.1
                                                }}
                                                className="flex-1 rounded-full"
                                            />
                                        ))}
                                    </div>

                                    <div className="mt-4 p-5 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-3xl group/transcript border-l-4 border-l-[#CC5500]">
                                        <div className="flex items-center gap-2 mb-3">
                                            <MessageSquare className="w-3 h-3 text-[#CC5500]" />
                                            <span className="text-[10px] font-black text-[#CC5500] uppercase tracking-widest">Decoded Stream</span>
                                        </div>
                                        <div className="min-h-[3rem] flex items-center">
                                            <p className={`text-xl font-bold tracking-tight transition-all duration-300 ${transcript ? 'text-white' : 'text-white/20'}`}>
                                                {transcript || "Waiting for audio signal..."}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Tips Tooltip */}
                        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#CC5500]/10 to-transparent border border-[#CC5500]/20 flex gap-4 items-start group hover:bg-[#CC5500]/15 transition-all">
                            <div className="w-10 h-10 rounded-xl bg-[#CC5500] flex items-center justify-center shrink-0 shadow-lg shadow-[#CC5500]/30 transition-transform group-hover:scale-110">
                                <Headphones className="w-5 h-5 text-white" />
                            </div>
                            <div className="space-y-1">
                                <div className="text-xs font-bold text-white uppercase tracking-wider">Communication Tip</div>
                                <p className="text-[11px] text-gray-400 leading-relaxed font-medium">
                                    For optimal recognition, maintain a steady volume. If the node becomes unresponsive, say <span className="text-white font-black underline decoration-[#CC5500]">"Hello Voice"</span> to resynchronize the controller.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
