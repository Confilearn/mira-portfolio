import { Helmet } from 'react-helmet-async'
import { Navbar } from '@/components/navigation'
import { SEO } from '@/components/utility'
import { HERO_CONTENT } from '@/constants/hero'
import { SITE_DESCRIPTION, SITE_TITLE } from '@/constants/site'
import { HeroSection } from '@/sections/Hero'
import { IntroductionSection } from '@/sections/Introduction'
import { GallerySection } from '@/sections/Gallery'
import { AboutSection } from '@/sections/About'
import { AgencySection } from '@/sections/Agency'
import { ServicesSection } from '@/sections/Services'
import { ContactSection } from '@/sections/Contact'
import { FooterSection } from '@/sections/Footer'

export default function Home() {
  return (
    <>
      <SEO
        title={SITE_TITLE}
        description={SITE_DESCRIPTION}
        path="/"
        image={HERO_CONTENT.image.src}
      />
      <Helmet>
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
      <FooterSection />
    </>
  )
}
