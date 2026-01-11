'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { Mic, Play, Zap, Radio, BarChart3, FileCode, ArrowUpRight } from 'lucide-react';

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '230, 115, 0'; // #E67300 in RGB
const MOBILE_BREAKPOINT = 768;

const cardData = [
    {
        color: '#0A0A0A',
        title: 'Voice Recognition',
        description: 'Real-time speech-to-text with 50+ language support',
        label: 'Core',
        icon: Mic
    },
    {
        color: '#0A0A0A',
        title: 'Speech Synthesis',
        description: 'Natural text-to-speech with customizable voices',
        label: 'Audio',
        icon: Play
    },
    {
        color: '#0A0A0A',
        title: 'Pattern Matching',
        description: 'Extract variables from commands dynamically',
        label: 'Smart',
        icon: Zap
    },
    {
        color: '#0A0A0A',
        title: 'Wake Word Detection',
        description: 'Hands-free activation with custom wake words',
        label: 'Activation',
        icon: Radio
    },
    {
        color: '#0A0A0A',
        title: 'Audio Visualization',
        description: 'Real-time amplitude and frequency monitoring',
        label: 'Analytics',
        icon: BarChart3
    },
    {
        color: '#0A0A0A',
        title: 'TypeScript Support',
        description: 'Full type definitions for autocomplete',
        label: 'DX',
        icon: FileCode
    }
];

const createParticleElement = (x: number, y: number, color = DEFAULT_GLOW_COLOR) => {
    const el = document.createElement('div');
    el.className = 'particle';
    el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
    return el;
};

const calculateSpotlightValues = (radius: number) => ({
    proximity: radius * 0.5,
    fadeDistance: radius * 0.75
});

const updateCardGlowProperties = (
    card: HTMLElement,
    mouseX: number,
    mouseY: number,
    glow: number,
    radius: number
) => {
    const rect = card.getBoundingClientRect();
    const relativeX = ((mouseX - rect.left) / rect.width) * 100;
    const relativeY = ((mouseY - rect.top) / rect.height) * 100;

    card.style.setProperty('--glow-x', `${relativeX}%`);
    card.style.setProperty('--glow-y', `${relativeY}%`);
    card.style.setProperty('--glow-intensity', glow.toString());
    card.style.setProperty('--glow-radius', `${radius}px`);
};

interface ParticleCardProps {
    children: React.ReactNode;
    className?: string;
    disableAnimations?: boolean;
    style?: React.CSSProperties;
    particleCount?: number;
    glowColor?: string;
    enableTilt?: boolean;
    clickEffect?: boolean;
    enableMagnetism?: boolean;
}

const ParticleCard: React.FC<ParticleCardProps> = ({
    children,
    className = '',
    disableAnimations = false,
    style,
    particleCount = DEFAULT_PARTICLE_COUNT,
    glowColor = DEFAULT_GLOW_COLOR,
    enableTilt = true,
    clickEffect = false,
    enableMagnetism = false
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const particlesRef = useRef<HTMLDivElement[]>([]);
    const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
    const isHoveredRef = useRef(false);
    const memoizedParticles = useRef<HTMLDivElement[]>([]);
    const particlesInitialized = useRef(false);
    const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

    const initializeParticles = useCallback(() => {
        if (particlesInitialized.current || !cardRef.current) return;

        const { width, height } = cardRef.current.getBoundingClientRect();
        memoizedParticles.current = Array.from({ length: particleCount }, () =>
            createParticleElement(Math.random() * width, Math.random() * height, glowColor)
        );
        particlesInitialized.current = true;
    }, [particleCount, glowColor]);

    const clearAllParticles = useCallback(() => {
        timeoutsRef.current.forEach(clearTimeout);
        timeoutsRef.current = [];
        magnetismAnimationRef.current?.kill();

        particlesRef.current.forEach(particle => {
            gsap.to(particle, {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                ease: 'back.in(1.7)',
                onComplete: () => {
                    particle.parentNode?.removeChild(particle);
                }
            });
        });
        particlesRef.current = [];
    }, []);

    const animateParticles = useCallback(() => {
        if (!cardRef.current || !isHoveredRef.current) return;

        if (!particlesInitialized.current) {
            initializeParticles();
        }

        memoizedParticles.current.forEach((particle, index) => {
            const timeoutId = setTimeout(() => {
                if (!isHoveredRef.current || !cardRef.current) return;

                const clone = particle.cloneNode(true) as HTMLDivElement;
                cardRef.current.appendChild(clone);
                particlesRef.current.push(clone);

                gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });

                gsap.to(clone, {
                    x: (Math.random() - 0.5) * 100,
                    y: (Math.random() - 0.5) * 100,
                    rotation: Math.random() * 360,
                    duration: 2 + Math.random() * 2,
                    ease: 'none',
                    repeat: -1,
                    yoyo: true
                });

                gsap.to(clone, {
                    opacity: 0.3,
                    duration: 1.5,
                    ease: 'power2.inOut',
                    repeat: -1,
                    yoyo: true
                });
            }, index * 100);

            timeoutsRef.current.push(timeoutId);
        });
    }, [initializeParticles]);

    useEffect(() => {
        if (disableAnimations || !cardRef.current) return;

        const element = cardRef.current;

        const handleMouseEnter = () => {
            isHoveredRef.current = true;
            animateParticles();

            if (enableTilt) {
                gsap.to(element, {
                    rotateX: 5,
                    rotateY: 5,
                    duration: 0.3,
                    ease: 'power2.out',
                    transformPerspective: 1000
                });
            }
        };

        const handleMouseLeave = () => {
            isHoveredRef.current = false;
            clearAllParticles();

            if (enableTilt) {
                gsap.to(element, {
                    rotateX: 0,
                    rotateY: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }

            if (enableMagnetism) {
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!enableTilt && !enableMagnetism) return;

            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            if (enableTilt) {
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;

                gsap.to(element, {
                    rotateX,
                    rotateY,
                    duration: 0.1,
                    ease: 'power2.out',
                    transformPerspective: 1000
                });
            }

            if (enableMagnetism) {
                const magnetX = (x - centerX) * 0.05;
                const magnetY = (y - centerY) * 0.05;

                magnetismAnimationRef.current = gsap.to(element, {
                    x: magnetX,
                    y: magnetY,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        };

        const handleClick = (e: MouseEvent) => {
            if (!clickEffect) return;

            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const maxDistance = Math.max(
                Math.hypot(x, y),
                Math.hypot(x - rect.width, y),
                Math.hypot(x, y - rect.height),
                Math.hypot(x - rect.width, y - rect.height)
            );

            const ripple = document.createElement('div');
            ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

            element.appendChild(ripple);

            gsap.fromTo(
                ripple,
                {
                    scale: 0,
                    opacity: 1
                },
                {
                    scale: 1,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    onComplete: () => ripple.remove()
                }
            );
        };

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('click', handleClick);

        return () => {
            isHoveredRef.current = false;
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('click', handleClick);
            clearAllParticles();
        };
    }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

    return (
        <div
            ref={cardRef}
            className={`${className} relative overflow-hidden`}
            style={{ ...style, position: 'relative', overflow: 'hidden' }}
        >
            {children}
        </div>
    );
};

interface GlobalSpotlightProps {
    gridRef: React.RefObject<HTMLDivElement>;
    disableAnimations?: boolean;
    enabled?: boolean;
    spotlightRadius?: number;
    glowColor?: string;
}

const GlobalSpotlight: React.FC<GlobalSpotlightProps> = ({
    gridRef,
    disableAnimations = false,
    enabled = true,
    spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
    glowColor = DEFAULT_GLOW_COLOR
}) => {
    const spotlightRef = useRef<HTMLDivElement | null>(null);
    const isInsideSection = useRef(false);

    useEffect(() => {
        if (disableAnimations || !gridRef?.current || !enabled) return;

        const spotlight = document.createElement('div');
        spotlight.className = 'global-spotlight';
        spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
        document.body.appendChild(spotlight);
        spotlightRef.current = spotlight;

        const handleMouseMove = (e: MouseEvent) => {
            if (!spotlightRef.current || !gridRef.current) return;

            const section = gridRef.current.closest('.bento-section');
            const rect = section?.getBoundingClientRect();
            const mouseInside =
                rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

            isInsideSection.current = mouseInside || false;
            const cards = gridRef.current.querySelectorAll('.card');

            if (!mouseInside) {
                gsap.to(spotlightRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
                cards.forEach(card => {
                    (card as HTMLElement).style.setProperty('--glow-intensity', '0');
                });
                return;
            }

            const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
            let minDistance = Infinity;

            cards.forEach(card => {
                const cardElement = card as HTMLElement;
                const cardRect = cardElement.getBoundingClientRect();
                const centerX = cardRect.left + cardRect.width / 2;
                const centerY = cardRect.top + cardRect.height / 2;
                const distance =
                    Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
                const effectiveDistance = Math.max(0, distance);

                minDistance = Math.min(minDistance, effectiveDistance);

                let glowIntensity = 0;
                if (effectiveDistance <= proximity) {
                    glowIntensity = 1;
                } else if (effectiveDistance <= fadeDistance) {
                    glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
                }

                updateCardGlowProperties(cardElement, e.clientX, e.clientY, glowIntensity, spotlightRadius);
            });

            gsap.to(spotlightRef.current, {
                left: e.clientX,
                top: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });

            const targetOpacity =
                minDistance <= proximity
                    ? 0.8
                    : minDistance <= fadeDistance
                        ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
                        : 0;

            gsap.to(spotlightRef.current, {
                opacity: targetOpacity,
                duration: targetOpacity > 0 ? 0.2 : 0.5,
                ease: 'power2.out'
            });
        };

        const handleMouseLeave = () => {
            isInsideSection.current = false;
            gridRef.current?.querySelectorAll('.card').forEach(card => {
                (card as HTMLElement).style.setProperty('--glow-intensity', '0');
            });
            if (spotlightRef.current) {
                gsap.to(spotlightRef.current, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
        };
    }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

    return null;
};

interface BentoCardGridProps {
    children: React.ReactNode;
    gridRef: React.RefObject<HTMLDivElement>;
}

const BentoCardGrid: React.FC<BentoCardGridProps> = ({ children, gridRef }) => (
    <div
        className="bento-section grid gap-4 p-4 max-w-[85rem] select-none relative mx-auto"
        style={{ fontSize: 'clamp(1rem, 0.9rem + 0.5vw, 1.5rem)' }}
        ref={gridRef}
    >
        {children}
    </div>
);

const useMobileDetection = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return isMobile;
};

interface FeatureItem {
    icon: any;
    title: string;
    description: string;
    label?: string;
}

interface MagicBentoProps {
    features?: FeatureItem[];
    textAutoHide?: boolean;
    enableStars?: boolean;
    enableSpotlight?: boolean;
    enableBorderGlow?: boolean;
    disableAnimations?: boolean;
    spotlightRadius?: number;
    particleCount?: number;
    enableTilt?: boolean;
    glowColor?: string;
    clickEffect?: boolean;
    enableMagnetism?: boolean;
}

const MagicBento: React.FC<MagicBentoProps> = ({
    features,
    textAutoHide = false,
    enableStars = false,
    enableSpotlight = true,
    enableBorderGlow = true,
    disableAnimations = false,
    spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
    particleCount = DEFAULT_PARTICLE_COUNT,
    enableTilt = false,
    glowColor = DEFAULT_GLOW_COLOR,
    clickEffect = false,
    enableMagnetism = false
}) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const isMobile = useMobileDetection();
    const shouldDisableAnimations = disableAnimations || isMobile;

    const itemsToDisplay = features || cardData;

    return (
        <>
            <style>
                {`
          .bento-section {
            --glow-x: 50%;
            --glow-y: 50%;
            --glow-intensity: 0;
            --glow-radius: 300px;
            --glow-color: ${glowColor};
            --border-color: rgba(255, 255, 255, 0.1);
            --background-dark: rgba(20, 20, 20, 0.4);
            --white: hsl(0, 0%, 100%);
            --orange-primary: rgba(230, 115, 0, 1);
            --orange-glow: rgba(230, 115, 0, 0.2);
            --orange-border: rgba(230, 115, 0, 0.8);
          }
          
          .card-responsive {
            grid-template-columns: 1fr;
            width: 100%;
            margin: 0 auto;
          }
          
          @media (min-width: 600px) {
            .card-responsive {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          
          @media (min-width: 1024px) {
            .card-responsive {
              grid-template-columns: repeat(4, 1fr);
            }
            
            .card-responsive .card:nth-child(3) {
              grid-column: span 2;
              grid-row: span 2;
            }
            
            .card-responsive .card:nth-child(4) {
              grid-column: 1 / span 2;
              grid-row: 2 / span 2;
            }
            
            .card-responsive .card:nth-child(6) {
              grid-column: 4;
              grid-row: 3;
            }
          }
          
          .card--border-glow::after {
            content: '';
            position: absolute;
            inset: 0;
            padding: 1px;
            background: radial-gradient(var(--glow-radius) circle at var(--glow-x) var(--glow-y),
                rgba(${glowColor}, 1) 0%,
                rgba(255, 255, 255, 0.1) 50%,
                transparent 100%);
            border-radius: inherit;
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            mask-composite: exclude;
            pointer-events: none;
            opacity: 0.6;
            transition: opacity 0.3s ease;
            z-index: 10;
          }
          
          .card--border-glow:hover::after {
            opacity: 1;
          }

          .card-bg-noise {
            position: absolute;
            inset: 0;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
            opacity: 0.08;
            pointer-events: none;
            z-index: 0;
          }
          
          .card--border-glow:hover {
            box-shadow: 0 0 50px -10px rgba(${glowColor}, 0.15);
            background: rgba(30, 30, 30, 0.6);
            transform: translateY(-2px);
          }
          
          .particle::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: rgba(${glowColor}, 0.2);
            border-radius: 50%;
            z-index: -1;
          }
          
          @media (max-width: 599px) {
            .card-responsive {
              grid-template-columns: 1fr;
              width: 100%;
            }
            .card-responsive .card {
              min-height: 140px;
            }
          }
        `}
            </style>

            {enableSpotlight && (
                <GlobalSpotlight
                    gridRef={gridRef as React.RefObject<HTMLDivElement>}
                    disableAnimations={shouldDisableAnimations}
                    enabled={enableSpotlight}
                    spotlightRadius={spotlightRadius}
                    glowColor={glowColor}
                />
            )}

            <BentoCardGrid gridRef={gridRef as React.RefObject<HTMLDivElement>}>
                <div className="card-responsive grid gap-4">
                    {itemsToDisplay.map((card, index) => {
                        const baseClassName = `card group flex flex-col justify-between relative aspect-[5/3] min-h-[180px] w-full max-w-full p-6 md:p-8 rounded-[24px] border border-white/5 font-light overflow-hidden transition-all duration-500 ease-out backdrop-blur-xl ${enableBorderGlow ? 'card--border-glow' : ''
                            }`;

                        const cardStyle: React.CSSProperties = {
                            backgroundColor: 'var(--background-dark)',
                            '--glow-x': '50%',
                            '--glow-y': '50%',
                            '--glow-intensity': '0',
                            '--glow-radius': '200px',
                            transform: 'translateZ(0)',
                            willChange: 'transform, box-shadow',
                            backfaceVisibility: 'hidden'
                        } as React.CSSProperties;

                        const Icon = card.icon;

                        return (
                            <div key={index} className={baseClassName} style={cardStyle}>
                                {/* Noise Texture */}
                                <div className="card-bg-noise" />

                                {/* Subtle Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none z-0" />

                                {/* Hover Gradient Splash */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#CC5500]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                                {/* Background Huge Icon */}
                                <div className="absolute -bottom-8 -right-8 opacity-[0.03] transition-all duration-700 ease-out group-hover:opacity-[0.15] group-hover:scale-110 group-hover:rotate-[-10deg] group-hover:text-[#FF8A3D] z-0">
                                    <Icon size={200} />
                                </div>

                                <div className="card__header flex justify-between items-start gap-3 relative z-10">
                                    <div className="p-3 rounded-2xl bg-[#CC5500]/10 border border-[#CC5500]/20 group-hover:bg-[#CC5500] group-hover:shadow-[0_0_20px_rgba(204,85,0,0.4)] transition-all duration-300">
                                        <Icon size={24} className="text-[#CC5500] group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] uppercase tracking-wider font-semibold text-gray-400 group-hover:text-white group-hover:border-white/20 transition-all">
                                        {card.label || 'Feature'}
                                    </div>
                                </div>

                                <div className="card__content flex flex-col relative z-10 mt-auto">
                                    <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-[#E67300] transition-colors">
                                        {card.title}
                                    </h3>
                                    <p className="text-sm md:text-base text-gray-400 leading-relaxed font-normal group-hover:text-gray-300 transition-colors">
                                        {card.description}
                                    </p>

                                    <div className="mt-4 flex items-center text-xs font-mono text-[#CC5500] opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                        <span>Learn more</span>
                                        <ArrowUpRight className="w-3 h-3 ml-1" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </BentoCardGrid>
        </>
    );
};

export default MagicBento;
