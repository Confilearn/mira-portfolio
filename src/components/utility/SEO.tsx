import { Helmet } from 'react-helmet-async'
import { SITE_NAME, SITE_URL } from '@/constants/site'

export interface SEOProps {
  title: string
  description: string
  /** Route path (e.g. "/", "/404") used to build the canonical and og:url. Defaults to "/". */
  path?: string
  /** Absolute or root-relative image URL for Open Graph / Twitter cards. */
  image?: string
  /** Excludes the page from search indexing (e.g. the 404 page). */
  noIndex?: boolean
}

/**
 * Centralizes page-level metadata — title, description, canonical URL, Open
 * Graph and Twitter Card tags — so every route sets them the same way. Values
 * for `SITE_URL` and `image` are placeholders until the project has a real
 * production domain and a dedicated social share image.
 */
export function SEO({ title, description, path = '/', image, noIndex = false }: SEOProps) {
  const url = `${SITE_URL}${path}`

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      {image && <meta property="og:image" content={image} />}

      <meta name="twitter:card" content={image ? 'summary_large_image' : 'summary'} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  )
}
