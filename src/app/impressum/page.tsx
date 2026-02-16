import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Impressum() {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-gray-950">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-8">Impressum</h1>

                        <section className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Angaben gemäß § 5 TMG</h2>
                                <p>Schriftgenerator<br />
                                    Friedrichstraße 1<br />
                                    10117 Berlin</p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Kontakt</h2>
                                <p>E-Mail: kontakt@schriftgenerator.de</p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                                <p>Schriftgenerator Team<br />
                                    Friedrichstraße 1<br />
                                    10117 Berlin</p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Haftung für Inhalte</h2>
                                <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Urheberrecht</h2>
                                <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
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
