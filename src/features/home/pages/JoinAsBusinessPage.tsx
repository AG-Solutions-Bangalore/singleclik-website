import { Seo } from '@/components/seo'
import { BusinessRegisterForm, CtaBannerSection } from '../components'
import { joinBusinessSeo } from '../seo/platform.seo'

/** /join-as-business — clean URL (no hash) for "Join as Business" business registration. */
export const JoinAsBusinessPage = () => (
  <>
    <Seo {...joinBusinessSeo} />
    <BusinessRegisterForm />
    <CtaBannerSection />
  </>
)
