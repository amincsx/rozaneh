import Head from 'next/head'

interface SEOProps {
    title: string
    description: string
    canonical?: string
    image?: string
    type?: 'website' | 'article' | 'profile'
    published?: string
    modified?: string
    keywords?: string[]
    author?: string
    structuredData?: object
}

export default function SEO({
    title,
    description,
    canonical,
    image = '/rozaneh pics/1.webp',
    type = 'website',
    published,
    modified,
    keywords = [],
    author = 'کلینیک روزنه',
    structuredData
}: SEOProps) {
    const siteName = 'کلینیک روانشناسی روزنه'
    const siteUrl = 'https://rozaneh.com'

    return (
        <Head>
            {/* Basic Meta Tags */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="author" content={author} />
            {keywords.length > 0 && (
                <meta name="keywords" content={keywords.join(', ')} />
            )}

            {/* Canonical URL */}
            {canonical && <link rel="canonical" href={canonical} />}

            {/* Open Graph */}
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:url" content={canonical || siteUrl} />
            <meta property="og:image" content={image.startsWith('http') ? image : `${siteUrl}${image}`} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:locale" content="fa_IR" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image.startsWith('http') ? image : `${siteUrl}${image}`} />

            {/* Article specific */}
            {type === 'article' && published && (
                <meta property="article:published_time" content={published} />
            )}
            {type === 'article' && modified && (
                <meta property="article:modified_time" content={modified} />
            )}
            {type === 'article' && author && (
                <meta property="article:author" content={author} />
            )}

            {/* Additional Meta Tags */}
            <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
            <meta name="googlebot" content="index, follow" />
            <meta name="bingbot" content="index, follow" />
            <meta name="language" content="Persian" />
            <meta name="geo.region" content="IR" />
            <meta name="geo.placename" content="Tehran" />

            {/* Structured Data */}
            {structuredData && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData)
                    }}
                />
            )}
        </Head>
    )
}