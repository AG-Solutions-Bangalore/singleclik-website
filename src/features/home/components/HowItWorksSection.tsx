import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Building, MessageCircle, Handshake, ShieldCheck } from 'lucide-react'
import { HOW_IT_WORKS_STEPS } from '../constant'

export const HowItWorksSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  const handleScroll = () => {
    const el = scrollContainerRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    if (maxScroll <= 0) {
      setScrollProgress(0)
      return
    }
    const progress = Math.min(Math.max(el.scrollLeft / maxScroll, 0), 1)
    setScrollProgress(progress)
  }

  useEffect(() => {
    handleScroll()
  }, [])

  const renderStepContent = (item: (typeof HOW_IT_WORKS_STEPS)[number], isMobile: boolean = false) => (
    <>
      {/* Step Circle with Badge Number */}
      <div className="relative">
        <div
          className={`apple-border-shine flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full border-2 shadow-sm transition-transform duration-300 group-hover:scale-110 ${item.color}`}
          title={`Step ${item.step}: ${item.title}`}
        >
          {item.icon === 'file-text' && <FileText className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />}
          {item.icon === 'building' && <Building className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />}
          {item.icon === 'message-circle' && <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />}
          {item.icon === 'handshake' && <Handshake className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />}
          {item.icon === 'shield-check' && <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />}
        </div>

        {/* Step Number Badge */}
        <span
          className={`absolute ${
            isMobile ? '-top-2 -right-2' : '-top-3 right-3 sm:-top-4 sm:right-4'
          } flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-[10px] sm:text-[11px] font-bold shadow-sm ring-2 ring-bg ${item.badgeBg}`}
        >
          {item.step}
        </span>
      </div>

      {/* Title & Description */}
      <h3 className="mt-3.5 sm:mt-5 text-sm sm:text-base font-bold text-fg leading-tight">
        {item.title}
      </h3>
      <p className="mt-1 sm:mt-2 text-xs leading-relaxed text-muted max-w-[180px] sm:max-w-[200px]">
        {item.description}
      </p>
    </>
  )

  return (
    <section
      id="how-it-works"
      aria-label="How Single Clik Works"
      className="py-8 lg:py-10 bg-bg overflow-hidden"
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
            How <span className="text-brand">Single Click</span> Works?
          </h2>
          <p className="mt-2 text-sm text-muted">
            Simple 5-step process to get verified services without exposing your private contact details.
          </p>
        </motion.div>

        {/* Mobile Only: User-controlled Smooth Horizontal Swipe / Scroll with Joining Connector Lines */}
        <div className="relative mt-8 block lg:hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 sm:gap-8 px-6 pb-4 pt-2 -mx-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
          >
            {HOW_IT_WORKS_STEPS.map((item, index) => (
              <div
                key={`mobile-step-${item.step}`}
                className="relative flex w-[170px] sm:w-[190px] shrink-0 snap-center flex-col items-center text-center group"
              >
                {/* Dashed connector line with arrow between steps */}
                {index < HOW_IT_WORKS_STEPS.length - 1 && (
                  <div className="absolute top-6 left-[62%] w-[80%] items-center flex pointer-events-none z-0">
                    <div className="flex-1 border-t-2 border-dashed border-slate-300 dark:border-slate-700" />
                    <div className="h-0 w-0 border-y-4 border-y-transparent border-l-6 border-l-slate-300 dark:border-l-slate-700 -ml-1" />
                  </div>
                )}

                {renderStepContent(item, true)}
              </div>
            ))}
          </div>

          {/* Sleek Mobile Scroller Line Indicator */}
          <div className="mt-4 flex items-center justify-center gap-1.5" aria-hidden="true">
            <div className="relative h-1.5 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className="absolute top-0 bottom-0 left-0 rounded-full bg-brand transition-all duration-150 ease-out shadow-sm shadow-brand/40"
                style={{
                  width: '40%',
                  transform: `translateX(${scrollProgress * 150}%)`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Desktop Only: 5-Step Process Grid / Flow with dashed connector lines */}
        <div className="mt-14 hidden lg:grid lg:grid-cols-5 gap-6">
          {HOW_IT_WORKS_STEPS.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Dashed connector line with arrow between steps for desktop */}
              {index < HOW_IT_WORKS_STEPS.length - 1 && (
                <div className="absolute top-7 left-[60%] w-[80%] items-center flex pointer-events-none z-0">
                  <div className="flex-1 border-t-2 border-dashed border-slate-300 dark:border-slate-700" />
                  <div className="h-0 w-0 border-y-4 border-y-transparent border-l-6 border-l-slate-300 dark:border-l-slate-700 -ml-1" />
                </div>
              )}

              {renderStepContent(item, false)}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
