'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="w-full max-w-5xl glass-premium rounded-full border border-slate-200/50 dark:border-slate-800/50 shadow-xl shadow-slate-200/20 dark:shadow-slate-900/40 transition-all duration-300">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex justify-between items-center h-14 md:h-16">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:rotate-6 transition-transform duration-300">
                <span className="text-white font-black text-xs">SG</span>
              </div>
              <span className="text-lg md:text-xl font-black tracking-tighter text-slate-900 dark:text-white transition-transform group-hover:scale-105 duration-300">
                Schriftgenerator
              </span>
            </Link>

            {/* Links & Badge */}
            <div className="flex items-center gap-4 md:gap-8">
              <div className="hidden md:flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                <Link href="/impressum" className="hover:text-emerald-500 transition-colors relative group/link">
                  Impressum
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-500 transition-all group-hover/link:w-full" />
                </Link>
              </div>

              <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 transition-transform duration-300 cursor-default">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                Kostenlos
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-slate-600 dark:text-slate-400"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menü öffnen"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMounted && isMenuOpen && (
            <div className="md:hidden pt-3 pb-5 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 animate-fade-in">
              <div className="flex flex-col gap-1 px-2">
                <Link
                  href="/"
                  className="group flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl transition-all [-webkit-tap-highlight-color:transparent]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Startseite</span>
                </Link>


                <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-4" />

                <Link
                  href="/impressum"
                  className="group flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl transition-all [-webkit-tap-highlight-color:transparent]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Impressum</span>
                </Link>

                <Link
                  href="/datenschutz"
                  className="group flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl transition-all [-webkit-tap-highlight-color:transparent]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Datenschutz</span>
                </Link>

                <div className="mt-3 mx-4 p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-100 dark:border-emerald-500/20">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">100% Kostenlos</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
