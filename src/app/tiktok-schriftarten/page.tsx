import type { Metadata } from 'next';
import TikTokSchriftClient from '@/components/TikTokSchriftClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'TikTok Schriftarten Generator | Stylische Schriften kopieren & einfügen',
    description: 'Erstelle coole TikTok-Schriftarten für Bio, Benutzername und Videos. Über 25 Schriftstile zum sofort Kopieren und Einfügen. Kostenlos & ohne Anmeldung.',
    keywords: [
        'TikTok Schriftarten',
        'TikTok Schrift',
        'TikTok Bio Schrift',
        'coole TikTok Schrift',
        'TikTok Schrift kopieren',
        'TikTok Schriftgenerator',
        'TikTok Name Schrift',
        'TikTok Benutzername Schrift',
        'ästhetische TikTok Schrift',
        'stylische TikTok Schriftarten'
    ],
    openGraph: {
        title: 'TikTok Schriftarten Generator | Stylische Schriften kopieren & einfügen',
        description: 'Erstelle coole TikTok-Schriftarten für Bio, Benutzername und Videos. Kostenlos & einfach zu nutzen.',
        type: 'website',
        locale: 'de_DE',
    },
    alternates: {
        canonical: '/tiktok-schriftarten',
    },
};

export default function TikTokSchriftartenPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 md:pt-24">
                <TikTokSchriftClient />

                {/* Structured Data for SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebApplication',
                            name: 'TikTok Schriftarten Generator',
                            description: 'Erstelle coole TikTok-Schriftarten für Bio, Benutzername und Videos.',
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
