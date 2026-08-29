import { Seo } from '@/components/seo'
import { homeSeo } from '../seo/home.seo'
import {
  HeroSection,
  AboutSection,
  HowItWorksSection,
  VideoShowcaseSection,
  TopCategoriesSection,
  PrivacySection,
  TestimonialsSection,
  CtaBannerSection,
  FaqSection,
} from '../components'

/**
 * Single Click Home Page — Pixel-perfect matching the UI design
 */
export const HomePage = () => {
  return (
    <>
      <Seo {...homeSeo} />

      {/* 1. Hero with mode selector, app downloads, phone mockup & stats bar */}
      <HeroSection />

      {/* 2. About Us with 3 key pillars & interactive badges */}
      <AboutSection />

      {/* 3. How Single Click Works (5-Step connected process) */}
      <HowItWorksSection />

      {/* 4. Video Showcase / Action CTA block */}
      <VideoShowcaseSection />

      {/* 5. Top Categories with 7 interactive service cards */}
      <TopCategoriesSection />

      {/* 6. Privacy & Priority Security Section */}
      <PrivacySection />

      {/* 7. Testimonials / User Reviews Carousel */}
      <TestimonialsSection />

      {/* 8. Ready to Get Started CTA Banner */}
      <CtaBannerSection />

      {/* 9. Frequently Asked Questions Accordion */}
      <FaqSection />
    </>
  )
}

