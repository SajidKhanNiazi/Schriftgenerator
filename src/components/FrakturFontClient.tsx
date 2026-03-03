'use client';

import { useState, useEffect } from 'react';
import { fontStyles } from '@/lib/fonts';
import Toast from '@/components/Toast';
import FontSizeSlider from '@/components/FontSizeSlider';

// ─── Types ───────────────────────────────────────────────────────
interface FrakturFontStyle {
    id: string;
    name: string;
    description: string;
    example: { input: string; output: string };
    generator: (text: string) => string;
    highlighted?: boolean;
    specialCharsNote?: boolean;
}

const EXAMPLE_TEXT = 'Dein Text';

// ─── Helper: Combining character wrappers ────────────────────────
const withUnderline = (gen: (t: string) => string) =>
    (text: string) => gen(text).split('').map(c => c + '\u0332').join('');
const withOverline = (gen: (t: string) => string) =>
    (text: string) => gen(text).split('').map(c => c + '\u0305').join('');
const withStrikethrough = (gen: (t: string) => string) =>
    (text: string) => gen(text).split('').map(c => c + '\u0336').join('');
const withDotBelow = (gen: (t: string) => string) =>
    (text: string) => gen(text).split('').map(c => c + '\u0323').join('');
const withDotAbove = (gen: (t: string) => string) =>
    (text: string) => gen(text).split('').map(c => c + '\u0307').join('');
const withSlash = (gen: (t: string) => string) =>
    (text: string) => gen(text).split('').map(c => c + '\u0338').join('');
const withCross = (gen: (t: string) => string) =>
    (text: string) => gen(text).split('').map(c => c + '\u0334').join('');
const spaced = (gen: (t: string) => string) =>
    (text: string) => gen(text).split('').join(' ');
const mixedFraktur = (text: string) =>
    text.split('').map((c, i) =>
        i % 2 === 0 ? (fontStyles['fraktur-bold'](c)) : (fontStyles['fraktur'](c))
    ).join('');

// ─── 35 Fraktur / Gothic / Blackletter / Medieval Styles ────────
const frakturFontStyles: FrakturFontStyle[] = [
    // ━━━━━━━━━━━━ CORE FRAKTUR ━━━━━━━━━━━━
    {
        id: 'fraktur-classic',
        name: 'Klassische Fraktur',
        description: 'Traditioneller dünner Blackletter-Stil mit kunstvollen, mittelalterlichen gebrochenen Strichen.',
        example: { input: 'guten tag', output: '𝔤𝔲𝔱𝔢𝔫 𝔱𝔞𝔤' },
        generator: fontStyles['fraktur'],
        highlighted: true,
        specialCharsNote: true,
    },
    {
        id: 'bold-fraktur',
        name: 'Fette Fraktur',
        description: 'Schwerer und dicker Blackletter — dramatisch, stark, ideal für Überschriften oder Namen.',
        example: { input: 'Hallo', output: '𝕳𝖆𝖑𝖑𝖔' },
        generator: fontStyles['fraktur-bold'],
        highlighted: true,
        specialCharsNote: true,
    },
    {
        id: 'math-fraktur',
        name: 'Mathematische Fraktur',
        description: 'Unicode-Fraktur aus dem Block der mathematischen alphanumerischen Symbole. Funktioniert überall ohne Schriftinstallation.',
        example: { input: 'Altdeutsch', output: '𝔄𝔩𝔱𝔡𝔢𝔲𝔱𝔰𝔠𝔥' },
        generator: fontStyles['fraktur'],
        specialCharsNote: true,
    },
    {
        id: 'math-bold-fraktur',
        name: 'Mathematische Fette Fraktur',
        description: 'Fette Unicode-Version der mathematischen Fraktur mit stärkerem visuellen Gewicht.',
        example: { input: 'Altdeutsch', output: '𝕬𝖑𝖙𝖉𝖊𝖚𝖙𝖘𝖈𝖍' },
        generator: fontStyles['fraktur-bold'],
        specialCharsNote: true,
    },
    {
        id: 'bold-blackletter-caps',
        name: 'Fette Blackletter-Großbuchstaben',
        description: 'Dicker gotischer Großbuchstaben-Stil. Starke visuelle Wirkung für Anzeigetexte.',
        example: { input: 'FRANKFURT', output: '𝕱𝕽𝕬𝕹𝕶𝕱𝖀𝕽𝕿' },
        generator: fontStyles['fraktur-bold'],
        specialCharsNote: true,
    },

    // ━━━━━━━━━━━━ GOTHIC VARIANTS ━━━━━━━━━━━━
    {
        id: 'gothic-classic',
        name: 'Gotisch / Blackletter Unicode',
        description: 'Eckige mittelalterliche Buchstaben, die der traditionellen gotischen Schrift ähneln.',
        example: { input: 'Burg', output: '𝔅𝔲𝔯𝔤' },
        generator: fontStyles['gothic'],
        highlighted: true,
        specialCharsNote: true,
    },
    {
        id: 'gothic-doublestruck',
        name: 'Gotisch Doppelt Gestrichen',
        description: 'Sieht dem Blackletter ähnlich, aber etwas moderner und klarer.',
        example: { input: 'Berlin', output: '𝔹𝕖𝕣𝕝𝕚𝕟' },
        generator: fontStyles['double-struck'],
        specialCharsNote: true,
    },
    {
        id: 'old-english',
        name: 'Altenglischer Blackletter',
        description: 'Ähnlich wie Fraktur, aber etwas runder im englisch-gotischen Stil.',
        example: { input: 'Königreich', output: '𝔎ö𝔫𝔦𝔤𝔯𝔢𝔦𝔠𝔥' },
        generator: fontStyles['gothic'],
        specialCharsNote: true,
    },
    {
        id: 'medieval-serif-gothic',
        name: 'Mittelalterlich Serif Gotisch',
        description: 'Vom alten Manuskript inspirierter Look mit dicken dekorativen Kanten.',
        example: { input: 'Geschichte', output: '𝕲𝖊𝖘𝖈𝖍𝖎𝖈𝖍𝖙𝖊' },
        generator: fontStyles['fraktur-bold'],
        specialCharsNote: true,
    },
    {
        id: 'heavy-gothic-outline',
        name: 'Schwerer Gotischer Umriss',
        description: 'Fettes Blackletter-Gefühl mit dramatischer Form und schweren Strichen.',
        example: { input: 'Ritter', output: '𝕽𝖎𝖙𝖙𝖊𝖗' },
        generator: fontStyles['fraktur-bold'],
        specialCharsNote: true,
    },

    // ━━━━━━━━━━━━ SCRIPT & CURSIVE OLD GERMAN ━━━━━━━━━━━━
    {
        id: 'script-old-german',
        name: 'Altdeutsche Schrift (Kurrent)',
        description: 'Inspiriert von der alten handgeschriebenen deutschen Kurrentschrift.',
        example: { input: 'Name', output: '𝒩𝒶𝓂𝑒' },
        generator: fontStyles['script'],
        specialCharsNote: true,
    },
    {
        id: 'cursive-gothic-bold',
        name: 'Fette Kursive Gotisch',
        description: 'Fette Schriftbuchstaben mit einem dunklen gotischen Kursivgefühl.',
        example: { input: 'Legende', output: '𝓛𝓮𝓰𝓮𝓷𝓭𝓮' },
        generator: fontStyles['cursive-bold'],
        specialCharsNote: true,
    },
    {
        id: 'suetterlin',
        name: 'Sütterlin-Stil',
        description: 'Inspiriert von der Sütterlinschrift — eine deutsche Handschrift, die ab 1915 in Schulen gelehrt wurde.',
        example: { input: 'Schule', output: '𝒮𝒸𝒽𝓊𝓁𝑒' },
        generator: fontStyles['script'],
        specialCharsNote: true,
    },
    {
        id: 'deutsche-kurrent',
        name: 'Deutsche Kurrent',
        description: 'Alte deutsche Handschrift, die vom 16. bis zum 20. Jahrhundert verwendet wurde.',
        example: { input: 'Brief', output: '𝓑𝓻𝓲𝓮𝓯' },
        generator: fontStyles['cursive-bold'],
        specialCharsNote: true,
    },

    // ━━━━━━━━━━━━ COMBINING CHARACTER STYLES ━━━━━━━━━━━━
    {
        id: 'fraktur-underlined',
        name: 'Unterstrichene Fraktur',
        description: 'Klassische Fraktur mit mittelalterlicher Unterstrich-Verzierung.',
        example: { input: 'Dark', output: '𝔇̲𝔞̲𝔯̲𝔨̲' },
        generator: withUnderline(fontStyles['fraktur']),
    },
    {
        id: 'bold-fraktur-underlined',
        name: 'Fette Fraktur Unterstrichen',
        description: 'Fetter Blackletter mit starkem Unterstrich für zusätzliche Betonung.',
        example: { input: 'Held', output: '𝕳̲𝖊̲𝖑̲𝖉̲' },
        generator: withUnderline(fontStyles['fraktur-bold']),
    },
    {
        id: 'fraktur-overlined',
        name: 'Überstrichene Fraktur',
        description: 'Fraktur-Buchstaben mit Überstrich — verleiht ein königliches, formelles Erscheinungsbild.',
        example: { input: 'König', output: '𝔎̅ö̅𝔫̅𝔦̅𝔤̅' },
        generator: withOverline(fontStyles['fraktur']),
    },
    {
        id: 'fraktur-strikethrough',
        name: 'Durchgestrichene Fraktur',
        description: 'Fraktur-Text mit horizontalem Durchstrich — ideal für verfluchte oder dunkle Kunst-Ästhetik.',
        example: { input: 'Schicksal', output: '𝔖̶𝔠̶𝔥̶𝔦̶𝔠̶𝔨̶𝔰̶𝔞̶𝔩̶' },
        generator: withStrikethrough(fontStyles['fraktur']),
    },
    {
        id: 'bold-fraktur-strikethrough',
        name: 'Verfluchte Fette Fraktur',
        description: 'Fette Gotisch mit Durchstrich für einen dunklen, Heavy-Metal, verfluchten Textlook.',
        example: { input: 'Dunkel', output: '𝕯̶𝖚̶𝖓̶𝖐̶𝖊̶𝖑̶' },
        generator: withStrikethrough(fontStyles['fraktur-bold']),
        highlighted: true,
    },
    {
        id: 'fraktur-dotted',
        name: 'Punktierte Fraktur',
        description: 'Klassische Fraktur mit Punkten unter jedem Buchstaben — antikes Gravur-Gefühl.',
        example: { input: 'Rune', output: '𝔑̣𝔲̣𝔫̣𝔢̣' },
        generator: withDotBelow(fontStyles['fraktur']),
    },
    {
        id: 'fraktur-dot-above',
        name: 'Gekrönte Fraktur (Punkte oben)',
        description: 'Fraktur mit Punkten über jedem Buchstaben, wie kleine Kronen.',
        example: { input: 'Stern', output: '𝔖̇𝔱̇𝔢̇𝔯̇𝔫̇' },
        generator: withDotAbove(fontStyles['fraktur']),
    },
    {
        id: 'fraktur-slashed',
        name: 'Schrägstrich-Fraktur',
        description: 'Fraktur-Buchstaben mit diagonalem Schrägstrich — perfekt für durchgestrichenen oder verbotenen Stil.',
        example: { input: 'Leere', output: '𝔏̸𝔢̸𝔢̸𝔯̸𝔢̸' },
        generator: withSlash(fontStyles['fraktur']),
    },
    {
        id: 'distortion-gothic',
        name: 'Verzerrte Gotisch',
        description: 'Fette Fraktur mit kurzen horizontalen Strichen — Heavy-Metal-/Verzerrungseffekt.',
        example: { input: 'Metall', output: '𝕸̴𝖊̴𝖙̴𝖆̴𝖑̴𝖑̴' },
        generator: withCross(fontStyles['fraktur-bold']),
    },

    // ━━━━━━━━━━━━ SPACED & MIXED ━━━━━━━━━━━━
    {
        id: 'spaced-fraktur',
        name: 'Gesperrte Fraktur',
        description: 'Klassische Fraktur mit extra Abstand zwischen den Buchstaben — eleganter, weiter Look.',
        example: { input: 'Weit', output: '𝔚 𝔢 𝔦 𝔱' },
        generator: spaced(fontStyles['fraktur']),
    },
    {
        id: 'spaced-bold-fraktur',
        name: 'Gesperrte Fette Gotisch',
        description: 'Fetter Blackletter mit dramatischem Breitabstand für maximale visuelle Wirkung.',
        example: { input: 'Fett', output: '𝕱 𝖊 𝖙 𝖙' },
        generator: spaced(fontStyles['fraktur-bold']),
    },
    {
        id: 'mixed-fraktur',
        name: 'Abwechselnde Fraktur',
        description: 'Wechselt zwischen fetter und normaler Fraktur für einen rhythmischen, geschichteten Look.',
        example: { input: 'Tanz', output: '𝕿𝔞𝖓𝔷' },
        generator: mixedFraktur,
    },

    // ━━━━━━━━━━━━ DECORATIVE MEDIEVAL ━━━━━━━━━━━━
    {
        id: 'shadow-gothic',
        name: 'Schatten-Gotisch',
        description: 'Gotische Buchstaben mit kreuzförmiger Symbolverzierung umrahmt.',
        example: { input: 'Dunkel', output: '✠𝕯𝖚𝖓𝖐𝖊𝖑✠' },
        generator: (text: string) => `✠${fontStyles['fraktur-bold'](text)}✠`,
    },
    {
        id: 'symbolic-medieval',
        name: 'Symbolisches Mittelalter',
        description: 'Frakturbeschriftung mit mittelalterlichen Kreuz-Dekorationszeichen.',
        example: { input: 'Glaube', output: '☨𝕲𝖑𝖆𝖚𝖇𝖊☨' },
        generator: (text: string) => `☨${fontStyles['fraktur-bold'](text)}☨`,
    },
    {
        id: 'decorative-swords',
        name: 'Fraktur Schwert-Stil',
        description: 'Fantasy-Fraktur mit gekreuzten Schwertern für eine Krieger-Ästhetik.',
        example: { input: 'Kampf', output: '⚔️𝕶𝖆𝖒𝖕𝖋⚔️' },
        generator: (text: string) => `⚔️${fontStyles['fraktur-bold'](text)}⚔️`,
        highlighted: true,
    },
    {
        id: 'royal-fraktur',
        name: 'Königliche Fraktur',
        description: 'Klassischer Frakturtext in kunstvollen königlichen Zierrahmen.',
        example: { input: 'König', output: '꧁ 𝔎ö𝔫𝔦𝔤 ꧂' },
        generator: (text: string) => `꧁ ${fontStyles['fraktur'](text)} ꧂`,
    },
    {
        id: 'crown-gothic',
        name: 'Kronen-Gotisch',
        description: 'Fetter Blackletter mit Kronensymbolen für einen königlichen Look.',
        example: { input: 'Adel', output: '♔ 𝕬𝖉𝖊𝖑 ♔' },
        generator: (text: string) => `♔ ${fontStyles['fraktur-bold'](text)} ♔`,
    },
    {
        id: 'shield-gothic',
        name: 'Schild-Gotisch',
        description: 'Mittelalterlich schildgerahmte fette Fraktur für einen heraldischen Look.',
        example: { input: 'Wache', output: '🛡️𝖂𝖆𝖈𝖍𝖊🛡️' },
        generator: (text: string) => `🛡️${fontStyles['fraktur-bold'](text)}🛡️`,
    },
    {
        id: 'fleur-de-lis',
        name: 'Lilien-Mittelalter',
        description: 'Klassische Fraktur mit Lilien umschlossen für französisch-gotischen Stil.',
        example: { input: 'Edel', output: '⚜️ 𝔈𝔡𝔢𝔩 ⚜️' },
        generator: (text: string) => `⚜️ ${fontStyles['fraktur'](text)} ⚜️`,
    },
    {
        id: 'iron-cross',
        name: 'Eisernes Kreuz-Stil',
        description: 'Fette Fraktur mit Eisernen Kreuz-Zeichen — starke mittelalterliche Krieger-Ästhetik.',
        example: { input: 'Stahl', output: '✙ 𝕾𝖙𝖆𝖍𝖑 ✙' },
        generator: (text: string) => `✙ ${fontStyles['fraktur-bold'](text)} ✙`,
    },
    {
        id: 'gothic-star',
        name: 'Gotische Stern-Fraktur',
        description: 'Frakturtext mit Sternverzierungen für Dark-Fantasy-Ästhetik.',
        example: { input: 'Nacht', output: '★彡 𝔑𝔞𝔠𝔥𝔱 彡★' },
        generator: (text: string) => `★彡 ${fontStyles['fraktur'](text)} 彡★`,
    },
    {
        id: 'dark-gothic-border',
        name: 'Dunkler Gotischer Rahmen',
        description: 'Fetter Blackletter in eleganten Winkelklammern umschlossen.',
        example: { input: 'Reich', output: '◤ 𝕽𝖊𝖎𝖈𝖍 ◢' },
        generator: (text: string) => `◤ ${fontStyles['fraktur-bold'](text)} ◢`,
    },
];

// ─── Component ──────────────────────────────────────────────────
export default function FrakturFontClient() {
    const [inputText, setInputText] = useState('');
    const [debouncedText, setDebouncedText] = useState('');
    const [fontSize, setFontSize] = useState<number>(26);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('Text kopiert!');
    const [copiedId, setCopiedId] = useState<string | null>(null);

    useEffect(() => {
        const t = setTimeout(() => setDebouncedText(inputText), 200);
        return () => clearTimeout(t);
    }, [inputText]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('reveal-visible');
            });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, [debouncedText]);

    const displayText = debouncedText.trim() || EXAMPLE_TEXT;

    const handleCopy = async (text: string, id: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopiedId(id);
            setToastMessage('Text kopiert!');
            setShowToast(true);
            setTimeout(() => setCopiedId(null), 2000);
        } catch {
            const ta = document.createElement('textarea');
            ta.value = text;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            setCopiedId(id);
            setToastMessage('Text kopiert!');
            setShowToast(true);
            setTimeout(() => setCopiedId(null), 2000);
        }
    };

    const handleCopyAll = async () => {
        const allTexts = frakturFontStyles
            .map((f) => `${f.name}:\n${f.generator(displayText)}`)
            .join('\n\n');
        try {
            await navigator.clipboard.writeText(allTexts);
            setToastMessage('Alle Stile kopiert!');
            setShowToast(true);
        } catch {
            const ta = document.createElement('textarea');
            ta.value = allTexts;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            setToastMessage('Alle Stile kopiert!');
            setShowToast(true);
        }
    };

    const heroPreview = fontStyles['fraktur'](displayText);

    return (
        <>
            {/* ═══════════════════════════════════════════
                    HERO SECTION
                ═══════════════════════════════════════════ */}
            <section className="relative pt-6 pb-10 md:pb-20 overflow-hidden bg-[var(--bg-primary)]">
                {/* Background effects */}
                <div className="absolute inset-0 bg-mesh-dark pointer-events-none" />
                <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-20" />
                <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/[0.05] rounded-full blur-[120px]" style={{ animation: 'float-slow 20s ease-in-out infinite' }} />
                    <div className="absolute bottom-[5%] right-[-8%] w-[35%] h-[35%] bg-teal-500/[0.04] rounded-full blur-[100px]" style={{ animation: 'float-slow 25s ease-in-out infinite', animationDelay: '-8s' }} />
                    <div className="absolute top-[40%] left-[60%] w-[20%] h-[20%] bg-blue-500/[0.03] rounded-full blur-[80px]" style={{ animation: 'float-slow 18s ease-in-out infinite', animationDelay: '-4s' }} />
                </div>

                <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10 text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-emerald-500/[0.08] dark:bg-emerald-500/[0.12] border border-emerald-500/20 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold uppercase tracking-[0.15em] mb-8 animate-slide-up backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        Kostenloses Online-Tool
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-display font-extrabold text-slate-900 dark:text-white mb-5 tracking-tight leading-[1.1] animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        Fraktur{' '}
                        <span className="relative inline-block">
                            <span className="gradient-text-emerald">Schrift</span>
                            <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 rounded-full opacity-40" />
                        </span>
                        {' '}Generator
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 text-sm md:text-[15px] font-normal leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        Eine Frakturschrift ist eine klassische altdeutsche gebrochene Schrift mit kunstvollen, gebrochenen Strichen.
                        Verwandle deinen normalen Text sofort in schöne Fraktur-Unicode-Zeichen —
                        keine Schriftinstallation nötig.
                    </p>

                    {/* ─── Input Card ─── */}
                    <div className="max-w-3xl mx-auto relative group animate-slide-up sticky top-20 z-30 md:relative md:top-auto mb-16" style={{ animationDelay: '0.35s' }}>
                        <div className="absolute -inset-[2px] bg-gradient-to-r from-emerald-500/20 via-teal-500/10 to-emerald-500/20 rounded-[1.75rem] blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="relative bg-white dark:bg-slate-900/90 rounded-[1.75rem] shadow-xl dark:shadow-2xl dark:shadow-black/20 border border-slate-200/60 dark:border-white/[0.06] p-1.5 backdrop-blur-xl">
                            <textarea
                                id="fraktur-text-input"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value.slice(0, 500))}
                                placeholder="Gib hier deinen Text ein..."
                                className="w-full px-6 py-6 md:py-8 text-xl md:text-2xl font-display font-bold text-slate-900 dark:text-white bg-transparent border-0 focus:outline-none focus:ring-0 resize-none min-h-[100px] md:min-h-[150px] text-center placeholder:text-slate-200 dark:placeholder:text-slate-800 transition-all"
                                rows={1}
                            />
                            {inputText && (
                                <button onClick={() => setInputText('')} className="absolute top-5 right-5 p-2 text-slate-400 hover:text-red-500 rounded-xl bg-slate-50/80 dark:bg-slate-800/80 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover:rotate-90" aria-label="Text löschen">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
                                </button>
                            )}
                            <div className="flex items-center justify-between px-5 py-3 border-t border-slate-100/80 dark:border-slate-800/50">
                                <span className={`text-[11px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 tabular-nums ${inputText.length > 450 ? 'text-amber-500' : inputText.length > 0 ? 'text-emerald-500' : 'text-slate-300 dark:text-slate-700'}`}>{inputText.length} <span className="opacity-30">/</span> 500</span>
                                <FontSizeSlider value={fontSize} onChange={setFontSize} />
                            </div>
                        </div>
                    </div>

                    {/* ─── Live Preview ─── */}
                    <div className="max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: '0.5s' }}>
                        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-2xl p-7 md:p-9 shadow-2xl border border-white/[0.04] overflow-hidden">
                            {/* Subtle glow inside */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[1px] bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent" />
                            <div className="flex items-center justify-between mb-5">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <span className="text-[10px] font-semibold text-emerald-400/60 uppercase tracking-[0.2em]">Live-Vorschau</span>
                                </div>
                                <button onClick={() => handleCopy(heroPreview, 'hero-preview')} className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 active:scale-[0.97] ${copiedId === 'hero-preview' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-white/[0.07] text-white/80 hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-500/25 border border-white/[0.06] hover:border-emerald-500/50'}`}>
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                    {copiedId === 'hero-preview' ? 'Kopiert ✓' : 'Kopieren'}
                                </button>
                            </div>
                            <p className="text-white font-medium leading-relaxed break-words whitespace-pre-wrap text-center min-h-[3rem] flex items-center justify-center" style={{ fontSize: `${fontSize + 4}px` }}>{heroPreview}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════
                FONT STYLES GRID — 35 Styles
            ═══════════════════════════════════════════ */}
            <section className="py-10 md:py-16 bg-[var(--bg-secondary)] dark:bg-[var(--bg-primary)] relative">
                <div className="absolute inset-0 bg-grid-pattern pointer-events-none opacity-30 dark:opacity-10" />
                <div className="container mx-auto px-3 sm:px-4 md:px-6 max-w-5xl relative z-10">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-3">
                            <span className="w-1 h-7 md:h-8 bg-gradient-to-b from-emerald-400 to-teal-500 rounded-full" />
                            <h2 className="text-xl md:text-2xl font-display font-bold text-slate-900 dark:text-white">
                                Alle Fraktur- &amp; Gotik-Stile
                            </h2>
                            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800/60 px-2.5 py-1 rounded-full border border-slate-200/50 dark:border-slate-700/30">{frakturFontStyles.length} Stile</span>
                        </div>
                        <button onClick={handleCopyAll} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            <span>Alle kopieren</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {frakturFontStyles.map((font, idx) => {
                            const generatedText = font.generator(displayText);
                            const isCopied = copiedId === font.id;
                            return (
                                <div key={font.id} className={`group relative bg-white dark:bg-slate-900/60 rounded-2xl border transition-all duration-500 hover:shadow-xl hover:-translate-y-0.5 overflow-hidden shimmer-on-hover backdrop-blur-sm ${font.highlighted ? 'border-emerald-500/30 shadow-lg shadow-emerald-500/[0.06] ring-1 ring-emerald-500/10' : 'border-slate-200/50 dark:border-slate-800/40 hover:border-emerald-500/25 hover:shadow-emerald-500/[0.04]'}`} style={{ animationDelay: `${idx * 0.03}s`, animation: 'fraktur-fade-in 0.4s ease-out both' }}>
                                    {font.highlighted && (<div className="absolute top-3 right-3 px-2.5 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[9px] font-bold uppercase tracking-widest rounded-full shadow-lg shadow-emerald-500/25">Beliebt</div>)}
                                    <div className="p-5 md:p-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${font.highlighted ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600 group-hover:bg-emerald-500'}`} />
                                            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400 group-hover:text-emerald-500 transition-colors duration-300">{font.name}</p>
                                        </div>
                                        <p className="text-[13px] text-slate-400 dark:text-slate-500 mb-3 leading-relaxed">{font.description}</p>
                                        <div className="text-xs text-slate-400 mb-3 bg-slate-50/80 dark:bg-slate-800/40 rounded-xl px-4 py-2.5 border border-slate-100/80 dark:border-slate-700/30">
                                            <span className="text-slate-500 dark:text-slate-400 font-medium">{font.example.input}</span>
                                            <span className="mx-2 text-emerald-400">→</span>
                                            <span className="text-slate-900 dark:text-white font-medium">{font.example.output}</span>
                                        </div>
                                        <div className="text-slate-900 dark:text-white font-medium leading-relaxed mb-4 break-words min-h-[2.5rem] flex items-center" style={{ fontSize: `${fontSize}px` }}>
                                            <span className="line-clamp-2">{generatedText}</span>
                                        </div>
                                        {font.specialCharsNote && (<p className="text-[10px] text-slate-400 dark:text-slate-600 mb-3 italic">Sonderzeichen werden als Standard angezeigt</p>)}
                                        <button onClick={() => handleCopy(generatedText, font.id)} className={`w-full py-3 md:py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 active:scale-[0.98] ${isCopied ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' : 'bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white hover:shadow-lg hover:shadow-emerald-500/25 border border-slate-200/50 dark:border-slate-700/30 hover:border-transparent'}`}>
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
                ARTICLE CONTENT (NEW)
            ═══════════════════════════════════════════ */}
            <section className="py-12 md:py-20 bg-[var(--bg-primary)] border-t border-slate-100 dark:border-slate-800/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/[0.03] rounded-full blur-[150px] -z-10 translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/[0.03] rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <div className="prose prose-slate dark:prose-invert max-w-none">

                        {/* Einleitungsabschnitt */}
                        <div className="mb-16 reveal">
                            <p className="text-[17px] leading-relaxed text-slate-600 dark:text-slate-400">
                                Wenn mich Leute nach Frakturschrift fragen, erkläre ich es als kreative Möglichkeit, Nachrichten, Profile und Benutzernamen interessanter zu gestalten. Diese Frakturschriften ähneln alten Zeichen aus dem Mittelalter, aber heute erstellt ein einfaches Tool diese Art von besonderem Text mithilfe von Unicode-Zeichen. Diese einzigartigen Zeichencodes helfen dem Computer, den Stil zu verstehen, während sie für menschliche Augen trotzdem ansprechend aussehen. Einmal generiert, können sie in sozialen Medien als auffällige Beiträge gepostet werden, die wirklich herausstechen.
                            </p>
                            <p className="text-[17px] leading-relaxed text-slate-600 dark:text-slate-400">
                                Genauer betrachtet tragen Fraktur, Gotisch und Blackletter eine faszinierende Geschichte, die bis ins Mittelalter zurückreicht. Dieser markante Schreibstil entstand in verschiedenen europäischen Kulturen, insbesondere in Deutschland und Skandinavien. Die Frakturschrift ist bekannt für ihre kunstvollen, fetten Buchstabenformen mit scharfen, eckigen Strichen. Sie wurde während des Mittelalters und der Renaissance häufig im Druck verwendet, obwohl ihre Beliebtheit mit dem Aufkommen moderner Schriftarten nachließ.
                            </p>
                            <p className="text-[17px] leading-relaxed text-slate-600 dark:text-slate-400">
                                Trotzdem haben Frakturschriften einen besonderen Platz in Designprojekten, die ein Gefühl von Tradition, Erbe und gotischer Ästhetik hervorrufen. Ich habe sie persönlich in Vintage-inspirierten Designs, Buchcovern und dekorativen Elementen verwendet, um historischen Charme zu verleihen. Auch bei reduzierter Verbreitung in der alltäglichen Kommunikation funktionieren sie wunderbar auf digitalen Plattformen und in sozialen Medien. Viele gotische Textgeneratoren helfen dabei, diese einzigartige Schrift in kreative Beiträge, Profile und künstlerische Kreationen einzubauen. Durch durchdachten und gezielten Einsatz können Sie Ihre digitalen Inhalte mit einem reizvollen, nostalgischen Ambiente versehen.
                            </p>
                        </div>

                        {/* Anleitung */}
                        <div className="mb-16 reveal">
                            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">So verwendest du den Fraktur-Schriftgenerator</h2>
                            <p className="text-[17px] leading-relaxed text-slate-600 dark:text-slate-400">
                                Ich empfehle Anfängern immer, zunächst mit verschiedenen Texten im obigen Eingabefeld zu experimentieren und zu beobachten, wie sie in verschiedenen Frakturschriften erscheinen. Der Fraktur-Schriftgenerator lässt dir Zeit zum Erkunden, dann wählst du den Stil, der am besten zu dir passt. Danach wendest du deine bevorzugten Texteinstellungen an, passt Farben und Hintergrund an und lädst deine fertig gestaltete Version herunter. Das Beste daran ist, dass unser Fraktur-Textgenerator eine Frakturschrift erzeugt, die du einfach kopieren und in soziale Medien, Textnachrichten auf iPhones und Android-Geräten und sogar Online-Spiele wie Fortnite und Roblox einfügen kannst.
                            </p>
                            <p className="text-[17px] leading-relaxed text-slate-600 dark:text-slate-400">
                                Um den Text zu teilen, folge diesen Schritten: Gib deinen Text im Eingabefeld ein, klicke oben rechts im Ausgabefeld auf Kopieren, oder kopiere den formatierten Text manuell durch Rechtsklick oder STRG + C, um ihn in die Zwischenablage zu speichern. Gehe dann zu deinem Lieblingskanal, Messenger oder einer der verschiedenen Plattformen, füge den Frakturtext ein und poste ihn. Ich persönlich bevorzuge einen Desktop-Browser für die Erstellung, da einige Frakturschriften und Frakturbuchstaben auf Mobilgeräten möglicherweise nicht korrekt angezeigt werden. Du kannst deinen Text auch in einer großen Auswahl an Schriften vorschauen, deinen Favoriten auswählen und schnell darauf zugreifen — ohne Aufwand, jederzeit und überall, 100% kostenlos. Das macht es nützlich nicht nur zum Spaß, sondern auch für akademische Veröffentlichungen, Museumsausstellungen und <a href="https://www.behance.net/search/projects/cultural%20festival" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-600 underline transition-colors">kulturelles Festival-Branding</a>.
                            </p>
                        </div>

                        {/* Verwandte Stile */}
                        <div className="mb-16 reveal">
                            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">Verwandte Stile rund um Fraktur entdecken</h2>
                            <p className="text-[17px] leading-relaxed text-slate-600 dark:text-slate-400">
                                Bei der Arbeit mit Fraktur entdecke ich oft verwandte Stile, die eigenständig aussehen und sich dennoch wunderbar dazu kombinieren lassen. Diese Textstile haben meist ein dunkles, eckiges und markantes Aussehen, ähnlich wie klassische Textzeichen aus gotischen Traditionen. Zum Beispiel können Fett (Serif) oder Fett / Kursiv (Serif) eine starke Betonung hinzufügen, während Fette Kursivschrift und Abwechselnde Kursivschrift einen sanften, aber dramatischen Touch mit abwechselndem Rhythmus verleihen. Sogar kreative Optionen wie Cherokee, Letterlike und Titel-Stile bringen etwas Ungewöhnliches. Ich habe persönlich Sätze wie „Hallo Text mein alter Freund“ in Kapitälchen, einfachen Kapitälchen, verspieltem Ransom-Stil und sogar Keilschrift getestet, um Ergebnisse zu vergleichen. Wenn du nach weiteren Ideen jenseits von Gotisch suchst, kannst du jederzeit die Hauptliste auf der Startseite im Vorschaumodus erkunden.
                            </p>

                            <h3 className="text-xl md:text-2xl font-display font-bold text-slate-900 dark:text-white mt-10 mb-5 tracking-tight">Fette Stile entdecken</h3>
                            <p className="text-[17px] leading-relaxed text-slate-600 dark:text-slate-400">
                                Die Nutzung des <a href="https://schriftenpro.de/" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-600 underline transition-colors">Fraktur-Textkonverters</a> ist einfach: Gib deinen Text im Eingabefeld ein, überprüfe das Ergebnis im Ausgabefeld und wähle aus vielen fetten Textstilen. Du kannst Wörter in gotischen Buchstaben mit Fraktur erstellen oder stärker mit Fetter Fraktur in fetten gotischen Buchstaben arbeiten. Wenn du etwas Wildes willst, probiere Verfluchten Text, der wirklich verflucht aussieht, oder wähle Fetten Text für ein sauberes, fettes Ergebnis. Du kannst auch eine Kursivschrift mit Kursiv generieren, Italic für glänzenden kursiven Text verwenden oder mit Kleinem Text in tiefgestellten Versionen experimentieren. Für kreatives Branding bieten sich Kapitälchentext in GROßBUCHSTABEN, Blasentext, der sich umkreist anfühlt, Rückwärtstext oder Kopfübertext an. Wenn du neugierig auf zusätzliche Unicode-Textoptionen bist, erkunde den vollständigen <a href="https://schriftenpro.de/" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-600 underline transition-colors">Schriftgenerator</a>, um deine Stilideen zu erweitern.
                            </p>
                        </div>

                        {/* Wo teilen */}
                        <div className="mb-16 reveal">
                            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">Wo du deinen Frakturtext teilen kannst</h2>
                            <p className="text-[17px] leading-relaxed text-slate-600 dark:text-slate-400">
                                Sobald du Frakturtext erstellt hast<a href="https://schriftenpro.de/instagram-schrift" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-600 underline transition-colors">,</a> kannst du ihn überall posten, wo du normalerweise schreibst oder normalen Text einfügst. Er funktioniert gut in sozialen Medien, einschließlich Profilnamen, Kommentaren und Beiträgen. Beliebte Plattformen, die ich oft nutze, sind Facebook, Twitter, Instagram — und für Instagram kannst du deinen <a href="https://schriftenpro.de/instagram-schrift" target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:text-emerald-600 underline transition-colors">Instagram-Bio-Text</a>, Profilnamen oder Instagram-Bildunterschriften gestalten. Du kannst ihn auch auf TikTok, YouTube, WhatsApp, SnapChat und Discord-Chats teilen. Über soziale Medien hinaus kann Frakturtext in Textnachrichten, E-Mails oder anderen Bereichen erscheinen, in denen du möchtest, dass dein Text heraussticht und einzigartig wirkt.
                            </p>
                        </div>

                        {/* Warum wertvoll */}
                        <div className="mb-16 reveal">
                            <h2 className="text-2xl md:text-3xl font-display font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">Warum Frakturschriften wertvoll sind</h2>
                            <p className="text-[17px] leading-relaxed text-slate-600 dark:text-slate-400">
                                Frakturschriften haben eine besondere ästhetische Anziehungskraft, die jedem Design einen einzigartigen, historischen Charme verleiht. Ihre Vielseitigkeit macht sie perfekt für Vintage-inspirierte soziale Projekte oder dekorative Elemente. Mit digitaler Integration können Sie Frakturtext in Social-Media-Beiträge, Profile oder künstlerische Kreationen einbauen. Viele Leute erkunden eine Sammlung kostenloser Frakturschrift-Optionen, die großartig sind, um Projekte ohne Kosten zu verbessern. Die Fraktur-Gotische Schrift ermöglicht es Ihnen, auffällige Überschriften, künstlerische Designs und fesselnde Social-Media-Inhalte zu erstellen, die wirklich herausstechen.
                            </p>
                            <p className="text-[17px] leading-relaxed text-slate-600 dark:text-slate-400">
                                Über die visuelle Anziehungskraft hinaus sind Frakturschriften im ISO-Basislateinischen Alphabet verwurzelt, enthalten aber auch das Eszett (ß) in ſʒ-Form, Vokale mit Umlauten und das lange s (ſ). Einige Stile weisen Varianten wie r rotunda und Ligaturen aus der Kursivhandschrift auf, mit Regeln für die korrekte Verwendung. Historische Majuskeln (I, J) und Minuskeln (i, j) können sich unterscheiden, während Blackletter-Schriften Details im Kleinbuchstaben o, Bogen oder gebrochenen Elementen zeigen. In dänischen Texten wurde das ø dem ö im Deutschen oder Schwedischen während des 16. Jahrhunderts vorgezogen. Die lettische Variante bis in die 1920er Jahre fügte zusätzliche Zeichen mit diakritischen Zeichen hinzu, darunter gestrichene Buchstaben (Ꞡ, ꞡ, Ꞣ, ꞣ, Ł, ł, Ꞥ, ꞥ, Ꞧ, ꞧ) und palatalisierte Konsonanten (Ģ, ģ, Ķ, ķ, Ļ, ļ, Ņ, ņ, Ŗ, ŗ). Gestrichene Varianten von S, ſ unterscheiden stimmhafte Zischlaute, stimmlose Zischlaute, Affrikaten, während Akzente (à, â, ê, î, ô, û) und Digraphen (ah, eh) für lange Vokale (Ā, ā, Ē, ē, Ī, ī, Ō, ō, Ū, ū) verwendet werden. Einige sorbische Orthografie vor 1950 verwendet diese Formen ebenfalls für Klarheit und Stil.
                            </p>
                        </div>

                        {/* FAQ-Bereich */}
                        <div className="mt-16 reveal">
                            <div className="text-center mb-10">
                                <h2 className="text-3xl md:text-4xl font-display font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Häufig gestellte <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Fragen</span></h2>
                                <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto rounded-full" />
                            </div>
                            <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
                                {[
                                    {
                                        q: 'Was macht Frakturschriften anders als andere Blackletter-Schriften?',
                                        a: 'Frakturschriften sind einzigartig durch ihre kunstvollen Buchstabenformen, scharfen Striche und historische gotische Ästhetik, die sie von Standard-Blackletter-Schriften wie Textura oder Schwabacher unterscheiden.'
                                    },
                                    {
                                        q: 'Kann ich Frakturtext auf Social-Media-Plattformen wie Instagram oder TikTok verwenden?',
                                        a: 'Ja, du kannst Frakturtext in Social-Media-Beiträge, Profile und Bildunterschriften auf Plattformen wie Instagram, TikTok, Facebook oder YouTube einbauen und so deine Inhalte visuell hervorstechen lassen.'
                                    },
                                    {
                                        q: 'Gibt es kostenlose Möglichkeiten, Frakturschriften für meine Projekte zu nutzen?',
                                        a: 'Absolut, es gibt kostenlose Frakturschrift-Sammlungen, die du herunterladen und für Vintage-inspirierte soziale Projekte, künstlerische Kreationen oder dekorative Elemente ohne Kosten nutzen kannst.'
                                    },
                                    {
                                        q: 'Unterstützen Frakturschriften Sonderzeichen wie Eszett, Umlaute oder langes s?',
                                        a: 'Ja, viele Frakturschriften umfassen das ISO-Basislateinische Alphabet, Eszett (ß), langes s (ſ), Vokale mit Umlauten und historische Ligaturen für akkurate und traditionelle Blackletter-Typografie.'
                                    },
                                    {
                                        q: 'Kann ich die Fraktur-Gotische Schrift für professionelle Designprojekte verwenden?',
                                        a: 'Definitiv. Die Fraktur-Gotische Schrift ist ideal für auffällige Überschriften, künstlerische Designs und Social-Media-Inhalte und verleiht deinen Projekten einen einzigartigen und historischen Charme.'
                                    },
                                    {
                                        q: 'Gibt es historische Regeln, die ich bei der Verwendung von Frakturschriften beachten sollte?',
                                        a: 'Ja, einige Frakturvarianten enthalten r rotunda, gestrichene Buchstaben und palatalisierte Konsonanten, mit Regeln für Majuskeln (I, J) und Minuskeln (i, j). Das Verständnis dieser Details kann die historische Genauigkeit deiner Typografie wahren.'
                                    },
                                ].map((faq, i) => {
                                    const [isOpen, setIsOpen] = useState(false);
                                    return (
                                        <div key={i} className="bg-white dark:bg-slate-900/50 border border-slate-100/80 dark:border-slate-800/50 rounded-2xl overflow-hidden transition-all duration-300 hover:border-emerald-500/20">
                                            <button
                                                onClick={() => setIsOpen(!isOpen)}
                                                className="w-full flex items-center justify-between px-6 py-5 text-left group"
                                            >
                                                <div className="flex items-center gap-3.5">
                                                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">F</span>
                                                    <h3 className="font-display font-bold text-slate-900 dark:text-white text-[18px] tracking-tight leading-snug m-0 group-hover:text-emerald-500 transition-colors">
                                                        {faq.q}
                                                    </h3>
                                                </div>
                                                <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen
                                                    ? 'bg-emerald-500 text-white rotate-180'
                                                    : 'bg-slate-100 dark:bg-slate-800/60 text-slate-400'
                                                    }`}>
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </button>
                                            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                                <div className="px-6 pb-6 pt-2 border-t border-slate-100/50 dark:border-slate-800/50">
                                                    <div className="flex gap-3.5">
                                                        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-500 flex items-center justify-center font-bold text-xs">A</span>
                                                        <p className="text-slate-500 dark:text-slate-400 leading-relaxed m-0 text-[16px]">
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

            <style jsx global>{`
                .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
                .reveal-visible { opacity: 1; transform: translateY(0); }
                @keyframes fraktur-fade-in { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
                @keyframes float-slow { 0%, 100% { transform: translate(0, 0); } 50% { transform: translate(20px, -30px); } }
            `}</style>
        </>
    );
}
