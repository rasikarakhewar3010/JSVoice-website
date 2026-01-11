'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

interface OrbProps {
    isListening: boolean;
}

function AnimatedOrb({ isListening }: OrbProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);
    const analyzerRef = useRef<AnalyserNode | null>(null);
    const dataArrayRef = useRef<Uint8Array | null>(null);
    const smoothVolume = useRef(0);

    useEffect(() => {
        let audioContext: AudioContext;
        let stream: MediaStream;

        if (isListening) {
            navigator.mediaDevices.getUserMedia({ audio: true }).then(s => {
                stream = s;
                const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
                audioContext = new AudioContext();
                const source = audioContext.createMediaStreamSource(stream);
                const analyzer = audioContext.createAnalyser();
                analyzer.fftSize = 64;
                source.connect(analyzer);
                analyzerRef.current = analyzer;
                dataArrayRef.current = new Uint8Array(analyzer.frequencyBinCount);
            }).catch(e => console.error("Microphone access denied for 3D Orb", e));
        }

        return () => {
            if (audioContext) audioContext.close();
            if (stream) stream.getTracks().forEach(track => track.stop());
        };
    }, [isListening]);

    const haloRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        let volume = 0;

        if (isListening && analyzerRef.current && dataArrayRef.current) {
            analyzerRef.current.getByteFrequencyData(dataArrayRef.current as any);
            const sum = dataArrayRef.current.reduce((a, b) => a + b, 0);
            volume = sum / dataArrayRef.current.length / 70;
        }

        // Smooth the volume changes
        smoothVolume.current = THREE.MathUtils.lerp(smoothVolume.current, volume, 0.2);

        if (meshRef.current) {
            meshRef.current.rotation.x = time * 0.15;
            meshRef.current.rotation.y = time * 0.25;

            // Core scales within the Halo boundary (STRICT CAP)
            const coreScale = 1.0 + (isListening ? Math.min(smoothVolume.current * 2.2, 1.2) : Math.sin(time * 1.5) * 0.05);
            meshRef.current.scale.set(coreScale, coreScale, coreScale);
        }

        if (haloRef.current) {
            // Halo stays as a constant large shell (3.0)
            const haloScale = 3.0 + (Math.sin(time * 0.5) * 0.02);
            haloRef.current.scale.set(haloScale, haloScale, haloScale);
            haloRef.current.rotation.z = -time * 0.02;
        }

        if (materialRef.current) {
            materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, isListening ? 0.8 + smoothVolume.current : 0.45, 0.1);
            materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, isListening ? 8 + smoothVolume.current * 25 : 2.5, 0.1);
        }
    });

    return (
        <group scale={0.8}> {/* Group scale for safety margin */}
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Main Orb - The Reactive Core */}
                <Sphere ref={meshRef} args={[1, 128, 128]}>
                    <MeshDistortMaterial
                        ref={materialRef}
                        color="#CC5500"
                        distort={0.4}
                        speed={2}
                        roughness={0.05}
                        metalness={0.95}
                        emissive="#CC5500"
                        emissiveIntensity={isListening ? 1.5 + smoothVolume.current * 5 : 0.4}
                    />
                </Sphere>

                {/* Energy Halo - The Large Stable Shell (Cages the Core) */}
                <Sphere ref={haloRef} args={[1, 64, 64]}>
                    <meshStandardMaterial
                        color="#FF8A3D"
                        transparent
                        opacity={isListening ? 0.12 + smoothVolume.current * 0.3 : 0.05}
                        wireframe
                        blending={THREE.AdditiveBlending}
                        side={THREE.DoubleSide}
                    />
                </Sphere>
            </Float>
        </group>
    );
}

export function VoiceOrb({ isListening }: OrbProps) {
    return (
        <div className="w-full h-full relative flex items-center justify-center overflow-visible">
            <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
                <ambientLight intensity={1.0} />
                <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2} castShadow />
                <pointLight position={[-10, -10, -10]} intensity={1.5} color="#FF8A3D" />
                <AnimatedOrb isListening={isListening} />
            </Canvas>
            {/* Dynamic Ambient Glow */}
            <div className={`absolute inset-0 rounded-full bg-[#CC5500]/5 blur-[160px] pointer-events-none transition-all duration-1000 ${isListening ? 'opacity-100 scale-125' : 'opacity-40 scale-100'}`} />
        </div>
    );
}
