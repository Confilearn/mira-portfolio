import { Helmet } from 'react-helmet-async'
import { SITE_NAME, SITE_OG_IMAGE, SITE_TWITTER_HANDLE, SITE_URL } from '@/constants/site'

export interface SEOProps {
  title: string
  description: string
  /** Route path (e.g. "/", "/404") used to build the canonical and og:url. Defaults to "/". */
  path?: string
  /** Absolute or root-relative image URL for Open Graph / Twitter cards. Defaults to the site placeholder share image. */
  image?: string
  /** Comma-separated keywords. Defaults to the site-wide keyword list. */
  keywords?: string
  /** Excludes the page from search indexing (e.g. the 404 page). */
  noIndex?: boolean
}

/**
 * Centralizes page-level metadata — title, description, canonical URL, Open
 * Graph and Twitter Card tags — so every route sets them the same way. Values
 * for `SITE_URL` and `image` are placeholders until the project has a real
 * production domain and a dedicated social share image.
 */
export function SEO({
  title,
  description,
  path = '/',
  image = SITE_OG_IMAGE,
  keywords,
  noIndex = false,
}: SEOProps) {
  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SITE_TWITTER_HANDLE} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
