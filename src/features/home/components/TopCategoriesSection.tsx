import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid } from 'lucide-react'
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
      .filter((item) => item.category && item.category.trim().toLowerCase() !== 'not in list')
      .map((item) => ({
        ...item,
        resolvedImage: resolveCategoryImage(item, data),
      }))
  }, [data])

  // Categories list for auto-scrolling (includes More Categories tile)
  const scrollCategories = useMemo<CategoryWithImage[]>(() => {
    if (apiCategories.length === 0) return []
    return [
      ...apiCategories,
      { category: 'more', category_image: '', resolvedImage: '' } as CategoryWithImage,
    ]
  }, [apiCategories])

  const renderSkeleton = (key: string | number) => (
    <div
      key={key}
      className="flex w-36 sm:w-44 shrink-0 flex-col items-center rounded-2xl border border-border bg-bg p-4 sm:p-5 animate-pulse"
    >
      <div className="h-14 w-14 rounded-2xl bg-surface-2" />
      <div className="mt-3.5 h-3 w-20 rounded bg-surface-2" />
      <div className="mt-2 h-2.5 w-12 rounded bg-surface-2" />
    </div>
  )

  const renderCategoryTile = (
    item: CategoryWithImage,
    idx: number,
    isMoreTile: boolean = false,
    isAutoScroll: boolean = false,
  ) => {
    const isMore = isMoreTile || item.category === 'more'

    const tileContent = (
      <>
        <div className="flex h-20 items-center justify-center">
          {isMore ? (
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 dark:bg-brand/20 text-brand dark:text-brand-light transition-all duration-300 group-hover:scale-110 group-hover:bg-brand group-hover:text-white shadow-sm">
              <LayoutGrid className="h-7 w-7" aria-hidden="true" />
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
            {isMore ? 'More Categories' : item.category}
          </h3>
          <span className="mt-1 text-[11px] font-medium text-muted">
            {isMore ? 'See All' : 'Verified Pros'}
          </span>
        </div>
      </>
    )

    const tileClass = `group flex cursor-pointer flex-col items-center justify-between rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-bg p-4 sm:p-5 text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none transition-all duration-300 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5 ${
      isAutoScroll ? 'w-36 sm:w-44 shrink-0' : ''
    }`

    if (isMore) {
      return (
        <button
          key={`more-${idx}`}
          type="button"
          onClick={() => setShowAll(true)}
          title="View all service categories"
          aria-label="View All Categories"
          className={tileClass}
        >
          {tileContent}
        </button>
      )
    }

    return (
      <a
        key={`${item.category}-${idx}`}
        href={`#category-${encodeURIComponent(item.category.toLowerCase())}`}
        title={`Explore verified ${item.category} professionals on Single Click`}
        aria-label={`Category: ${item.category}`}
        className={tileClass}
      >
        {tileContent}
      </a>
    )
  }

  return (
    <section
      id="categories"
      aria-label="Top Service Categories"
      className="py-8 lg:py-10 bg-bg overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Bar */}
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
            title={showAll ? 'Show auto scroll' : 'View all service categories'}
            aria-label={showAll ? 'Show Auto Scroll' : 'View All Categories'}
            className="self-start rounded-lg border border-brand px-4 py-1.5 text-xs font-bold text-brand-dark transition hover:bg-brand/10 active:scale-95 sm:self-auto dark:text-brand-light cursor-pointer"
          >
            {showAll ? 'Show Auto Scroll' : 'View All Categories'}
          </button>
        </div>

        {/* Continuous Auto-Scrolling Row (Default) */}
        {!showAll && (
          <div className="relative mt-8 overflow-hidden py-2">
            {/* Edge Fade Gradients for sleek aesthetic */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-10 sm:w-20 bg-gradient-to-r from-bg to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-10 sm:w-20 bg-gradient-to-l from-bg to-transparent" />

            {isPending || isError ? (
              <div className="flex gap-3 sm:gap-4 overflow-hidden py-2">
                {Array.from({ length: 8 }).map((_, i) => renderSkeleton(`skel-${i}`))}
              </div>
            ) : (
              <div className="animate-marquee gap-3 sm:gap-4 py-2">
                {/* Duplicate the array to ensure seamless infinite looping */}
                {[...scrollCategories, ...scrollCategories].map((item, idx) =>
                  renderCategoryTile(item, idx, item.category === 'more', true),
                )}
              </div>
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
                    renderCategoryTile(item, idx, false, false),
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