'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';

interface LazySectionProps {
    children: ReactNode;
    offset?: string;
}

export default function LazySection({ children, offset = '200px' }: LazySectionProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { rootMargin: offset }
        );

        observer.observe(el);
        return () => observer.unobserve(el);
    }, [offset]);

    return <div ref={ref}>{isVisible ? children : <div className="h-96" />}</div>;
}
