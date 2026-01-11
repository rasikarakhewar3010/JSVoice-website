'use client';

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import JSVoice from 'jsvoice'; // Import directly from jsvoice package
import { useToast } from '@/components/ui/toast';
import { useRouter } from 'next/navigation';

interface VoiceContextType {
    voice: any;
    isListening: boolean;
    voiceStatus: 'idle' | 'listening' | 'processing' | 'active';
    lastCommand: string;
    transcript: string;
    toggleListening: () => void;
    matrixMode: boolean;
    setMatrixMode: (val: boolean) => void;
    ghostMode: boolean;
    setGhostMode: (val: boolean) => void;
}

const VoiceContext = createContext<VoiceContextType | undefined>(undefined);

export function GlobalVoiceProvider({ children }: { children: React.ReactNode }) {
    const [voiceStatus, setVoiceStatus] = useState<'idle' | 'listening' | 'processing' | 'active'>('idle');
    const [lastCommand, setLastCommand] = useState<string>('');
    const [transcript, setTranscript] = useState<string>('');
    const [matrixMode, setMatrixMode] = useState(false);
    const [ghostMode, setGhostMode] = useState(false);
    const voiceRef = useRef<any>(null);
    const { toast } = useToast();
    const router = useRouter();

    // Side effect for Matrix Mode
    useEffect(() => {
        if (matrixMode) {
            document.documentElement.style.filter = 'invert(1) hue-rotate(180deg) brightness(0.8)';
        } else {
            document.documentElement.style.filter = 'none';
        }
    }, [matrixMode]);

    // Side effect for Ghost Mode
    useEffect(() => {
        if (ghostMode) {
            document.body.style.opacity = '0.3';
        } else {
            document.body.style.opacity = '1';
        }
    }, [ghostMode]);

    const playActivationSound = (type: 'wake' | 'success' | 'nav' | 'scroll' | 'fx' = 'wake') => {
        try {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();

            const masterGain = ctx.createGain();
            masterGain.connect(ctx.destination);
            masterGain.gain.setValueAtTime(0, ctx.currentTime);
            masterGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.01);

            const osc = ctx.createOscillator();
            const filter = ctx.createBiquadFilter();

            osc.connect(filter);
            filter.connect(masterGain);

            if (type === 'wake') {
                // Sweeping robotic "Up" sound
                osc.type = 'sawtooth';
                filter.type = 'lowpass';
                osc.frequency.setValueAtTime(100, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.2);
                filter.frequency.setValueAtTime(200, ctx.currentTime);
                filter.frequency.exponentialRampToValueAtTime(4000, ctx.currentTime + 0.2);
                masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
                osc.start();
                osc.stop(ctx.currentTime + 0.4);
            } else if (type === 'nav') {
                // Digital blip-blop
                osc.type = 'square';
                osc.frequency.setValueAtTime(400, ctx.currentTime);
                osc.frequency.setValueAtTime(600, ctx.currentTime + 0.05);
                osc.frequency.setValueAtTime(850, ctx.currentTime + 0.1);
                masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
                osc.start();
                osc.stop(ctx.currentTime + 0.2);
            } else if (type === 'scroll') {
                // Mechanical whoosh
                osc.type = 'sine';
                filter.type = 'bandpass';
                filter.Q.value = 15;
                osc.frequency.setValueAtTime(150, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(500, ctx.currentTime + 0.3);
                masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
                osc.start();
                osc.stop(ctx.currentTime + 0.35);
            } else if (type === 'fx') {
                // Deep matrix space descend
                osc.type = 'sawtooth';
                filter.type = 'lowpass';
                osc.frequency.setValueAtTime(1200, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.8);
                filter.frequency.setValueAtTime(2000, ctx.currentTime);
                filter.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.8);
                masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
                osc.start();
                osc.stop(ctx.currentTime + 1.2);
            } else {
                // Short robotic confirmation
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(900, ctx.currentTime);
                osc.frequency.setValueAtTime(1800, ctx.currentTime + 0.05);
                masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
                osc.start();
                osc.stop(ctx.currentTime + 0.15);
            }
        } catch (e) { console.error(e) }
    };

    useEffect(() => {
        // Suppress recurring library logs globally
        const originalError = console.error;
        console.error = (...args: any[]) => {
            const str = args.join(' ').toLowerCase();
            if (str.includes('[jsvoice]') && (str.includes('no-speech') || str.includes('aborted') || str.includes('network'))) {
                return;
            }
            originalError.apply(console, args);
        };

        if (voiceRef.current) return;

        const voice = new JSVoice({
            wakeWord: 'hello voice',
            wakeWordTimeout: 7000,
            continuous: true,
            autoRestart: true,
            onWakeWordDetected: () => {
                setVoiceStatus('listening');
                toast("System Link Active.", "info");
                playActivationSound('wake');
                setLastCommand('');
                // Greeting removed per user request
            },
            onCommandRecognized: (phrase: string) => {
                setLastCommand(phrase);
            },
            onError: (err: any) => {
                const errorMsg = (typeof err === 'string' ? err : err?.error || err?.message || err?.info || '').toLowerCase();
                if (
                    errorMsg.includes('aborted') ||
                    errorMsg.includes('no-speech') ||
                    errorMsg.includes('network') ||
                    errorMsg === ''
                ) return;
                originalError("[JSVoice] Technical Entry:", err);
            }
        } as any);

        // Explicitly disable internal library debugging
        (voice as any).debug = false;

        (voice as any).onResult = (text: string) => {
            setTranscript(text);
        };

        // Scroll Control
        voice.addCommand('scroll down', () => {
            window.scrollBy({ top: 700, behavior: 'smooth' });
            playActivationSound('scroll');
        });

        voice.addCommand('scroll up', () => {
            window.scrollBy({ top: -700, behavior: 'smooth' });
            playActivationSound('scroll');
        });

        voice.addCommand('stop listening', () => {
            setVoiceStatus('idle');
            toast("Node Dormant.", "info");
            playActivationSound('nav');
        });

        // Site Effects
        voice.addCommand('matrix mode', () => {
            setMatrixMode(true);
            playActivationSound('fx');
            voice.speak('Simulation adjusted.');
        });

        voice.addCommand('ghost mode', () => {
            setGhostMode(true);
            playActivationSound('fx');
            voice.speak('Phase shift complete.');
        });

        voice.addCommand('normal mode', () => {
            setMatrixMode(false);
            setGhostMode(false);
            playActivationSound('success');
            voice.speak('Reality restored.');
        });

        // Navigation Aliases
        const navPlayground = () => {
            playActivationSound('nav');
            router.push('/playground');
        };
        voice.addCommand('go to playground', navPlayground);
        voice.addCommand('open playground', navPlayground);
        voice.addCommand('show playground', navPlayground);

        const navDocs = () => {
            playActivationSound('nav');
            router.push('/docs');
        };
        voice.addCommand('go to docs', navDocs);
        voice.addCommand('open docs', navDocs);
        voice.addCommand('show documentation', navDocs);

        voice.addCommand('zoom in', () => {
            const currentZoom = parseFloat(document.body.style.zoom || '1');
            document.body.style.zoom = (currentZoom + 0.1).toString();
            playActivationSound('success');
        });

        voice.addCommand('zoom out', () => {
            const currentZoom = parseFloat(document.body.style.zoom || '1');
            document.body.style.zoom = (currentZoom - 0.1).toString();
            playActivationSound('success');
        });

        voice.addCommand('reset zoom', () => {
            document.body.style.zoom = '1';
            playActivationSound('nav');
        });

        voice.addCommand('system diagnostics', () => {
            playActivationSound('fx');
            voice.speak('Diagnostics initiated. Core temperature nominal. Neural link bandwidth at maximum. All systems functional.');
        });

        voice.addCommand('go home', () => {
            playActivationSound('nav');
            router.push('/');
        });

        voice.addCommand('reload system', () => {
            playActivationSound('fx');
            voice.speak('Reinitializing core.');
            setTimeout(() => window.location.reload(), 1200);
        });

        voiceRef.current = voice;

        try {
            voice.start();
        } catch (e) {
            console.log("Mic access pending.");
        }

        return () => {
            if (voiceRef.current) voiceRef.current.stop();
        };
    }, [router, toast]);

    const toggleListening = () => {
        if (!voiceRef.current) return;
        if (voiceStatus === 'listening' || voiceStatus === 'active') {
            voiceRef.current.stop();
            setVoiceStatus('idle');
        } else {
            voiceRef.current.start();
            setVoiceStatus('listening');
        }
    };

    return (
        <VoiceContext.Provider value={{
            voice: voiceRef.current,
            isListening: voiceStatus === 'listening' || voiceStatus === 'active',
            voiceStatus,
            lastCommand,
            transcript,
            toggleListening,
            matrixMode,
            setMatrixMode,
            ghostMode,
            setGhostMode
        }}>
            {children}
        </VoiceContext.Provider>
    );
}

export function useGlobalVoice() {
    const context = useContext(VoiceContext);
    if (!context) {
        throw new Error("useGlobalVoice must be used within GlobalVoiceProvider");
    }
    return context;
}
