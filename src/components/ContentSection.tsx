'use client';

import React from 'react';
import Link from 'next/link';

const ContentSection: React.FC = () => {
    return (
        <section className="relative py-16 md:py-24 overflow-hidden bg-white dark:bg-slate-950 bg-mesh-emerald">
            <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-5xl relative z-10">
                {/* 1. EINLEITUNG (Introduction) */}
                <div className="mb-16 md:mb-20 text-center max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
                        Professionelle Instagram Schriftarten
                    </h2>
                    <div className="space-y-6 text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-[1.6] font-light">
                        <p className="balance-text">
                            Wenn du nach Schriftarten suchst, die dein Instagram-Profil professionell und cool aussehen lassen, nutze unseren <Link href="/instagram-schrift" className="text-emerald-500 font-semibold hover:underline">Instagram Schriftgenerator</Link>. Du kannst verschiedene Schriftarten erzeugen, die du ganz einfach kopieren und überall einfügen kannst. Stylische Schriften machen deine Instagram-Bio und deine Bildunterschriften attraktiver und ansprechender.
                        </p>
                    </div>
                </div>

                {/* 2. ANLEITUNG (How to Use) */}
                <div className="mb-20 md:mb-24 relative">
                    <div className="absolute inset-0 bg-emerald-500/5 blur-[80px] rounded-full pointer-events-none" />
                    <div className="glass-premium rounded-[2rem] p-8 md:p-14 border border-slate-200/50 dark:border-slate-800/50 relative overflow-hidden">
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 tracking-tighter leading-tight text-center">
                            So benutzt du den <span className="text-emerald-500">Instagram Schriftgenerator</span>
                        </h2>
                        <div className="w-16 md:w-20 h-1.5 bg-emerald-500 rounded-full mb-8 md:mb-10 mx-auto" />
                        <p className="text-slate-500 dark:text-slate-400 mb-12 text-center max-w-2xl mx-auto text-base md:text-lg">
                            Mit diesen einfachen Schritten kannst du im Handumdrehen eine individuelle Schriftart für deine Bedürfnisse erstellen.
                        </p>

                        <div className="grid gap-8 md:grid-cols-3">
                            {[
                                { step: "01", title: "Text eingeben", desc: "Schritt 1: Gib deinen Text in das <strong>Eingabefeld</strong> ein, dessen Schriftstil du ändern möchtest." },
                                { step: "02", title: "Stile durchstöbern", desc: "Schritt 2: Durchstöbere die Liste der <strong>Schriftarten</strong>, die unser Instagram Schriftgenerator für dich erzeugt hat." },
                                { step: "03", title: "Kopieren & Einfügen", desc: "Schritt 3: Wähle deinen Lieblings-Schriftstil aus der Liste und <strong>kopiere und füge ihn</strong> in dein gewünschtes Feld ein – so wird deine Instagram-Bio einzigartig." }
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
                                Jetzt kannst du individuelle Schriftarten für deine Bedürfnisse erstellen.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 3. FOLLOWER GEWINNEN (Why Best) */}
                <div className="mb-20 md:mb-24">
                    <div className="flex flex-col md:flex-row items-center gap-10 mb-16 md:mb-20">
                        <div className="flex-1">
                            <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 tracking-tighter leading-tight">
                                Gewinne Follower mit dem <span className="text-emerald-500">Instagram Textgenerator</span>
                            </h2>
                            <div className="w-16 md:w-20 h-1.5 bg-emerald-500 rounded-full mb-8" />
                            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed font-light">
                                Mit unserem kostenlosen Instagram Schriftgenerator kannst du stilvolle Texte und auffällige Schriften erstellen – ohne Software oder Apps herunterladen zu müssen. Nutze diese Schriftarten in deiner Instagram-Bio und deinen Beiträgen, um dein Profil attraktiver und besser zu gestalten.
                            </p>

                            {/* Static Growth Visual */}
                            <div className="mt-8 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800">
                                <img src="/images/growth-visual.svg" alt="Instagram Wachstum" className="w-full h-auto" />
                            </div>
                        </div>
                        <div className="flex-shrink-0 w-32 md:w-1/3 aspect-square glass-premium rounded-[2rem] md:rounded-[3rem] flex items-center justify-center relative group">
                            <div className="absolute inset-3 border border-dashed border-emerald-500/20 rounded-[1.5rem] md:rounded-[2.5rem] group-hover:rotate-6 transition-transform duration-700" />
                            <span className="text-3xl md:text-5xl font-black text-emerald-500">Gratis</span>
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
                                    { title: "Optimiert für Genauigkeit", desc: "Dieses Tool ist speziell für alle Sprachen optimiert und unterstützt alle gängigen Sonderzeichen." },
                                    { title: "100% Kostenlos", desc: "Du kannst unbegrenzt Texte generieren – ohne Anmeldung und ohne versteckte Kosten." },
                                    { title: "Ideal für Trends", desc: "Influencer nutzen diese Schriften, um ihre Beiträge und Bios von der Masse abzuheben." },
                                    { title: "Sofortige Ergebnisse", desc: "Sieh die Vorschau während du tippst und kopiere deine Favoriten mit einem einzigen Klick." },
                                    { title: "Mobiloptimiert", desc: "Alle Schriftarten sind für mobile Geräte optimiert und nutzen stabile Unicode-Standards." }
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
                                    Vorteile von <span className="text-teal-500">einzigartigen Schriften</span>
                                </h3>
                            </div>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                                {[
                                    { title: "Aufmerksamkeit erregen", desc: "Einzigartige Stile machen deine Nachrichten attraktiver und helfen, deine Reichweite zu erhöhen." },
                                    { title: "Kreativer Ausdruck", desc: "Verleihe deinem Profil eine persönliche Note und stärke deine digitale Marke." },
                                    { title: "Mehr Interaktion", desc: "Stilisierte, kursive und coole Schriften machen deine Nachrichten auffälliger und interessanter." }
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
                            Unicode <span className="text-emerald-500">Schriftgenerator</span>
                        </h2>
                        <div className="w-16 md:w-20 h-1.5 bg-emerald-500 rounded-full mb-8 md:mb-10" />
                        <div className="space-y-6 text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed font-light mb-12 md:mb-16">
                            <p>
                                <a href="https://unicode.org" target="_blank" rel="noopener noreferrer" className="text-emerald-500 font-semibold hover:underline">Unicode</a> ist ein internationaler Codierungsstandard, der verwendet wird, um Wörtern, Zeichen, Zahlen und Symbolen feste Zeichenwerte zuzuweisen. Sobald du den Text eingibst, erstellt das Tool verschiedene Unicode-Schriftarten, die du auf jeder Online-Plattform verwenden kannst.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 5. WARUM UNS WÄHLEN (Why Choose Us) */}
                <div className="mb-20 md:mb-24 relative">
                    <div className="absolute inset-0 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none" />
                    <div className="glass-premium rounded-[2rem] md:rounded-[3rem] p-8 md:p-14 border border-slate-200/50 dark:border-slate-800/50 relative overflow-hidden">
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 tracking-tighter leading-tight text-center">
                            Warum unseren <span className="text-emerald-500">kostenlosen Instagram Schriftgenerator wählen?</span>
                        </h2>
                        <div className="w-16 md:w-20 h-1.5 bg-emerald-500 rounded-full mb-10 md:mb-14 mx-auto" />

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                { title: "Anpassbar", desc: "Leicht anpassbar für deine Markenwerbung in Instagram-Posts und Bildunterschriften mit individuellen Schrifttexten." },
                                { title: "Keine Installation", desc: "Du kannst Instagram-Schriften direkt online auf der Website ändern, ohne eine App oder Erweiterung herunterzuladen." },
                                { title: "Riesige Auswahl", desc: "Unser Tool bietet alle bekannten Schriftarten in allen Varianten. Durchsuche elegante, coole, stilisierte, handgeschriebene, kleine und ästhetische Schriftarten." },
                                { title: "Kopieren mit einem Klick", desc: "Du kannst Text mühelos kopieren und einfügen mit unserem Instagram Schriftgenerator." },
                                { title: "Kostenlos nutzbar", desc: "Du kannst unbegrenzt Texte generieren, ohne etwas zu bezahlen." },
                                { title: "Mobilfreundlich", desc: "Alle Schriftarten sind vollständig für Mobilgeräte optimiert und passen sich auf allen Geräten an." }
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

                {/* 6. WO FINDE ICH COOLE SCHRIFTEN (Where to Use) */}
                <div className="mb-20 md:mb-24">
                    <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 tracking-tighter leading-tight">
                        Wo finde ich <span className="text-emerald-500">coole Schriften für Instagram?</span>
                    </h2>
                    <div className="w-16 md:w-20 h-1.5 bg-emerald-500 rounded-full mb-8" />
                    <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed mb-10 md:mb-12 max-w-4xl">
                        Die Hauptfunktion unseres Tools ist es, Instagram-Schriften zu ändern – aber du kannst diese Schriften auch auf allen sozialen Medien nutzen. Unser Tool kann verschiedene coole und stylische Schriften erzeugen, die du auf jeder Website verwenden kannst. Damit kannst du deine Instagram-Reichweite erhöhen.
                    </p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {[
                            { name: "Instagram", desc: "Bio, Bildunterschriften und Beiträge.", url: "https://www.instagram.com" },
                            { name: "TikTok", desc: "Bio, Bilder und Videos.", url: "https://www.tiktok.com" },
                            { name: "WhatsApp", desc: "Chats und Statusmeldungen.", url: "https://www.whatsapp.com" },
                            { name: "Facebook", desc: "Beiträge und Kommentare.", url: "https://www.facebook.com" },
                            { name: "Discord", desc: "Servernamen und Bio.", url: "https://discord.com" },
                            { name: "Twitter", desc: "Tweets und Profilinformationen.", url: "https://twitter.com" },
                            { name: "PUBG", desc: "Benutzername und Bio.", url: "https://www.pubg.com" }
                        ].map((platform, i) => (
                            <a href={platform.url} key={i} target="_blank" rel="noopener noreferrer" className="group p-5 md:p-6 glass-premium rounded-2xl md:rounded-3xl border border-slate-200/50 dark:border-slate-800/50 hover:border-emerald-500/40 transition-all duration-500 hover:scale-[1.02] block">
                                <h3 className="font-bold text-sm md:text-base text-slate-900 dark:text-white mb-1 group-hover:text-emerald-500 transition-colors">{platform.name}</h3>
                                <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-500 leading-snug">{platform.desc}</p>
                            </a>
                        ))}
                    </div>
                </div>

                {/* 7. ZUSÄTZLICHE SEO-ABSCHNITTE */}
                <div className="mb-20 md:mb-24 space-y-20 md:space-y-24">
                    <div className="max-w-4xl">
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 tracking-tighter leading-tight">
                            Wie wähle ich die <span className="text-emerald-500">richtige Instagram-Schrift?</span>
                        </h2>
                        <div className="w-16 md:w-20 h-1.5 bg-emerald-500 rounded-full mb-8 md:mb-10" />
                        <div className="space-y-6 text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed font-light">
                            <p>
                                Bevor du eine Schriftart für Instagram wählst, schau dir dein Publikum an. Du kannst eine Schriftart wählen, die zu deinem Publikum passt, und diese an deinen Beitrag anpassen. Ästhetische, Kalligrafie-, Dekorative und Handschrift-Schriften werden am häufigsten für Instagram verwendet.
                            </p>
                        </div>
                    </div>

                    <div className="max-w-4xl pt-16 md:pt-20 border-t border-slate-100 dark:border-slate-800">
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 tracking-tighter leading-tight">
                            Warum Instagram-Schriften und <span className="text-teal-500">ungewöhnliche Schriften in Bios und Bildunterschriften verwenden?</span>
                        </h2>
                        <div className="w-16 md:w-20 h-1.5 bg-teal-500 rounded-full mb-8 md:mb-10" />
                        <div className="space-y-6 text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed font-light">
                            <p>
                                Die Verwendung von Instagram-Schriften und ungewöhnlichen Textstilen in Bios und Bildunterschriften hilft deinem Profil, sich in einem überfüllten Feed abzuheben. Wenn die meisten Nutzer in der Standardschrift schreiben, fällt eine stylische oder einzigartige Schrift sofort auf und lässt die Menschen beim Scrollen innehalten.
                            </p>
                            <p>
                                Diese zusätzliche Aufmerksamkeit kann Profilbesuche, Engagement und Follower erhöhen. Kreative Schriften helfen auch, Persönlichkeit auszudrücken und das Branding zu stärken.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 8. ABSCHLUSS (Final CTA) */}
                <div className="relative mb-20 md:mb-24">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
                    <div className="pt-16 md:pt-20 text-center max-w-4xl mx-auto">
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 tracking-tighter text-balance leading-tight">
                            Probiere es jetzt aus und <span className="text-emerald-500 underline decoration-emerald-500/20 underline-offset-[8px]">hebe dich ab!</span>
                        </h2>
                        <div className="w-16 md:w-20 h-1.5 bg-emerald-500 rounded-full mb-8 md:mb-10 mx-auto" />
                        <div className="space-y-6 text-slate-600 dark:text-slate-400 text-base md:text-lg font-light leading-relaxed">
                            <p>
                                Mit unserem kostenlosen Online-Schriftgenerator brauchst du kein Abo abzuschließen. Wandle all deine wichtigen Texte um und mache dein Profil oder deine Beiträge inspirierend und außergewöhnlich.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 9. FAQ-BEREICH */}
                <div className="mb-10 md:mb-16">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-6 md:mb-8 tracking-tighter leading-none">
                            Instagram Schriftgenerator – <span className="text-emerald-500">Häufig gestellte Fragen (FAQ)</span>
                        </h2>
                        <div className="w-16 md:w-20 h-1.5 bg-emerald-500 rounded-full mx-auto" />
                    </div>

                    <div className="grid gap-5 md:gap-6 md:grid-cols-2 max-w-6xl mx-auto">
                        {[
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
