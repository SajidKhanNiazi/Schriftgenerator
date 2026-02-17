import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://schriftenpro.de';
    const lastModified = new Date();

    return [
        {
            url: baseUrl,
            lastModified,
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${baseUrl}/ueber-uns`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/kontakt`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${baseUrl}/impressum`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/datenschutz`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/agb`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.3,
        },
        {
            url: `${baseUrl}/haftungsausschluss`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.3,
        },
    ];
}
