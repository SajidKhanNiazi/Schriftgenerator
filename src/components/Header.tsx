'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header id="main-header" className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
      <nav className={`w-full max-w-5xl rounded-2xl border transition-all duration-500 ${scrolled
          ? 'glass-premium shadow-xl shadow-black/5 dark:shadow-black/20 border-white/30 dark:border-white/[0.06]'
          : 'bg-white/40 dark:bg-slate-950/40 backdrop-blur-xl border-slate-200/40 dark:border-slate-800/30 shadow-lg shadow-black/[0.02]'
        }`}>
        <div className="container mx-auto px-5 max-w-7xl">
          <div className="flex justify-between items-center h-14 md:h-[60px]">
            {/* Logo */}
            <Link href="/" className="group flex items-center gap-2.5">
              <div className="relative w-8 h-8 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:shadow-emerald-500/40 group-hover:scale-110 transition-all duration-300">
                <span className="text-white font-black text-[10px] tracking-tight">SG</span>
                <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-base md:text-lg font-display font-extrabold tracking-tight text-slate-900 dark:text-white">
                Schriftgenerator
              </span>
            </Link>

            {/* Links & Badge */}
            <div className="flex items-center gap-3 md:gap-6">
              <div className="hidden md:flex items-center gap-5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                <Link href="/instagram-schrift" className="hover:text-emerald-500 transition-colors duration-300 relative group/link py-1">
                  Instagram Schrift
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-300 group-hover/link:w-full" />
                </Link>
                <Link href="/tiktok-schriftarten" className="hover:text-emerald-500 transition-colors duration-300 relative group/link py-1">
                  TikTok Schrift
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-300 group-hover/link:w-full" />
                </Link>
                <Link href="/whatsapp-schrift" className="hover:text-emerald-500 transition-colors duration-300 relative group/link py-1">
                  WhatsApp Schrift
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-300 group-hover/link:w-full" />
                </Link>
                <Link href="/fraktur-font" className="hover:text-emerald-500 transition-colors duration-300 relative group/link py-1">
                  Fraktur Font
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-300 group-hover/link:w-full" />
                </Link>
                <Link href="/ueber-uns" className="hover:text-emerald-500 transition-colors duration-300 relative group/link py-1">
                  Über uns
                  <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-300 group-hover/link:w-full" />
                </Link>
              </div>

              <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-300 cursor-default">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                Kostenlos
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:text-emerald-500 transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Open menu"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMounted && isMenuOpen && (
            <div className="md:hidden pt-3 pb-5 border-t border-slate-200/50 dark:border-slate-800/50 animate-fade-in">
              <div className="flex flex-col gap-0.5 px-1">
                <Link
                  href="/"
                  className="group flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50/80 dark:hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl transition-all [-webkit-tap-highlight-color:transparent]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  <span>Startseite</span>
                </Link>

                <Link
                  href="/instagram-schrift"
                  className="group flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50/80 dark:hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl transition-all [-webkit-tap-highlight-color:transparent]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Instagram Schrift</span>
                </Link>

                <Link
                  href="/tiktok-schriftarten"
                  className="group flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50/80 dark:hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl transition-all [-webkit-tap-highlight-color:transparent]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>TikTok Schrift</span>
                </Link>

                <Link
                  href="/whatsapp-schrift"
                  className="group flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50/80 dark:hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl transition-all [-webkit-tap-highlight-color:transparent]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <span>WhatsApp Schrift</span>
                </Link>

                <Link
                  href="/fraktur-font"
                  className="group flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50/80 dark:hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl transition-all [-webkit-tap-highlight-color:transparent]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Fraktur Font</span>
                </Link>


                <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-4" />

                <Link
                  href="/impressum"
                  className="group flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50/80 dark:hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl transition-all [-webkit-tap-highlight-color:transparent]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Über uns</span>
                </Link>

                <Link
                  href="/datenschutz"
                  className="group flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-emerald-50/80 dark:hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-xl transition-all [-webkit-tap-highlight-color:transparent]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-4 h-4 text-slate-400 group-hover:text-emerald-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Datenschutz</span>
                </Link>

                <div className="mt-3 mx-3 p-3.5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-500/10 dark:to-teal-500/10 rounded-xl border border-emerald-100 dark:border-emerald-500/20">
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
