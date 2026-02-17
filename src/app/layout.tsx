import type { Metadata, Viewport } from 'next';
import { Inter, Pacifico, Great_Vibes, Dancing_Script } from 'next/font/google';
import '../styles/globals.css';

// Configure Inter with system font fallbacks
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
});

// Configure Pacifico with cursive fallbacks
const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
  fallback: ['cursive', 'Comic Sans MS', 'Apple Chancery', 'Bradley Hand', 'sans-serif'],
});

// Configure Great Vibes with elegant script fallbacks
const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-great-vibes',
  fallback: ['cursive', 'Brush Script MT', 'Lucida Handwriting', 'Apple Chancery', 'sans-serif'],
});

// Configure Dancing Script with handwriting fallbacks
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dancing-script',
  fallback: ['cursive', 'Bradley Hand', 'Brush Script MT', 'Lucida Handwriting', 'sans-serif'],
});

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#1e1b4b' },
  ],
};

// Enhanced SEO metadata
export const metadata: Metadata = {
  title: {
    default: 'Kostenloser Schriftgenerator – Texte sofort ändern',
    template: '%s | Schriftgenerator',
  },
  description: 'Erstelle sofort stilisierte, ausgefallene und coole Styles mit über 200 Unicode-Schriftarten. Perfekt für Instagram Bio, WhatsApp Status, TikTok Namen. Keine Installation, 100% kostenlos!',
  keywords: [
    'SchriftenPro',
    'Instagram Schrifttyp',
    'WhatsApp Schriften',
    'TikTok Schriften',
    'Schrift umwandeln',
    'Text in Schrift umwandeln',
    'Unicode Schriftarten',
    'Instagram Bio Schrift',
    'WhatsApp Status Schrift',
    'Fancy Schrift Generator',
    'Kursive Schrift',
    'Fette Schrift',
    'Coole Schriftarten',
    'Text Generator',
  ],
  authors: [{ name: 'SchriftenPro' }],
  creator: 'SchriftenPro',
  publisher: 'SchriftenPro',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://schriftenpro.de'),
  alternates: {
    canonical: '/',
    languages: {
      'de-DE': '/',
    },
  },
  openGraph: {
    title: 'Kostenloser Schriftgenerator – 200+ Schriftarten kostenlos',
    description: 'Wandle deinen Text in stylische Schriftarten um. Perfekt für Instagram, WhatsApp, TikTok. Kostenlos & sofort nutzbar!',
    url: 'https://schriftenpro.de',
    siteName: 'SchriftenPro',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SchriftenPro - Texte in stylische Schriftarten umwandeln',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kostenloser Schriftgenerator – 200+ Schriftarten kostenlos',
    description: 'Wandle deinen Text in stylische Schriftarten um. Kostenlos!',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${inter.variable} ${pacifico.variable} ${greatVibes.variable} ${dancingScript.variable}`}>
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Structured Data - WebApplication */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Schriftgenerator',
              description: 'Kostenlose Online-Schriften für Instagram, WhatsApp und TikTok. Über 200 Unicode-Schriftarten verfügbar.',
              url: 'https://schriftgenerator.de',
              applicationCategory: 'UtilityApplication',
              operatingSystem: 'Web Browser',
              browserRequirements: 'Requires JavaScript',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'EUR',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                ratingCount: '2847',
                bestRating: '5',
                worstRating: '1',
              },
              featureList: [
                '50+ Schriftarten',
                'Instagram Schriften',
                'WhatsApp Schriften',
                'TikTok Schriften',
                'Fette Schrift',
                'Kursive Schrift',
                'Fancy Schrift',
              ],
            }),
          }}
        />

        {/* Structured Data - FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Ist der Schriftgenerator wirklich kostenlos?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Ja, 100% kostenlos! Keine Registrierung, keine versteckten Kosten. Alle 50+ Schriftarten stehen dir unbegrenzt zur Verfügung.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Funktionieren die Schriften auf Instagram?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Ja! Unsere Unicode-Schriften funktionieren auf Instagram (Bio, Posts, Stories, Kommentare), WhatsApp, TikTok, Facebook, Twitter und praktisch jeder anderen Plattform.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Muss ich eine App installieren?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Nein, unser Schriftgenerator funktioniert direkt im Browser — auf dem Handy und am Computer. Einfach diese Seite öffnen, Text eingeben und los gehts.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Kann ich deutsche Umlaute verwenden?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Die meisten Schriftarten unterstützen ä, ö, ü und ß. Bei einigen speziellen Unicode-Fonts werden Umlaute als normale Buchstaben angezeigt.',
                  },
                },
              ],
            }),
          }}
        />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Schriftgenerator',
              url: 'https://schriftgenerator.de',
              logo: 'https://schriftgenerator.de/logo.png',
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
