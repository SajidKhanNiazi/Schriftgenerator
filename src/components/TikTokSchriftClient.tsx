'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { fontStyles } from '@/lib/fonts';
import Toast from '@/components/Toast';
import FontSizeSlider from '@/components/FontSizeSlider';

interface TikTokFontStyle {
    id: string;
    name: string;
    generator: (text: string) => string;
    highlighted?: boolean;
    specialCharsNote?: boolean;
}

const EXAMPLE_TEXT = 'Dein Text';

// Double underline using combining char U+0333
const doubleUnderlineText = (text: string): string =>
    text.split('').map(char => char + '\u0333').join('');

// Aesthetic / spaced
const aestheticText = (text: string): string =>
    text.split('').join(' ');

const tiktokFontStyles: TikTokFontStyle[] = [
    // Unicode Math Alphabets
    { id: 'tt-bold', name: 'Fett', generator: fontStyles['bold'], specialCharsNote: true },
    { id: 'tt-italic', name: 'Kursiv', generator: fontStyles['italic'], specialCharsNote: true },
    { id: 'tt-bold-italic', name: 'Fett Kursiv', generator: fontStyles['bold-italic'], specialCharsNote: true },
    { id: 'tt-script', name: 'Schreibschrift', generator: fontStyles['script'], specialCharsNote: true },
    { id: 'tt-cursive-bold', name: 'Fett Schreibschrift', generator: fontStyles['cursive-bold'], specialCharsNote: true },
    { id: 'tt-fraktur', name: 'Fraktur / Gotisch', generator: fontStyles['fraktur'], highlighted: true, specialCharsNote: true },
    { id: 'tt-gothic', name: 'Fett Fraktur', generator: fontStyles['gothic'], specialCharsNote: true },
    { id: 'tt-double-struck', name: 'Doppelt', generator: fontStyles['double-struck'], specialCharsNote: true },
    { id: 'tt-sans', name: 'Sans-Serif', generator: fontStyles['bold-sans'], specialCharsNote: true },
    { id: 'tt-sans-bold', name: 'Sans-Serif Fett', generator: fontStyles['sans-bold'], specialCharsNote: true },
    { id: 'tt-sans-italic', name: 'Sans-Serif Kursiv', generator: fontStyles['italic-sans'], specialCharsNote: true },
    { id: 'tt-sans-bold-italic', name: 'Sans-Serif Fett Kursiv', generator: fontStyles['bold-italic-sans'], specialCharsNote: true },
    { id: 'tt-monospace', name: 'Monospace', generator: fontStyles['monospace'], specialCharsNote: true },

    // Decorative & Stylized
    { id: 'tt-circled', name: 'Eingekreist', generator: fontStyles['circled'], specialCharsNote: true },
    { id: 'tt-bubble-filled', name: 'Gefüllt', generator: fontStyles['bubble-filled'], specialCharsNote: true },
    { id: 'tt-fullwidth', name: 'Vaporwave', generator: fontStyles['fullwidth'], specialCharsNote: true },
    { id: 'tt-small-caps', name: 'Kapitälchen', generator: fontStyles['small-caps'] },
    { id: 'tt-superscript', name: 'Hochgestellt', generator: fontStyles['superscript'], specialCharsNote: true },
    { id: 'tt-aesthetic', name: 'Ästhetisch', generator: aestheticText },

    // Effect-Based
    { id: 'tt-strikethrough', name: 'Durchgestrichen', generator: fontStyles['strikethrough'] },
    { id: 'tt-underline', name: 'Unterstrichen', generator: fontStyles['underline'] },
    { id: 'tt-double-underline', name: 'Doppelt Unterstrichen', generator: doubleUnderlineText },
    { id: 'tt-overline', name: 'Überstrichen', generator: fontStyles['overline'] },
    { id: 'tt-zalgo', name: 'Zalgo / Glitch', generator: fontStyles['zalgo'] },

    // Flipped & Mirrored
    { id: 'tt-upside-down', name: 'Umgekehrt', generator: fontStyles['upside-down'] },
    { id: 'tt-mirror', name: 'Gespiegelt', generator: fontStyles['mirror'] },
];

export default function TikTokSchriftClient() {
    const [inputText, setInputText] = useState('');
    const [debouncedText, setDebouncedText] = useState('');
    const [fontSize, setFontSize] = useState<number>(22);
    const [showToast, setShowToast] = useState(false);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    useEffect(() => {
        const t = setTimeout(() => setDebouncedText(inputText), 200);
        return () => clearTimeout(t);
    }, [inputText]);

    const displayText = debouncedText.trim() || EXAMPLE_TEXT;

    const handleCopy = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(id);
            setShowToast(true);
            setTimeout(() => setCopiedId(null), 2000);
        } catch {
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setCopiedId(id);
            setShowToast(true);
            setTimeout(() => setCopiedId(null), 2000);
        }
    };

    return (
        <>
            {/* ═══════════════════════════════════════════
                HERO-BEREICH
            ═══════════════════════════════════════════ */}
            <section className="relative pt-6 pb-10 md:pb-20 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                {/* Animated floating orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
                    <div
                        className="absolute top-[-8%] left-[-8%] w-[35%] h-[35%] bg-pink-500/8 rounded-full blur-[100px]"
                        style={{ animation: 'float-slow 20s ease-in-out infinite' }}
                    />
                    <div
                        className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-cyan-500/8 rounded-full blur-[80px]"
                        style={{ animation: 'float-slow 25s ease-in-out infinite', animationDelay: '-8s' }}
                    />
                    <div
                        className="absolute top-[30%] right-[15%] w-[18%] h-[18%] bg-rose-500/5 rounded-full blur-[60px]"
                        style={{ animation: 'float-slow 18s ease-in-out infinite', animationDelay: '-4s' }}
                    />
                </div>

                <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-600 dark:text-pink-400 text-xs font-bold uppercase tracking-widest mb-6 animate-slide-up">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500" />
                        </span>
                        TikTok Tool
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-[1.08] animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        TikTok <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600">Schrift</span>arten
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-6 text-base md:text-lg font-light leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        Erstelle einzigartige Schriftarten für dein TikTok-Profil. Kopiere & füge stylische Texte sofort in Bio, Benutzername und Videos ein.
                    </p>

                    {/* Trust indicators */}
                    <div className="flex items-center justify-center gap-4 md:gap-6 mb-10 text-xs text-slate-400 dark:text-slate-500 font-medium animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        {['26 Schriftstile', 'Ein-Klick Kopieren', '100% Kostenlos'].map((t, i) => (
                            <span key={i} className="flex items-center gap-1.5">
                                <span className="w-1 h-1 bg-pink-500 rounded-full" />
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* ─── Glass Input Card ─── */}
                    <div className="max-w-3xl mx-auto relative group animate-slide-up" style={{ animationDelay: '0.35s' }}>
                        {/* Glow */}
                        <div className="absolute -inset-[2px] bg-gradient-to-r from-pink-500/20 via-rose-500/10 to-pink-500/20 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-slate-900/5 dark:shadow-black/20 border border-slate-200/60 dark:border-slate-800/60 p-1.5 md:p-2">
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value.slice(0, 500))}
                                placeholder="Deinen Text hier eingeben..."
                                className="w-full px-4 sm:px-6 py-6 sm:py-8 md:py-10 text-xl sm:text-2xl md:text-4xl font-bold text-slate-900 dark:text-white bg-transparent border-0 focus:outline-none focus:ring-0 resize-none min-h-[100px] sm:min-h-[130px] md:min-h-[160px] text-center placeholder:text-slate-300 dark:placeholder:text-slate-700"
                                rows={1}
                            />

                            {inputText && (
                                <button
                                    onClick={() => setInputText('')}
                                    className="absolute top-5 right-5 p-2 text-slate-400 hover:text-red-500 rounded-xl bg-slate-100/60 dark:bg-slate-800/60 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover:rotate-90"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}

                            {/* Bottom bar */}
                            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100/60 dark:border-slate-800/40">
                                <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${inputText.length > 450 ? 'text-amber-500' : inputText.length > 0 ? 'text-pink-500' : 'text-slate-400 dark:text-slate-600'}`}>
                                    {inputText.length} / 500
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
                    {/* Section heading */}
                    <div className="flex items-center gap-3 mb-8">
                        <span className="w-1 h-7 md:h-8 bg-gradient-to-b from-pink-500 to-rose-500 rounded-full" />
                        <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                            Alle Schriftarten
                        </h2>
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/60 px-2.5 py-1 rounded-full">
                            {tiktokFontStyles.length} Stile
                        </span>
                    </div>

                    {/* Font grid — 2 columns desktop, 1 mobile */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {tiktokFontStyles.map((font, idx) => {
                            const generatedText = font.generator(displayText);
                            const isCopied = copiedId === font.id;

                            return (
                                <div
                                    key={font.id}
                                    className={`group relative bg-white dark:bg-slate-900/60 rounded-2xl border transition-all duration-500 hover:shadow-xl hover:-translate-y-0.5 overflow-hidden ${font.highlighted
                                        ? 'border-pink-500/40 shadow-lg shadow-pink-500/10 ring-1 ring-pink-500/10'
                                        : 'border-slate-200/50 dark:border-slate-800/40 hover:border-pink-500/30 hover:shadow-pink-500/5'
                                        }`}
                                    style={{
                                        animationDelay: `${idx * 0.03}s`,
                                        animation: 'fade-in 0.4s ease-out both',
                                    }}
                                >
                                    {/* Highlighted badge */}
                                    {font.highlighted && (
                                        <div className="absolute top-3 right-3 px-2.5 py-1 bg-pink-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-pink-500/30">
                                            Beliebt
                                        </div>
                                    )}

                                    <div className="p-5 md:p-6">
                                        {/* Style name */}
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className={`w-1.5 h-1.5 rounded-full ${font.highlighted ? 'bg-pink-500' : 'bg-slate-300 dark:bg-slate-600 group-hover:bg-pink-500'} transition-colors`} />
                                            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 group-hover:text-pink-500 transition-colors">
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

                                        {/* Copy button */}
                                        <button
                                            onClick={() => handleCopy(generatedText, font.id)}
                                            className={`w-full py-3.5 md:py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 active:scale-[0.98] ${isCopied
                                                ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                                                : 'bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:bg-pink-500 hover:text-white hover:shadow-lg hover:shadow-pink-500/25'
                                                }`}
                                        >
                                            {isCopied ? 'Kopiert ✓' : 'Kopieren'}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                NUTZER-CONTENT (EXAKT NACH VORGABE)
            ═══════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="prose prose-slate dark:prose-invert max-w-none">
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                            Als ich zum ersten Mal TikTok-Schriften erkundete, wurde mir klar, dass es nicht nur um Stil geht – es geht darum, wie sich deine TikTok-Präsenz auf der „Straße“ der sozialen Medien anfühlt. Mit einem TikTok-Schriftgenerator als ein einfaches Tool, das deine Textschriften in verschiedene Textstile umwandelt oder ändert, kannst du ohne großen Aufwand einen frischen, neuen und sogar viralen Look für deinen Account kreieren. Gib einfach ein Wort oder eine Phrase in das erste Textfeld ein, klicke auf Generieren, und der Generator liefert dir Schriften in verschiedenen Stilen. Du kannst die umgewandelten Zeichen schnell kopieren und in deine TikTok-Bio, deinen Benutzernamen, deine Bildunterschriften oder dein Profil einfügen, um den nächsten großen Trend zu starten – kein Download oder Programmierung erforderlich.
                        </p>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-12">
                            Was es so leistungsstark macht, ist, dass es mit <a href="https://symbl.cc/en/unicode-table/" target="_blank" rel="nofollow" className="text-pink-500 hover:text-pink-600 font-medium underline underline-offset-4 decoration-pink-500/30">Unicode-Zeichen</a> funktioniert, sodass deine schicken Zeichen, speziellen Symbole und sogar Emojis auf Geräten und Plattformen, die Unicode unterstützen, korrekt angezeigt werden. Als TikTok-Nutzer kannst du deinen Namen, Spitznamen oder Anzeigenamen ändern, indem du einfachen Text in schicke Versionen mit verschiedenen Schriftarten und ausgefallenen Font-Styles verwandelst. Die Ausgabe erscheint sofort, bereit zur Verwendung, und wenn du mehr Ideen möchtest, kannst du einen Link zu einem Bereich für kostenlose Schriftarten erkunden, der zusätzliche Gratis-Schriften bietet, um deinen Bio-Bereich aufzuwerten und auffällige TikTok-Nicknames mit einzigartigen Zeichen und Sonderzeichen zu erstellen.
                        </p>

                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">
                            Wie man unseren Tik Tok Schriftgenerator benutzt?
                        </h2>

                        <div className="space-y-10 mb-12">
                            <div>
                                <p className="font-bold text-slate-900 dark:text-white mb-2 text-xl">Schritt 1: Gib deinen Text ein</p>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Öffne den TikTok-Schriftgenerator, beginne deinen Text mit der Tastatur zu tippen und gib ihn in das Eingabefeld (das erste Textfeld) auf deinem Handy oder Tablet ein.
                                </p>
                            </div>

                            <div>
                                <p className="font-bold text-slate-900 dark:text-white mb-2 text-xl">Schritt 2: Browse und wähle den Stil</p>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Durchsuche nun die verschiedenen Schriftstile, die sofort generiert werden. Wenn du einen Schriftstil findest, der dir gefällt, klicke darauf, und das Tool kopiert ihn automatisch in deine Zwischenablage.
                                </p>
                            </div>

                            <div>
                                <p className="font-bold text-slate-900 dark:text-white mb-2 text-xl">Schritt 3: Kopiere den schicken Text</p>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Falls es nicht automatisch kopiert wird, gehe zum zweiten Textfeld (oder zum zweiten Feld), in dem die schicken Schriften erscheinen. Markiere den schicken Text durch langes Drücken, passe die Auswahl durch Ziehen der Markierungen an und tippe auf die Kopieren-Schaltfläche, um den kopierten, umgewandelten Text zu kopieren.
                                </p>
                            </div>

                            <div>
                                <p className="font-bold text-slate-900 dark:text-white mb-2 text-xl">Schritt 4: Einfügen und Speichern bei TikTok</p>
                                <p className="text-slate-600 dark:text-slate-400">
                                    Gehe zu deinem TikTok-Profil, öffne deine TikTok-Bio, das Bio-Textfeld, deinen Namen, deine Bildunterschrift oder den TikTok-Nickname-Bereich. Füge den Text ein, indem du im Textbereich gedrückt hältst, bis die Einfügen-Schaltfläche auf deinen Geräten erscheint, tippe darauf und speichere die Änderungen.
                                </p>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 mb-16">
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-center italic" style={{ display: 'block' }}>
                                Dieser Generator funktioniert, indem er Schriften generiert, während er deinen eingegebenen Text in Unicode-Zeichen umwandelt und so Zugriff auf Zehntausende von Zeichen bietet, anstatt nur auf die üblichen hundert auf einer normalen Tastatur, sodass du normale Alphabet-Zeichen durch spezielle ersetzen kannst.
                            </p>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">
                            Über TikTok hinaus: Smarte Wege, TikTok-Schriften zu nutzen
                        </h2>

                        <div className="space-y-6 mb-12">
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Ich sage Creatoren immer, dass sie über eine einzige App hinausdenken sollten. Während die meisten Leute TikTok-Schriften verwenden, um ihren TikTok-Account aufzuwerten, sind Font-Generatoren auf vielen sozialen Plattformen mächtig. Du kannst deinen Benutzernamen oder dein TikTok-Handle transformieren, deine Bio mit den besten TikTok-Schriften stylen und deinen TikTok-Videotitel oder deine Beschreibung auffrischen, um sofortige Aufmerksamkeit zu erregen und das Scrollen zu stoppen. Ein kreativer Mix – vielleicht etwas Originelles, Lustiges oder sogar Vaporwave – kann deinem Video helfen, bemerkt zu werden und möglicherweise viral zu gehen. Ich habe persönlich gesehen, wie das regelmäßige Wechseln von Schriften ein Profil frisch hält, besonders wenn der Stil zu deiner Persönlichkeit und Nische passt und sorgfältig ausgewählt wurde, um die Aufmerksamkeit der Leute zu optimieren.
                            </p>
                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                                Was viele Nutzer übersehen, ist, dass dieser <Link href="/" className="text-pink-500 hover:text-pink-600 font-medium underline underline-offset-4 decoration-pink-500/30">Schriftgenerator</Link> auch ein TikTok-Textgenerator ist, der auf Unicode-Zeichen basiert. Das bedeutet, dass er auf Plattformen wie <Link href="/instagram-schrift" className="text-pink-500 hover:text-pink-600 font-medium underline underline-offset-4 decoration-pink-500/30">Instagram</Link>, Tumblr, Facebook, Twitter (X), Discord, Reddit und sogar in Foren funktioniert. Deshalb fühlt er sich wie ein All-in-One-Schriftgenerator an – du kannst denselben Markenstil überallhin mitnehmen.
                            </p>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">
                            Funktionen eines TikTok-Schriftgenerators
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <p className="font-bold text-slate-900 dark:text-white mb-1">Kostenlos</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Nutze das Tool, ohne etwas zu bezahlen.</p>
                            </div>
                            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <p className="font-bold text-slate-900 dark:text-white mb-1">Einfach zu bedienen</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Simples Design, das jeder schnell versteht.</p>
                            </div>
                            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <p className="font-bold text-slate-900 dark:text-white mb-1">Mehrere Stile</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Wähle aus kursiven, fetten, ästhetischen, Glitch- und winzigen Textstilen.</p>
                            </div>
                            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <p className="font-bold text-slate-900 dark:text-white mb-1">Einklick-Kopieren</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Kopiere deine Lieblingsschrift sofort und füge sie überall ein.</p>
                            </div>
                            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <p className="font-bold text-slate-900 dark:text-white mb-1">Mobil & Desktop</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Vollständig reaktionsfähig auf allen Geräten.</p>
                            </div>
                            <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                <p className="font-bold text-slate-900 dark:text-white mb-1">Keine Anmeldung</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">Nutze es sofort, ohne dich anzumelden oder etwas herunterzuladen.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-8 tracking-tight">
                            Häufig gestellte Fragen (FAQs)
                        </h2>

                        <div className="space-y-4 mb-12">
                            {[
                                {
                                    q: "1. Was ist ein TikTok-Schriftgenerator?",
                                    a: "Ein TikTok-Schriftgenerator ist ein Online-Tool, das deinen normalen Text mithilfe von Unicode-Zeichen in stylische TikTok-Schriften umwandelt. Er hilft dir dabei, schicken Text für deine TikTok-Bio, deinen Benutzernamen, Spitznamen, deine Bildunterschrift und sogar Videotitel zu erstellen, ohne dass ein Download oder Programmierung erforderlich ist."
                                },
                                {
                                    q: "2. Wie verwende ich den TikTok-Schriftgenerator?",
                                    a: "Gib einfach deinen Text in das Eingabefeld (erstes Textfeld) ein, durchsuche die verschiedenen Schriftstile, die sofort generiert werden, klicke auf den Stil, der dir gefällt, und er wird automatisch in deine Zwischenablage kopiert. Füge ihn dann in dein TikTok-Profil, Bio-Textfeld, Namens- oder Bildunterschriftenbereich ein und speichere die Änderungen."
                                },
                                {
                                    q: "3. Wo kann ich diese TikTok-Schriften verwenden?",
                                    a: "Du kannst sie auf deinem TikTok-Account verwenden, um deinen Handle, deine Bio oder Video-Beschreibung zu transformieren. Da das Tool mit Unicode arbeitet, kannst du es auch auf Instagram, Facebook, Twitter (X), Tumblr, Discord, Reddit und anderen Social-Media-Plattformen oder Foren verwenden."
                                },
                                {
                                    q: "4. Können TikTok-Schriften meinem Account helfen, viral zu gehen?",
                                    a: "Stylische Schriften allein machen dein Video vielleicht nicht viral, aber sie helfen dir dabei, bemerkt zu werden und die Aufmerksamkeit der Leute zu erregen. Eine einzigartige Schriftart, die zu deiner Persönlichkeit und Nische passt, kann dir helfen, dich von der Masse abzuheben."
                                },
                                {
                                    q: "5. Muss ich etwas herunterladen oder mich registrieren, um das Tool zu nutzen?",
                                    a: "Nein, das Tool ist kostenlos und einfach zu bedienen. Es ist kein Download oder eine Registrierung erforderlich, und es funktioniert reibungslos auf sowohl mobilen als auch Desktop-Geräten."
                                },
                                {
                                    q: "6. Welche Schriftstile sind verfügbar?",
                                    a: "Du kannst aus mehreren Stilen wählen, wie kursiv, fett, ästhetisch, Glitch, gruselig und winzigem Text. Diese Stile können mit einem Klick kopiert und überall eingefügt werden, wo du möchtest."
                                },
                                {
                                    q: "7. Warum funktionieren diese Schriften auf verschiedenen Plattformen?",
                                    a: "Der Generator wandelt deine normalen Alphabet-Zeichen in Unicode-Zeichen um. Da die meisten Geräte und Plattformen Unicode unterstützen, wird der schicke Text fast überall korrekt angezeigt."
                                }
                            ].map((faq, idx) => (
                                <div
                                    key={idx}
                                    className="bg-white dark:bg-slate-900/40 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                                    >
                                        <p className="font-bold text-slate-900 dark:text-white text-lg">
                                            {faq.q}
                                        </p>
                                        <svg
                                            className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-pink-500' : ''}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </button>
                                    <div
                                        className={`transition-all duration-300 ease-in-out overflow-hidden ${openFaq === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                                    >
                                        <div className="px-6 pb-6 text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-slate-800/50 pt-4">
                                            {faq.a}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Toast message="Text kopiert!" isVisible={showToast} onClose={() => setShowToast(false)} />

            {/* Inline keyframes for card fade-in */}
            <style jsx global>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(12px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </>
    );
}
