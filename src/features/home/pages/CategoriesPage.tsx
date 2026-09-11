import { Seo } from '@/components/seo'
import { TopCategoriesSection, CtaBannerSection } from '../components'
import { categoriesSeo } from '../seo/platform.seo'

/** /categories — clean URL (no hash) for "Categories". */
export const CategoriesPage = () => (
  <>
    <Seo {...categoriesSeo} />
    <TopCategoriesSection />
    <CtaBannerSection />
  </>
)
