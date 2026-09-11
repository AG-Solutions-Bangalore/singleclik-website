import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, Briefcase, Settings, ArrowRight } from 'lucide-react'
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

/**
 * Parse the raw `category_type` flag from the getCategories API.
 * - `"0"` → Business
 * - `"1"` → Services
 * - `"0,1"` / `"1,0"` → both
 */
const parseCategoryTypeFlags = (raw: CategoryItem['category_type']): Set<string> => {
  if (raw === null || raw === undefined) return new Set()
  return new Set(
    String(raw)
      .split(',')
      .map((part) => part.trim())
      .filter(Boolean),
  )
}

const isBusinessCategory = (item: CategoryWithImage): boolean => {
  const flags = parseCategoryTypeFlags(item.category_type)
  if (flags.size === 0) return true
  return flags.has('0')
}

const isServicesCategory = (item: CategoryWithImage): boolean => {
  const flags = parseCategoryTypeFlags(item.category_type)
  if (flags.size === 0) return true
  return flags.has('1')
}

const getCategoryTypeLabel = (item: CategoryWithImage): string => {
  const flags = parseCategoryTypeFlags(item.category_type)
  const isBusiness = flags.has('0')
  const isServices = flags.has('1')
  if (isBusiness && isServices) return 'Business & Services'
  if (isBusiness) return 'Business'
  if (isServices) return 'Services'
  return ''
}

/**
 * Pastel 3D-style icon tiles (blue / green / amber / pink / orange / teal only).
 */
const ICON_TILES = [
  'from-[#F9A8D4] to-[#FECDD3]',
  'from-[#FCD34D] to-[#FEF3C7]',
  'from-[#7DD3FC] to-[#E0F2FE]',
  'from-[#6EE7B7] to-[#D1FAE5]',
  'from-[#FDA4AF] to-[#FCE7F3]',
  'from-[#93C5FD] to-[#DBEAFE]',
  'from-[#FDBA74] to-[#FFEDD5]',
  'from-[#5EEAD4] to-[#CCFBF1]',
  'from-[#FCA5A5] to-[#FEE2E2]',
  'from-[#86EFAC] to-[#DCFCE7]',
  'from-[#FDE68A] to-[#FFFBEB]',
  'from-[#67E8F9] to-[#ECFEFF]',
] as const

export const TopCategoriesSection = () => {
  const { data, isPending, isError, refetch } = useCategories()
  const [showAll, setShowAll] = useState(false)

  const apiCategories = useMemo<CategoryWithImage[]>(() => {
    return (data?.data ?? [])
      .filter((item) => item.category && item.category.trim().toLowerCase() !== 'not in list')
      .map((item) => ({
        category: item.category,
        category_image: item.category_image,
        category_type: item.category_type,
        resolvedImage: resolveCategoryImage(item, data),
      }))
  }, [data])

  const businessCategories = useMemo(
    () => apiCategories.filter(isBusinessCategory),
    [apiCategories],
  )

  const servicesCategories = useMemo(
    () => apiCategories.filter(isServicesCategory),
    [apiCategories],
  )

  const scrollCategories = useMemo<CategoryWithImage[]>(() => {
    if (apiCategories.length === 0) return []
    return [
      ...apiCategories,
      { category: 'more', category_image: '', resolvedImage: '' } as CategoryWithImage,
    ]
  }, [apiCategories])

  const renderSkeletonCard = (key: string | number) => (
    <div
      key={key}
      className="rounded-xl border border-white/10 bg-[#0E1E38] p-3 animate-pulse"
    >
      <div className="h-14 w-14 rounded-xl bg-white/10" />
      <div className="mt-3 flex items-center justify-between gap-2">
        <div className="h-3 w-16 rounded-full bg-white/10" />
        <div className="h-7 w-7 rounded-full bg-white/10" />
      </div>
    </div>
  )

  const renderCategoryCard = (item: CategoryWithImage, idx: number, isMore = false) => {
    const typeLabel = isMore ? 'See All' : getCategoryTypeLabel(item)
    const tile = ICON_TILES[idx % ICON_TILES.length]

    const cardClass = isMore
      ? 'group flex cursor-pointer flex-col rounded-xl border border-[#2563EB]/50 bg-[#2563EB] p-3 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-[#1D4ED8] hover:shadow-[0_16px_32px_-12px_rgba(37,99,235,0.7)]'
      : 'group flex cursor-pointer flex-col rounded-xl border border-white/[0.07] bg-[#0E1E38] p-3 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/50 hover:shadow-[0_16px_32px_-12px_rgba(37,99,235,0.45)]'

    const inner = (
      <>
        {isMore ? (
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/15 text-white transition-transform duration-300 group-hover:scale-105">
            <LayoutGrid className="h-7 w-7" aria-hidden="true" />
          </div>
        ) : (
          <div
            className={`flex h-14 w-14 items-center justify-center rounded-xl bg-grwadient-to-br p-1.5 shadow-inner transition-transform duration-300 group-hover:scale-105 ${tile}`}
          >
            <img
              src={item.resolvedImage}
              alt={
                typeLabel
                  ? `${item.category} ${typeLabel} on Single Clik`
                  : `${item.category} on Single Clik`
              }
              title={item.category}
              width="112"
              height="112"
              loading="lazy"
              decoding="async"
              className="h-11 w-11 rounded-full object-contain drop-shadow-sm"
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

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="truncate text-[13px] font-semibold text-white">
            {isMore ? 'View All' : item.category}
          </span>
          <span
            aria-hidden="true"
            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${isMore
                ? 'bg-white/20 text-white group-hover:bg-white group-hover:text-[#1D4ED8]'
                : 'bg-[#1A2F52] text-slate-300 group-hover:bg-[#2563EB] group-hover:text-white'
              }`}
          >
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </>
    )

    if (isMore) {
      return (
        <button
          key={`more-${idx}`}
          type="button"
          onClick={() => setShowAll(true)}
          title="View all service categories"
          aria-label="View All Categories"
          className={cardClass}
        >
          {inner}
        </button>
      )
    }

    return (
      <a
        key={`${item.category}-${idx}`}
        href={`#category-${encodeURIComponent(item.category.toLowerCase())}`}
        title={`Explore verified ${item.category} professionals on Single Clik`}
        aria-label={`Category: ${item.category}${typeLabel ? ` (${typeLabel})` : ''}`}
        className={cardClass}
      >
        {inner}
      </a>
    )
  }

  const renderGrid = (items: CategoryWithImage[], section: 'business' | 'services') => {
    if (items.length === 0) {
      return (
        <p className="rounded-xl border border-dashed border-white/15 px-4 py-8 text-center text-sm text-slate-400">
          No {section === 'business' ? 'Business' : 'Services'} categories found.
        </p>
      )
    }
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <AnimatePresence>
          {items.map((item, idx) => (
            <motion.div
              key={`${section}-${item.category}-${idx}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(idx * 0.02, 0.3) }}
            >
              {renderCategoryCard(item, idx, false)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <section
      id="categories"
      aria-label="Top Service Categories"
      className="relative overflow-hidden bg-[#081226] py-12 lg:py-16"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#4D7CFE]">
              Browse Categories
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-white sm:text-[32px] sm:leading-tight">
              What do you need <span className="text-[#4D7CFE]">help</span> with?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
              Find trusted businesses and services near you — pick a category to begin.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="group inline-flex cursor-pointer items-center gap-2 self-start rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition-all hover:border-[#2563EB]/60 hover:bg-[#2563EB]/15 active:scale-95 sm:self-auto"
          >
            {showAll ? 'Show Auto Scroll' : 'View All Categories'}
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-[#2563EB]">
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </button>
        </div>

        {/* Auto scroll mode */}
        {!showAll && (
          <div className="relative mt-8 overflow-hidden py-2">
            <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-12 bg-gradient-to-r from-[#081226] to-transparent sm:w-24" />
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-12 bg-gradient-to-l from-[#081226] to-transparent sm:w-24" />
            {isPending || isError ? (
              <div className="flex gap-3 overflow-hidden py-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="w-40 shrink-0">
                    {renderSkeletonCard(`skel-${i}`)}
                  </div>
                ))}
              </div>
            ) : (
              <div className="animate-marquee gap-3 py-2">
                {[...scrollCategories, ...scrollCategories].map((item, idx) => (
                  <div key={idx} className="w-40 shrink-0">
                    {renderCategoryCard(item, idx, item.category === 'more')}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Expanded panels like reference */}
        {showAll && (
          <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 space-y-6">
            {isPending ? (
              <>
                <div className="overflow-hidden rounded-2xl border border-[#1E3A5F]/60 bg-[#0B1B33] p-4 sm:p-5">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {Array.from({ length: 12 }).map((_, i) => renderSkeletonCard(`b-skel-${i}`))}
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl border border-emerald-500/20 bg-[#0B1B33] p-4 sm:p-5">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {Array.from({ length: 12 }).map((_, i) => renderSkeletonCard(`s-skel-${i}`))}
                  </div>
                </div>
              </>
            ) : isError ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-[#0B1B33] px-4 py-10 text-center">
                <p className="text-sm font-medium text-slate-400">
                  Couldn&apos;t load categories. Please try again.
                </p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="cursor-pointer rounded-full bg-[#2563EB] px-5 py-2 text-xs font-bold text-white transition hover:bg-[#1D4ED8] active:scale-95"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <>
                {/* Business panel */}
                <div
                  aria-label="Business Categories"
                  className="relative overflow-hidden rounded-2xl border border-[#1E3A5F]/70 bg-[#0B1B33]"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-[#2563EB]/25 via-[#2563EB]/10 to-transparent"
                  />
                  <div className="relative flex items-center gap-3 p-4 sm:p-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB] text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.9)]">
                      <Briefcase className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold tracking-tight text-white">Business</h3>
                      <p className="truncate text-[13px] text-slate-400">
                        Explore and connect with local businesses
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAll(true)}
                      className="group ml-auto inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition-all hover:border-[#2563EB]/60 hover:bg-[#2563EB]/15"
                    >
                      View All
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-[#2563EB]">
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </span>
                    </button>
                  </div>
                  <div className="relative px-4 pb-4 sm:px-5 sm:pb-5">
                    {renderGrid(businessCategories, 'business')}
                  </div>
                </div>

                {/* Services panel */}
                <div
                  aria-label="Services Categories"
                  className="relative overflow-hidden rounded-2xl border border-emerald-500/25 bg-[#0B1B33]"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-[#10B981]/25 via-[#10B981]/10 to-transparent"
                  />
                  <div className="relative flex items-center gap-3 p-4 sm:p-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#10B981] text-white shadow-[0_8px_20px_-8px_rgba(16,185,129,0.9)]">
                      <Settings className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold tracking-tight text-white">Services</h3>
                      <p className="truncate text-[13px] text-slate-400">
                        Everyday experts, one tap away
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowAll(true)}
                      className="group ml-auto inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs font-semibold text-white transition-all hover:border-emerald-500/60 hover:bg-emerald-500/15"
                    >
                      View All
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-[#10B981]">
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </span>
                    </button>
                  </div>
                  <div className="relative px-4 pb-4 sm:px-5 sm:pb-5">
                    {renderGrid(servicesCategories, 'services')}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </section>
  )
}
