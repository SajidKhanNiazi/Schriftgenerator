import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Schriftgenerator',
        short_name: 'Schriftgen',
        description: 'Kostenloser Online Schriftgenerator für coole Schriften',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#10b981',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/icon.svg',
                sizes: '32x32',
                type: 'image/svg+xml',
            },
        ],
    }
}
