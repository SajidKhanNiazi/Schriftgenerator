'use client';

import { useState } from 'react';

interface FontCardProps {
  name: string;
  text: string;
  generatedText: string;
  size: number;
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

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`group relative w-full text-left bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/60 dark:border-slate-800/60 px-6 py-5 md:p-6 transition-all duration-500 cursor-pointer hover:border-emerald-500/40 hover:glow-shadow-emerald active:scale-[0.98] overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-500/20 ${copied ? 'ring-2 ring-emerald-500/50' : ''}`}
    >
      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/[0.02] to-teal-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Generated Text - Clean & Elegant */}
      <div className="flex items-center justify-center min-h-[60px] md:min-h-[72px] py-2 relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
        <p
          className="text-center break-all leading-snug font-semibold text-slate-800 dark:text-slate-100 px-1"
          style={{
            fontSize: `clamp(14px, ${size * 0.75}px, ${size}px)`,
            wordBreak: 'break-word',
            overflowWrap: 'anywhere'
          }}
        >
          {generatedText}
        </p>
      </div>

      {/* Sleek Action Bar */}
      <div className="mt-6 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full transition-all duration-500 ${copied ? 'bg-emerald-500 animate-pulse scale-125' : 'bg-slate-200 dark:bg-slate-800 group-hover:bg-emerald-500/30'}`} />
          <span className={`text-[10px] font-black uppercase tracking-[0.15em] transition-colors duration-300 ${copied ? 'text-emerald-500' : 'text-slate-400 group-hover:text-emerald-500/70'}`}>
            {copied ? 'Kopiert' : 'Kopieren'}
          </span>
        </div>

        <div className={`flex items-center justify-center w-6 h-6 rounded-full transition-all duration-500 ${copied ? 'bg-emerald-500 text-white scale-110 rotate-0' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 opacity-0 group-hover:opacity-100 -rotate-12 group-hover:rotate-0'}`}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {copied
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            }
          </svg>
        </div>
      </div>
    </button>
  );
}
