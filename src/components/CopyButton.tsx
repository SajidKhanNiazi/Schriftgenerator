'use client';

import { useState } from 'react';

interface CopyButtonProps {
  text: string;
  className?: string;
  variant?: 'default' | 'small' | 'large';
}

export default function CopyButton({ text, className = '', variant = 'default' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const sizeClasses = {
    small: 'px-3 py-1.5 text-xs',
    default: 'px-4 py-2 text-sm',
    large: 'px-6 py-3 text-base',
  };

  return (
    <button
      onClick={handleCopy}
      className={`font-medium rounded-lg transition-all duration-300 flex items-center gap-1.5 ${
        copied
          ? 'bg-green-500 text-white'
          : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-md hover:shadow-lg'
      } ${sizeClasses[variant]} ${className}`}
      aria-label="In Zwischenablage kopieren"
    >
      {copied ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Kopiert!
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Kopieren
        </>
      )}
    </button>
  );
}
