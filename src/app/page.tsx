'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FontCard from '@/components/FontCard';
import Toast from '@/components/Toast';
import { fontSections } from '@/lib/fontSections';
import LazySection from '@/components/LazySection';
import FontSizeSlider from '@/components/FontSizeSlider';
import ContentSection from '@/components/ContentSection';

const EXAMPLE_TEXT = 'Hallo Welt';

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const [fontSize, setFontSize] = useState<number>(24);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleCopySuccess = () => {
    setShowToast(true);
  };

  // Debounce input text for performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedText(inputText);
    }, 300);
    return () => clearTimeout(timer);
  }, [inputText]);

  // Monitor scroll for sticky header compression
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const displayText = debouncedText || EXAMPLE_TEXT;

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Hero Section */}
        <section className="relative pt-24 md:pt-32 pb-10 md:pb-16 overflow-hidden bg-gradient-to-b from-white to-slate-50/80 dark:from-slate-950 dark:to-slate-900/50">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-200/30 dark:bg-emerald-900/10 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-200/20 dark:bg-teal-900/10 rounded-full blur-3xl -z-10" />

          <div className="container mx-auto px-4 md:px-5 text-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-3 leading-tight">
              Kostenloser Schriftgenerator – <span className="text-emerald-600 dark:text-emerald-400">Texte sofort</span> in schöne Schriftarten ändern
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-lg mx-auto mb-6 text-sm md:text-base animate-fade-in">
              Erstelle sofort stilisierte, ausgefallene und coole Styles mit über 200 Unicode-Schriftarten
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

            <FontSizeSlider value={fontSize} onChange={setFontSize} />
          </div>
        </section>

        {/* Font Sections */}
        <div className="space-y-10 md:space-y-14 py-8">
          {fontSections.map((section, idx) => (
            <LazySection key={section.id} offset={idx < 2 ? '500px' : '200px'}>
              <section id={`${section.id}-tool`} className="scroll-mt-32">
                <div className="container mx-auto px-[16px] md:px-[20px]">
                  <div className="max-w-7xl mx-auto mb-4 pb-1">
                    <h2 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center md:justify-start gap-3">
                      <span className="w-1 h-6 md:h-8 bg-emerald-500 rounded-full" />
                      {section.title}
                    </h2>
                  </div>

                  {/* Render sub-categories if present */}
                  {section.subCategories && section.subCategories.length > 0 ? (
                    <div className="max-w-7xl mx-auto">
                      {/* Horizontal Scroll Tabs - Optimized for touch */}
                      <div className="mb-6 overflow-x-auto no-scrollbar">
                        <div className="flex gap-3 pb-2">
                          {section.subCategories.map((subCat) => (
                            <button
                              key={subCat.id}
                              onClick={() => {
                                const element = document.getElementById(`${section.id}-${subCat.id}`);
                                if (element) {
                                  const offset = 140;
                                  const bodyRect = document.body.getBoundingClientRect().top;
                                  const elementRect = element.getBoundingClientRect().top;
                                  const elementPosition = elementRect - bodyRect;
                                  const offsetPosition = elementPosition - offset;
                                  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                                }
                              }}
                              className="whitespace-nowrap px-5 py-3 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-emerald-500 hover:text-white hover:border-emerald-500 transition-all min-h-[44px]"
                            >
                              {subCat.title}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Sub-category sections */}
                      {section.subCategories.map((subCat) => (
                        <div key={subCat.id} id={`${section.id}-${subCat.id}`} className="mb-6">
                          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">
                            {subCat.title}
                          </h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-4">
                            {subCat.items.map((font) => (
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
                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Render regular items if no sub-categories */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-4 max-w-7xl mx-auto">
                      {section.items.map((font) => (
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
                  )}
                </div>
              </section>
            </LazySection>
          ))}
        </div>

        {/* SEO Content Section */}
        <ContentSection />
      </main>

      {/* Floating Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 z-50 p-3.5 bg-emerald-600 text-white rounded-full shadow-lg shadow-emerald-500/30 hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all group"
      >
        <svg className="w-6 h-6 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>

      <Footer />

      <Toast
        message="Text kopiert!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
