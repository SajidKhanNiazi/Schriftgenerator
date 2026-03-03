import '@/styles/globals.css'
import { Inter, Outfit } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata = {
  title: 'Schriftgenerator – Texte online in schöne Schriftarten umwandeln',
  description: 'Kostenloser Schriftgenerator: Wandle deinen Text sofort in über 200 stylische Unicode-Schriftarten um. Perfekt für Instagram, WhatsApp, TikTok & mehr. Einfach kopieren & einfügen!',
  icons: {
    icon: '/icon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className={`dark ${inter.variable} ${outfit.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
