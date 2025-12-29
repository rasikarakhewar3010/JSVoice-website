'use client';

import { useEffect, useRef, useState } from 'react';

interface FuzzyTextProps {
    text: string;
    className?: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
    continuous?: boolean;
}

export function FuzzyText({
    text,
    className = '',
    as: Component = 'span',
    continuous = false,
}: FuzzyTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        const chars = text.split('');
        const glitchChars = '█▓▒░!@#$%^&*0123456789';

        const glitch = () => {
            setDisplayText(
                chars
                    .map((char) => {
                        if (char === ' ') return ' ';
                        if (Math.random() > 0.9) {
                            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                        }
                        return char;
                    })
                    .join('')
            );
        };

        if (continuous) {
            intervalRef.current = setInterval(glitch, 100);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [text, continuous]);

    return (
        <Component
            className={`inline-block font-mono text-[#CC5500] ${className}`}
            style={{
                textShadow: '0 0 10px rgba(204, 85, 0, 0.5), 0 0 20px rgba(204, 85, 0, 0.3)',
            }}
        >
            {displayText}
        </Component>
    );
}
