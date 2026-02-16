import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Kontakt | SchriftenPro – Wir freuen uns auf Ihr Feedback',
    description: 'Haben Sie Fragen oder Feedback zu SchriftenPro? Kontaktieren Sie uns hier. Wir freuen uns von Ihnen zu hören!',
};

export default function Kontakt() {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-gray-950">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-800">
                        <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-8">Kontakt</h1>

                        <section className="space-y-8 text-gray-600 dark:text-gray-400 leading-relaxed">
                            <p>
                                Haben Sie Fragen, Anregungen oder technisches Feedback zu unserem Tool? Wir schätzen die Meinung unserer Nutzer sehr und versuchen, <strong>SchriftenPro</strong> ständig zu verbessern.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">E-Mail Support</h3>
                                    <p className="text-sm mb-4">Schreiben Sie uns direkt eine E-Mail. Wir antworten in der Regel innerhalb von 24-48 Stunden.</p>
                                    <a href="mailto:support@schriftenpro.de" className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline">
                                        support@schriftenpro.de
                                    </a>
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-700">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Social Media</h3>
                                    <p className="text-sm mb-4">Folgen Sie uns für Updates oder senden Sie uns eine DM auf unseren Kanälen.</p>
                                    <div className="flex gap-4">
                                        <span className="text-gray-400">Instagram: @schriftenpro</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Häufige Anliegen</h2>
                                <div className="space-y-4">
                                    <details className="group border-b border-gray-100 dark:border-gray-800 pb-4 cursor-pointer">
                                        <summary className="list-none font-bold text-gray-800 dark:text-gray-200 flex justify-between items-center">
                                            <span>Vorschlag für eine neue Schriftart</span>
                                            <span className="group-open:rotate-180 transition-transform">↓</span>
                                        </summary>
                                        <p className="mt-2 text-sm">Senden Sie uns gerne das Beispiel der Schriftart zu. Wir prüfen regelmäßig neue Unicode-Kombinationen.</p>
                                    </details>

                                    <details className="group border-b border-gray-100 dark:border-gray-800 pb-4 cursor-pointer">
                                        <summary className="list-none font-bold text-gray-800 dark:text-gray-200 flex justify-between items-center">
                                            <span>Fehler bei der Darstellung</span>
                                            <span className="group-open:rotate-180 transition-transform">↓</span>
                                        </summary>
                                        <p className="mt-2 text-sm">Bitte geben Sie an, welcher Browser und welches Betriebssystem Sie nutzen, damit wir den Fehler schneller finden können.</p>
                                    </details>
                                </div>
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
