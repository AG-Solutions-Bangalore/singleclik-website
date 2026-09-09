import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useCategories } from '../hooks/useCategories'
import type { CategoryItem, CategoriesResponse } from '@/types'

type CategoryWithImage = CategoryItem & { resolvedImage: string }

/**
 * Build the absolute image URL for a category. Falls back to no_image_url
 * when category_image is missing or empty, or when the join fails.
 */
const resolveCategoryImage = (
  item: CategoryItem,
  apiData: CategoriesResponse | undefined,
): string => {
  const imageBase = apiData?.image_url ?? ''
  const fallback = apiData?.no_image_url ?? ''
  const name = item.category_image?.trim()
  if (!name) return fallback
  return `${imageBase}${name}`
}

export const TopCategoriesSection = () => {
  const { data, isPending, isError } = useCategories()
  const [showAll, setShowAll] = useState(false)

  // Filter out "not in list" entries from API
  const apiCategories = useMemo<CategoryWithImage[]>(() => {
    return (data?.data ?? [])
      .filter((item) => item.category.trim().toLowerCase() !== 'not in list')
      .map((item) => ({
        ...item,
        resolvedImage: resolveCategoryImage(item, data),
      }))
  }, [data])

  // Pick top 6 from API for primary grid; 7th is a "More Categories" tile
  const featuredCategories = useMemo(() => apiCategories.slice(0, 6), [apiCategories])

  const renderSkeleton = (key: string | number) => (
    <div
      key={key}
      className="flex flex-col items-center rounded-2xl border border-border bg-bg p-4 sm:p-5 animate-pulse"
    >
      <div className="h-12 w-12 rounded-2xl bg-surface-2" />
      <div className="mt-3.5 h-3 w-20 rounded bg-surface-2" />
      <div className="mt-2 h-2.5 w-12 rounded bg-surface-2" />
    </div>
  )

  const renderCategoryTile = (
    item: CategoryWithImage,
    idx: number,
    isMoreTile: boolean = false,
  ) => {
    const innerContent = (
      <>
        <div className="flex items-center justify-center pt-1">
          {isMoreTile ? (
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 transition-transform duration-300 group-hover:scale-110">
              <Plus className="h-6 w-6" aria-hidden="true" />
            </div>
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl p-2.5 transition-transform duration-300 group-hover:scale-110">
              <img
                src={item.resolvedImage}
                alt={`${item.category} Services on Single Click`}
                title={item.category}
                width="128"
                height="128"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-contain"
                onError={(e) => {
                  const target = e.currentTarget
                  const fallback = data?.no_image_url
                  if (fallback && target.src !== fallback) {
                    target.src = fallback
                  } else {
                    target.style.display = 'none'
                  }
                }}
              />
            </div>
          )}
        </div>

        <div className="mt-3.5 flex flex-col items-center">
          <h3 className="text-xs sm:text-[13px] font-bold text-fg group-hover:text-brand transition-colors line-clamp-1">
            {isMoreTile ? 'More Categories' : item.category}
          </h3>
          <span className="mt-1 text-[11px] font-medium text-muted">
            {isMoreTile ? 'See All' : 'Verified Pros'}
          </span>
        </div>
      </>
    )

    const tileClass =
      'group flex cursor-pointer flex-col items-center justify-between rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-bg p-4 sm:p-5 text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none transition-all duration-300 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5'

    if (isMoreTile) {
      return (
        <motion.button
          key="more-categories"
          type="button"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: idx * 0.05 }}
          whileHover={{ y: -4 }}
          onClick={() => setShowAll(true)}
          title="View all service categories"
          aria-label="View All Categories"
          className={tileClass}
        >
          {innerContent}
        </motion.button>
      )
    }

    return (
      <motion.a
        key={item.category}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: idx * 0.05 }}
        whileHover={{ y: -4 }}
        href={`#category-${encodeURIComponent(item.category.toLowerCase())}`}
        title={`Explore verified ${item.category} professionals on Single Click`}
        aria-label={`Category: ${item.category}`}
        className={tileClass}
      >
        {innerContent}
      </motion.a>
    )
  }

  return (
    <section
      id="categories"
      aria-label="Top Service Categories"
      className="py-12 lg:py-16 bg-bg"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Bar matching image layout */}
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h2 className="text-xl font-bold tracking-tight text-fg sm:text-2xl">
              Top Categories
            </h2>
            <span className="text-xs sm:text-sm text-muted font-normal">
              Explore popular services across categories.
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            title={showAll ? 'Show top categories' : 'View all service categories'}
            aria-label={showAll ? 'Show Top Categories' : 'View All Categories'}
            className="self-start rounded-lg border border-brand px-4 py-1.5 text-xs font-bold text-brand-dark transition hover:bg-brand/10 active:scale-95 sm:self-auto dark:text-brand-light"
          >
            {showAll ? 'Show Featured' : 'View All Categories'}
          </button>
        </div>

        {/* Primary 7-Card Grid - now dynamic from API */}
        {!showAll && (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7 lg:gap-4">
            {isPending || isError ? (
              <>
                {Array.from({ length: 6 }).map((_, i) => renderSkeleton(`featured-skel-${i}`))}
                {renderSkeleton('more-skel')}
              </>
            ) : (
              <>
                {featuredCategories.map((item, idx) => renderCategoryTile(item, idx))}
                {renderCategoryTile(
                  { category: 'more', category_image: '', resolvedImage: '' } as CategoryWithImage,
                  featuredCategories.length,
                  true,
                )}
              </>
            )}
          </div>
        )}

        {/* Expanded All Categories Grid from API */}
        {showAll && (
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8"
          >
            {isPending ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
                {Array.from({ length: 14 }).map((_, i) => renderSkeleton(`all-skel-${i}`))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7 lg:gap-4">
                <AnimatePresence>
                  {apiCategories.map((item: CategoryWithImage, idx: number) =>
                    renderCategoryTile(item, idx % 7),
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}