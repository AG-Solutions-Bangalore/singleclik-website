import { Seo } from '@/components/seo'
import { AboutSection, CtaBannerSection } from '../components'
import { aboutPlatformSeo } from '../seo/platform.seo'

/**
 * /about-platform — clean URL (no hash) for "About Platform".
 * Reuses the home AboutSection so design stays identical.
 */
export const AboutPlatformPage = () => (
  <>
    <Seo {...aboutPlatformSeo} />
    <AboutSection />
    <CtaBannerSection />
  </>
)
