import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/api/'], // Protect your backend
        },
        sitemap: 'https://ibrahimtuition.co.uk/sitemap.xml',
    };
}