'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { fontStyles } from '@/lib/fonts';
import FontCard from '@/components/FontCard';
import Toast from '@/components/Toast';
import FontSizeSlider from '@/components/FontSizeSlider';

interface FontItem {
    id: string;
    name: string;
    generator: (text: string) => string;
}

interface FontSection {
    title: string;
    fonts: FontItem[];
}

const EXAMPLE_TEXT = 'Dein Text';

export default function InstagramSchriftClient() {
    const [inputText, setInputText] = useState('');
    const [debouncedText, setDebouncedText] = useState('');
    const [fontSize, setFontSize] = useState<number>(24);
    const [showToast, setShowToast] = useState(false);
    const [activeSection, setActiveSection] = useState(0);
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const sectionRefs = useRef<(HTMLElement | null)[]>([]);
    const navRef = useRef<HTMLDivElement>(null);

    const getGen = (key: string) => fontStyles[key] || ((t: string) => t);

    const fontSections: FontSection[] = [
        {
            title: 'Stylische Instagram Schriften',
            fonts: [
                { id: 'script', name: 'Handschrift', generator: getGen('script') },
                { id: 'cursive-bold', name: 'Kursiv Fett', generator: getGen('cursive-bold') },
                { id: 'elegant', name: 'Elegant', generator: getGen('elegant') },
                { id: 'bold-italic', name: 'Fett Kursiv', generator: getGen('bold-italic') },
                { id: 'serif-italic', name: 'Serif Kursiv', generator: getGen('serif-italic') },
                { id: 'italic-sans', name: 'Sans Kursiv', generator: getGen('italic-sans') },
            ],
        },
        {
            title: 'Elegant & Kalligrafie',
            fonts: [
                { id: 'italic', name: 'Klassisch Kursiv', generator: getGen('italic') },
                { id: 'bold-italic-serif', name: 'Fett Kursiv Serif', generator: getGen('bold-italic-serif') },
                { id: 'emoji-flowers', name: 'Blumen 🌸', generator: getGen('emoji-flowers') },
                { id: 'fancy-border-4', name: 'Ornament ༺༻', generator: getGen('fancy-border-4') },
                { id: 'fancy-border-10', name: 'Verziert ꧁꧂', generator: getGen('fancy-border-10') },
                { id: 'fancy-border-2', name: 'Sterne ☆☆', generator: getGen('fancy-border-2') },
            ],
        },
        {
            title: 'Fette Schriften',
            fonts: [
                { id: 'bold', name: 'Fett', generator: getGen('bold') },
                { id: 'bold-sans', name: 'Fett Sans', generator: getGen('bold-sans') },
                { id: 'sans-bold', name: 'Sans Fett', generator: getGen('sans-bold') },
                { id: 'bold-serif', name: 'Fett Serif', generator: getGen('bold-serif') },
                { id: 'serif-bold', name: 'Serif Fett', generator: getGen('serif-bold') },
                { id: 'bold-italic-sans', name: 'Fett Kursiv Sans', generator: getGen('bold-italic-sans') },
            ],
        },
        {
            title: 'Ästhetische Schriften',
            fonts: [
                { id: 'cool', name: 'Cool', generator: getGen('cool') },
                { id: 'double-struck', name: 'Doppelt', generator: getGen('double-struck') },
                { id: 'outline', name: 'Umriss', generator: getGen('outline') },
                { id: 'blackboard', name: 'Tafelschrift', generator: getGen('blackboard') },
                { id: 'wavy', name: 'Wellig', generator: getGen('wavy') },
                { id: 'small-caps', name: 'Kapitälchen', generator: getGen('small-caps') },
                { id: 'wide', name: 'Breit', generator: getGen('wide') },
                { id: 'vaporwave', name: 'Vaporwave', generator: getGen('vaporwave') },
                { id: 'katakana', name: 'Katakana', generator: getGen('katakana') },
                { id: 'negativ', name: 'Negativ', generator: getGen('negativ') },
            ],
        },
        {
            title: 'Rund & Niedlich',
            fonts: [
                { id: 'bubble', name: 'Blase', generator: getGen('bubble') },
                { id: 'circled', name: 'Eingekreist', generator: getGen('circled') },
                { id: 'bubble-filled', name: 'Gefüllte Blase', generator: getGen('bubble-filled') },
                { id: 'parenthesized', name: 'Eingeklammert', generator: getGen('parenthesized') },
                { id: 'squared', name: 'Quadratisch', generator: getGen('squared') },
                { id: 'fancy-border-3', name: 'Blume ❀', generator: getGen('fancy-border-3') },
            ],
        },
        {
            title: 'Symbole & Emoji',
            fonts: [
                { id: 'emoji-hearts', name: 'Herz ❤', generator: getGen('emoji-hearts') },
                { id: 'emoji-stars', name: 'Stern ⭐', generator: getGen('emoji-stars') },
                { id: 'emoji-sparkles', name: 'Glitzer ✨', generator: getGen('emoji-sparkles') },
                { id: 'emoji-butterfly', name: 'Schmetterling 🦋', generator: getGen('emoji-butterfly') },
                { id: 'hearts-border', name: 'Herz Rahmen', generator: getGen('hearts-border') },
                { id: 'stars-border', name: 'Stern Rahmen', generator: getGen('stars-border') },
                { id: 'sparkles-border', name: 'Glitzer Rahmen', generator: getGen('sparkles-border') },
                { id: 'butterfly-border', name: 'Schmetterling Rahmen', generator: getGen('butterfly-border') },
                { id: 'regional-flags', name: 'Flaggen 🇩🇪', generator: getGen('regional-flags') },
                { id: 'wingdings', name: 'Wingdings', generator: getGen('wingdings') },
            ],
        },
        {
            title: 'Einfache Schriften',
            fonts: [
                { id: 'monospace', name: 'Monospace', generator: getGen('monospace') },
                { id: 'fullwidth', name: 'Volle Breite', generator: getGen('fullwidth') },
                { id: 'underline', name: 'Unterstrichen', generator: getGen('underline') },
                { id: 'strikethrough', name: 'Durchgestrichen', generator: getGen('strikethrough') },
                { id: 'overline', name: 'Überstrichen', generator: getGen('overline') },
                { id: 'narrow', name: 'Schmal', generator: getGen('narrow') },
            ],
        },
        {
            title: 'Monospace',
            fonts: [
                { id: 'retro', name: 'Retro', generator: getGen('retro') },
                { id: 'fancy', name: 'Fancy', generator: getGen('fancy') },
                { id: 'dot-above', name: 'Punkt oben', generator: getGen('dot-above') },
                { id: 'dot-below', name: 'Punkt unten', generator: getGen('dot-below') },
                { id: 'ring-above', name: 'Ring oben', generator: getGen('ring-above') },
            ],
        },
        {
            title: 'Gotische Schrift',
            fonts: [
                { id: 'gothic', name: 'Gotisch', generator: getGen('gothic') },
                { id: 'fancy-border-5', name: 'Klammern 【】', generator: getGen('fancy-border-5') },
                { id: 'fancy-border-6', name: 'Anführung 『』', generator: getGen('fancy-border-6') },
            ],
        },
        {
            title: 'Fraktur / Altdeutsch',
            fonts: [
                { id: 'fraktur', name: 'Fraktur', generator: getGen('fraktur') },
                { id: 'fancy-border-7', name: 'Box 〖〗', generator: getGen('fancy-border-7') },
            ],
        },
        {
            title: 'Lustige Schriften',
            fonts: [
                { id: 'mirror', name: 'Spiegel', generator: getGen('mirror') },
                { id: 'zalgo', name: 'Zalgo / Glitchy', generator: getGen('zalgo') },
                { id: 'regenbogen', name: 'Regenbogen', generator: getGen('regenbogen') },
                { id: 'upside-down', name: 'Kopfüber', generator: getGen('upside-down') },
            ],
        },
        {
            title: 'Wissenschaft',
            fonts: [
                { id: 'superscript', name: 'Hochgestellt', generator: getGen('superscript') },
                { id: 'subscript', name: 'Tiefgestellt', generator: getGen('subscript') },
            ],
        },
        {
            title: 'Historische Schriften',
            fonts: [
                { id: 'old-english', name: 'Altenglisch', generator: getGen('old-english') },
                { id: 'suetterlin', name: 'Sütterlin', generator: getGen('suetterlin') },
                { id: 'deutsche-kurrent', name: 'Deutsche Kurrent', generator: getGen('deutsche-kurrent') },
            ],
        },
        {
            title: 'Geschäftlich',
            fonts: [
                { id: 'clean-sans', name: 'Clean Sans', generator: getGen('clean-sans') },
                { id: 'professional-serif', name: 'Professionell', generator: getGen('professional-serif') },
                { id: 'formal', name: 'Formal Serif', generator: getGen('formal') },
            ],
        },
        {
            title: 'Feiern 🎉',
            fonts: [
                { id: 'geburtstag', name: 'Geburtstag 🎂', generator: getGen('geburtstag') },
                { id: 'feier', name: 'Party 🎊', generator: getGen('feier') },
                { id: 'natur-blaetter', name: 'Natur 🍃', generator: getGen('natur-blaetter') },
                { id: 'wellen', name: 'Wellen 〰️', generator: getGen('wellen') },
            ],
        },
    ];

    useEffect(() => {
        const t = setTimeout(() => setDebouncedText(inputText), 300);
        return () => clearTimeout(t);
    }, [inputText]);

    const displayText = debouncedText.trim() || EXAMPLE_TEXT;

    const handleCopySuccess = () => setShowToast(true);

    // Intersection Observer for sticky nav active state
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = sectionRefs.current.indexOf(entry.target as HTMLElement);
                        if (idx !== -1) setActiveSection(idx);
                    }
                });
            },
            { rootMargin: '-120px 0px -60% 0px', threshold: 0 }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = useCallback((idx: number) => {
        sectionRefs.current[idx]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(idx);
        // Scroll nav pill into view
        if (navRef.current) {
            const btn = navRef.current.children[idx] as HTMLElement;
            btn?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }
    }, []);

    const faqItems = [
        {
            q: "Was ist ein Instagram Schriftgenerator?",
            a: "Ein Instagram Schriftgenerator ist ein Online-Tool, das normalen Text in stilvolle und ausgefallene Schriften umwandelt. Diese Schriften können kopiert und in deine Instagram-Bio, Bildunterschriften, Kommentare oder deinen Profilnamen eingefügt werden, um dein Konto hervorzuheben."
        },
        {
            q: "Wie funktioniert ein Instagram Schriftgenerator?",
            a: "Ein Instagram Schriftgenerator verwendet spezielle Unicode-Zeichen, um stilvolle Texte zu erstellen. Wenn du deinen Text in das Tool eingibst, wird er automatisch in verschiedene Schriftarten umgewandelt, die auf Instagram und anderen Plattformen funktionieren."
        },
        {
            q: "Ist der Instagram Schriftgenerator kostenlos?",
            a: "Die meisten Instagram Schriftgeneratoren sind völlig kostenlos. Du kannst unbegrenzt stylische Texte erstellen, ohne zu bezahlen oder dich anzumelden."
        },
        {
            q: "Kann ich die generierten Schriften in meine Instagram-Bio einfügen?",
            a: "Ja, du kannst die generierte Schrift einfach kopieren und direkt in deine Instagram-Bio, Bildunterschriften, Kommentare oder deinen Profilnamen einfügen."
        },
        {
            q: "Funktionieren Instagram-Schriften in Bildunterschriften und Kommentaren?",
            a: "Ja, ausgefallene Instagram-Schriften funktionieren in Bios, Bildunterschriften, Kommentaren und sogar Direktnachrichten, solange die Plattform Unicode-Zeichen unterstützt."
        },
        {
            q: "Warum werden einige Instagram-Schriften nicht richtig angezeigt?",
            a: "Einige Schriften werden möglicherweise auf bestimmten Geräten nicht korrekt angezeigt, da sie auf Unicode-Symbolen basieren. Ältere Geräte oder Apps unterstützen möglicherweise nicht alle Zeichen."
        },
        {
            q: "Ist die Nutzung eines Instagram Schriftgenerators sicher?",
            a: "Ja, die Nutzung eines Instagram Schriftgenerators ist sicher. Er wandelt nur Text in Unicode-Zeichen um und erfordert kein Passwort oder persönliche Informationen."
        },
        {
            q: "Kann ich Instagram-Schriften auf anderen Plattformen verwenden?",
            a: "Ja, du kannst die generierten Schriften auf TikTok, Facebook, Twitter, WhatsApp und vielen anderen Social-Media-Plattformen verwenden, die Unicode-Text unterstützen."
        },
        {
            q: "Beeinflussen ausgefallene Instagram-Schriften die Reichweite?",
            a: "Instagram-Schriften beeinflussen den Algorithmus nicht direkt. Stilvolle Texte können jedoch Aufmerksamkeit erregen, das Profilerscheinungsbild verbessern und das Engagement der Nutzer steigern."
        },
        {
            q: "Gibt es ein Zeichenlimit für Instagram-Bio-Schriften?",
            a: "Ja, Instagram erlaubt bis zu 150 Zeichen in der Bio. Ausgefallene Schriften zählen als normale Zeichen, stelle also sicher, dass dein Text innerhalb des Limits bleibt."
        },
        {
            q: "Warum sehen Instagram-Schriften auf verschiedenen Geräten unterschiedlich aus?",
            a: "Verschiedene Geräte und Betriebssysteme zeigen Unicode-Zeichen unterschiedlich an. Deshalb können einige Schriften auf Android, iPhone oder Desktop leicht anders aussehen."
        },
        {
            q: "Muss ich eine App herunterladen, um Instagram-Schriften zu erstellen?",
            a: "Nein, die meisten Instagram Schriftgeneratoren sind webbasierte Tools. Du kannst sie direkt in deinem Browser nutzen, ohne eine App herunterzuladen."
        }
    ];

    return (
        <>
            {/* ═══════════════════════════════════════════
                HERO-BEREICH
            ═══════════════════════════════════════════ */}
            <section className="relative pt-6 pb-14 md:pb-24 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
                {/* Animated floating orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div
                        className="absolute top-[-8%] left-[-8%] w-[35%] h-[35%] bg-emerald-500/8 rounded-full blur-[100px]"
                        style={{ animation: 'float-slow 20s ease-in-out infinite' }}
                    />
                    <div
                        className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-teal-500/8 rounded-full blur-[80px]"
                        style={{ animation: 'float-slow 25s ease-in-out infinite', animationDelay: '-8s' }}
                    />
                    <div
                        className="absolute top-[30%] right-[15%] w-[18%] h-[18%] bg-blue-500/5 rounded-full blur-[60px]"
                        style={{ animation: 'float-slow 18s ease-in-out infinite', animationDelay: '-4s' }}
                    />
                </div>

                <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6 animate-slide-up">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        Professionelles Tool
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-[1.08] animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        Instagram <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600">Schrift</span>generator
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-6 text-base md:text-lg font-light leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        Hebe deine digitale Präsenz mit einzigartiger Typografie hervor. Kopiere & füge ästhetische Schriften sofort für deine Bio, Bildunterschriften und Stories ein.
                    </p>

                    {/* Trust indicators */}
                    <div className="flex items-center justify-center gap-4 md:gap-6 mb-10 text-xs text-slate-400 dark:text-slate-500 font-medium animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        {['200+ Schriftarten', 'Ein-Klick Kopieren', '100% Kostenlos'].map((t, i) => (
                            <span key={i} className="flex items-center gap-1.5">
                                <span className="w-1 h-1 bg-emerald-500 rounded-full" />
                                {t}
                            </span>
                        ))}
                    </div>

                    {/* ─── Glass Input Card ─── */}
                    <div className="max-w-3xl mx-auto relative group animate-slide-up" style={{ animationDelay: '0.35s' }}>
                        {/* Glow */}
                        <div className="absolute -inset-[2px] bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-emerald-500/20 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-slate-900/5 dark:shadow-black/20 border border-slate-200/60 dark:border-slate-800/60 p-1.5 md:p-2">
                            <textarea
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value.slice(0, 500))}
                                placeholder="Text hier eingeben..."
                                className="w-full px-6 py-8 md:py-10 text-2xl md:text-4xl font-bold text-slate-900 dark:text-white bg-transparent border-0 focus:outline-none focus:ring-0 resize-none min-h-[130px] md:min-h-[160px] text-center placeholder:text-slate-300 dark:placeholder:text-slate-700"
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

                            {/* Bottom bar: char count + size slider */}
                            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100/60 dark:border-slate-800/40">
                                <span className={`text-[10px] font-bold tracking-widest uppercase transition-colors duration-300 ${inputText.length > 450 ? 'text-amber-500' : inputText.length > 0 ? 'text-emerald-500' : 'text-slate-400 dark:text-slate-600'}`}>
                                    {inputText.length} / 500
                                </span>
                                <FontSizeSlider value={fontSize} onChange={setFontSize} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                STICKY KATEGORIEN-NAVIGATION
            ═══════════════════════════════════════════ */}
            <nav className="sticky top-[72px] z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-800/50">
                <div className="container mx-auto px-4">
                    <div ref={navRef} className="category-nav flex gap-2 py-3 overflow-x-auto">
                        {fontSections.map((section, idx) => (
                            <button
                                key={section.title}
                                type="button"
                                onClick={() => scrollToSection(idx)}
                                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 whitespace-nowrap ${activeSection === idx
                                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                                    : 'bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400'
                                    }`}
                            >
                                {section.title}
                                <span className={`ml-1.5 text-[10px] ${activeSection === idx ? 'text-emerald-100' : 'text-slate-400 dark:text-slate-500'}`}>
                                    {section.fonts.length}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* ═══════════════════════════════════════════
                SCHRIFT-BEREICHE
            ═══════════════════════════════════════════ */}
            <div className="py-10 md:py-14 bg-slate-50/50 dark:bg-slate-950">
                <div className="container mx-auto px-4 md:px-5 space-y-12 md:space-y-16">
                    {fontSections.map((section, sIdx) => (
                        <section
                            key={section.title}
                            ref={(el) => { sectionRefs.current[sIdx] = el; }}
                            id={`section-${sIdx}`}
                            className="scroll-mt-32"
                        >
                            {/* Section heading */}
                            <div className="max-w-7xl mx-auto mb-5 flex items-center gap-3">
                                <div className="flex items-center gap-3">
                                    <span className="w-1 h-7 md:h-8 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
                                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
                                        {section.title}
                                    </h2>
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/60 px-2.5 py-1 rounded-full">
                                    {section.fonts.length} Stile
                                </span>
                            </div>

                            {/* Font grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-7xl mx-auto">
                                {section.fonts.map((font) => (
                                    <FontCard
                                        key={font.id}
                                        name={font.name}
                                        text={displayText}
                                        generatedText={font.generator(displayText)}
                                        size={fontSize}
                                        onCopy={handleCopySuccess}
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>

            {/* ═══════════════════════════════════════════
                SEO EINLEITUNG
            ═══════════════════════════════════════════ */}
            <section className="py-14 md:py-20 bg-white dark:bg-slate-900/30">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                        Wenn du nach Schriftarten suchst, die dein Instagram-Profil professionell und cool aussehen lassen, nutze unseren <Link href="/" className="text-emerald-500 font-semibold hover:underline">kostenlosen Schriftgenerator</Link>. Du kannst verschiedene Schriftarten erzeugen, die du ganz einfach kopieren und überall einfügen kannst. Stylische Schriften machen deine Instagram-Bio und deine Bildunterschriften attraktiver und ansprechender.
                    </p>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                ANLEITUNG — ZEITSTRAHL
            ═══════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/30">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                            So benutzt du den <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Instagram Schriftgenerator</span>
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto" />
                    </div>

                    <div className="relative">
                        {/* Connected timeline line */}
                        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/30 via-emerald-500/10 to-transparent" />

                        <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
                            {[
                                {
                                    step: "01",
                                    title: "Text eingeben",
                                    desc: "Gib deinen Text in das Eingabefeld oben ein. Unser Tool erzeugt sofort über 200 Schriftvarianten.",
                                    icon: (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    )
                                },
                                {
                                    step: "02",
                                    title: "Stile durchstöbern",
                                    desc: "Scrolle durch die Kategorien oder nutze die Navigationsleiste, um den perfekten Stil zu finden.",
                                    icon: (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    )
                                },
                                {
                                    step: "03",
                                    title: "Kopieren & Einfügen",
                                    desc: "Klicke auf eine Schriftkarte, um sie sofort zu kopieren. Dann füge sie in deine Instagram-Bio, Bildunterschrift oder Story ein.",
                                    icon: (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    )
                                }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center group">
                                    {/* Step number ring */}
                                    <div className="relative mb-5">
                                        <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border-2 border-emerald-500/20 flex items-center justify-center shadow-xl shadow-emerald-500/10 group-hover:border-emerald-500/50 group-hover:shadow-emerald-500/20 group-hover:scale-110 transition-all duration-500">
                                            <div className="text-emerald-500">
                                                {item.icon}
                                            </div>
                                        </div>
                                        <span className="absolute -top-2 -right-2 w-7 h-7 bg-emerald-500 text-white text-[10px] font-black rounded-lg flex items-center justify-center shadow-lg">
                                            {item.step}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                FOLLOWER GEWINNEN
            ═══════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="flex-1">
                            <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                                Gewinne Follower mit dem <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Instagram Textgenerator</span>
                            </h2>
                            <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6" />
                            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed font-light">
                                Mit unserem kostenlosen Instagram Schriftgenerator kannst du stilvolle Texte und auffällige Schriften erstellen – ohne Software oder Apps herunterladen zu müssen. Nutze diese Schriftarten in deiner Instagram-Bio und deinen Beiträgen, um dein Profil attraktiver und besser zu gestalten.
                            </p>

                            <div className="mt-8 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
                                <img src="/images/growth-visual.svg" alt="Instagram Wachstum" className="w-full h-auto" />
                            </div>
                        </div>
                        <div className="flex-shrink-0 w-40 md:w-56 aspect-square bg-gradient-to-br from-emerald-500/5 to-teal-500/10 dark:from-emerald-500/10 dark:to-teal-500/5 rounded-3xl border border-emerald-500/20 flex items-center justify-center relative group">
                            <div className="absolute inset-3 border-2 border-dashed border-emerald-500/15 rounded-2xl group-hover:rotate-6 transition-transform duration-700" />
                            <div className="text-center">
                                <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-teal-500">Gratis</span>
                                <p className="text-xs text-slate-400 mt-1 font-medium">Keine Anmeldung nötig</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                WARUM UNS WÄHLEN — BENTO FEATURE GRID
            ═══════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/30">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                            Warum unseren <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">kostenlosen Instagram Schriftgenerator wählen?</span>
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                        {[
                            {
                                title: "Anpassbar",
                                desc: "Leicht anpassbar für deine Markenwerbung in Instagram-Posts und Bildunterschriften mit individuellen Schrifttexten.",
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                )
                            },
                            {
                                title: "Keine Installation",
                                desc: "Ändere Instagram-Schriften direkt online, ohne eine App oder Erweiterung herunterzuladen.",
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Riesige Auswahl",
                                desc: "Durchsuche elegante, coole, stilisierte, handgeschriebene, kleine und ästhetische Schriftarten.",
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                )
                            },
                            {
                                title: "Ein-Klick Kopieren",
                                desc: "Mühelos Text kopieren und einfügen durch Klicken auf eine Schriftkarte.",
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                    </svg>
                                )
                            },
                            {
                                title: "100% Kostenlos",
                                desc: "Unbegrenzte Textgenerierung ohne Kosten.",
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Mobilfreundlich",
                                desc: "Alle Schriftarten sind vollständig für Mobilgeräte optimiert und passen sich auf allen Geräten an.",
                                icon: (
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                )
                            }
                        ].map((item, idx) => (
                            <div key={idx} className="group p-6 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-500">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 group-hover:bg-emerald-500 group-hover:text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-500">
                                    {item.icon}
                                </div>
                                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                ZUSÄTZLICHER SEO INHALT
            ═══════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6 max-w-5xl space-y-16 md:space-y-20">
                    <div className="max-w-4xl">
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                            Wie wähle ich die <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">richtige Instagram-Schrift?</span>
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6" />
                        <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed font-light">
                            Bevor du eine Schriftart für Instagram wählst, schau dir dein Publikum an. Du kannst eine Schriftart wählen, die zu deinem Publikum passt, und diese an deinen Beitrag anpassen. Ästhetische, Kalligrafie-, Dekorative und Handschrift-Schriften werden am häufigsten für Instagram verwendet.
                        </p>
                    </div>

                    <div className="max-w-4xl pt-12 border-t border-slate-100 dark:border-slate-800">
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                            Warum Instagram-Schriften und <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500">ungewöhnliche Schriften in Bios und Bildunterschriften verwenden?</span>
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full mb-6" />
                        <div className="space-y-4 text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed font-light">
                            <p>
                                Die Verwendung von Instagram-Schriften und ungewöhnlichen Textstilen in Bios und Bildunterschriften hilft deinem Profil, sich in einem überfüllten Feed abzuheben. Wenn die meisten Nutzer in der Standardschrift schreiben, fällt eine stylische oder einzigartige Schrift sofort auf und lässt die Menschen beim Scrollen innehalten.
                            </p>
                            <p>
                                Diese zusätzliche Aufmerksamkeit kann Profilbesuche, Engagement und Follower erhöhen. Kreative Schriften helfen auch, Persönlichkeit auszudrücken und das Branding zu stärken.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                WO FINDE ICH COOLE SCHRIFTEN — PLATTFORM-RASTER
            ═══════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/30">
                <div className="container mx-auto px-6 max-w-5xl">
                    <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                        Wo finde ich <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">coole Schriften für Instagram?</span>
                    </h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mb-6" />
                    <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed mb-10 max-w-4xl">
                        Unser Tool kann verschiedene coole und stylische Schriften erzeugen, die du auf jeder Social-Media-Plattform verwenden kannst. Damit kannst du deine Instagram-Reichweite erhöhen.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        {[
                            { name: "Instagram", desc: "Bio, Bildunterschriften und Beiträge.", url: "https://www.instagram.com", emoji: "📸" },
                            { name: "TikTok", desc: "Bio, Bilder und Videos.", url: "https://www.tiktok.com", emoji: "🎵" },
                            { name: "WhatsApp", desc: "Chats und Status.", url: "https://www.whatsapp.com", emoji: "💬" },
                            { name: "Facebook", desc: "Beiträge und Kommentare.", url: "https://www.facebook.com", emoji: "👥" },
                            { name: "Discord", desc: "Servernamen und Bio.", url: "https://discord.com", emoji: "🎮" },
                            { name: "Twitter", desc: "Tweets und Profil.", url: "https://twitter.com", emoji: "🐦" },
                            { name: "PUBG", desc: "Benutzername und Bio.", url: "https://www.pubg.com", emoji: "🎯" }
                        ].map((platform, i) => (
                            <a href={platform.url} key={i} target="_blank" rel="noopener noreferrer"
                                className="group p-4 md:p-5 bg-white dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 hover:border-emerald-500/40 transition-all duration-500 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-0.5 block">
                                <span className="text-xl mb-2 block">{platform.emoji}</span>
                                <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1 group-hover:text-emerald-500 transition-colors">{platform.name}</h3>
                                <p className="text-[11px] text-slate-500 dark:text-slate-500 leading-snug">{platform.desc}</p>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                FAQ — INTERAKTIVES AKKORDEON
            ═══════════════════════════════════════════ */}
            <section className="py-16 md:py-24 bg-white dark:bg-slate-950">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                            Häufig gestellte <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Fragen</span>
                        </h2>
                        <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto" />
                    </div>

                    <div className="space-y-3">
                        {faqItems.map((faq, i) => (
                            <div key={i} className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 overflow-hidden transition-all duration-300 hover:border-emerald-500/20">
                                <button
                                    type="button"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between px-6 py-5 text-left"
                                >
                                    <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white pr-4">
                                        {faq.q}
                                    </h3>
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === i
                                        ? 'bg-emerald-500 text-white rotate-180'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                        }`}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </button>
                                <div className="accordion-content" data-open={openFaq === i ? "true" : "false"}>
                                    <div>
                                        <p className="px-6 pb-5 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                            {faq.a}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Toast message="Text kopiert!" isVisible={showToast} onClose={() => setShowToast(false)} />
        </>
    );
}
