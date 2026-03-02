'use client';

import { useState, useEffect } from 'react';
import { fontStyles } from '@/lib/fonts';
import Toast from '@/components/Toast';
import FontSizeSlider from '@/components/FontSizeSlider';

// ─── Types ───────────────────────────────────────────────────────
interface WhatsAppFontStyle {
    id: string;
    name: string;
    generator: (text: string) => string;
    highlighted?: boolean;
    specialCharsNote?: boolean;
}

const EXAMPLE_TEXT = 'Dein Text';

// ─── Helper generators not in shared lib ─────────────────────────
const aestheticText = (text: string): string => text.split('').join(' ');
const doubleUnderlineText = (text: string): string =>
    text.split('').map(char => char + '\u0333').join('');

// ─── Font styles array (35 styles) ──────────────────────────────
const whatsappFontStyles: WhatsAppFontStyle[] = [
    // ━━━ Core WhatsApp Styles ━━━
    { id: 'wa-bold', name: 'Fett', generator: fontStyles['bold'], specialCharsNote: true },
    { id: 'wa-italic', name: 'Kursiv', generator: fontStyles['italic'], specialCharsNote: true },
    { id: 'wa-bold-italic', name: 'Fett Kursiv', generator: fontStyles['bold-italic'], specialCharsNote: true },
    { id: 'wa-script', name: 'Schreibschrift', generator: fontStyles['script'], specialCharsNote: true },
    { id: 'wa-cursive-bold', name: 'Fett Schreibschrift', generator: fontStyles['cursive-bold'], highlighted: true, specialCharsNote: true },
    { id: 'wa-monospace', name: 'Monospace', generator: fontStyles['monospace'], specialCharsNote: true },

    // ━━━ Gothic & Fraktur ━━━
    { id: 'wa-gothic', name: 'Gothic Style', generator: fontStyles['gothic'], highlighted: true, specialCharsNote: true },
    { id: 'wa-fraktur', name: 'Fraktur / Altdeutsch', generator: fontStyles['fraktur'], specialCharsNote: true },

    // ━━━ Sans-Serif Varianten ━━━
    { id: 'wa-sans-bold', name: 'Sans-Serif Fett', generator: fontStyles['sans-bold'], specialCharsNote: true },
    { id: 'wa-sans-italic', name: 'Sans-Serif Kursiv', generator: fontStyles['italic-sans'], specialCharsNote: true },
    { id: 'wa-sans-bold-italic', name: 'Sans Fett Kursiv', generator: fontStyles['bold-italic-sans'], specialCharsNote: true },
    { id: 'wa-fancy-serif', name: 'Fancy Serif', generator: fontStyles['bold-serif'], specialCharsNote: true },
    { id: 'wa-fancy-sans', name: 'Fancy Sans Serif', generator: fontStyles['bold-sans'], specialCharsNote: true },

    // ━━━ Dekorative Stile ━━━
    { id: 'wa-double-struck', name: 'Doppelte Buchstaben', generator: fontStyles['double-struck'], specialCharsNote: true },
    { id: 'wa-circled', name: 'Kreis Buchstaben', generator: fontStyles['circled'], specialCharsNote: true },
    { id: 'wa-squared', name: 'Quadrat Buchstaben', generator: fontStyles['squared'], specialCharsNote: true },
    { id: 'wa-bubble-filled', name: 'Gefüllt (Bubble)', generator: fontStyles['bubble-filled'], specialCharsNote: true },
    { id: 'wa-negativ', name: 'Negativ / Inverse', generator: fontStyles['negativ'], specialCharsNote: true },

    // ━━━ Spezialeffekte ━━━
    { id: 'wa-aesthetic', name: 'Ästhetischer Stil', generator: aestheticText },
    { id: 'wa-vaporwave', name: 'Vaporwave', generator: fontStyles['vaporwave'], specialCharsNote: true },
    { id: 'wa-superscript', name: 'Kleine Buchstaben', generator: fontStyles['superscript'], specialCharsNote: true },
    { id: 'wa-mirror', name: 'Spiegeltext', generator: fontStyles['mirror'] },
    { id: 'wa-upside-down', name: 'Umgedrehter Text', generator: fontStyles['upside-down'] },
    { id: 'wa-zalgo', name: 'Glitch Style', generator: fontStyles['zalgo'] },
    { id: 'wa-regenbogen', name: 'Regenbogen', generator: fontStyles['regenbogen'], highlighted: true },

    // ━━━ Textdekorationen ━━━
    { id: 'wa-underline', name: 'Unterstrich Stil', generator: fontStyles['underline'] },
    { id: 'wa-double-underline', name: 'Doppelt Unterstrichen', generator: doubleUnderlineText },
    { id: 'wa-overline', name: 'Überstrichen', generator: fontStyles['overline'] },
    { id: 'wa-strikethrough', name: 'Durchgestrichen Stil', generator: fontStyles['strikethrough'] },
    { id: 'wa-dot-above', name: 'Punkt Stil', generator: fontStyles['dot-above'] },
    { id: 'wa-parenthesized', name: 'Klammer Stil', generator: fontStyles['parenthesized'], specialCharsNote: true },

    // ━━━ Emoji & Symbol Stile ━━━
    { id: 'wa-emoji-border', name: 'Emoji umrahmt Stil', generator: fontStyles['fancy-border-10'] },
    { id: 'wa-hearts-border', name: 'Herz Stil', generator: fontStyles['hearts-border'] },
    { id: 'wa-stars-border', name: 'Stern umrahmt', generator: fontStyles['stars-border'] },
    { id: 'wa-wingdings', name: 'Symbol Stil', generator: fontStyles['wingdings'], specialCharsNote: true },

    // ━━━ NEUE Premium Stile ━━━
    { id: 'wa-heart-2', name: 'Herz-Text v2', generator: (t) => `♥ ${t} ♥` },
    { id: 'wa-star-2', name: 'Stern-Text v2', generator: (t) => `★ ${t} ★` },
    { id: 'wa-glitch-2', name: 'Distortion Style', generator: (t) => t.split('').map(c => c + '\u0334').join('') },
    { id: 'wa-box-text', name: 'Boxed Text', generator: (t) => t.split('').map(c => `[${c}]`).join('') },
    { id: 'wa-arrow-text', name: 'Pfeil Dekoration', generator: (t) => `➨ ${t} ➨` },
    { id: 'wa-crown-text', name: 'Krone Dekoration', generator: (t) => `♔ ${t} ♔` },
    { id: 'wa-sparkles', name: 'Funkeln Stil', generator: (t) => ` ✨ ${t} ✨ ` },
    { id: 'wa-bold-fraktur', name: 'Fett Fraktur', generator: fontStyles['fraktur-bold'], specialCharsNote: true },
    { id: 'wa-small-caps', name: 'Small Caps', generator: fontStyles['small-caps'], specialCharsNote: true },
    { id: 'wa-circles-filled', name: 'Gefüllte Kreise', generator: (t) => t.split('').map(c => `●${c}●`).join(' ') },
];

// ─── Component ──────────────────────────────────────────────────
export default function WhatsAppSchriftClient() {
    const [inputText, setInputText] = useState('');
    const [debouncedText, setDebouncedText] = useState('');
    const [fontSize, setFontSize] = useState<number>(22);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('Text kopiert!');
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [isDark, setIsDark] = useState(false);
    const [currentTime, setCurrentTime] = useState<string>('');

    // Hydration fix for time
    useEffect(() => {
        setCurrentTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, []);

    // Debounce input
    useEffect(() => {
        const t = setTimeout(() => setDebouncedText(inputText), 200);
        return () => clearTimeout(t);
    }, [inputText]);

    // Dark mode toggle
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    // Intersection Observer for scroll reveal
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [debouncedText]); // Re-observe when content changes

    const displayText = debouncedText.trim() || EXAMPLE_TEXT;

    const handleCopy = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(id);
            setToastMessage('Text kopiert!');
            setShowToast(true);
            setTimeout(() => setCopiedId(null), 2000);
        } catch {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setCopiedId(id);
            setToastMessage('Text kopiert!');
            setShowToast(true);
            setTimeout(() => setCopiedId(null), 2000);
        }
    };

    const handleCopyAll = async () => {
        const allTexts = whatsappFontStyles
            .map((font) => `${font.name}:\n${font.generator(displayText)}`)
            .join('\n\n');
        try {
            await navigator.clipboard.writeText(allTexts);
            setToastMessage('Alle Stile kopiert!');
            setShowToast(true);
        } catch {
            const textarea = document.createElement('textarea');
            textarea.value = allTexts;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setToastMessage('Alle Stile kopiert!');
            setShowToast(true);
        }
    };

    const handleShare = (text: string) => {
        const url = `whatsapp://send?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    return (
        <>
            {/* ═══════════════════════════════════════════
                LIVE WHATSAPP PREVIEW (WOW FACTOR)
            ═══════════════════════════════════════════ */}
            <div className="fixed bottom-8 right-8 z-50 group hidden lg:block">
                <div className="absolute -inset-4 bg-green-500/20 rounded-[2rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative w-80 bg-slate-100 dark:bg-slate-900 rounded-[2rem] shadow-2xl border-4 border-slate-200 dark:border-slate-800 overflow-hidden transform hover:-translate-y-2 transition-transform duration-500">
                    <div className="bg-[#075e54] p-4 text-white flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center text-slate-600 font-bold">W</div>
                        <div>
                            <p className="font-bold text-sm">WhatsApp Voransicht</p>
                            <p className="text-[10px] opacity-70">online</p>
                        </div>
                    </div>
                    <div className="p-4 min-h-[160px] bg-[#e5ddd5] dark:bg-slate-950 flex flex-col justify-end">
                        <div className="self-end max-w-[85%] bg-[#dcf8c6] dark:bg-[#054d44] p-3 rounded-xl rounded-tr-none shadow-sm relative animate-slide-up">
                            <p className="text-slate-800 dark:text-slate-100 text-sm break-words whitespace-pre-wrap mb-1" style={{ fontSize: `${Math.min(fontSize, 20)}px` }}>
                                {displayText}
                            </p>
                            <div className="flex items-center justify-end gap-1">
                                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                                    {currentTime || '--:--'}
                                </span>
                                <svg className="w-3.5 h-3.5 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M4 12l4 4L20 6" />
                                    <path d="M8 12l4 4L24 6" className="translate-x-1" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* ═══════════════════════════════════════════
                HERO-BEREICH
            ═══════════════════════════════════════════ */}
            <section className="relative pt-6 pb-10 md:pb-20 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                {/* Animated floating orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
                    <div
                        className="absolute top-[-8%] left-[-8%] w-[35%] h-[35%] bg-green-500/10 rounded-full blur-[100px]"
                        style={{ animation: 'float-slow 20s ease-in-out infinite' }}
                    />
                    <div
                        className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-emerald-500/10 rounded-full blur-[80px]"
                        style={{ animation: 'float-slow 25s ease-in-out infinite', animationDelay: '-8s' }}
                    />
                </div>

                {/* Dark mode toggle — top right */}
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="absolute top-4 right-4 md:top-6 md:right-8 z-20 p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur border border-slate-200/50 dark:border-slate-700/50 shadow-lg hover:scale-110 active:scale-95 transition-all duration-300"
                    aria-label="Dark Mode umschalten"
                >
                    {isDark ? (
                        <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 text-slate-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                    )}
                </button>

                <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-widest mb-6 animate-slide-up">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                        </span>
                        WhatsApp Tool v2.0
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-[1.08] animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        WhatsApp <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500">Schrift</span>generator
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto mb-8 text-sm md:text-base font-light leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        Verwandle deinen Text in stylische Schriftarten für WhatsApp Chats, Status und Bio. Mit exklusiver Live-Vorschau!
                    </p>

                    <div className="max-w-3xl mx-auto relative group animate-slide-up sticky top-20 z-30 md:relative md:top-auto mb-16" style={{ animationDelay: '0.35s' }}>
                        <div className="absolute -inset-[3px] bg-gradient-to-r from-green-500/30 via-emerald-500/20 to-green-500/30 rounded-[2rem] blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200/60 dark:border-slate-800/60 p-2">
                            <textarea
                                id="whatsapp-text-input"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value.slice(0, 500))}
                                placeholder="Gib hier deinen Text ein…"
                                className="w-full px-6 py-6 md:py-8 text-xl md:text-3xl font-black text-slate-900 dark:text-white bg-transparent border-0 focus:outline-none focus:ring-0 resize-none min-h-[100px] md:min-h-[160px] text-center placeholder:text-slate-100 dark:placeholder:text-slate-800 transition-all font-sans"
                                rows={1}
                            />

                            {inputText && (
                                <button
                                    onClick={() => setInputText('')}
                                    className="absolute top-6 right-6 p-2.5 text-slate-400 hover:text-red-500 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover:rotate-90"
                                    aria-label="Text löschen"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}

                            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-800/50">
                                <span className={`text-[11px] font-black tracking-[0.2em] uppercase transition-colors duration-300 ${inputText.length > 450 ? 'text-amber-500' : inputText.length > 0 ? 'text-green-500' : 'text-slate-300 dark:text-slate-700'}`}>
                                    {inputText.length} <span className="opacity-30">/</span> 500
                                </span>
                                <FontSizeSlider value={fontSize} onChange={setFontSize} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                SCHRIFTARTEN-RASTER
            ═══════════════════════════════════════════ */}
            <section className="py-10 md:py-16 bg-slate-50/50 dark:bg-slate-950">
                <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-5xl">
                    {/* Section heading + actions */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <span className="w-1 h-7 md:h-8 bg-gradient-to-b from-green-500 to-emerald-500 rounded-full" />
                            <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                                Alle Schriftarten
                            </h2>
                            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/60 px-2.5 py-1 rounded-full">
                                {whatsappFontStyles.length} Stile
                            </span>
                        </div>

                        {/* Copy All + Share All buttons */}
                        <div className="flex items-center gap-2">
                            <button
                                onClick={handleCopyAll}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-green-500 text-white shadow-lg shadow-green-500/20 hover:bg-green-600 hover:shadow-xl hover:shadow-green-500/30 active:scale-[0.97] transition-all duration-300"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                <span>Alle kopieren</span>
                            </button>
                            <button
                                onClick={() => handleShare(whatsappFontStyles.map(f => `${f.name}:\n${f.generator(displayText)}`).join('\n\n'))}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 shadow-sm hover:bg-green-50 dark:hover:bg-green-900/20 hover:text-green-600 transition-all duration-300"
                                title="Alle Stile teilen"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                <span>Teilen</span>
                            </button>
                        </div>
                    </div>

                    {/* Font grid — 2 columns desktop, 1 mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {whatsappFontStyles.map((font, idx) => {
                            const generatedText = font.generator(displayText);
                            const isCopied = copiedId === font.id;

                            return (
                                <div
                                    key={font.id}
                                    className={`group relative bg-white dark:bg-slate-900/60 rounded-2xl border transition-all duration-500 hover:shadow-xl hover:-translate-y-0.5 overflow-hidden ${font.highlighted
                                        ? 'border-green-500/40 shadow-lg shadow-green-500/10 ring-1 ring-green-500/10'
                                        : 'border-slate-200/50 dark:border-slate-800/40 hover:border-green-500/30 hover:shadow-green-500/5'
                                        }`}
                                    style={{
                                        animationDelay: `${idx * 0.03}s`,
                                        animation: 'wa-fade-in 0.4s ease-out both',
                                    }}
                                >
                                    {/* Highlighted badge */}
                                    {font.highlighted && (
                                        <div className="absolute top-3 right-3 px-2.5 py-1 bg-green-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-green-500/30">
                                            Beliebt
                                        </div>
                                    )}

                                    <div className="p-5 md:p-6">
                                        {/* Style name */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className={`w-1.5 h-1.5 rounded-full ${font.highlighted ? 'bg-green-500' : 'bg-slate-300 dark:bg-slate-600 group-hover:bg-green-500'} transition-colors`} />
                                            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-green-500 transition-colors">
                                                {font.name}
                                            </p>
                                        </div>

                                        {/* Preview text */}
                                        <div
                                            className="text-slate-900 dark:text-white font-medium leading-relaxed mb-4 break-words min-h-[2.5rem] flex items-center"
                                            style={{ fontSize: `${fontSize}px` }}
                                        >
                                            <span className="line-clamp-2">{generatedText}</span>
                                        </div>

                                        {/* Special chars notice */}
                                        {font.specialCharsNote && (
                                            <p className="text-[10px] text-slate-400 dark:text-slate-600 mb-3 italic">
                                                Sonderzeichen werden als Standard angezeigt
                                            </p>
                                        )}

                                        {/* Action buttons */}
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleCopy(generatedText, font.id)}
                                                className={`flex-1 py-3.5 md:py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-[0.98] ${isCopied
                                                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                                                    : 'bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:bg-green-500 hover:text-white hover:shadow-lg hover:shadow-green-500/25'
                                                    }`}
                                            >
                                                {isCopied ? 'Kopiert ✓' : 'Kopieren'}
                                            </button>
                                            <button
                                                onClick={() => handleShare(generatedText)}
                                                className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800/60 text-slate-400 hover:text-[#25D366] hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300"
                                                title="Über WhatsApp teilen"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                ARTIKEL-CONTENT (GOOGLE DOC)
            ═══════════════════════════════════════════ */}
            <section className="py-12 md:py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 relative overflow-hidden">
                {/* Subtle background decoration */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] -z-10 -translate-x-1/2 translate-y-1/2" />

                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        {/* Intro Paragraphs with modern lead style */}
                        <div className="mb-12 reveal">
                            <p className="text-lg md:text-xl font-medium text-slate-700 dark:text-slate-300 leading-relaxed mb-6 border-l-4 border-green-500 pl-6 py-1">
                                If you think WhatsApp messages always look the same, there is a simple trick inside this messaging service that many people ignore. Unlike word processing programs that give you visible buttons for formatting text, here you use a specific character around your desired text.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-600 dark:text-slate-400">
                                <p className="leading-relaxed italic">
                                    For Italics, add an underscore at both ends of the text; to make something Bold, place an asterisk before and after a text passage; for Strikethrough, wrap it in tildes to strike through the text; and for Typewriter style, use three grave accents. This Example shows how you can easily italicize words or full sentences without touching any setting. I often use this method to mark words that should be written in bold so the app clearly displays words with better focus, especially when explaining tasks to my team.
                                </p>
                                <p className="leading-relaxed italic">
                                    Even though this popular messenger has limited text formatting options, you still have smart ways to change the WhatsApp font to your liking. Through Formatting text with special characters, you can format words and even try different fonts using handy third-party apps. There is no direct setting to switch styles, but you can explore other options like Change WhatsApp font with basic formatting or Change WhatsApp font with Fonts app, as shown in Figure 1, to customize the font style while still formatting directly within the text.
                                </p>
                            </div>
                        </div>

                        {/* Step-by-Step Guide with Card Design */}
                        <div className="mb-16 reveal">
                            <div className="text-center mb-10">
                                <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                                    How to Use Our <span className="text-green-500">WhatsApp Font Generator</span>
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 uppercase tracking-widest text-xs font-bold">Step-by-Step Guide</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {[
                                    { step: 1, title: 'Step 1: Type Your Text Clearly', text: 'Open WhatsApp, go to the messenger app, and think about how you want your message to look. In our tool, enter your text in the text field just like you normally type. This works smoothly on Android, iOS, or any smartphone, and improves your user experience without touching complex settings. Unlike the official WhatsApp website, where the formatting feature cannot be disabled, our generator gives you quick control before you paste anything into Chats or send it to contacts.' },
                                    { step: 2, title: 'Step 2: Generate Stylish Formats', text: 'Click generate and explore different fonts instantly. You will see styles similar to italics, bold, and strikethrough, plus options that include special characters. This method is smarter than basic text formatting or trying to Increase and decrease font size using the zoom function. Instead of changing Font size to Small, Medium, or Large from the menu item in Settings, Accessibility, or Display & Text Size, you directly change the WhatsApp font style for better impact.' },
                                    { step: 3, title: 'Step 3: Copy and Paste Easily', text: 'Now simply copy formatted text and paste it into your WhatsApp messages. No need to rely only on Change fonts using a third-party app, though our tool works like a free application with a huge selection—almost like the Fonts app shown in Figure 3. Many people normally download applications from the Google Play Store or Apple App Store, but here you skip extra installation steps. Still, if you prefer Additional apps or a full keyboard instead of your current keyboard app, you can try options like Stylishtext after checking user reviews and requested permissions.' },
                                    { step: 4, title: 'Step 4: Use Smartly and Safely', text: 'When exploring a variety of apps, be careful of unknown developers, excessive permissions, collect data, intrusive advertising, or even malware sometimes found in the Play Store before Google removes risky apps. Always choose established developers and trusted developers to stay safe while downloading interesting programs. For advanced control, try setting up fonts in Android and selecting font types by opening and installed tools like Open the Fonts app, tap Enable Fonts Keyboard, activate the app, Switch to Fonts, select a language, and type using the displayed keyboard. On iPhone, follow Setting up fonts in iOS and selecting font types, tap Go to settings, open Keyboards, activate Fonts, and choose your fonts while typing.' },
                                    { step: 5, title: 'Step 5: Adjust for Better Readability', text: 'If style is not enough, use the Tip: Change the font for all apps inside smartphone settings under the Display menu to adjust the text size. Readers with keen eyesight may reduce the font size to see more without scrolling, while others may increase it for better reading comfort. This helps when sharing things like Create a WhatsApp poll, following Simple instructions on the web, reading a Mobile phone tip, learning Simply explained guides such as Can\'t change your WhatsApp contact name, or finding Instructions for all users to change your WhatsApp group picture.' }
                                ].map((item) => (
                                    <div key={item.step} className="group flex flex-col md:flex-row gap-6 p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:border-green-500/30 hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300">
                                        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center font-black text-xl shadow-lg shadow-green-500/20 group-hover:scale-110 transition-transform">
                                            {item.step}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-green-500 transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed m-0">
                                                {item.text}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Article Main Sections */}
                        <div className="space-y-16">
                            <div className="reveal">
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tight flex items-center gap-4">
                                    <span className="w-8 h-1 bg-green-500 rounded-full" />
                                    WhatsApp Stylish Fonts You Can Copy and Paste
                                </h2>
                                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed m-0">
                                    If you want quick results, a font generator or whatsapp text generator gives you instant whatsapp stylish fonts without any app download. I personally use tools that show ready examples of whatsapp fancy text, cool fonts for whatsapp, and whatsapp unicode fonts, so I can test how my status or bio will look before posting. With simple whatsapp font copy paste, you just type your text, choose from stylish text for whatsapp, and tap copy. These tools are perfect for whatsapp bio fonts, creative captions, and unique whatsapp message fonts that grab attention in seconds.
                                </p>
                            </div>

                            <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden shadow-2xl reveal">
                                <div className="absolute top-0 right-0 p-8 text-green-500 opacity-20">
                                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M2.166 4.9L10 1.55l7.834 3.35a1 1 0 01.666.92v6.57a7.351 7.351 0 01-4.02 6.507L10 20l-4.48-1.103A7.351 7.351 0 011.5 12.39V5.82a1 1 0 01.666-.92zM8 7a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight relative z-10">
                                    Stay Safe While Using WhatsApp Stylish Fonts
                                </h3>
                                <p className="text-slate-300 leading-relaxed mb-0 relative z-10 text-base">
                                    Most good tools also remind you to be smart while downloading, always check user reviews, pay attention to requested permissions, and prefer apps from established developers and trusted developers so you can use them safely. This way, you enjoy a wide variety of apps without missing out on interesting programs. You might even see helpful guides like <a href="https://schriftenpro.de/instagram-schrift" className="text-green-400 hover:text-green-300 font-bold underline underline-offset-4 decoration-green-400/30">More on this topic</a>, Simply explained, Can't change your WhatsApp contact name, Here's what you can do, Tip for your messenger, Create a WhatsApp poll, Simple instructions, Android, iOS, web, Mobile phone tip, change your WhatsApp group picture, and Instructions for all users inside these platforms.
                                </p>
                            </div>

                            <div className="reveal">
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tight flex items-center gap-4">
                                    <span className="w-8 h-1 bg-green-500 rounded-full" />
                                    Best Font Styles That Work on WhatsApp
                                </h2>
                                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed m-0">
                                    From my experience, the safest options for whatsapp font change are clean Unicode-based whatsapp text styles that work smoothly on both <a href="https://www.android.com/intl/en_ph/" target="_blank" rel="nofollow" className="text-green-500 hover:text-green-600 font-bold underline underline-offset-4 decoration-green-500/30">Android</a> and iOS. Simple bold, cursive, small caps, and aesthetic characters from a reliable whatsapp text generator usually display better than random symbols. If your goal is clarity with creativity, mix readable whatsapp stylish fonts with light decoration instead of heavy symbols. This balance keeps your whatsapp fancy text attractive but still easy for everyone to read.
                                </p>
                            </div>

                            <div className="border-y-2 border-slate-100 dark:border-slate-800 py-10 reveal">
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                                    Simple Wrap-Up
                                </h2>
                                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed m-0">
                                    Whether you use a browser-based whatsapp font generator or explore stylish tools for whatsapp font copy paste, focus on safety, readability, and purpose. Try different whatsapp bio fonts, experiment with cool fonts for whatsapp, and keep testing what fits your personality best.
                                </p>
                            </div>
                        </div>

                        {/* FAQ SECTION */}
                        <div className="mt-20 reveal">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                                    Frequently Asked <span className="text-green-500">Questions</span>
                                </h2>
                                <div className="w-24 h-1.5 bg-green-500 mx-auto rounded-full" />
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { q: 'Can I change the font in WhatsApp itself?', a: <>No, WhatsApp doesn’t let you change the app’s default font inside the app. You can only use built-in formatting like bold, italics, or strikethrough, or use external tools and <a href="https://schriftenpro.de/" className="text-green-500 hover:text-green-600 font-bold underline underline-offset-4 decoration-green-400/30">font generator</a> sites to style your text before you copy/paste it into WhatsApp.</> },
                                    { q: 'How can I change the font for my messages or WhatsApp bio?', a: 'You can use WhatsApp font generator tools online that convert your normal text into stylish, Unicode-based fonts (like cursive, bold, bubble, gothic, etc.) and then copy/paste that styled text into your WhatsApp messages, status, bio or group names.' },
                                    { q: 'Are these styled fonts safe to use?', a: 'Yes — most generators use Unicode characters, and they are safe and compatible with WhatsApp on Android, iPhone, and web. They won’t harm your account or device.' },
                                    { q: 'Will the other person see the styled font?', a: 'Yes — when you copy styled text from a font generator and paste it into WhatsApp, your contacts will see the same style because Unicode characters are supported on most devices.' },
                                    { q: 'Can I use these fonts in WhatsApp Status, group names, and profiles?', a: 'Yes — stylish fonts work in statuses, chat messages, group names, and bios as long as they are Unicode and compatible.' },
                                    { q: 'Do these tools require download or installation?', a: 'Most are web-based, so you just type, choose your style, and copy — no installation is needed.' },
                                    { q: 'Why can’t I change the WhatsApp font from the app itself?', a: 'WhatsApp uses a standard system font and doesn\'t allow internal customization of typefaces — you can only use external generators or formatting tricks because WhatsApp itself doesn\'t include full font choices.' },
                                    { q: 'Do all styled fonts always show on every device?', a: 'Not always — some very decorative styles or uncommon Unicode characters might not display correctly on all phones. Most basic styles work fine though.' }
                                ].map((faq, i) => (
                                    <div key={i} className="group p-5 md:p-6 bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-[1.5rem] hover:border-green-500/30 hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300">
                                        <div className="flex gap-4">
                                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center font-bold text-sm">Q</span>
                                            <p className="font-black text-slate-900 dark:text-white mb-4 text-lg tracking-tight leading-tight m-0">
                                                {faq.q}
                                            </p>
                                        </div>
                                        <div className="flex gap-4">
                                            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 flex items-center justify-center font-bold text-sm">A</span>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed m-0 text-base">
                                                {faq.a}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Toast message={toastMessage} isVisible={showToast} onClose={() => setShowToast(false)} />

            {/* ═══════════════════════════════════════════
                GLOBAL ANIMATIONS
            ═══════════════════════════════════════════ */}
            <style jsx global>{`
                .reveal {
                    opacity: 0;
                    transform: translateY(30px);
                    transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
                }
                .reveal-visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                @keyframes wa-fade-in {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes float-slow {
                    0%, 100% { transform: translate(0, 0); }
                    50% { transform: translate(20px, -30px); }
                }
            `}</style>
        </>
    );
}
