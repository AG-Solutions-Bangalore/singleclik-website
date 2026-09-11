import { Seo } from '@/components/seo'
import { TestimonialsSection, CtaBannerSection } from '../components'
import { testimonialsSeo } from '../seo/platform.seo'

/** /testimonials — clean URL (no hash) for "Reviews". */
export const TestimonialsPage = () => (
  <>
    <Seo {...testimonialsSeo} />
    <TestimonialsSection />
    <CtaBannerSection />
  </>
)
