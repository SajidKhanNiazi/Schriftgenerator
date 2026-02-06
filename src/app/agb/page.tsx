import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AGB() {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-gray-950">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-8">Allgemeine Geschäftsbedingungen</h1>

                        <section className="space-y-6 text-gray-600 dark:text-gray-400 leading-relaxed text-sm md:text-base">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">1. Geltungsbereich</h2>
                                <p>Für die Nutzung dieses kostenlosen Online-Tools gelten die nachfolgenden Bedingungen. Durch die Nutzung der Website erklären Sie sich mit diesen Bedingungen einverstanden.</p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">2. Dienstleistungsbeschreibung</h2>
                                <p>Schriftgenerator.de stellt ein kostenloses Tool zur Umwandlung von Texten in Unicode-Schriftarten zur Verfügung. Der Dienst wird ohne Gewähr auf Verfügbarkeit oder Korrektheit der generierten Zeichen bereitgestellt.</p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">3. Urheberrecht</h2>
                                <p>Die Website und ihre Inhalte (Design, Texte, Struktur) sind urheberrechtlich geschützt. Die Nutzung ist nur für private Zwecke gestattet.</p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">4. Haftungsausschluss</h2>
                                <p>Wir übernehmen keine Haftung für Schäden, die durch die Nutzung der generierten Texte auf Drittplattformen (Instagram, WhatsApp etc.) entstehen könnten. Die Kompatibilität der Unicode-Zeichen hängt von der jeweiligen Plattform ab.</p>
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
