'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Github, Mic, Play, Code, Zap, Radio, BarChart3, FileCode, Package, Rocket, Check, Terminal, ArrowUpDown, Search, MousePointerClick, Keyboard, MonitorPlay, Moon, ArrowRight, Download, Sparkles } from 'lucide-react';
import LiquidEtherWrapper from '@/components/LiquidEtherWrapper';
import MagicBento from '@/components/MagicBento';
import { CodeBlock } from '@/components/code/code-block';
import { CTASection } from '@/components/home/cta-section';
import { useToast } from '@/components/ui/toast';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalVoice } from '@/components/providers/global-voice-provider';
import { VoiceOrb } from '@/components/hero/voice-orb';

export default function HomePage() {
  const { voiceStatus, lastCommand } = useGlobalVoice();
  const { toast } = useToast();
  const router = useRouter();

  const features = [
    {
      icon: Mic,
      title: 'Voice Recognition',
      description: 'Real-time speech-to-text with 50+ language support and continuous listening mode.',
    },
    {
      icon: Play,
      title: 'Speech Synthesis',
      description: 'Natural text-to-speech with customizable voices, rate, pitch, and volume control.',
    },
    {
      icon: Zap,
      title: 'Pattern Matching',
      description: 'Extract variables from commands with simple {variable} syntax for dynamic handling.',
    },
    {
      icon: Radio,
      title: 'Wake Word Detection',
      description: 'Hands-free activation with custom wake words like "Hey Assistant" or "OK Computer".',
    },
    {
      icon: BarChart3,
      title: 'Audio Visualization',
      description: 'Real-time amplitude monitoring with waveform and frequency bar visualization.',
    },
    {
      icon: FileCode,
      title: 'TypeScript Support',
      description: 'Full type definitions included for complete IDE autocomplete and type checking.',
    },
    {
      icon: Package,
      title: 'Zero Dependencies',
      description: 'Pure JavaScript with no external libraries. Just 32KB minified and gzipped.',
    },
    {
      icon: Rocket,
      title: 'Production Ready',
      description: 'Comprehensive error handling, extensive documentation, and active maintenance.',
    },
  ];

  const installCode = `npm install jsvoice`;

  const builtInCommands = [
    { category: 'Scrolling', icon: ArrowUpDown, commands: ['scroll down', 'scroll up', 'scroll to bottom', 'scroll to top'] },
    { category: 'Zoom', icon: Search, commands: ['zoom in', 'zoom out', 'reset zoom'] },
    { category: 'Click', icon: MousePointerClick, commands: ['click [text]', 'click button [text]'] },
    { category: 'Form', icon: Keyboard, commands: ['type [value] in [field]', 'fill [value] in [field]'] },
    { category: 'Reading', icon: MonitorPlay, commands: ['read this page', 'read this paragraph'] },
    { category: 'Theme', icon: Moon, commands: ['toggle dark mode', 'dark mode on/off'] },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] overflow-x-hidden">

      {/* Hero Section with Full Viewport Liquid Ether & 3D Orb */}
      <section className="relative h-screen flex items-center justify-center overflow-visible">
        {/* Full viewport Liquid Ether background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <LiquidEtherWrapper
            colors={['#CC5500', '#E67300', '#FF8A3D', '#0A0A0A']}
            mouseForce={30}
            cursorSize={150}
            isViscous={false}
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo={true}
            autoSpeed={0.5}
            autoIntensity={3.0}
            takeoverDuration={0.25}
            autoResumeDelay={2500}
            autoRampDuration={1.0}
          />
        </div>

        {/* 3D Orb Background Accent - Responsive sizing */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-40 md:opacity-50 pointer-events-none overflow-hidden">
          <div className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] md:w-[800px] md:h-[800px] transition-all duration-700">
            <VoiceOrb isListening={voiceStatus === 'listening'} />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-10">
            {/* Headlines */}
            <div className="space-y-6">
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 px-2">
                Voice Commands
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#CC5500] via-[#FF8A3D] to-[#E67300] mt-2 pb-2 leading-none">
                  Made Simple
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                Zero dependencies. TypeScript ready. Production proven.
              </p>
            </div>

            {/* Hint for Next Step */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500 flex flex-col items-center gap-4">
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#CC5500] text-[10px] font-bold uppercase tracking-[0.3em] flex items-center gap-2 backdrop-blur-md">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_#22c55e]" />
                <span>System Online</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 text-xs font-mono flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#CC5500]" />
                <span>Try: "Hello Voice, go to Playground"</span>
              </div>
            </div>

            {/* CTA Buttons - Fully responsive stacking */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 w-full max-w-lg mx-auto sm:max-w-none px-4 flex-wrap relative z-20">
              <Link
                href="/docs"
                className="group w-full sm:w-auto min-w-[180px] px-8 py-4 rounded-xl gradient-orange text-white font-bold text-lg hover:glow-orange transition-all text-center relative overflow-hidden shadow-lg shadow-[#CC5500]/20 flex items-center justify-center gap-3"
              >
                <Rocket className="w-5 h-5 flex-shrink-0" />
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </Link>

              <Link
                href="/playground"
                className="group w-full sm:w-auto min-w-[180px] px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-lg hover:bg-white/10 hover:border-[#CC5500]/50 hover:shadow-[0_0_20px_rgba(204,85,0,0.15)] transition-all text-center relative overflow-hidden backdrop-blur-sm flex items-center justify-center gap-3"
              >
                <Terminal className="w-5 h-5 text-[#CC5500] flex-shrink-0" />
                <span className="relative z-10">Playground</span>
              </Link>

              <a
                href="https://www.npmjs.com/package/jsvoice"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto min-w-[120px] px-6 py-4 rounded-xl bg-black/40 border border-white/10 text-white font-bold text-lg hover:border-[#CC5500] hover:bg-black/60 transition-all flex items-center justify-center space-x-2 relative overflow-hidden backdrop-blur-sm"
              >
                <Package className="w-5 h-5 text-gray-400 group-hover:text-[#CC5500] flex-shrink-0" />
                <span className="text-sm font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">NPM</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative overflow-hidden bg-[#0A0A0A] border-y border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">How to Use <span className="text-[#CC5500]">JSVoice</span></h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">Experience the power of voice control in three simple steps.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { step: '01', title: 'Wake It Up', desc: 'Ensure your microphone is enabled and say "Hello Voice" to activate the listener.', icon: Mic },
              { step: '02', title: 'Give a Command', desc: 'Speak naturally. Try saying "Scroll Down" or "Go to Playground" to navigate.', icon: Terminal },
              { step: '03', title: 'See the Magic', desc: 'The 3D Orb and UI will react instantly to your vocal patterns and commands.', icon: Zap },
            ].map((s, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[#CC5500]/30 transition-all duration-500 relative overflow-hidden">
                <div className="absolute -right-4 -top-4 text-7xl font-bold text-white/[0.02] group-hover:text-[#CC5500]/5 transition-colors">{s.step}</div>
                <div className="w-14 h-14 rounded-2xl bg-[#CC5500]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <s.icon className="w-7 h-7 text-[#CC5500]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#CC5500] transition-colors">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section className="py-24 relative overflow-hidden bg-[#050505]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Install in Seconds</h2>
            <p className="text-gray-400">Add enterprise-grade voice control to your project today.</p>
          </div>

          <div className="max-w-2xl mx-auto rounded-2xl bg-[#0A0A0A] border border-white/5 p-3 sm:p-4 shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#CC5500]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 bg-white/5 rounded-t-xl mb-4">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
              </div>
              <span className="text-[10px] sm:text-xs font-mono text-gray-500 uppercase tracking-wider">Shell</span>
            </div>
            <div className="p-3 sm:p-4 font-mono text-base sm:text-lg flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
              <code className="text-[#CC5500] whitespace-nowrap">$ {installCode}</code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(installCode);
                  toast("Copied to clipboard!");
                }}
                className="p-2 sm:p-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors flex-shrink-0"
                title="Copy code"
              >
                <Download className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MagicBento features={features} />
        </div>
      </section>

      {/* Commands Showcase */}
      <section id="commands" className="py-24 bg-[#050505] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#CC5500]/5 blur-[120px] rounded-full" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Powerful Built-in Commands</h2>
            <p className="text-gray-400 text-lg">JSVoice comes pre-packaged with essential navigation and interaction patterns.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {builtInCommands.map((category, index) => (
              <div key={index} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#CC5500] to-[#E67300] rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
                <div className="relative h-full bg-[#141414] border border-[#2A2A2A] rounded-2xl p-8 hover:bg-[#1A1A1A] transition-all duration-300 flex flex-col overflow-hidden">
                  {/* Background Icon Watermark */}
                  <category.icon className="absolute -top-6 -right-6 w-32 h-32 text-white/[0.03] group-hover:text-[#CC5500]/10 transition-colors duration-500 transform group-hover:rotate-12 group-hover:scale-110" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-12 h-12 rounded-xl bg-[#0A0A0A] border border-[#333] flex items-center justify-center group-hover:border-[#CC5500]/50 group-hover:shadow-[0_0_20px_rgba(204,85,0,0.2)] transition-all duration-300">
                        <category.icon className="w-6 h-6 text-gray-400 group-hover:text-[#E67300] transition-colors" />
                      </div>
                      <span className="text-xs font-mono text-gray-500 border border-white/5 px-2 py-1 rounded bg-[#0A0A0A]">
                        {category.commands.length} cmds
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-6 group-hover:text-[#E67300] transition-colors flex items-center gap-2">
                      {category.category}
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </h3>

                    <ul className="space-y-3">
                      {category.commands.map((cmd, cmdIndex) => (
                        <li key={cmdIndex} className="group/item flex items-center space-x-3 text-gray-400 transition-colors">
                          <div className="w-1 h-1 rounded-full bg-[#333] group-hover/item:bg-[#CC5500] transition-colors" />
                          <span className="text-sm font-mono font-medium group-hover/item:text-gray-200 transition-colors">
                            {cmd}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />

      {/* Voice Status Indicator */}
      <div className="fixed bottom-8 left-8 z-50 flex flex-col gap-2 pointer-events-none">
        <div className={`
            flex items-center gap-3 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-300
            ${voiceStatus === 'listening' ? 'bg-[#CC5500]/20 border-[#CC5500] text-white shadow-[0_0_20px_rgba(204,85,0,0.4)]' : 'bg-black/40 border-white/10 text-gray-400'}
         `}>
          <div className={`w-2 h-2 rounded-full ${voiceStatus === 'listening' ? 'bg-[#CC5500] animate-pulse' : 'bg-gray-500'}`} />
          <span className="text-sm font-medium">
            {voiceStatus === 'listening' ? 'Listening...' : 'Say "Hello Voice"'}
          </span>
          {voiceStatus === 'listening' && <Mic className="w-4 h-4 animate-bounce" />}
        </div>
        {lastCommand && (
          <div className="self-start px-3 py-1 rounded-lg bg-black/60 border border-white/10 text-xs text-[#CC5500] animate-in slide-in-from-left-4 fade-in duration-300">
            Executed: "{lastCommand}"
          </div>
        )}
      </div>

    </div>
  );
}
