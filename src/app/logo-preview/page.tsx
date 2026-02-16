import Header from '@/components/Header';
import Footer from '@/components/Footer';

const LogoVariation = ({ title, fontVar, color }: { title: string, fontVar: string, color: string }) => (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center gap-4">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest">{title}</h3>
        <div className="flex items-baseline gap-0.5">
            <span className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 dark:text-white">
                Schrift
            </span>
            <span
                className={`text-4xl md:text-5xl ${color}`}
                style={{ fontFamily: `var(${fontVar})` }}
            >
                generator
            </span>
        </div>
        <p className="text-xs text-gray-400 mt-4">Font: {fontVar.replace('--font-', '')}</p>
    </div>
);

export default function LogoPreview() {
    return (
        <>
            <Header />
            <main className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-gray-950">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Logo-Vorschau</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
                        Hier sind drei Variationen für das neue Branding. Der Kontrast zwischen der klaren serifenlosen Schrift und der künstlerischen Schreibschrift betont die Text-Transformation.
                    </p>

                    <div className="grid grid-cols-1 gap-8">
                        <LogoVariation
                            title="Variation 1: Modern & Bold (Pacifico)"
                            fontVar="--font-pacifico"
                            color="text-emerald-600 dark:text-emerald-400"
                        />
                        <LogoVariation
                            title="Variation 2: Elegant & Classic (Great Vibes)"
                            fontVar="--font-great-vibes"
                            color="text-blue-600 dark:text-blue-400"
                        />
                        <LogoVariation
                            title="Variation 3: Friendly & Modern (Dancing Script)"
                            fontVar="--font-dancing-script"
                            color="text-indigo-600 dark:text-indigo-400"
                        />
                    </div>

                    <div className="mt-16 p-8 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                        <h2 className="text-lg font-bold text-amber-900 dark:text-amber-400 mb-2">Wie gefällt Ihnen das Design?</h2>
                        <p className="text-sm text-amber-800 dark:text-amber-300">
                            Aktuell ist <strong>Variation 1 (Pacifico)</strong> im Header und Footer integriert. Falls Sie eine andere Variation bevorzugen, lassen Sie es mich wissen, und ich passe die Konfiguration sofort an.
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
