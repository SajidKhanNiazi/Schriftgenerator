'use client';

import { useState, useEffect } from 'react';
import { fontStyles } from '@/lib/fonts';
import FontCard from '@/components/FontCard';
import Toast from '@/components/Toast';

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
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [showToast, setShowToast] = useState(false);

  const getGen = (key: string) => fontStyles[key] || ((t: string) => t);

  const fontSections: FontSection[] = [
    {
      title: 'Stylische Instagram Schrift',
      fonts: [
        { id: 'script', name: 'Handschrift', generator: getGen('script') },
        { id: 'cursive-bold', name: 'Kursiv Bold', generator: getGen('cursive-bold') },
        { id: 'elegant', name: 'Elegant', generator: getGen('elegant') },
        { id: 'bold-italic', name: 'Fett Kursiv', generator: getGen('bold-italic') },
        { id: 'serif-italic', name: 'Serif Kursiv', generator: getGen('serif-italic') },
        { id: 'italic-sans', name: 'Sans Kursiv', generator: getGen('italic-sans') },
      ],
    },
    {
      title: 'Elegante & Kalligrafie Schrift',
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
      title: 'Fette Instagram Schrift',
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
      title: 'Ästhetische Instagram Schrift',
      fonts: [
        { id: 'cool', name: 'Cool', generator: getGen('cool') },
        { id: 'double-struck', name: 'Double Struck', generator: getGen('double-struck') },
        { id: 'outline', name: 'Outline', generator: getGen('outline') },
        { id: 'blackboard', name: 'Blackboard', generator: getGen('blackboard') },
        { id: 'wavy', name: 'Wellig', generator: getGen('wavy') },
        { id: 'small-caps', name: 'Kapitälchen', generator: getGen('small-caps') },
        { id: 'wide', name: 'Breit', generator: getGen('wide') },
        { id: 'vaporwave', name: 'Vaporwave', generator: getGen('vaporwave') },
        { id: 'katakana', name: 'Katakana', generator: getGen('katakana') },
        { id: 'negativ', name: 'Negativ', generator: getGen('negativ') },
      ],
    },
    {
      title: 'Runde & Süße Schrift',
      fonts: [
        { id: 'bubble', name: 'Bubble', generator: getGen('bubble') },
        { id: 'circled', name: 'Eingekreist', generator: getGen('circled') },
        { id: 'bubble-filled', name: 'Gefüllte Blase', generator: getGen('bubble-filled') },
        { id: 'parenthesized', name: 'Eingeklammert', generator: getGen('parenthesized') },
        { id: 'squared', name: 'Quadratisch', generator: getGen('squared') },
        { id: 'fancy-border-3', name: 'Blume ❀', generator: getGen('fancy-border-3') },
      ],
    },
    {
      title: 'Instagram Schrift mit Symbolen',
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
      title: 'Schlichte Instagram Schrift',
      fonts: [
        { id: 'monospace', name: 'Monospace', generator: getGen('monospace') },
        { id: 'fullwidth', name: 'Vollbreite', generator: getGen('fullwidth') },
        { id: 'underline', name: 'Unterstrichen', generator: getGen('underline') },
        { id: 'strikethrough', name: 'Durchgestrichen', generator: getGen('strikethrough') },
        { id: 'overline', name: 'Überstrichen', generator: getGen('overline') },
        { id: 'narrow', name: 'Schmal', generator: getGen('narrow') },
      ],
    },
    {
      title: 'Monospace Instagram Schrift',
      fonts: [
        { id: 'retro', name: 'Retro', generator: getGen('retro') },
        { id: 'fancy', name: 'Fancy', generator: getGen('fancy') },
        { id: 'dot-above', name: 'Punkt Oben', generator: getGen('dot-above') },
        { id: 'dot-below', name: 'Punkt Unten', generator: getGen('dot-below') },
        { id: 'ring-above', name: 'Ring Oben', generator: getGen('ring-above') },
      ],
    },
    {
      title: 'Gothische Instagram Schrift',
      fonts: [
        { id: 'gothic', name: 'Gotisch', generator: getGen('gothic') },
        { id: 'fancy-border-5', name: 'Brackets 【】', generator: getGen('fancy-border-5') },
        { id: 'fancy-border-6', name: 'Quotes 『』', generator: getGen('fancy-border-6') },
      ],
    },
    {
      title: 'Fraktur / Deutsche Schrift',
      fonts: [
        { id: 'fraktur', name: 'Fraktur', generator: getGen('fraktur') },
        { id: 'fancy-border-7', name: 'Box 〖〗', generator: getGen('fancy-border-7') },
      ],
    },
    {
      title: 'Lustige Instagram',
      fonts: [
        { id: 'mirror', name: 'Spiegelschrift', generator: getGen('mirror') },
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
      title: 'Historisch',
      fonts: [
        { id: 'old-english', name: 'Old English', generator: getGen('old-english') },
        { id: 'suetterlin', name: 'Sütterlin', generator: getGen('suetterlin') },
        { id: 'deutsche-kurrent', name: 'Celtic / Kurrent', generator: getGen('deutsche-kurrent') },
      ],
    },
    {
      title: 'Business Instagram',
      fonts: [
        { id: 'clean-sans', name: 'Clean Sans', generator: getGen('clean-sans') },
        { id: 'professional-serif', name: 'Professional', generator: getGen('professional-serif') },
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

  return (
    <>
      {/* Hero - same as home */}
      <section className="relative pt-4 pb-10 md:pb-16 overflow-hidden bg-gradient-to-b from-white to-slate-50/80 dark:from-slate-950 dark:to-slate-900/50">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-200/30 dark:bg-emerald-900/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-200/20 dark:bg-teal-900/10 rounded-full blur-3xl -z-10" />

        <div className="container mx-auto px-4 md:px-5 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-3 leading-tight">
            Instagram <span className="text-emerald-600 dark:text-emerald-400">Schrift</span> Generator
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-6 text-sm md:text-base">
            Coole Schriften für Bio, Namen und Captions. Text eingeben, Schrift wählen, kopieren.
          </p>

          <div className="max-w-2xl mx-auto relative">
            <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-700 p-1">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value.slice(0, 500))}
                placeholder="Text hier eingeben..."
                className="w-full px-5 py-6 md:py-7 text-lg md:text-2xl font-semibold text-slate-800 dark:text-slate-100 bg-transparent border-0 focus:outline-none focus:ring-0 resize-none min-h-[100px] text-center placeholder:text-slate-400"
                rows={1}
              />
              {inputText && (
                <button
                  onClick={() => setInputText('')}
                  className="absolute top-3 right-3 p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center text-[10px] font-medium tracking-wider text-slate-400">
                {inputText.length} / 500
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {(['sm', 'md', 'lg'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setFontSize(s)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${fontSize === s
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
              >
                {s === 'sm' ? 'Klein' : s === 'md' ? 'Mittel' : 'Groß'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Font Sections - category name only, same grid as home */}
      <div className="space-y-10 md:space-y-14 py-8">
        <div className="container mx-auto px-4 md:px-5">
          {fontSections.map((section) => (
            <section key={section.title} className="mb-10 md:mb-14">
              <div className="max-w-7xl mx-auto mb-4 pb-1">
                <h2 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center justify-center md:justify-start gap-3">
                  <span className="w-1 h-6 md:h-8 bg-emerald-500 rounded-full" />
                  {section.title}
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-7xl mx-auto">
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

      {/* How to use - same style as home */}
      <section className="py-16 md:py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white mb-3">
              So funktioniert’s
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { step: 1, title: 'Text eingeben', desc: 'Text oben eingeben – der Generator wandelt in Echtzeit um.' },
              { step: 2, title: 'Schrift wählen', desc: 'Durch Kategorien scrollen und passende Schrift tippen.' },
              { step: 3, title: 'Kopieren', desc: 'Auf die Karte tippen – Text wird kopiert, bei Instagram einfügen.' },
            ].map((item) => (
              <div key={item.step} className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center mb-4 text-lg font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - same style as home */}
      <section className="py-16 md:py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold text-slate-900 dark:text-white text-center mb-10">
            Häufige Fragen
          </h2>
          <div className="space-y-3">
            {[
              { q: 'Wie ändere ich meine Instagram Schrift?', a: 'Kopiere die generierte Schrift und füge sie in Bio, Namen, Caption oder Story ein. Funktioniert sofort ohne App.' },
              { q: 'Funktioniert die Schrift in der Bio?', a: 'Ja, alle Schriftarten funktionieren in Instagram Bios, Namen, Captions und Stories auf allen Geräten.' },
              { q: 'Ist der Generator kostenlos?', a: 'Ja, 100% kostenlos und ohne Anmeldung. Alle Schriftarten unbegrenzt nutzbar.' },
            ].map((item, idx) => (
              <details key={idx} className="rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50/50 dark:bg-slate-800/30">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-semibold text-slate-900 dark:text-white list-none hover:bg-slate-100/50 dark:hover:bg-slate-700/30">
                  {item.q}
                  <div className="ml-4 w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center group-open:rotate-180 transition-transform shrink-0">
                    <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-4 pb-4 pt-0 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Toast message="Text kopiert!" isVisible={showToast} onClose={() => setShowToast(false)} />
    </>
  );
}
