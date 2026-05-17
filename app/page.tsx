import { Navigation } from '@/components/navigation'
import { HeroSection } from '@/components/hero-section'
import { SolutionsSection } from '@/components/solutions-section'
import { ProcessSection } from '@/components/process-section'
import { ArcadeSection } from '@/components/arcade-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { BackgroundOrbs } from '@/components/background-orbs'

export default function Home() {
  return (
    <>
      <BackgroundOrbs />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <SolutionsSection />
        <ProcessSection />
        <ArcadeSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
