import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/dashboard/',
                    '/therapist-dashboard/',
                    '/admin/',
                    '/_next/',
                    '/private/'
                ],
            },
            {
                userAgent: 'Googlebot',
                allow: '/',
                disallow: [
                    '/api/',
                    '/dashboard/',
                    '/therapist-dashboard/',
                    '/admin/',
                    '/_next/',
                    '/private/'
                ],
            }
        ],
        sitemap: 'https://rozanehclinic.com/sitemap.xml',
        host: 'https://rozanehclinic.com',
    }
}