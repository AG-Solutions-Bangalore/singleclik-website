import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { FAQS } from '../constant'

export const FaqSection = () => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': false, // Keep first open for good UX
  })

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const col1 = FAQS.slice(0, 3)
  const col2 = FAQS.slice(3, 6)

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="py-8 lg:py-10 bg-surface/50"
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
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-muted">
            Everything you need to know about privacy, chatting, and connecting on Single Click.
          </p>
        </motion.div>

        {/* 2-Column FAQ Layout */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Column 1 */}
          <div className="space-y-4">
            {col1.map((faq) => {
              const isOpen = !!openIds[faq.id]
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-border bg-bg transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    title={`Question: ${faq.question}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="flex w-full cursor-pointer items-center justify-between p-5 text-left font-semibold text-fg transition hover:text-brand"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-2 text-muted">
                      {isOpen ? (
                        <Minus className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-xs sm:text-sm text-muted leading-relaxed border-t border-border/40 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            {col2.map((faq) => {
              const isOpen = !!openIds[faq.id]
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-border bg-bg transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    title={`Question: ${faq.question}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="flex w-full items-center justify-between p-5 text-left font-semibold text-fg transition hover:text-brand"
                  >
                    <span className="text-sm sm:text-base">{faq.question}</span>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-2 text-muted">
                      {isOpen ? (
                        <Minus className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Plus className="h-4 w-4" aria-hidden="true" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-xs sm:text-sm text-muted leading-relaxed border-t border-border/40 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
