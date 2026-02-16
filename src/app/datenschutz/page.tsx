import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Datenschutz | Datenschutzerklärung – Schriftgenerator',
    description: 'Informationen darüber, wie Schriftgenerator mit Ihren Daten umgeht.',
};

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
                                <h3 className="text-lg font-bold mb-1">General Notes</h3>
                                <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie der unter diesem Text aufgeführten Datenschutzerklärung.</p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">2. Datenerfassung auf dieser Website</h2>
                                <h3 className="text-lg font-bold mb-1">Server-Log-Dateien</h3>
                                <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse. Diese Daten werden nicht mit anderen Datenquellen zusammengeführt.</p>

                                <h3 className="text-lg font-bold mt-4 mb-1">LocalStorage</h3>
                                <p>Wir verwenden die LocalStorage-Funktion Ihres Browsers, um Ihre zuletzt generierten Schriften oder Favoriten lokal auf Ihrem Gerät zu speichern. Diese Daten werden nicht an unsere Server übertragen und verbleiben ausschließlich auf Ihrem Endgerät.</p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">3. Drittanbieter-Tools</h2>
                                <p>Wir verzichten bewusst auf Tracking-Tools wie Google Analytics. Zur Finanzierung des kostenlosen Angebots können jedoch Werbeanzeigen von Drittanbietern geschaltet werden, die eigene Cookies oder vergleichbare Technologien verwenden können.</p>
                            </div>

                            <div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">4. Ihre Rechte</h2>
                                <p>Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.</p>
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
