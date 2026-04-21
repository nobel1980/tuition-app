import { Metadata } from 'next';

export const constructMetadata = (title: string, description: string): Metadata => ({
    title: `${title} | Ibrahim Tuition`,
    description,
    icons: { icon: '/favicon.ico' },
    openGraph: {
        title,
        description,
        images: [{ url: '/og-image.png' }]
    }
});