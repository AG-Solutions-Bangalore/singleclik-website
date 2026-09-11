import { Seo } from '@/components/seo'
import { FaqSection, CtaBannerSection } from '../components'
import { faqSeo } from '../seo/platform.seo'

/** /faq — clean URL (no hash) for "Help Center & FAQs". */
export const FaqPage = () => (
  <>
    <Seo {...faqSeo} />
    <FaqSection />
    <CtaBannerSection />
  </>
)
