import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { TESTIMONIALS } from '../constant'

export const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(3)

  // Responsive items per page
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) setItemsPerPage(1)
      else if (window.innerWidth < 1024) setItemsPerPage(2)
      else setItemsPerPage(3)
    }
    updateItemsPerPage()
    window.addEventListener('resize', updateItemsPerPage)
    return () => window.removeEventListener('resize', updateItemsPerPage)
  }, [])

  const totalPages = Math.ceil(TESTIMONIALS.length / itemsPerPage)

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? totalPages - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === totalPages - 1 ? 0 : prev + 1))
  }

  const currentItems = TESTIMONIALS.slice(
    activeIndex * itemsPerPage,
    activeIndex * itemsPerPage + itemsPerPage,
  )

  return (
    <section
      aria-label="User Reviews and Testimonials"
      className="py-12 bg-surface/30 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
            What Our Users Say
          </h2>
          <p className="mt-2 text-sm text-muted sm:text-base">
            Read authentic feedback from individuals and verified businesses using Single Click.
          </p>
        </motion.div>

        {/* Carousel Wrapper */}
        <div className="relative mt-12">
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg/90 backdrop-blur-sm text-fg shadow-lg transition hover:bg-brand hover:text-white hover:border-brand sm:left-0 sm:-translate-x-1/2 lg:left-2 lg:translate-x-0"
            aria-label="Previous review"
            title="Previous Review"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Cards Grid */}
          <div className="overflow-hidden px-2 sm:px-12 lg:px-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {currentItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    whileHover={{ y: -4 }}
                    className="relative flex flex-col justify-between rounded-2xl border border-border bg-bg p-6 shadow-sm transition-all duration-300 hover:border-brand/30 hover:shadow-md"
                  >
                    {/* Decorative Quote Icon */}
                    <Quote
                      className="absolute right-4 top-4 h-8 w-8 text-brand/10"
                      aria-hidden="true"
                    />

                    <div>
                      {/* Star Ratings */}
                      <div
                        className="flex items-center gap-1 text-accent-amber"
                        title={`${item.rating} out of 5 stars`}
                        role="img"
                        aria-label={`${item.rating} out of 5 stars`}
                      >
                        {Array.from({ length: item.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />
                        ))}
                      </div>

                      {/* Quote */}
                      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                        "{item.quote}"
                      </p>
                    </div>

                    {/* User Info */}
                    <div className="mt-6 flex items-center gap-3 pt-4 border-t border-border/60">
                      <img
                        src={item.avatar}
                        alt={`Portrait of ${item.name} - ${item.role}`}
                        title={`${item.name} (${item.role})`}
                        width="44"
                        height="44"
                        loading="lazy"
                        decoding="async"
                        className="h-11 w-11 rounded-full object-cover ring-2 ring-brand/10"
                      />
                      <div>
                        <h3 className="text-sm font-bold text-fg">{item.name}</h3>
                        <p className="text-xs text-muted">{item.role}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg/90 backdrop-blur-sm text-fg shadow-lg transition hover:bg-brand hover:text-white hover:border-brand sm:right-0 sm:translate-x-1/2 lg:right-2 lg:translate-x-0"
            aria-label="Next review"
            title="Next Review"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Indicator dots */}
        <div
          className="mt-10 flex justify-center gap-2"
          aria-label="Review pagination"
          role="tablist"
        >
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIndex(idx)}
              role="tab"
              aria-selected={activeIndex === idx}
              aria-label={`Go to review page ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx ? 'w-8 bg-brand' : 'w-2 bg-border hover:bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}