'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 transition-all duration-300">
      <nav className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25 group-hover:scale-110 transition-transform">
              <span className="text-white font-black text-xl">S</span>
            </div>
            <span className="text-xl font-black tracking-tight text-gray-900 dark:text-white">
              Schrift<span className="text-emerald-600">generator</span>
            </span>
          </Link>

          {/* Badge & Links */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-500 dark:text-gray-400">
              <Link href="/instagram-schrift" className="hover:text-emerald-600 transition-colors">Instagram Schrift</Link>
              <Link href="/impressum" className="hover:text-emerald-600 transition-colors">Impressum</Link>
              <Link href="/datenschutz" className="hover:text-emerald-600 transition-colors">Datenschutz</Link>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full text-xs font-black uppercase tracking-widest border border-green-100 dark:border-green-900/30">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
              Kostenlos
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 dark:text-gray-400"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menü öffnen"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 py-4 px-4 shadow-xl animate-fade-in-down">
            <div className="flex flex-col gap-4">
              <Link href="/instagram-schrift" className="text-sm font-bold text-gray-600 dark:text-gray-400" onClick={() => setIsMenuOpen(false)}>Instagram Schrift</Link>
              <Link href="/impressum" className="text-sm font-bold text-gray-600 dark:text-gray-400" onClick={() => setIsMenuOpen(false)}>Impressum</Link>
              <Link href="/datenschutz" className="text-sm font-bold text-gray-600 dark:text-gray-400" onClick={() => setIsMenuOpen(false)}>Datenschutz</Link>
              <Link href="/agb" className="text-sm font-bold text-gray-600 dark:text-gray-400" onClick={() => setIsMenuOpen(false)}>AGB</Link>
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-green-600">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                100% Kostenlos
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
