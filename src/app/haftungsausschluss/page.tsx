import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Haftungsausschluss | SchriftenPro – Rechtliche Hinweise',
    description: 'Wichtige rechtliche Hinweise zur Nutzung von SchriftenPro.de und der Haftung für generierte Inhalte.',
};

export default function Haftungsausschluss() {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-gray-950">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-8">Haftungsausschluss (Disclaimer)</h1>

                        <section className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">1. Haftung für Inhalte</h2>
                                <p>
                                    Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">2. Haftung für generierte Texte</h2>
                                <p>
                                    <strong>SchriftenPro.de</strong> stellt lediglich ein technisches Werkzeug zur Umwandlung von Texten in Unicode-Zeichen zur Verfügung. Wir übernehmen keine Verantwortung für die Art und Weise, wie Nutzer diese Texte verwenden oder auf welchen Plattformen sie veröffentlicht werden. Insbesondere haften wir nicht für Verstöße gegen die Nutzungsbedingungen von Drittplattformen (z. B. Instagram, Facebook, TikTok) oder für rechtliche Konsequenzen, die aus der Verwendung der generierten Texte resultieren könnten.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">3. Haftung für Links</h2>
                                <p>
                                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">4. Kompatibilität</h2>
                                <p>
                                    Wir bemühen uns um eine hohe Kompatibilität der generierten Unicode-Schriften. Da die Darstellung jedoch von der Software und Hardware des Empfängers abhängt, garantieren wir keine fehlerfreie Anzeige auf allen Geräten oder Plattformen.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">5. Urheberrecht</h2>
                                <p>
                                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterlegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                                </p>
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
