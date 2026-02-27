import type { Metadata } from 'next';
import InstagramSchriftClient from '@/components/InstagramSchriftClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Instagram Schriftgenerator | Coole Schriftarten für Bio & Name kopieren',
    description: 'Erstelle stylische Instagram-Schriftarten für Bio, Name und Bildunterschriften. Einfach kopieren und einfügen. Kostenlos & ohne Anmeldung.',
    keywords: [
        'Instagram Schrift',
        'Instagram Bio Schrift',
        'coole Instagram Schrift',
        'Instagram Schrift kopieren',
        'Instagram Schriftarten',
        'Instagram Schriftgenerator',
        'Instagram Name Schrift',
        'Instagram Caption Schrift',
        'ästhetische Instagram Schrift',
        'Instagram Story Schrift'
    ],
    openGraph: {
        title: 'Instagram Schriftgenerator | Coole Schriftarten für Bio & Name',
        description: 'Erstelle stylische Instagram-Schriftarten für Bio, Name und Bildunterschriften. Kostenlos & einfach zu nutzen.',
        type: 'website',
        locale: 'de_DE',
    },
    alternates: {
        canonical: '/instagram-schrift',
    },
};

export default function InstagramSchriftPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 md:pt-24">
                <InstagramSchriftClient />

                {/* Structured Data for SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebApplication',
                            name: 'Instagram Schrift Generator',
                            description: 'Kostenloser Instagram Schrift Generator für stylische Bios, Namen und Captions',
                            url: 'https://schriftenpro.de/instagram-schrift',
                            applicationCategory: 'UtilityApplication',
                            operatingSystem: 'Any',
                            offers: {
                                '@type': 'Offer',
                                price: '0',
                                priceCurrency: 'EUR',
                            },
                            inLanguage: 'de-DE',
                        }),
                    }}
                />
            </main>
            <Footer />
        </>
    );
}
