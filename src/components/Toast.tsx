'use client';

import { useEffect, useState } from 'react';

interface ToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
}

export default function Toast({ message, isVisible, onClose }: ToastProps) {
    const [shouldRender, setShouldRender] = useState(isVisible);

    useEffect(() => {
        if (isVisible) {
            setShouldRender(true);
            const timer = setTimeout(() => {
                onClose();
            }, 2000);
            return () => clearTimeout(timer);
        } else {
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 300); // Wait for fade out animation
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!shouldRender) return null;

    return (
        <div
            className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
        >
            <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-gray-700 dark:border-gray-200">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                    ✓
                </div>
                <span className="font-bold text-sm tracking-tight">{message}</span>
            </div>
        </div>
    );
}
