'use client';

import React from 'react';

const ContentSection: React.FC = () => {
    return (
        <section className="relative py-16 md:py-24 overflow-hidden bg-white dark:bg-slate-950 bg-mesh-emerald">
            <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-5xl relative z-10">

                {/* 1. EINLEITUNG (Introduction) */}
                <div className="mb-16 md:mb-20 text-center max-w-4xl mx-auto">
                    <div className="space-y-6 text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-[1.6] font-light">
                        <p className="balance-text">
                            Wenn Sie es leid sind, Zeit mit der Suche nach dem besten Schriftstil zu verschwenden, der Ihre Online-Präsenz professionell und <span className="text-slate-900 dark:text-white font-semibold">cool</span> macht, dann ist unser <span className="text-emerald-500 font-bold underline decoration-emerald-500/20 underline-offset-8">kostenloser Schriftgenerator</span> genau das Richtige für Sie.
                        </p>
                    </div>
                </div>

                {/* 2. ANLEITUNG (How to Use) */}
                <div className="mb-20 md:mb-24 relative">
                    <div className="absolute inset-0 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />
                    <div className="glass-premium rounded-[2rem] p-8 md:p-14 border border-slate-200/50 dark:border-slate-800/50 relative overflow-hidden">
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 tracking-tighter leading-tight text-center">
                            Wie nutzt man <span className="text-emerald-500">unseren Schriftgenerator?</span>
                        </h2>
                        <div className="w-16 md:w-20 h-1.5 bg-emerald-500 rounded-full mb-8 md:mb-10 mx-auto" />
                        <p className="text-slate-500 dark:text-slate-400 mb-12 text-center max-w-2xl mx-auto text-base md:text-lg">
                            Unser kostenloses Schriftgenerator-Tool ist kinderleicht zu bedienen, auch wenn Sie kein Experte sind. Mit diesen kurzen Schritten erstellen Sie ganz einfach Ihren individuellen Lieblingsstil.
                        </p>

                        <div className="grid gap-8 md:grid-cols-3">
                            {[
                                { step: "01", title: "Text eingeben", desc: "Geben Sie Ihren Text oben in das <strong>Eingabefeld</strong> ein." },
                                { step: "02", title: "Stil wählen", desc: "Scrollen Sie durch die <strong>Vorschau</strong> und entdecken Sie verschiedene Schriftstile." },
                                { step: "03", title: "Kopieren", desc: "Wählen Sie Ihren Favoriten aus und klicken Sie einfach auf den <strong>Kopieren-Button</strong>." }
                            ].map((item, idx) => (
                                <div key={idx} className="flex flex-col items-center text-center group">
                                    <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-lg font-black text-emerald-500 shadow-xl shadow-emerald-500/10 mb-5 group-hover:scale-110 transition-transform duration-500">
                                        {item.step}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                                        {item.title}
                                    </h3>
                                    <p
                                        className="text-slate-500 dark:text-slate-500 text-sm leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: item.desc }}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-10 pt-10 border-t border-slate-100 dark:border-slate-800/50">
                            <p className="text-slate-400 dark:text-slate-600 text-base md:text-lg italic tracking-wide">
                                Jetzt können Sie mühelos individuelle Schriftstile für jeden Anlass erstellen.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. WARUM DER BESTE (Why Best) */}
                <div className="mb-20 md:mb-24">
                    <div className="flex flex-col md:flex-row items-center gap-10 mb-16 md:mb-20">
                        <div className="flex-1">
                            <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 tracking-tighter leading-tight">
                                Warum ist unser Schriftgenerator <span className="text-emerald-500">der Beste?</span>
                            </h2>
                            <div className="w-16 md:w-20 h-1.5 bg-emerald-500 rounded-full mb-8" />
                            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed font-light">
                                Wenn Sie auf der Suche nach speziellen Schriftstilen für Ihre Social-Media-Accounts wie <strong>Instagram Bio</strong>, <strong>Facebook-Posts</strong>, <strong>TikTok-Videos</strong> oder <strong>Discord-Profile</strong> sind, ist unser Konverter ideal. Wir bieten über <strong>200 verschiedene integrierte Schriften</strong>, die schnell und kostenlos verfügbar sind.
                            </p>
                        </div>
                        <div className="flex-shrink-0 w-32 md:w-1/3 aspect-square glass-premium rounded-[2rem] md:rounded-[3rem] flex items-center justify-center relative group">
                            <div className="absolute inset-3 border border-dashed border-emerald-500/20 rounded-[1.5rem] md:rounded-[2.5rem] group-hover:rotate-6 transition-transform duration-700" />
                            <span className="text-3xl md:text-5xl font-black text-emerald-500">200+</span>
                        </div>
                    </div>

                    <div className="grid gap-12 mb-16 md:mb-20">
                        {/* Vorteile 1 */}
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-8 h-1 bg-emerald-500 rounded-full" />
                                <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Vorteile unseres <span className="text-emerald-500">optimierten Generators</span>
                                </h3>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                                {[
                                    { title: "Speziell für Deutsch", desc: "Dieses Tool wurde speziell für die deutsche Sprache optimiert und unterstützt alle gängigen Sonderzeichen." },
                                    { title: "100% Kostenlos", desc: "Sie können unbegrenzt Texte generieren, ohne Anmeldung und ohne versteckte Kosten." },
                                    { title: "Ideal für Trends", desc: "Influencer nutzen diese Schriften, um ihre Posts und Biografien aus der Masse hervorzuheben." },
                                    { title: "Sofortige Ergebnisse", desc: "Sehen Sie die Vorschau bereits beim Tippen und kopieren Sie Ihren Favoriten mit einem Klick." },
                                    { title: "Mobil-Optimiert", desc: "Alle Schriftstile sind für Mobilgeräte optimiert und nutzen stabiles Unicode." }
                                ].map((item, i) => (
                                    <div key={i} className="p-5 md:p-6 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5">
                                        <span className="block font-bold text-slate-900 dark:text-white mb-2">{item.title}</span>
                                        <span className="text-xs md:text-sm text-slate-500 dark:text-slate-500 leading-relaxed">{item.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Vorteile 2 */}
                        <div>
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-8 h-1 bg-teal-500 rounded-full" />
                                <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                                    Vorteile <span className="text-teal-500">einzigartiger Schriften</span>
                                </h3>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                                {[
                                    { title: "Aufmerksamkeit", desc: "Einzigartige Stile machen Ihre Botschaft attraktiver und helfen, Ihre Reichweite zu steigern." },
                                    { title: "Kreativer Ausdruck", desc: "Verleihen Sie Ihrem Profil eine persönliche Note und stärken Sie Ihre Marke." },
                                    { title: "Mehr Interaktion", desc: "Stilisierte, kursive und coole Schriftarten machen Ihre Nachrichten klarer und interessanter." }
                                ].map((item, i) => (
                                    <div key={i} className="p-5 md:p-6 bg-slate-50/50 dark:bg-slate-900/30 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-900 transition-all duration-300 hover:shadow-xl hover:shadow-teal-500/5">
                                        <span className="block font-bold text-slate-900 dark:text-white mb-2">{item.title}</span>
                                        <span className="text-xs md:text-sm text-slate-500 dark:text-slate-500 leading-relaxed">{item.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. UNICODE ERKLÄRUNG (Unicode Explanation) */}
                <div className="mb-20 md:mb-24 pt-16 md:pt-20 border-t border-slate-100 dark:border-slate-800">
                    <div className="max-w-4xl">
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 tracking-tighter leading-tight">
                            Was bedeutet <span className="text-emerald-500">Unicode?</span>
                        </h2>
                        <div className="w-16 md:w-20 h-1.5 bg-emerald-500 rounded-full mb-8 md:mb-10" />
                        <div className="space-y-6 text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed font-light mb-12 md:mb-16">
                            <p>
                                Unicode ist ein internationaler Kodierungsstandard, der auf Binärzahlen wie 0 und 1 basiert. Im Unicode-System wird jedem Text, jeder Zahl und jedem Symbol ein eindeutiger Code zugewiesen. Dieser Standard stellt sicher, dass alle Geräte weltweit die gleichen Funktionen für Texte und Symbole interpretieren können.
                            </p>
                        </div>

                        <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-4 md:mb-6 tracking-tight leading-tight">
                            Warum sind Unicode-Schriften <span className="text-teal-500">so beliebt?</span>
                        </h3>
                        <div className="w-10 md:w-12 h-1 bg-teal-500/50 rounded-full mb-6 md:mb-8" />
                        <div className="space-y-6 text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed font-light">
                            <p>
                                Unicode ist ein universelles System für Texte, das dafür sorgt, dass jeder Buchstabe auf allen Geräten und in allen Sprachen <span className="text-slate-900 dark:text-white font-medium">sofort korrekt hervorgehoben</span> wird.
                            </p>
                            <p>
                                Wenn wir stilisierte Schriften kopieren und einfügen, geschieht dies im Hintergrund über Unicode. Jeder Buchstabe hat einen spezifischen Code, der beim Kopieren mitgenommen wird.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 5. WARUM UNS WÄHLEN (Why Choose Us) */}
                <div className="mb-20 md:mb-24 relative">
                    <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
                    <div className="glass-premium rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 border border-slate-200/50 dark:border-slate-800/50 relative overflow-hidden">
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 tracking-tighter leading-tight text-center">
                            Warum sollten Sie <span className="text-emerald-500">unseren Schriftgenerator wählen?</span>
                        </h2>
                        <div className="w-16 md:w-20 h-1.5 bg-emerald-500 rounded-full mb-10 md:mb-14 mx-auto" />

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                { title: "Anpassbar", desc: "Unser Generator ist ideal für Ihre Markenwerbung auf Instagram, Facebook und TikTok mit individuellen Texten." },
                                { title: "Keine Installation", desc: "Nutzen Sie den Konverter direkt im Browser, ohne Downloads oder Installationen von Apps oder Erweiterungen." },
                                { title: "Flexibilität", desc: "Alle Schriftstile funktionieren reibungslos auf allen Online-Plattformen ohne Darstellungsfehler." },
                                { title: "Riesige Auswahl", desc: "Entdecken Sie elegante, coole, handschriftliche und ästhetische Schriftarten in einer riesigen Vielfalt." },
                                { title: "Ein-Klick Kopieren", desc: "Kopieren und fügen Sie Texte mühelos mit nur einem Klick in das gewünschte Feld ein." }
                            ].map((item, idx) => (
                                <div key={idx} className="p-6 md:p-8 bg-white/50 dark:bg-slate-900/50 rounded-2xl md:rounded-[2rem] border border-slate-200/30 dark:border-slate-800/30 hover:border-emerald-500/30 transition-all duration-500 hover:glow-shadow-emerald group">
                                    <h3 className="text-base md:text-lg font-black text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full group-hover:scale-150 transition-transform" />
                                        {item.title}
                                    </h3>
                                    <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 6. EINSATZBEREICHE (Where to Use) */}
                <div className="mb-20 md:mb-24">
                    <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 tracking-tighter leading-tight">
                        Wo können Sie <span className="text-emerald-500">diese Schriften nutzen?</span>
                    </h2>
                    <div className="w-16 md:w-20 h-1.5 bg-emerald-500 rounded-full mb-8" />
                    <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed mb-10 md:mb-12 max-w-4xl">
                        Stilisierte Schriften verbessern Ihre Präsenz in der digitalen Kommunikation. Sie machen Inhalte lesbarer und geben ihnen eine klare Struktur.
                    </p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { name: "Instagram", desc: "Bio, Bildunterschriften und Posts." },
                            { name: "TikTok", desc: "Bio, Bilder und Videos." },
                            { name: "WhatsApp", desc: "Chats und Status-Meldungen." },
                            { name: "Facebook", desc: "Beiträge und Kommentare." },
                            { name: "Discord", desc: "Server-Namen und Bio." },
                            { name: "Twitter", desc: "Tweets und Profil-Infos." },
                            { name: "PUBG", desc: "Benutzername und Bio." }
                        ].map((platform, i) => (
                            <div key={i} className="group p-5 md:p-6 glass-premium rounded-2xl md:rounded-3xl border border-slate-200/50 dark:border-slate-800/50 hover:border-emerald-500/40 transition-all duration-500 hover:scale-[1.02]">
                                <h3 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-1 group-hover:text-emerald-500 transition-colors">{platform.name}</h3>
                                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-500 leading-snug">{platform.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 7. ABSCHLUSS (Final CTA) */}
                <div className="relative mb-20 md:mb-24">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
                    <div className="pt-16 md:pt-20 text-center max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 tracking-tighter text-balance leading-tight">
                            Jetzt ausprobieren und <span className="text-emerald-500 underline decoration-emerald-500/20 underline-offset-[8px]">auffallen!</span>
                        </h2>
                        <div className="w-16 md:w-20 h-1.5 bg-emerald-500 rounded-full mb-8 md:mb-10 mx-auto" />
                        <div className="space-y-6 text-slate-600 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed">
                            <p>
                                Mit unserem kostenlosen Online-Schriftgenerator müssen Sie kein Abonnement abschließen. Konvertieren Sie alle wichtigen Texte und gestalten Sie Ihr Profil oder Ihre Beiträge inspirierend und außergewöhnlich.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 8. FAQs SECTION */}
                <div className="mb-10 md:mb-16">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 tracking-tighter leading-none">
                            <span className="text-emerald-500">Häufig gestellte Fragen (FAQs)</span>
                        </h2>
                        <div className="w-16 md:w-20 h-1.5 bg-emerald-500 rounded-full mx-auto" />
                    </div>

                    <div className="grid gap-5 md:gap-6 md:grid-cols-2 max-w-6xl mx-auto">
                        {[
                            {
                                q: "Ist der Schriftgenerator sicher?",
                                a: "Die meisten Schriftgeneratoren sind für die persönliche Nutzung sicher. Sie basieren auf Unicode-Zeichen. Wenn Sie ein vertrauenswürdiges Tool nutzen, ist dies absolut unbedenklich."
                            },
                            {
                                q: "Was ist der beste Schriftgenerator?",
                                a: "Der beste Generator ist derjenige, der Ihre Anforderungen erfüllt. Unser Generator bietet über 200 Stile ohne Download und mit einfachem Kopieren und Einfügen."
                            },
                            {
                                q: "Was ist ein Fancy-Text-Generator?",
                                a: "Es ist ein Tool, das normalen Text in stilisierte, dekorative und auffällige Schriftarten umwandelt."
                            },
                            {
                                q: "Ist der Fancy-Text-Generator komplett kostenlos?",
                                a: "Ja, Sie können ihn völlig kostenlos und ohne versteckte Gebühren nutzen."
                            },
                            {
                                q: "Behalten die Schriften beim Einfügen ihr Aussehen?",
                                a: "Ja, dank Unicode-Zeichen behalten alle Schriften ihre Formatierung sicher bei, wenn sie kopiert und eingefügt werden."
                            },
                            {
                                q: "Muss ich ein Konto erstellen?",
                                a: "Nein, Sie können diesen Generator ohne Anmeldung nutzen. Geben Sie einfach Ihren Text ein und kopieren Sie die gewünschte Schrift."
                            }
                        ].map((faq, i) => (
                            <div key={i} className="p-6 md:p-8 glass-premium rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-200/50 dark:border-slate-800/50 hover:border-emerald-500/30 transition-all duration-500 group">
                                <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-3 md:mb-4 group-hover:text-emerald-500 transition-colors">
                                    {faq.q}
                                </h3>
                                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                                    {faq.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ContentSection;
