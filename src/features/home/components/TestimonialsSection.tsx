import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { TESTIMONIALS } from '../constant'

export const TestimonialsSection = () => {
  const [activeTab, setActiveTab] = useState(0)

  const handlePrev = () => {
    setActiveTab((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveTab((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1))
  }

  return (
    <section
      aria-label="User Reviews and Testimonials"
      className="py-16 lg:py-24 bg-surface/30"
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
          <p className="mt-2 text-sm text-muted">
            Read authentic feedback from individuals and verified businesses using Single Click.
          </p>
        </motion.div>

        {/* Carousel / Grid Wrapper */}
        <div className="relative mt-12">
          {/* Previous Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-bg text-fg shadow-md transition hover:bg-surface-2 lg:flex"
            aria-label="Previous review"
            title="Previous Review"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="wait">
              {TESTIMONIALS.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col justify-between rounded-2xl border border-border bg-bg p-6 shadow-sm transition-all duration-300 hover:border-brand/30 hover:shadow-md"
                >
                  <div>
                    {/* Star Ratings */}
                    <div
                      className="flex items-center gap-1 text-accent-amber"
                      title={`${item.rating} out of 5 stars`}
                      aria-label={`${item.rating} stars`}
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
                      <h4 className="text-sm font-bold text-fg">{item.name}</h4>
                      <p className="text-xs text-muted">{item.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Next Button */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-bg text-fg shadow-md transition hover:bg-surface-2 lg:flex"
            aria-label="Next review"
            title="Next Review"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Indicator dots */}
        <div className="mt-8 flex justify-center gap-2" aria-label="Review pagination">
          {TESTIMONIALS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`h-2 rounded-full transition-all ${
                activeTab === idx ? 'w-6 bg-brand' : 'w-2 bg-border'
              }`}
              title={`View review from ${item.name}`}
              aria-label={`Go to testimonial from ${item.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
