'use client';

import { useEffect, useRef } from 'react';

interface VoiceWaveformProps {
    isListening?: boolean;
}

export function VoiceWaveform({ isListening = false }: VoiceWaveformProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>(0);
    const audioContextRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const barsRef = useRef<number[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.offsetWidth * window.devicePixelRatio;
                canvas.height = parent.offsetHeight * window.devicePixelRatio;
                ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const barCount = 64; // Doubled for finer resolution
        // Initialize bars if empty
        if (barsRef.current.length === 0) {
            barsRef.current = Array(barCount).fill(0.1);
        }

        const animate = () => {
            if (!ctx || !canvas) return;

            // Check if canvas is still attached to DOM
            if (!canvas.isConnected) {
                if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
                return;
            }

            const width = canvas.offsetWidth;
            const height = canvas.offsetHeight;
            const barWidth = width / barCount;
            const gap = 2;
            const actualBarWidth = Math.max(2, barWidth - gap);

            ctx.clearRect(0, 0, width, height);

            barsRef.current.forEach((bar, index) => {
                let targetHeight = 0.1; // Default idle height

                if (isListening && dataArrayRef.current && analyserRef.current) {
                    // Map frequency data to bars (skip high frequencies that retain less energy)
                    const dataIndex = Math.floor(index * (dataArrayRef.current.length / 2) / barCount);
                    const value = dataArrayRef.current[dataIndex] / 255;
                    // Amplify signal for better visibility
                    targetHeight = Math.max(0.1, value * 1.2);
                } else if (!isListening) {
                    // Gentle idle animation wave
                    const time = Date.now() / 1000;
                    targetHeight = 0.1 + Math.sin(index * 0.2 + time) * 0.05;
                }

                // Smooth interpolation
                barsRef.current[index] += (targetHeight - barsRef.current[index]) * 0.2;

                const currentHeight = barsRef.current[index] * height;
                const x = index * barWidth + (barWidth - actualBarWidth) / 2;
                // Draw from bottom
                const y = height - currentHeight;

                // Create gradient
                const gradient = ctx.createLinearGradient(x, height, x, y);
                if (isListening) {
                    gradient.addColorStop(0, 'rgba(255, 138, 61, 0.9)'); // #FF8A3D at bottom
                    gradient.addColorStop(1, 'rgba(204, 85, 0, 0.1)'); // Top fade
                } else {
                    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
                    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');
                }

                ctx.fillStyle = gradient;

                // Draw rounded rect from bottom
                ctx.beginPath();
                // Custom rounded rect to only round top corners? 
                // For simplicity, using roundRect but since it's at the bottom, visual is fine.
                // Could also do rect and clip but roundRect is easier.
                ctx.roundRect(x, y, actualBarWidth, currentHeight, [4, 4, 0, 0]);
                ctx.fill();

                // Add subtle glow for active listening
                if (isListening) {
                    ctx.shadowBlur = 20;
                    ctx.shadowColor = 'rgba(204, 85, 0, 0.4)';
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isListening]);

    // Initialize audio context logic
    useEffect(() => {
        let updateFrameId: number;

        if (isListening && !audioContextRef.current) {
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
                    audioContextRef.current = new AudioContext();
                    analyserRef.current = audioContextRef.current.createAnalyser();
                    analyserRef.current.fftSize = 256;
                    analyserRef.current.smoothingTimeConstant = 0.8; // Smoother transitions

                    const source = audioContextRef.current.createMediaStreamSource(stream);
                    source.connect(analyserRef.current);

                    const bufferLength = analyserRef.current.frequencyBinCount;
                    // Fix: Explicitly create Uint8Array
                    dataArrayRef.current = new Uint8Array(bufferLength);

                    const updateData = () => {
                        if (analyserRef.current && dataArrayRef.current) {
                            // Cast to unknown then Uint8Array to satisfy strict typing
                            analyserRef.current.getByteFrequencyData(dataArrayRef.current as any);
                        }
                        if (isListening) {
                            updateFrameId = requestAnimationFrame(updateData);
                        }
                    };
                    updateData();
                })
                .catch((err) => {
                    console.error('Error accessing microphone:', err);
                });
        }

        return () => {
            if (updateFrameId) {
                cancelAnimationFrame(updateFrameId);
            }
            if (audioContextRef.current && !isListening) {
                // Only close if we are stopping listening, otherwise keep context?? 
                // Actually good practice to suspend/close.
                audioContextRef.current.close().then(() => {
                    audioContextRef.current = null;
                });
            }
        };
    }, [isListening]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ width: '100%', height: '100%' }}
        />
    );
}
