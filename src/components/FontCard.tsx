'use client';

import { useState } from 'react';

interface FontCardProps {
  name: string;
  text: string;
  generatedText: string;
  size: 'sm' | 'md' | 'lg';
  onCopy: () => void;
}

export default function FontCard({ generatedText, size, onCopy }: FontCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      setCopied(true);
      if ('vibrate' in navigator) {
        navigator.vibrate(50);
      }
      onCopy();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  const sizeClasses = {
    sm: 'text-xl sm:text-2xl',
    md: 'text-2xl sm:text-[26px]',
    lg: 'text-[26px] sm:text-3xl',
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group relative w-full text-left bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700/80 p-3 sm:p-4 transition-all duration-200 cursor-pointer hover:border-emerald-400/50 hover:shadow-lg hover:shadow-emerald-500/5 active:scale-[0.98] overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
    >
      {/* Generated Text - Clean & Centered */}
      <div className="flex items-center justify-center min-h-[64px] sm:min-h-[72px] py-2">
        <p className={`text-center break-words leading-tight font-medium text-gray-900 dark:text-gray-100 ${sizeClasses[size]}`}>
          {generatedText}
        </p>
      </div>

      {/* Copy indicator - minimal */}
      <div className={`mt-2 py-2 rounded-lg text-center text-xs font-semibold uppercase tracking-wider transition-all ${copied
        ? 'bg-emerald-500 text-white'
        : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 group-hover:bg-emerald-500/10 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'
        }`}>
        {copied ? '✓ Kopiert' : 'Tippen zum Kopieren'}
      </div>
    </button>
  );
}
