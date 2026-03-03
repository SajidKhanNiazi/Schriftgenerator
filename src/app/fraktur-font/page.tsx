import type { Metadata } from 'next';
import FrakturFontClient from '@/components/FrakturFontClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Fraktur Schrift Generator | Text in gotische Blackletter-Schrift umwandeln',
    description: 'Entdecke Frakturtext und gotische Schriftstile. Erstelle einzigartige Nachrichten, Profile und Benutzernamen mit mittelalterlich inspirierten Unicode-Zeichen sofort.',
    keywords: [
        'Fraktur Schrift',
        'Fraktur Schrift Generator',
        'Gotische Schrift Generator',
        'Blackletter Schrift',
        'Altdeutsche Schrift',
        'Fraktur Text',
        'Fraktur Unicode',
        'Mittelalterliche Schrift Generator',
        'Fraktur kopieren einfügen',
        'Gotischer Text Generator',
    ],
    openGraph: {
        title: 'Fraktur Schrift Generator | Gotischer Blackletter Text Konverter',
        description: 'Verwandle normalen Text in schöne Fraktur-, Gotik- und mittelalterliche Unicode-Stile. Kostenlos, sofort, kein Download nötig.',
        type: 'website',
        locale: 'de_DE',
    },
    alternates: {
        canonical: '/fraktur-font',
    },
};

export default function FrakturFontPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-transparent pt-20 md:pt-24">
                <FrakturFontClient />

                {/* Structured Data for SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebApplication',
                            name: 'Fraktur Schrift Generator',
                            description: 'Verwandle normalen Text sofort in Fraktur-, Gotik- und altdeutsche Blackletter-Unicode-Stile.',
                            applicationCategory: 'UtilitiesApplication',
                            operatingSystem: 'All',
                            offers: {
                                '@type': 'Offer',
                                price: '0',
                                priceCurrency: 'EUR',
                            },
                            inLanguage: 'de',
                        }),
                    }}
                />

            </main>
            <Footer />
        </>
    );
}
