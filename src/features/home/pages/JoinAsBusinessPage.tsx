import { Seo } from '@/components/seo'
import { CtaBannerSection, HeroSection } from '../components'
import { joinBusinessSeo } from '../seo/platform.seo'

/** /join-as-business — clean URL (no hash) for "Join as Business" CTA. */
export const JoinAsBusinessPage = () => (
  <>
    <Seo {...joinBusinessSeo} />
    <CtaBannerSection />
    <HeroSection />
  </>
)
