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
            <section className="relative pt-6 pb-10 md:pb-20 overflow-hidden bg-[var(--bg-primary)]">
                {/* Background effects */}
                <div className="absolute inset-0 bg-mesh-dark pointer-events-none" />
                <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-20" />
                <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
                    <div
                        className="absolute top-[-8%] left-[-8%] w-[35%] h-[35%] bg-green-500/5 rounded-full blur-[100px]"
                        style={{ animation: 'float-slow 20s ease-in-out infinite' }}
                    />
                    <div
                        className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-emerald-500/5 rounded-full blur-[80px]"
                        style={{ animation: 'float-slow 25s ease-in-out infinite', animationDelay: '-8s' }}
                    />
                </div>

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
                                Wenn du denkst, dass WhatsApp-Nachrichten immer gleich aussehen, gibt es einen einfachen Trick in diesem Messenger-Dienst, den viele ignorieren. Im Gegensatz zu Textverarbeitungsprogrammen, die sichtbare Schaltflächen für die Textformatierung bieten, verwendet man hier bestimmte Zeichen um den gewünschten Text.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-600 dark:text-slate-400">
                                <p className="leading-relaxed italic">
                                    Für Kursivschrift füge einen Unterstrich an beiden Enden des Textes hinzu; um etwas fett zu machen, setze ein Sternchen vor und nach eine Textpassage; für Durchgestrichen umschließe es mit Tilden; und für den Schreibmaschinen-Stil verwende drei Gravis-Akzente. Dieses Beispiel zeigt, wie du Wörter oder ganze Sätze einfach kursiv formatieren kannst, ohne eine Einstellung zu berühren. Ich nutze diese Methode oft, um Wörter zu markieren, die fett geschrieben werden sollen, damit die App Wörter mit besserem Fokus anzeigt, besonders wenn ich meinem Team Aufgaben erkläre.
                                </p>
                                <p className="leading-relaxed italic">
                                    Obwohl dieser beliebte Messenger nur begrenzte Optionen zur Textformatierung bietet, hast du dennoch clevere Möglichkeiten, die WhatsApp-Schrift nach deinen Wünschen anzupassen. Durch die Formatierung von Text mit Sonderzeichen kannst du Wörter gestalten und sogar verschiedene Schriftarten mit praktischen Drittanbieter-Apps ausprobieren. Es gibt keine direkte Einstellung zum Wechseln von Stilen, aber du kannst andere Optionen erkunden, wie z.B. die WhatsApp-Schrift mit einfacher Formatierung ändern oder die WhatsApp-Schrift mit einer Fonts-App ändern, wie in Abbildung 1 gezeigt, um den Schriftstil anzupassen, während du weiterhin direkt im Text formatierst.
                                </p>
                            </div>
                        </div>

                        {/* Step-by-Step Guide with Card Design */}
                        <div className="mb-16 reveal">
                            <div className="text-center mb-10">
                                <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                                    Wie du unseren <span className="text-green-500">WhatsApp Schrift Generator</span> nutzt
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 uppercase tracking-widest text-xs font-bold">Schritt-für-Schritt Anleitung</p>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {[
                                    { step: 1, title: 'Schritt 1: Gib deinen Text klar ein', text: 'Öffne WhatsApp, gehe zur Messenger-App und überlege dir, wie deine Nachricht aussehen soll. In unserem Tool gibst du deinen Text einfach so in das Textfeld ein, wie du ihn normalerweise tippst. Das funktioniert reibungslos auf Android, iOS oder jedem Smartphone und verbessert dein Nutzererlebnis, ohne komplexe Einstellungen zu berühren. Im Gegensatz zur offiziellen WhatsApp-Website, auf der die Formatierungsfunktion nicht deaktiviert werden kann, bietet dir unser Generator schnelle Kontrolle, bevor du etwas in Chats einfügst oder an Kontakte sendest.' },
                                    { step: 2, title: 'Schritt 2: Stylische Formate generieren', text: 'Klicke auf Generieren und entdecke sofort verschiedene Schriftarten. Du wirst Stile sehen, die Kursiv, Fett und Durchgestrichen ähneln, sowie Optionen mit Sonderzeichen. Diese Methode ist cleverer als die einfache Textformatierung oder der Versuch, die Schriftgröße mit der Zoomfunktion zu erhöhen oder zu verringern. Anstatt die Schriftgröße im Menüpunkt unter Einstellungen, Bedienungshilfen oder Anzeige & Textgröße auf Klein, Mittel oder Groß zu ändern, änderst du direkt den WhatsApp-Schriftstil für eine bessere Wirkung.' },
                                    { step: 3, title: 'Schritt 3: Einfach kopieren und einfügen', text: 'Kopiere nun einfach den formatierten Text und füge ihn in deine WhatsApp-Nachrichten ein. Du musst dich nicht nur darauf verlassen, Schriftarten mit einer Drittanbieter-App zu ändern, obwohl unser Tool wie eine kostenlose Anwendung mit einer riesigen Auswahl funktioniert – fast wie die in Abbildung 3 gezeigte Fonts-App. Viele Leute laden normalerweise Anwendungen aus dem Google Play Store oder Apple App Store herunter, aber hier überspringst du zusätzliche Installationsschritte. Wenn du dennoch zusätzliche Apps oder eine vollständige Tastatur anstelle deiner aktuellen Tastatur-App bevorzugst, kannst du Optionen wie Stylishtext ausprobieren, nachdem du Nutzerbewertungen und angeforderte Berechtigungen geprüft hast.' },
                                    { step: 4, title: 'Schritt 4: Clever und sicher nutzen', text: 'Wenn du verschiedene Apps erkundest, sei vorsichtig bei unbekannten Entwicklern, übermäßigen Berechtigungen, Datenerfassung, aufdringlicher Werbung oder manchmal sogar Malware, die im Play Store gefunden wird, bevor Google riskante Apps entfernt. Wähle immer etablierte und vertrauenswürdige Entwickler, um sicher zu bleiben, während du interessante Programme herunterlädst. Für fortgeschrittene Kontrolle versuche, Schriftarten in Android einzurichten und Schriftarten auszuwählen, indem du installierte Tools öffnest, wie z.B. die Fonts-App öffnest, auf Fonts-Tastatur aktivieren tippst, die App aktivierst, zu Fonts wechselst, eine Sprache auswählst und mit der angezeigten Tastatur tippst. Auf dem iPhone folge der Anleitung zum Einrichten von Schriftarten in iOS und zum Auswählen von Schriftarten, gehe zu den Einstellungen, öffne Tastaturen, aktiviere Fonts und wähle deine Schriftarten beim Tippen aus.' },
                                    { step: 5, title: 'Schritt 5: Für bessere Lesbarkeit anpassen', text: 'Wenn der Stil nicht ausreicht, nutze den Tipp: Ändere die Schriftart für alle Apps in den Smartphone-Einstellungen unter dem Menü Anzeige, um die Textgröße anzupassen. Leser mit scharfen Augen können die Schriftgröße verringern, um mehr zu sehen, ohne zu scrollen, während andere sie für besseren Lesekomfort erhöhen können. Das hilft beim Teilen von Dingen wie Erstelle eine WhatsApp-Umfrage, beim Befolgen einfacher Anweisungen im Web, beim Lesen eines Handy-Tipps, beim Lernen einfach erklärter Anleitungen wie "WhatsApp-Kontaktnamen kann nicht geändert werden" oder beim Finden von Anweisungen für alle Benutzer zum Ändern deines WhatsApp-Gruppenbildes.' }
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
                                    Stylische WhatsApp-Schriftarten zum Kopieren und Einfügen
                                </h2>
                                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed m-0">
                                    Wenn du schnelle Ergebnisse willst, bietet dir ein Schriftgenerator oder WhatsApp-Textgenerator sofortige stylische WhatsApp-Schriften ohne App-Download. Ich persönlich nutze Tools, die fertige Beispiele für verschnörkelten WhatsApp-Text, coole Schriftarten für WhatsApp und WhatsApp-Unicode-Schriften zeigen, damit ich testen kann, wie mein Status oder meine Bio vor dem Posten aussehen wird. Mit einfachem WhatsApp-Schrift-Kopieren-Einfügen tippst du einfach deinen Text ein, wählst aus stylischem Text für WhatsApp und tippst auf Kopieren. Diese Tools sind perfekt für WhatsApp-Bio-Schriftarten, kreative Bildunterschriften und einzigartige WhatsApp-Nachrichtenschriften, die in Sekundenschnelle Aufmerksamkeit erregen.
                                </p>
                            </div>

                            <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden shadow-2xl reveal">
                                <div className="absolute top-0 right-0 p-8 text-green-500 opacity-20">
                                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M2.166 4.9L10 1.55l7.834 3.35a1 1 0 01.666.92v6.57a7.351 7.351 0 01-4.02 6.507L10 20l-4.48-1.103A7.351 7.351 0 011.5 12.39V5.82a1 1 0 01.666-.92zM8 7a1 1 0 00-1 1v2a1 1 0 001 1h2a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight relative z-10">
                                    Sicher bleiben bei der Nutzung von stylischen WhatsApp-Schriftarten
                                </h3>
                                <p className="text-slate-300 leading-relaxed mb-0 relative z-10 text-base">
                                    Die meisten guten Tools erinnern dich auch daran, beim Herunterladen clever zu sein, immer Nutzerbewertungen zu prüfen, auf angeforderte Berechtigungen zu achten und Apps von etablierten und vertrauenswürdigen Entwicklern zu bevorzugen, damit du sie sicher nutzen kannst. Auf diese Weise genießt du eine große Vielfalt an Apps, ohne interessante Programme zu verpassen. Vielleicht siehst du sogar hilfreiche Anleitungen wie <a href="https://schriftenpro.de/instagram-schrift" className="text-green-400 hover:text-green-300 font-bold underline underline-offset-4 decoration-green-400/30">Mehr zu diesem Thema</a>, einfach erklärt, "WhatsApp-Kontaktnamen kann nicht geändert werden", "Was du tun kannst", "Tipp für deinen Messenger", "WhatsApp-Umfrage erstellen", einfache Anweisungen, Android, iOS, Web, Handy-Tipp, WhatsApp-Gruppenbild ändern und Anweisungen für alle Benutzer innerhalb dieser Plattformen.
                                </p>
                            </div>

                            <div className="reveal">
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tight flex items-center gap-4">
                                    <span className="w-8 h-1 bg-green-500 rounded-full" />
                                    Die besten Schriftstile, die auf WhatsApp funktionieren
                                </h2>
                                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed m-0">
                                    Nach meiner Erfahrung sind die sichersten Optionen für die WhatsApp-Schriftänderung saubere Unicode-basierte WhatsApp-Textstile, die sowohl auf <a href="https://www.android.com/intl/de_de/" target="_blank" rel="nofollow" className="text-green-500 hover:text-green-600 font-bold underline underline-offset-4 decoration-green-500/30">Android</a> als auch auf iOS reibungslos funktionieren. Einfach Fett, Kursiv, Kapitälchen und ästhetische Zeichen von einem zuverlässigen WhatsApp-Textgenerator werden normalerweise besser angezeigt als zufällige Symbole. Wenn dein Ziel Klarheit mit Kreativität ist, mische lesbare stylische WhatsApp-Schriften mit leichter Dekoration anstelle von schweren Symbolen. Dieses Gleichgewicht hält deinen verschnörkelten WhatsApp-Text attraktiv, aber für jeden immer noch leicht lesbar.
                                </p>
                            </div>

                            <div className="border-y-2 border-slate-100 dark:border-slate-800 py-10 reveal">
                                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
                                    Kurze Zusammenfassung
                                </h2>
                                <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed m-0">
                                    Egal, ob du einen browserbasierten WhatsApp-Schriftgenerator verwendest oder stylische Tools für WhatsApp-Schrift-Kopieren-Einfügen erkundest, konzentriere dich auf Sicherheit, Lesbarkeit und Zweck. Probiere verschiedene WhatsApp-Bio-Schriftarten aus, experimentiere mit coolen Schriftarten für WhatsApp und teste weiter, was am besten zu deiner Persönlichkeit passt.
                                </p>
                            </div>
                        </div>

                        {/* FAQ SECTION */}
                        <div className="mt-20 reveal">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                                    Häufig gestellte <span className="text-green-500">Fragen</span>
                                </h2>
                                <div className="w-24 h-1.5 bg-green-500 mx-auto rounded-full" />
                            </div>

                            <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
                                {[
                                    { q: 'Kann ich die Schriftart in WhatsApp selbst ändern?', a: <>Nein, WhatsApp erlaubt es nicht, die Standardschriftart der App innerhalb der App zu ändern. Du kannst nur die integrierte Formatierung wie Fett, Kursiv oder Durchgestrichen verwenden oder externe Tools und <a href="https://schriftenpro.de/" className="text-green-500 hover:text-green-600 font-bold underline underline-offset-4 decoration-green-400/30">Schriftgenerator</a>-Seiten nutzen, um deinen Text zu stylen, bevor du ihn in WhatsApp kopierst/einfügst.</> },
                                    { q: 'Wie kann ich die Schriftart für meine Nachrichten oder WhatsApp-Bio ändern?', a: 'Du kannst online WhatsApp-Schriftgenerator-Tools verwenden, die deinen normalen Text in stylische, Unicode-basierte Schriftarten (wie Schreibschrift, Fett, Bubble, Gotisch usw.) umwandeln, und diesen gestylten Text dann in deine WhatsApp-Nachrichten, deinen Status, deine Bio oder Gruppennamen kopieren/einfügen.' },
                                    { q: 'Sind diese gestylten Schriftarten sicher in der Anwendung?', a: 'Ja – die meisten Generatoren verwenden Unicode-Zeichen, und diese sind sicher und kompatibel mit WhatsApp auf Android, iPhone und im Web. Sie schaden weder deinem Konto noch deinem Gerät.' },
                                    { q: 'Wird die andere Person die gestylte Schriftart sehen?', a: 'Ja – wenn du gestylten Text von einem Schriftgenerator kopierst und in WhatsApp einfügst, sehen deine Kontakte denselben Stil, da Unicode-Zeichen auf den meisten Geräten unterstützt werden.' },
                                    { q: 'Kann ich diese Schriftarten im WhatsApp-Status, in Gruppennamen und Profilen verwenden?', a: 'Ja – stylische Schriftarten funktionieren in Statusmeldungen, Chat-Nachrichten, Gruppennamen und BIOS, solange sie Unicode-basiert und kompatibel sind.' },
                                    { q: 'Erfordern diese Tools einen Download oder eine Installation?', a: 'Die meisten sind webbasiert, sodass man einfach tippt, seinen Stil auswählt und kopiert – es ist keine Installation erforderlich.' },
                                    { q: 'Warum kann ich die WhatsApp-Schriftart nicht direkt in der App ändern?', a: 'WhatsApp verwendet eine Standard-Systemschriftart und erlaubt keine interne Anpassung der Schriftarten – man kann nur externe Generatoren oder Formatierungs-Tricks verwenden, da WhatsApp selbst keine vollständige Schriftauswahl enthält.' },
                                    { q: 'Werden alle gestylten Schriftarten auf jedem Gerät immer korrekt angezeigt?', a: 'Nicht immer – einige sehr dekorative Stile oder seltene Unicode-Zeichen werden möglicherweise nicht auf allen Telefonen korrekt angezeigt. Die meisten grundlegenden Stile funktionieren jedoch einwandfrei.' }
                                ].map((faq, i) => {
                                    const [isOpen, setIsOpen] = useState(false);
                                    return (
                                        <div key={i} className="bg-white dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-green-500/20">
                                            <button
                                                onClick={() => setIsOpen(!isOpen)}
                                                className="w-full flex items-center justify-between px-6 py-5 text-left group"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center font-bold text-sm">Q</span>
                                                    <h3 className="font-black text-slate-900 dark:text-white text-lg tracking-tight leading-tight m-0 group-hover:text-green-500 transition-colors">
                                                        {faq.q}
                                                    </h3>
                                                </div>
                                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen
                                                    ? 'bg-green-500 text-white rotate-180'
                                                    : 'bg-slate-100 dark:bg-slate-700/50 text-slate-400'
                                                    }`}>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </button>
                                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                                <div className="px-6 pb-6 pt-2 border-t border-slate-100/50 dark:border-slate-800/50">
                                                    <div className="flex gap-4">
                                                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 flex items-center justify-center font-bold text-sm">A</span>
                                                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed m-0 text-base">
                                                            {faq.a}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
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
