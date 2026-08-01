import { Helmet } from 'react-helmet-async'
import { SITE_DESCRIPTION, SITE_TITLE } from '@/constants/site'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
      </Helmet>
      <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-4xl">MIRA</h1>
        <p className="text-muted-foreground max-w-md">Homepage implementation coming soon.</p>
      </main>
    </>
  )
}
