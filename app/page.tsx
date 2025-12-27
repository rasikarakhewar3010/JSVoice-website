'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Github, Mic, Play, Code, Zap, Radio, BarChart3, FileCode, Package, Rocket, Check, Terminal, ArrowUpDown, Search, MousePointerClick, Keyboard, MonitorPlay, Moon, ArrowRight } from 'lucide-react';
import LiquidEtherWrapper from '@/components/LiquidEtherWrapper';
import MagicBento from '@/components/MagicBento';
import { CodeBlock } from '@/components/code/code-block';
import { CTASection } from '@/components/home/cta-section';

export default function HomePage() {

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

  const basicCode = `import JSVoice from 'jsvoice';

// Create instance
const voice = new JSVoice({
  onStatusChange: (message) => {
    console.log('Status:', message);
  }
});

// Add a command
voice.addCommand('hello world', () => {
  voice.speak('Hello! How can I help you?');
});

// Start listening
voice.start();`;

  const patternCode = `// Extract variables from commands
voice.addPatternCommand('set volume to {level}', (args) => {
  const volume = parseInt(args.level);
  audioElement.volume = volume / 100;
  voice.speak(\`Volume set to \${volume} percent\`);
});

// User says: "set volume to 75"
// System extracts: { level: "75" }`;

  const wakeWordCode = `// Hands-free activation
const voice = new JSVoice({
  wakeWord: 'hey assistant',
  wakeWordTimeout: 5000,
  onWakeWordDetected: (word) => {
    console.log('Wake word detected:', word);
  }
});

// User: "hey assistant"
// System: [Listening...]
// User: "scroll down"
// System: [Executes command]`;

  const builtInCommands = [
    { category: 'Scrolling', icon: ArrowUpDown, commands: ['scroll down', 'scroll up', 'scroll to bottom', 'scroll to top'] },
    { category: 'Zoom', icon: Search, commands: ['zoom in', 'zoom out', 'reset zoom'] },
    { category: 'Click', icon: MousePointerClick, commands: ['click [text]', 'click button [text]'] },
    { category: 'Form', icon: Keyboard, commands: ['type [value] in [field]', 'fill [value] in [field]'] },
    { category: 'Reading', icon: MonitorPlay, commands: ['read this page', 'read this paragraph'] },
    { category: 'Theme', icon: Moon, commands: ['toggle dark mode', 'dark mode on/off'] },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A]">

      {/* Hero Section with Full Viewport Liquid Ether */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Full viewport Liquid Ether background */}
        <div className="absolute inset-0 w-full h-full">
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

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
                Voice Commands
                <span className="block text-gradient-orange mt-2">Made Simple</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                Zero dependencies. TypeScript ready. Production proven.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 w-full sm:w-auto px-4 sm:px-0">
              <Link
                href="/docs"
                className="group w-full sm:w-auto px-8 py-4 rounded-lg gradient-orange text-white font-semibold text-base sm:text-lg hover:glow-orange transition-all text-center relative overflow-hidden"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </Link>
              <Link
                href="/playground"
                className="group w-full sm:w-auto px-8 py-4 rounded-lg bg-transparent border-2 border-[#CC5500] text-white font-semibold text-base sm:text-lg hover:bg-[#CC5500] hover:glow-orange transition-all text-center relative overflow-hidden"
              >
                <span className="relative z-10">Live Demo</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </Link>
              <a
                href="https://github.com/VoiceUI-js/VoiceUI"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto px-8 py-4 rounded-lg bg-[#1F1F1F] border border-[#CC5500]/20 text-white font-semibold text-base sm:text-lg hover:border-[#CC5500] hover:glow-orange transition-all flex items-center justify-center space-x-2 relative overflow-hidden"
              >
                <Github className="w-5 h-5 relative z-10" />
                <span className="relative z-10">View on GitHub</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-16 bg-gradient-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl sm:text-6xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-2xl text-gray-400">
              Everything you need to build voice-enabled applications
            </p>
          </div>

          <MagicBento />
        </div>
      </section>

      {/* Quick Start Section - Premium Redesign */}
      <section className="relative py-24 overflow-hidden">
        {/* Connecting Line to Previous Section */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-[#CC5500]/20 to-transparent" />

        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#CC5500]/5 rounded-full blur-[100px] -translate-x-1/2" />
          <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#E67300]/5 rounded-full blur-[100px] translate-x-1/2" />
        </div>

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-white">Get Started in </span>
              <span className="text-gradient-orange">Seconds</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
              Drop it in, configure in moments. No complex setup required.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Vertical Timeline Line (Desktop) */}
            <div className="absolute left-1/2 top-0 bottom-10 w-px bg-gradient-to-b from-transparent via-[#CC5500]/30 to-transparent hidden md:block" />

            <div className="space-y-24">
              {/* Step 1: Install */}
              <div className="relative grid md:grid-cols-2 gap-12 items-center group/step1">
                <div className="md:text-right order-2 md:order-1 relative z-10">
                  <div className="md:absolute md:right-[-3.5rem] md:top-0 w-12 h-12 rounded-full bg-[#0A0A0A] border border-[#CC5500] flex items-center justify-center text-[#CC5500] font-bold text-xl shadow-[0_0_20px_rgba(204,85,0,0.3)] z-20 mx-auto mb-6 md:mb-0 md:mx-0">
                    1
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover/step1:text-[#E67300] transition-colors">Install the Package</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Lightweight, zero-dependency, and type-safe. Just run one command and you're ready to build.
                  </p>
                </div>

                <div className="relative order-1 md:order-2">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#CC5500] to-[#E67300] rounded-2xl opacity-20 blur group-hover/step1:opacity-40 transition-opacity duration-500" />
                  <div className="relative glass-strong rounded-2xl p-1 ring-1 ring-white/10 group-hover/step1:ring-[#CC5500]/50 transition-all duration-500">
                    <div className="relative bg-[#0A0A0A]/80 backdrop-blur-sm rounded-xl overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#141414]/50">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                        <div className="ml-auto text-xs text-gray-500 font-mono">terminal</div>
                      </div>
                      <div className="p-6">
                        <CodeBlock code={installCode} language="bash" showLineNumbers={false} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Configure */}
              <div className="relative grid md:grid-cols-2 gap-12 items-center group/step2">
                <div className="relative order-1">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#E67300] to-[#CC5500] rounded-2xl opacity-20 blur group-hover/step2:opacity-40 transition-opacity duration-500" />
                  <div className="relative glass-strong rounded-2xl p-1 ring-1 ring-white/10 group-hover/step2:ring-[#CC5500]/50 transition-all duration-500">
                    <div className="relative bg-[#0A0A0A]/80 backdrop-blur-sm rounded-xl overflow-hidden">
                      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-[#141414]/50">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                        <div className="ml-auto text-xs text-gray-500 font-mono">app.js</div>
                      </div>
                      <div className="p-0">
                        <CodeBlock code={basicCode} language="javascript" filename="" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:text-left order-2 relative z-10">
                  <div className="md:absolute md:left-[-3.5rem] md:top-0 w-12 h-12 rounded-full bg-[#0A0A0A] border border-[#CC5500] flex items-center justify-center text-[#CC5500] font-bold text-xl shadow-[0_0_20px_rgba(204,85,0,0.3)] z-20 mx-auto mb-6 md:mb-0 md:mx-0">
                    2
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover/step2:text-[#E67300] transition-colors">Add Voice Commands</h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Define commands with simple syntax. Handle events, feedback, and more with our intuitive API.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mt-32">
              <Link
                href="/docs"
                className="group relative inline-flex items-center justify-center px-12 py-6 rounded-full bg-[#0A0A0A] text-white font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105"
              >
                {/* Gradient Border/Glow */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#CC5500] via-[#E67300] to-[#CC5500] opacity-80 group-hover:opacity-100 transition-opacity blur-[1px]" />

                {/* Inner Background */}
                <div className="absolute inset-[1px] rounded-full bg-[#0A0A0A] z-0" />

                {/* Inner Gradient Spill */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#CC5500]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-0" />

                {/* Shine Animation */}
                <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine z-10" />

                {/* Content */}
                <span className="relative z-10 flex items-center gap-3 group-hover:text-[#FF8A3D] transition-colors">
                  View Full Documentation
                  <Rocket className="w-5 h-5 group-hover:rotate-12 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-300 text-[#CC5500] group-hover:text-[#FF8A3D]" />
                </span>

                {/* Liquid Splash Bottom Glow */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-[#CC5500] blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features - Dark Premium Showcase */}
      <section className="relative py-24 bg-[#050505] overflow-hidden">
        {/* Connecting Line to Previous Section */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#CC5500]/20 to-transparent" />

        {/* Decorative Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Advanced Capabilities
            </h2>
            <p className="text-xl text-gray-400">
              Go beyond basic commands with powerful features
            </p>
          </div>

          <div className="space-y-24 max-w-6xl mx-auto">
            {/* Pattern Matching Feature */}
            <div className="group relative rounded-3xl bg-[#0F0F0F] border border-white/5 overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CC5500]/5 blur-[120px] rounded-full group-hover:bg-[#CC5500]/10 transition-colors duration-700" />

              <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-12 flex flex-col justify-center relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-[#CC5500]/10 flex items-center justify-center mb-8 text-[#CC5500]">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6">Pattern Matching</h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">
                    Create dynamic commands that can capture variables. Perfect for capturing numbers, names, or specific locations in a sentence.
                    <br /><br />
                    Just use curly braces <code className="text-[#E67300] bg-[#CC5500]/10 px-2 py-0.5 rounded">{'{}'}</code> to define variables.
                  </p>
                  <ul className="space-y-4">
                    {['Extract numbers and strings', 'Type-safe argument handling', 'Flexible phrasing support'].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#CC5500]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#141414] border-l border-white/5 relative">
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                    <div className="w-2 h-2 rounded-full bg-white/20" />
                  </div>
                  <div className="p-8 h-full flex items-center">
                    <div className="w-full shadow-2xl rounded-lg overflow-hidden ring-1 ring-white/10">
                      <CodeBlock code={patternCode} language="javascript" filename="pattern.js" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Wake Word Feature */}
            <div className="group relative rounded-3xl bg-[#0F0F0F] border border-white/5 overflow-hidden">
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#E67300]/5 blur-[120px] rounded-full group-hover:bg-[#E67300]/10 transition-colors duration-700" />

              <div className="grid lg:grid-cols-2 gap-0">
                <div className="bg-[#141414] border-r border-white/5 relative order-2 lg:order-1">
                  <div className="p-8 h-full flex items-center">
                    <div className="w-full shadow-2xl rounded-lg overflow-hidden ring-1 ring-white/10">
                      <CodeBlock code={wakeWordCode} language="javascript" filename="wake-word.js" />
                    </div>
                  </div>
                </div>
                <div className="p-12 flex flex-col justify-center relative z-10 order-1 lg:order-2">
                  <div className="w-16 h-16 rounded-2xl bg-[#CC5500]/10 flex items-center justify-center mb-8 text-[#CC5500]">
                    <Radio className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6">Wake Word Detection</h3>
                  <p className="text-gray-400 text-lg leading-relaxed mb-8">
                    Enable hands-free activation with custom wake words. The system continuously listens for your keyword before activating command processing.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {['Hey Assistant', 'Computer', 'Jarvis'].map((word, i) => (
                      <span key={i} className="px-4 py-2 rounded-full bg-[#CC5500]/10 border border-[#CC5500]/20 text-[#CC5500] text-sm font-mono">
                        "{word}"
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built-in Commands - Premium Grid */}
      <section className="relative py-24 bg-[#0A0A0A] overflow-hidden">
        {/* Connecting Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#CC5500]/10 to-transparent" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Built-in Commands
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              A comprehensive library of commands ready to use out of the box.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {builtInCommands.map((category, index) => (
              <div
                key={index}
                className="group relative h-full"
              >
                {/* Hover Glow Effect */}
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
                          <span className="text-sm font-mono font-medium group-hover/item:text-gray-200 transition-colors border-b border-transparent group-hover/item:border-[#CC5500]/30">
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

    </div>
  );
}
