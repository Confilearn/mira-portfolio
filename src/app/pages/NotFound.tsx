import { Link } from 'react-router-dom'
import { Container } from '@/components/layout'
import { BodyText, LargeDisplay, SectionLabel } from '@/components/typography'
import { buttonVariants } from '@/components/buttons'
import { SEO } from '@/components/utility'

/**
 * Custom 404: keeps the same editorial, quiet-and-confident tone as the rest
 * of the site rather than a generic error screen.
 */
export default function NotFound() {
  return (
    <>
      <SEO
        title="Page Not Found | Mira"
        description="The page you're looking for doesn't exist. Return to the MIRA homepage."
        path="/404"
        noIndex
      />
      <main className="bg-background text-foreground flex min-h-svh items-center justify-center">
        <Container width="narrow" className="flex flex-col items-center gap-6 py-24 text-center">
          <SectionLabel>Error 404</SectionLabel>
          <LargeDisplay as="h1" className="text-display-lg">
            Lost the Frame
          </LargeDisplay>
          <BodyText size="lg" className="text-muted-foreground max-w-sm">
            The page you're looking for has moved, been renamed, or never existed.
          </BodyText>
          <Link to="/" className={buttonVariants({ intent: 'primary', size: 'lg' })}>
            Return Home
          </Link>
        </Container>
      </main>
    </>
  )
}
