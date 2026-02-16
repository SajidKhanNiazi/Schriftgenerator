import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Über uns | Schriftgenerator – Unsere Mission & Expertise',
    description: 'Erfahren Sie mehr über Schriftgenerator. Wer wir sind, warum wir dieses Tool entwickelt haben und wie wir Ihnen helfen, Ihre Social Media Texte zu verschönern.',
};

export default function UberUns() {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-gray-950">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-8">Über uns</h1>

                        <section className="space-y-8 text-gray-600 dark:text-gray-400 leading-relaxed">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Unsere Mission</h2>
                                <p>
                                    Willkommen bei <strong>Schriftgenerator</strong>! Wir sind leidenschaftliche Entwickler und Social-Media-Enthusiasten, die es sich zum Ziel gesetzt haben, die digitale Kommunikation kreativer und individueller zu gestalten.
                                </p>
                                <p className="mt-4">
                                    In einer Welt voller Standard-Schriftarten bieten wir Ihnen die Möglichkeit, aus der Masse herauszustechen. Ob für Instagram, WhatsApp, TikTok oder andere Plattformen – unser Tool hilft Ihnen dabei, Ihren Texten eine persönliche Note zu verleihen.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Warum Schriftgenerator?</h2>
                                <p>
                                    Wir wissen, wie wichtig der erste Eindruck in sozialen Netzwerken ist. Eine besondere Schriftart in der Bio oder ein auffälliger Kommentar kann den entscheidenden Unterschied machen. Deshalb haben wir einen Generator entwickelt, der:
                                </p>
                                <ul className="list-disc pl-6 mt-4 space-y-2">
                                    <li><strong>Einfach zu bedienen ist:</strong> Kein technisches Vorwissen nötig.</li>
                                    <li><strong>100% kostenlos bleibt:</strong> Alle Funktionen stehen Ihnen ohne Anmeldung zur Verfügung.</li>
                                    <li><strong>Schnell und zuverlässig funktioniert:</strong> Dank modernster Web-Technologien.</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Unsere Expertise (EEAT)</h2>
                                <p>
                                    Hinter diesem Projekt steht jahrelange Erfahrung in der Webentwicklung und im UI/UX-Design. Wir legen großen Wert auf die Sicherheit und Privatsphäre unserer Nutzer. Unser Tool basiert auf dem Unicode-Standard, was eine maximale Kompatibilität über verschiedene Geräte und Apps hinweg gewährleistet.
                                </p>
                            </div>

                            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                                <h3 className="text-xl font-bold text-emerald-900 dark:text-emerald-400 mb-2">Jetzt ausprobieren!</h3>
                                <p className="text-emerald-800 dark:text-emerald-300">
                                    Bereit, Ihre Texte zu verwandeln? Gehen Sie zurück zur Startseite und entdecken Sie über 200 verschiedene Schrifttypen.
                                </p>
                                <Link href="/" className="inline-block mt-4 bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20">
                                    Tool jetzt testen
                                </Link>
                            </div>
                        </section>

                        <Link href="/" className="inline-block mt-12 text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
                            ← Zurück zur Startseite
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
