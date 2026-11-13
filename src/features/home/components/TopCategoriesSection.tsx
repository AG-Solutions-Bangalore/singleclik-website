import { useMemo, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutGrid, Briefcase, Settings, ArrowRight } from 'lucide-react'
import { useCategories } from '../hooks/useCategories'
import { DownloadModal } from '@/components/ui/DownloadModal'
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

// In-memory cache for loaded category images so subsequent renders have 0ms latency
const loadedImagesCache = new Set<string>()

const CategoryCardImage = ({
  src,
  alt,
  title,
  fallback,
  isPriority = false,
}: {
  src: string
  alt: string
  title: string
  fallback?: string
  isPriority?: boolean
}) => {
  const [loaded, setLoaded] = useState(() => loadedImagesCache.has(src))
  const [imgSrc, setImgSrc] = useState(src)

  useEffect(() => {
    setImgSrc(src)
    if (loadedImagesCache.has(src)) {
      setLoaded(true)
    }
  }, [src])

  return (
    <div className="relative flex h-18 w-18 sm:h-20 sm:w-20 mx-auto items-center justify-center overflow-hidden rounded-2xl bg-[#F4F9FD] border border-slate-100 shadow-sm transition-transform duration-300 group-hover:scale-105 dark:bg-white dark:border-transparent dark:shadow-md">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-slate-200/50 dark:bg-slate-200/40" />
      )}
      <img
        src={imgSrc}
        alt={alt}
        title={title}
        width="185"
        height="185"
        decoding="async"
        loading={isPriority ? 'eager' : 'lazy'}
        fetchPriority={isPriority ? 'high' : 'auto'}
        onLoad={() => {
          loadedImagesCache.add(src)
          setLoaded(true)
        }}
        onError={() => {
          if (fallback && imgSrc !== fallback) {
            setImgSrc(fallback)
          }
        }}
        className={`h-full w-full object-contain scale-140 transition-opacity duration-300 group-hover:scale-155 ${loaded ? 'opacity-100' : 'opacity-0'
          }`}
      />
    </div>
  )
}

export const TopCategoriesSection = () => {
  const location = useLocation()
  const { data, isPending, isError, refetch } = useCategories()
  const [showAll, setShowAll] = useState(() => location.pathname === '/categories')
  const [downloadModal, setDownloadModal] = useState<{
    isOpen: boolean
    title: string
    subtitle: string
  }>({
    isOpen: false,
    title: '',
    subtitle: '',
  })

  const openCategoryDownload = (categoryName: string) => {
    setDownloadModal({
      isOpen: true,
      title: `Find ${categoryName} on Single Clik App`,
      subtitle: `Download the Single Clik app to search verified ${categoryName.toLowerCase()} professionals, chat securely, and get instant quotes near you.`,
    })
  }

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

  // Preload and cache category images in browser memory to eliminate pop-ins
  useEffect(() => {
    if (!apiCategories.length) return
    apiCategories.forEach((cat) => {
      if (cat.resolvedImage) {
        const img = new Image()
        img.src = cat.resolvedImage
        img.onload = () => {
          loadedImagesCache.add(cat.resolvedImage)
        }
      }
    })
  }, [apiCategories])

  const renderSkeletonCard = (key: string | number) => (
    <div
      key={key}
      className="rounded-2xl border border-slate-200/90 bg-white p-3 animate-pulse dark:border-white/10 dark:bg-[#0E1E38]"
    >
      <div className="h-18 w-18 sm:h-20 sm:w-20 mx-auto rounded-2xl bg-slate-100 dark:bg-white/10" />
      <div className="mt-3 flex items-center justify-between gap-1.5 px-0.5">
        <div className="h-3 w-14 rounded-full bg-slate-200 dark:bg-white/10" />
        <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-white/10" />
      </div>
    </div>
  )

  const renderCategoryCard = (item: CategoryWithImage, idx: number, isMore = false) => {
    const typeLabel = isMore ? 'See All' : getCategoryTypeLabel(item)
    const isPriority = idx < 8

    const cardClass = isMore
      ? 'group flex cursor-pointer flex-col rounded-2xl border border-[#2563EB]/50 bg-[#2563EB] p-3 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-[#1D4ED8] hover:shadow-[0_16px_32px_-12px_rgba(37,99,235,0.7)]'
      : 'group flex cursor-pointer flex-col rounded-2xl border border-slate-200/90 bg-white p-3 text-left shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB]/50 hover:shadow-lg dark:border-white/[0.08] dark:bg-[#0E1E38] dark:shadow-none dark:hover:border-[#2563EB]/50 dark:hover:shadow-[0_16px_32px_-12px_rgba(37,99,235,0.45)]'

    const inner = (
      <>
        {isMore ? (
          <div className="flex h-18 w-18 sm:h-20 sm:w-20 mx-auto items-center justify-center rounded-2xl bg-white/15 text-white transition-transform duration-300 group-hover:scale-105">
            <LayoutGrid className="h-7 w-7 sm:h-8 sm:w-8" aria-hidden="true" />
          </div>
        ) : (
          <CategoryCardImage
            src={item.resolvedImage}
            alt={
              typeLabel
                ? `${item.category} ${typeLabel} on Single Clik`
                : `${item.category} on Single Clik`
            }
            title={item.category}
            fallback={data?.no_image_url}
            isPriority={isPriority}
          />
        )}

        <div className="mt-3 flex items-center justify-between gap-1.5 px-0.5">
          <span className="truncate text-xs sm:text-[13px] font-bold text-slate-800 dark:text-white">
            {isMore ? 'View All' : item.category}
          </span>
          <span
            aria-hidden="true"
            className={`flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110 ${isMore
                ? 'bg-white/20 text-white group-hover:bg-white group-hover:text-[#1D4ED8]'
                : 'bg-[#2563EB] text-white shadow-sm group-hover:bg-[#1D4ED8]'
              }`}
          >
            <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
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
          className={`${cardClass} w-full`}
        >
          {inner}
        </button>
      )
    }

    return (
      <button
        key={`${item.category}-${idx}`}
        type="button"
        onClick={() => openCategoryDownload(item.category)}
        title={`Explore verified ${item.category} professionals on Single Clik`}
        aria-label={`Category: ${item.category}${typeLabel ? ` (${typeLabel})` : ''}`}
        className={`${cardClass} w-full`}
      >
        {inner}
      </button>
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
      className="relative overflow-hidden bg-slate-50 py-12 transition-colors duration-200 dark:bg-[#081226] lg:py-16"
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#2563EB] dark:text-[#4D7CFE]">
              Browse Categories
            </p>
            <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 transition-colors dark:text-white sm:text-[32px] sm:leading-tight">
              What do you need <span className="text-[#2563EB] dark:text-[#4D7CFE]">help</span> with?
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 transition-colors dark:text-slate-400">
              Find trusted businesses and services near you — pick a category to begin.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            className="group inline-flex cursor-pointer items-center gap-2 self-start rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-sm transition-all hover:border-[#2563EB] hover:text-[#2563EB] active:scale-95 dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:border-[#2563EB]/60 dark:hover:bg-[#2563EB]/15 sm:self-auto"
          >
            {showAll ? 'Show Auto Scroll' : 'View All Categories'}
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors group-hover:bg-[#2563EB] group-hover:text-white dark:bg-white/10 dark:text-white dark:group-hover:bg-[#2563EB]">
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </button>
        </div>

        {/* Auto scroll mode */}
        {!showAll && (
          <div className="relative mt-8 overflow-hidden py-2">
            <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-12 bg-gradient-to-r from-slate-50 to-transparent dark:from-[#081226] sm:w-24" />
            <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-12 bg-gradient-to-l from-slate-50 to-transparent dark:from-[#081226] sm:w-24" />
            {isPending || isError ? (
              <div className="flex gap-3 overflow-hidden py-2">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="w-32 sm:w-36 shrink-0">
                    {renderSkeletonCard(`skel-${i}`)}
                  </div>
                ))}
              </div>
            ) : (
              <div className="animate-marquee gap-3 py-2">
                {[...scrollCategories, ...scrollCategories].map((item, idx) => (
                  <div key={idx} className="w-32 sm:w-36 shrink-0">
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
                <div className="overflow-hidden rounded-2xl border border-emerald-200/90 bg-white p-4 shadow-sm dark:border-emerald-500/20 dark:bg-[#0B1B33] sm:p-5">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {Array.from({ length: 12 }).map((_, i) => renderSkeletonCard(`s-skel-${i}`))}
                  </div>
                </div>
                <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm dark:border-[#1E3A5F]/60 dark:bg-[#0B1B33] sm:p-5">
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {Array.from({ length: 12 }).map((_, i) => renderSkeletonCard(`b-skel-${i}`))}
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
                {/* Services panel */}
                <div
                  aria-label="Services Categories"
                  className="relative overflow-hidden rounded-2xl border border-emerald-200/90 bg-white shadow-sm dark:border-emerald-500/25 dark:bg-[#0B1B33]"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-[#10B981]/10 via-[#10B981]/5 to-transparent dark:from-[#10B981]/25 dark:via-[#10B981]/10"
                  />
                  <div className="relative flex items-center gap-3 p-4 sm:p-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#10B981] text-white shadow-[0_8px_20px_-8px_rgba(16,185,129,0.9)]">
                      <Settings className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Services</h3>
                      <p className="truncate text-[13px] text-slate-500 dark:text-slate-400">
                        Everyday experts, one tap away
                      </p>
                    </div>
                    {/* <button
                      type="button"
                      onClick={() => openGeneralDownload('Services')}
                      className="group ml-auto inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-emerald-500 hover:text-emerald-600 dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:border-emerald-500/60 dark:hover:bg-emerald-500/15"
                    >
                      View All
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition-colors group-hover:bg-[#10B981] group-hover:text-white dark:bg-white/10 dark:text-white dark:group-hover:bg-[#10B981]">
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </span>
                    </button> */}
                  </div>
                  <div className="relative px-4 pb-4 sm:px-5 sm:pb-5">
                    {renderGrid(servicesCategories, 'services')}
                  </div>
                </div>

                {/* Business panel */}
                <div
                  aria-label="Business Categories"
                  className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm dark:border-[#1E3A5F]/70 dark:bg-[#0B1B33]"
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-r from-[#2563EB]/10 via-[#2563EB]/5 to-transparent dark:from-[#2563EB]/25 dark:via-[#2563EB]/10"
                  />
                  <div className="relative flex items-center gap-3 p-4 sm:p-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2563EB] text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.9)]">
                      <Briefcase className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Business</h3>
                      <p className="truncate text-[13px] text-slate-500 dark:text-slate-400">
                        Explore and connect with local businesses
                      </p>
                    </div>
                    {/* <button
                      type="button"
                      onClick={() => openGeneralDownload('Business')}
                      className="group ml-auto inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:border-[#2563EB] hover:text-[#2563EB] dark:border-white/15 dark:bg-white/[0.04] dark:text-white dark:hover:border-[#2563EB]/60 dark:hover:bg-[#2563EB]/15"
                    >
                      View All
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-600 transition-colors group-hover:bg-[#2563EB] group-hover:text-white dark:bg-white/10 dark:text-white dark:group-hover:bg-[#2563EB]">
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </span>
                    </button> */}
                  </div>
                  <div className="relative px-4 pb-4 sm:px-5 sm:pb-5">
                    {renderGrid(businessCategories, 'business')}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>

      <DownloadModal
        isOpen={downloadModal.isOpen}
        onClose={() => setDownloadModal((prev) => ({ ...prev, isOpen: false }))}
        title={downloadModal.title}
        subtitle={downloadModal.subtitle}
      />
    </section>
  )
}
