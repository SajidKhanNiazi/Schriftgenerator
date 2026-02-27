'use client';

import { useState } from 'react';

interface FontCardProps {
  name: string;
  text: string;
  generatedText: string;
  size: number;
  onCopy: () => void;
}

export default function FontCard({ name, generatedText, size, onCopy }: FontCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedText);
      setCopied(true);
      if ('vibrate' in navigator) {
        navigator.vibrate([30, 10, 30]);
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
      className={`shimmer-on-hover group relative w-full text-left rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden focus:outline-none focus:ring-2 focus:ring-emerald-500/30 active:scale-[0.97] ${copied
        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/30'
        : 'bg-white dark:bg-slate-900/80 border-slate-200/70 dark:border-slate-800/60 hover:border-emerald-400/50 hover:shadow-xl hover:shadow-emerald-500/10'
        }`}
    >
      {/* Content */}
      <div className="relative z-10 p-5 md:p-6 flex flex-col min-h-[140px] md:min-h-[160px] justify-between">

        {/* Font name label */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-block w-1.5 h-1.5 rounded-full transition-colors duration-300 ${copied ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600 group-hover:bg-emerald-500'}`} />
          <span className={`text-[10px] font-bold uppercase tracking-[1.5px] transition-colors duration-300 ${copied ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-emerald-500'}`}>
            {name}
          </span>
        </div>

        {/* Preview text */}
        <div className="flex-1 flex items-center justify-center py-2">
          <p
            className={`text-center leading-snug font-medium transition-all duration-500 ${copied
              ? 'scale-105 text-emerald-600 dark:text-emerald-400'
              : 'text-slate-800 dark:text-slate-100 group-hover:scale-[1.02]'
              }`}
            style={{
              fontSize: `clamp(16px, ${size * 0.8}px, ${size * 1.1}px)`,
              wordBreak: 'break-word',
              overflowWrap: 'anywhere'
            }}
          >
            {generatedText}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-100/60 dark:border-slate-800/50">
          <div className="flex items-center gap-2.5">
            <div className={`flex items-center justify-center w-7 h-7 rounded-full transition-all duration-500 ${copied
              ? 'bg-emerald-500 text-white scale-110'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:bg-emerald-500/10 group-hover:text-emerald-500'
              }`}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {copied
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                }
              </svg>
            </div>
            <span className={`text-[10px] font-black uppercase tracking-[1.5px] transition-colors duration-300 ${copied ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-emerald-500'}`}>
              {copied ? '✓ Kopiert!' : 'Kopieren'}
            </span>
          </div>

          {/* Animated accent line */}
          <div className={`h-[2px] rounded-full transition-all duration-700 ${copied
            ? 'w-10 bg-emerald-500'
            : 'w-6 bg-slate-200 dark:bg-slate-700 group-hover:w-10 group-hover:bg-emerald-500/40'
            }`} />
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-transform duration-500 ${copied ? 'translate-y-0' : 'translate-y-full'}`} />
    </button>
  );
}
