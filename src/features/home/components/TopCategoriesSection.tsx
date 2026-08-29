import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TOP_CATEGORIES } from '../constant'
import { useCategories } from '../hooks/useCategories'
import type { CategoryItem } from '@/types'

export const TopCategoriesSection = () => {
  const { data, isPending } = useCategories()
  const [showAll, setShowAll] = useState(false)

  // API categories if user toggles "View All"
  const apiCategories = (data?.data ?? []).filter(
    (item) => item.category.trim().toLowerCase() !== 'not in list',
  )

  const renderCategoryIcon = (type: string) => {
    switch (type) {
      case 'app':
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-b from-[#6366F1] to-[#4338CA] text-white shadow-md shadow-indigo-500/25 transition-transform duration-300 group-hover:scale-110">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 2.5L4 19.5l8-3.5 8 3.5L12 2.5z" />
            </svg>
          </div>
        )
      case 'web':
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-b from-[#3B82F6] to-[#1D4ED8] text-white shadow-md shadow-blue-500/25 transition-transform duration-300 group-hover:scale-110">
            <svg className="h-6 w-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="2" y="4" width="20" height="14" rx="2" />
              <path d="M6 8h.01M9 8h.01M12 8h.01M8 12l2 2-2 2M16 12l-2 2 2 2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )
      case 'marketing':
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E6FAF0] dark:bg-emerald-950/50 text-[#10B981] transition-transform duration-300 group-hover:scale-110">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 19h3v-6H4v6zm6 0h3v-10h-3v10zm6 0h3v-14h-3v14zM2 21h20v2H2v-2z" />
              <path d="M19 3l-6 6-4-4-5 5 1.4 1.4 3.6-3.6 4 4 7.4-7.4V7h2V1h-6v2h2.6z" />
            </svg>
          </div>
        )
      case 'design':
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-b from-[#F97316] to-[#EA580C] text-white shadow-md shadow-orange-500/25 transition-transform duration-300 group-hover:scale-110">
            <svg className="h-6 w-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 19l7-7 3 3-7 7-3-3z" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="11" cy="11" r="2" fill="currentColor" />
            </svg>
          </div>
        )
      case 'seo':
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E6FAF2] dark:bg-teal-950/50 text-[#10B981] transition-transform duration-300 group-hover:scale-110">
            <svg className="h-6 w-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.35-4.35" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M11 8v6M8 11h6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )
      case 'writing':
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FDF2F8] dark:bg-pink-950/50 text-[#EC4899] transition-transform duration-300 group-hover:scale-110">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
          </div>
        )
      default:
        return (
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 transition-transform duration-300 group-hover:scale-110">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="5" cy="5" r="2.5" />
              <circle cx="12" cy="5" r="2.5" />
              <circle cx="19" cy="5" r="2.5" />
              <circle cx="5" cy="12" r="2.5" />
              <circle cx="12" cy="12" r="2.5" />
              <circle cx="19" cy="12" r="2.5" />
              <circle cx="5" cy="19" r="2.5" />
              <circle cx="12" cy="19" r="2.5" />
              <circle cx="19" cy="19" r="2.5" />
            </svg>
          </div>
        )
    }
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
            className="self-start rounded-lg border border-brand/80 px-4 py-1.5 text-xs font-semibold text-brand transition hover:bg-brand/10 active:scale-95 sm:self-auto"
          >
            {showAll ? 'Show Featured' : 'View All Categories'}
          </button>
        </div>

        {/* Primary 7-Card Grid (Exact Design Match) */}
        {!showAll && (
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7 lg:gap-4">
            {TOP_CATEGORIES.map((cat, idx) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                onClick={() => {
                  if (cat.iconType === 'more') setShowAll(true)
                }}
                className="group flex cursor-pointer flex-col items-center justify-between rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-bg p-4 sm:p-5 text-center shadow-[0_2px_12px_rgba(0,0,0,0.03)] dark:shadow-none transition-all duration-300 hover:border-brand/30 hover:shadow-lg hover:shadow-brand/5"
                title={`${cat.title} - ${cat.count}`}
              >
                {/* Icon Container */}
                <div className="flex items-center justify-center pt-1">
                  {renderCategoryIcon(cat.iconType)}
                </div>

                {/* Category Title & Count */}
                <div className="mt-3.5 flex flex-col items-center">
                  <h3 className="text-xs sm:text-[13px] font-bold text-fg group-hover:text-brand transition-colors line-clamp-1">
                    {cat.title}
                  </h3>
                  <span className="mt-1 text-[11px] font-medium text-muted">
                    {cat.count}
                  </span>
                </div>
              </motion.div>
            ))}
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
                {Array.from({ length: 14 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center rounded-2xl border border-border bg-bg p-4 animate-pulse"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-surface-2" />
                    <div className="mt-3 h-3 w-16 rounded bg-surface-2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7 lg:gap-4">
                <AnimatePresence>
                  {apiCategories.map((item: CategoryItem, idx: number) => {
                    const imageSrc = item.category_image
                      ? `${data?.image_url ?? ''}${item.category_image}`
                      : data?.no_image_url ?? ''

                    return (
                      <motion.a
                        key={item.category}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.25, delay: (idx % 7) * 0.03 }}
                        whileHover={{ y: -4 }}
                        href={`#category-${encodeURIComponent(item.category.toLowerCase())}`}
                        title={`Explore verified ${item.category} professionals on Single Click`}
                        aria-label={`Category: ${item.category}`}
                        className="group flex flex-col items-center justify-between rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-bg p-4 sm:p-5 text-center shadow-sm transition-all duration-300 hover:border-brand/40 hover:shadow-md"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-softer dark:bg-brand-soft/20 p-2 transition-transform duration-300 group-hover:scale-110">
                          <img
                            src={imageSrc}
                            alt={`${item.category} Services on Single Click`}
                            title={item.category}
                            width="36"
                            height="36"
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none'
                            }}
                          />
                        </div>

                        <div className="mt-3.5 flex flex-col items-center">
                          <h3 className="text-xs sm:text-[13px] font-bold text-fg group-hover:text-brand transition-colors line-clamp-1">
                            {item.category}
                          </h3>
                          <span className="mt-1 text-[11px] font-medium text-muted">
                            Verified Pros
                          </span>
                        </div>
                      </motion.a>
                    )
                  })}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
