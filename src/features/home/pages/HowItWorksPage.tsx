import { Seo } from '@/components/seo'
import { HowItWorksSection, CtaBannerSection } from '../components'
import { howItWorksSeo } from '../seo/platform.seo'

/** /how-it-works — clean URL (no hash) for "How It Works". */
export const HowItWorksPage = () => (
  <>
    <Seo {...howItWorksSeo} />
    <HowItWorksSection />
    <CtaBannerSection />
  </>
)
