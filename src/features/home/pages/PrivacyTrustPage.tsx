import { Seo } from '@/components/seo'
import { PrivacySection, CtaBannerSection } from '../components'
import { privacyTrustSeo } from '../seo/platform.seo'

/** /privacy-trust — clean URL (no hash) for "Privacy & Trust / Why Choose". */
export const PrivacyTrustPage = () => (
  <>
    <Seo {...privacyTrustSeo} />
    <PrivacySection />
    <CtaBannerSection />
  </>
)
