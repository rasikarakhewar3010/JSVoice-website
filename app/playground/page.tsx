'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, Download, Share2, Mic, Terminal, Settings, Command, Activity, Volume2, Sparkles, AlertCircle } from 'lucide-react';
import { CodeBlock } from '@/components/code/code-block';
import { VoiceWaveform } from '@/components/hero/voice-waveform';

export default function PlaygroundPage() {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [selectedPreset, setSelectedPreset] = useState('basic');
    const [consoleOutput, setConsoleOutput] = useState<string[]>(['> Ready to execute...']);
    const [volume, setVolume] = useState(50);
    const consoleRef = useRef<HTMLDivElement>(null);

    const presets = {
        basic: `import JSVoice from 'jsvoice';

const voice = new JSVoice();

// Add a simple command
voice.addCommand('hello', () => {
  console.log('Hello World!');
  voice.speak('Hello! How can I help you?');
});

// Add more commands
voice.addCommand('what time is it', () => {
  const time = new Date().toLocaleTimeString();
  voice.speak(\`The time is \${time}\`);
});

// Start listening
voice.start();`,

        advanced: `import JSVoice from 'jsvoice';

const voice = new JSVoice({
  continuous: true,
  language: 'en-US',
  onResult: (transcript) => {
    console.log('Transcript:', transcript);
  },
  onError: (error) => {
    console.error('Error:', error);
  }
});

// Pattern matching with wildcards
voice.addCommand('search for *', (query) => {
  console.log('Searching for:', query);
  window.open(\`https://google.com/search?q=\${query}\`);
});

// Wake word detection
voice.addCommand('hey assistant', () => {
  voice.speak('Yes, how can I help?');
  voice.enableWakeWord('hey assistant');
});

voice.start();`,

        react: `import { useEffect, useState } from 'react';
import JSVoice from 'jsvoice';

function VoiceApp() {
  const [voice] = useState(() => new JSVoice());
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  useEffect(() => {
    voice.addCommand('hello', () => {
      voice.speak('Hello from React!');
    });

    voice.onResult = (text) => {
      setTranscript(text);
    };

    return () => voice.stop();
  }, [voice]);

  const toggleListening = () => {
    if (isListening) {
      voice.stop();
    } else {
      voice.start();
    }
    setIsListening(!isListening);
  };

  return (
    <div>
      <button onClick={toggleListening}>
        {isListening ? 'Stop' : 'Start'}
      </button>
      <p>Transcript: {transcript}</p>
    </div>
  );
}`,
    };

    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }
    }, [consoleOutput]);

    const runCode = () => {
        setConsoleOutput(prev => [...prev, '> Running code...']);
        setTimeout(() => {
            setConsoleOutput(prev => [...prev, '✓ JSVoice instance initialized', '✓ Commands registered']);
        }, 500);
    };

    return (
        <div className="min-h-screen bg-[#050505] flex flex-col relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#CC5500]/5 to-transparent pointer-events-none" />
            <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] bg-[#E67300]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 flex-grow flex flex-col">
                {/* Visual Header */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6 relative z-10">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CC5500]/10 border border-[#CC5500]/20 text-[#CC5500] text-xs font-mono mb-2">
                            <Sparkles className="w-3 h-3" />
                            <span>Interactive Environment v2.0</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                            Playground
                        </h1>
                        <p className="text-lg text-gray-400 max-w-xl">
                            Experience the power of voice directly in your browser. Real-time compilation, instant feedback.
                        </p>
                    </div>
                </div>

                {/* Main Workspace */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-grow h-full min-h-[600px] relative z-10">
                    {/* Left Panel: IDE */}
                    <div className="lg:col-span-7 flex flex-col gap-4">
                        {/* Toolbar */}
                        <div className="flex flex-wrap items-center justify-between p-2 rounded-xl bg-[#141414]/80 backdrop-blur-md border border-white/5">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center px-3 py-1.5 rounded-lg bg-[#0A0A0A] border border-white/5 gap-2">
                                    <Command className="w-4 h-4 text-gray-500" />
                                    <select
                                        value={selectedPreset}
                                        onChange={(e) => setSelectedPreset(e.target.value)}
                                        className="bg-transparent text-sm text-gray-300 focus:outline-none cursor-pointer hover:text-white transition-colors"
                                    >
                                        <option value="basic">Basic Example</option>
                                        <option value="advanced">Advanced Features</option>
                                        <option value="react">React Integration</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors" title="Reset">
                                    <RotateCcw className="w-4 h-4" />
                                </button>
                                <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors" title="Download">
                                    <Download className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={runCode}
                                    className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#CC5500] hover:bg-[#E67300] text-white text-sm font-semibold transition-all shadow-[0_0_15px_rgba(204,85,0,0.3)] hover:shadow-[0_0_25px_rgba(204,85,0,0.5)]"
                                >
                                    <Play className="w-3.5 h-3.5 fill-current" />
                                    <span>Run</span>
                                </button>
                            </div>
                        </div>

                        {/* Editor Area */}
                        <div className="flex-grow rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#0A0A0A] group relative">
                            {/* Editor Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#CC5500]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                            <div className="h-full overflow-y-auto custom-scrollbar">
                                <CodeBlock
                                    code={presets[selectedPreset as keyof typeof presets]}
                                    language="javascript"
                                    filename="main.js"
                                    showLineNumbers={true}
                                />
                            </div>
                        </div>

                        {/* Console */}
                        <div className="h-48 rounded-xl bg-[#0A0A0A] border border-white/10 overflow-hidden flex flex-col">
                            <div className="flex items-center justify-between px-4 py-2 bg-[#141414] border-b border-white/5">
                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <Terminal className="w-3 h-3" />
                                    <span>Console Output</span>
                                </div>
                                <button className="text-xs text-gray-500 hover:text-white transition-colors">Clear custom-scrollbar</button>
                            </div>
                            <div
                                className="flex-grow p-4 overflow-y-auto font-mono text-sm space-y-1 custom-scrollbar"
                                ref={consoleRef}
                            >
                                {consoleOutput.map((log, i) => (
                                    <div key={i} className="text-gray-300 flex items-start gap-2">
                                        <span className="text-[#CC5500] select-none text-opacity-50">›</span>
                                        <span>{log}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Interactive Visualizer */}
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        <div className="h-full rounded-2xl bg-[#0F0F0F] border border-white/10 relative overflow-hidden flex flex-col">
                            {/* Status Bar */}
                            <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-20">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                                    <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
                                        {isListening ? 'System Active' : 'System Idle'}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500">
                                    <Volume2 className="w-4 h-4" />
                                    <div className="w-20 h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-[#CC5500] transition-all duration-300"
                                            style={{ width: `${volume}%` }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Center: Dynamic Waveform */}
                            <div className="flex-grow relative flex flex-col items-center justify-center overflow-hidden min-h-[300px]">
                                {/* Waveform Background */}
                                <div className="absolute inset-0 z-0">
                                    <VoiceWaveform isListening={isListening} />
                                </div>

                                {/* Center Interaction Button */}
                                <div className="relative z-10">
                                    <button
                                        onClick={() => setIsListening(!isListening)}
                                        className={`w-28 h-28 rounded-full flex items-center justify-center transition-all duration-500 will-change-transform cursor-pointer group ${isListening
                                                ? 'bg-[#CC5500] shadow-[0_0_60px_rgba(204,85,0,0.5)] scale-110'
                                                : 'bg-[#141414] border border-white/10 hover:border-[#CC5500] hover:shadow-[0_0_30px_rgba(204,85,0,0.2)] hover:scale-105'
                                            }`}
                                    >
                                        <Mic className={`w-12 h-12 transition-colors duration-300 ${isListening ? 'text-white' : 'text-gray-400 group-hover:text-[#CC5500]'}`} />

                                        {/* Ripple Effect when listening */}
                                        {isListening && (
                                            <>
                                                <div className="absolute inset-0 rounded-full border border-white/20 animate-ping-slow" />
                                                <div className="absolute -inset-4 rounded-full border border-[#CC5500]/30 animate-pulse" />
                                            </>
                                        )}
                                    </button>

                                    <p className={`absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium tracking-wide transition-colors duration-300 ${isListening ? 'text-[#CC5500]' : 'text-gray-500'}`}>
                                        {isListening ? 'Tap to Stop' : 'Tap to Speak'}
                                    </p>
                                </div>
                            </div>

                            {/* Bottom: Transcript & Info */}
                            <div className="m-4 p-4 rounded-xl bg-[#141414]/90 backdrop-blur border border-white/5 space-y-3">
                                <div className="flex items-center gap-2 text-[#CC5500] text-xs uppercase tracking-wider font-bold">
                                    <Activity className="w-3 h-3" />
                                    Live Transcript
                                </div>
                                <p className={`text-lg transition-colors ${transcript ? 'text-white' : 'text-gray-600 italic'}`}>
                                    {transcript || "Listening for speech input..."}
                                </p>
                            </div>
                        </div>

                        {/* Quick Tips */}
                        <div className="rounded-xl bg-[#CC5500]/5 border border-[#CC5500]/20 p-4">
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-[#CC5500] flex-shrink-0 mt-0.5" />
                                <div>
                                    <h4 className="text-white font-medium text-sm mb-1">Quick Tip</h4>
                                    <p className="text-gray-400 text-xs leading-relaxed">
                                        Try saying <span className="text-[#CC5500]">"Hello"</span> or <span className="text-[#CC5500]">"Search for JSVoice"</span> to test the basic commands. Make sure your microphone permission is enabled.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
