'use client';

import { useEffect, useRef } from 'react';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    color: string;
}

export function SplashCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const lastMouseRef = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        // Only run on desktop
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Colors
        const colors = ['#CC5500', '#E67300', '#FF8A3D', '#994400'];

        // Create particle
        const createParticle = (x: number, y: number, isClick = false) => {
            const count = isClick ? 30 : 3;
            for (let i = 0; i < count; i++) {
                const angle = (Math.PI * 2 * i) / count;
                const speed = isClick ? Math.random() * 5 + 3 : Math.random() * 2 + 1;
                particlesRef.current.push({
                    x,
                    y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    life: 1,
                    maxLife: isClick ? 60 : 30,
                    size: isClick ? Math.random() * 4 + 2 : Math.random() * 3 + 1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                });
            }
        };

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            lastMouseRef.current = { ...mouseRef.current };
            mouseRef.current = { x: e.clientX, y: e.clientY };

            // Create trail particles
            const dx = mouseRef.current.x - lastMouseRef.current.x;
            const dy = mouseRef.current.y - lastMouseRef.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 5) {
                createParticle(mouseRef.current.x, mouseRef.current.y);
            }
        };

        // Click handler
        const handleClick = (e: MouseEvent) => {
            createParticle(e.clientX, e.clientY, true);
        };

        // Animation loop
        const animate = () => {
            if (!ctx || !canvas) return;

            // Clear with fade effect
            ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particlesRef.current = particlesRef.current.filter((particle) => {
                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vx *= 0.98;
                particle.vy *= 0.98;
                particle.life--;

                const alpha = particle.life / particle.maxLife;

                // Draw particle with glow
                ctx.save();
                ctx.globalAlpha = alpha;

                // Outer glow
                const gradient = ctx.createRadialGradient(
                    particle.x,
                    particle.y,
                    0,
                    particle.x,
                    particle.y,
                    particle.size * 3
                );
                gradient.addColorStop(0, particle.color);
                gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

                ctx.fillStyle = gradient;
                ctx.fillRect(
                    particle.x - particle.size * 3,
                    particle.y - particle.size * 3,
                    particle.size * 6,
                    particle.size * 6
                );

                // Core particle
                ctx.fillStyle = particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();

                return particle.life > 0;
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        // Start animation
        animate();

        // Add event listeners
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 z-50"
            style={{ mixBlendMode: 'screen' }}
        />
    );
}
