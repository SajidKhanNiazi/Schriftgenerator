import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Datenschutz() {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-gray-950">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-8">Datenschutz</h1>

                        <section className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">1. Datenschutz auf einen Blick</h2>
                                <h3 className="text-lg font-bold mb-1">Allgemeine Hinweise</h3>
                                <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">2. Datenerfassung auf dieser Website</h2>
                                <h3 className="text-lg font-bold mb-1">Cookies</h3>
                                <p>Unsere Website verwendet keine Cookies zur Speicherung persönlicher Daten. Wir nutzen lediglich technisch notwendige Browser-Funktionen (LocalStorage), um Ihre Favoriten und letzten Suchen lokal auf Ihrem Gerät zu speichern.</p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">3. Analyse-Tools und Tools von Drittanbietern</h2>
                                <p>Wir verwenden keine Analyse-Tools wie Google Analytics. Ihre Privatsphäre ist uns wichtig.</p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">4. Ihre Rechte</h2>
                                <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen.</p>
                            </div>
                        </section>

                        <Link href="/" className="inline-block mt-12 text-indigo-600 font-bold hover:underline">
                            ← Zurück zur Startseite
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
