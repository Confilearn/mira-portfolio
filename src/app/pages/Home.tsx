import { Helmet } from 'react-helmet-async'
import { Navbar } from '@/components/navigation'
import { HERO_CONTENT } from '@/constants/hero'
import { SITE_DESCRIPTION, SITE_TITLE } from '@/constants/site'
import { HeroSection } from '@/sections/Hero'
import { IntroductionSection } from '@/sections/Introduction'
import { GallerySection } from '@/sections/Gallery'
import { AboutSection } from '@/sections/About'
import { AgencySection } from '@/sections/Agency'
import { ServicesSection } from '@/sections/Services'
import { ContactSection } from '@/sections/Contact'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>{SITE_TITLE}</title>
        <meta name="description" content={SITE_DESCRIPTION} />
        <link rel="preload" as="image" href={HERO_CONTENT.image.src} fetchPriority="high" />
      </Helmet>
      <Navbar />
      <main>
        <HeroSection />
        <IntroductionSection />
        <GallerySection />
        <AboutSection />
        <AgencySection />
        <ServicesSection />
        <ContactSection />
      </main>
    </>
  )
}
