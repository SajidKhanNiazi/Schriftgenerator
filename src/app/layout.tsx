import '@/styles/globals.css'

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
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}
