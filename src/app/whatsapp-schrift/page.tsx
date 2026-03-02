import type { Metadata } from 'next';
import WhatsAppSchriftClient from '@/components/WhatsAppSchriftClient';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'WhatsApp Schrift Generator | Stylische Schriften für WhatsApp',
    description: 'Kostenloser WhatsApp Schrift Generator: Wandle deinen Text sofort in über 20 stylische Unicode-Schriftarten um. Perfekt für WhatsApp Chats, Status & Bio. Einfach kopieren & einfügen!',
    keywords: [
        'WhatsApp Schrift',
        'WhatsApp Schriftarten',
        'WhatsApp Schrift Generator',
        'WhatsApp Text Schrift',
        'WhatsApp Bio Schrift',
        'WhatsApp Status Schrift',
        'coole WhatsApp Schrift',
        'WhatsApp Schrift kopieren',
        'stylische WhatsApp Schrift',
        'WhatsApp Sonderzeichen',
    ],
    openGraph: {
        title: 'WhatsApp Schrift Generator | Stylische Schriften kopieren & einfügen',
        description: 'Erstelle coole WhatsApp-Schriftarten für Chats, Status und Bio. Kostenlos & einfach zu nutzen.',
        type: 'website',
        locale: 'de_DE',
    },
    alternates: {
        canonical: '/whatsapp-schrift',
    },
};

export default function WhatsAppSchriftPage() {
    return (
        <>
            <Header />
            <main className="min-h-screen bg-slate-50 dark:bg-slate-950 pt-20 md:pt-24">
                <WhatsAppSchriftClient />

                {/* Structured Data for SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebApplication',
                            name: 'WhatsApp Schrift Generator',
                            description: 'Erstelle coole WhatsApp-Schriftarten für Chats, Status und Bio.',
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
