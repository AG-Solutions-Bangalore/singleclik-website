import { motion } from 'framer-motion'
import { FileText, Building, MessageCircle, Handshake, ShieldCheck } from 'lucide-react'
import { HOW_IT_WORKS_STEPS } from '../constant'

export const HowItWorksSection = () => {
  return (
    <section
      id="how-it-works"
      aria-label="How Single Click Works"
      className="py-16 lg:py-24 bg-bg"
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

        {/* 5-Step Process Grid / Flow (2-columns on mobile, 5-columns on desktop) */}
        <div className="mt-10 sm:mt-14 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-5">
          {HOW_IT_WORKS_STEPS.map((item, index) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative flex flex-col items-center text-center group last:col-span-2 last:max-w-xs last:mx-auto lg:last:col-span-1"
            >
              {/* Dashed connector line with arrow between steps for desktop */}
              {index < HOW_IT_WORKS_STEPS.length - 1 && (
                <div className="absolute top-7 left-[60%] hidden w-[80%] items-center lg:flex pointer-events-none z-0">
                  <div className="flex-1 border-t-2 border-dashed border-slate-300 dark:border-slate-700" />
                  <div className="h-0 w-0 border-y-4 border-y-transparent border-l-6 border-l-slate-300 dark:border-l-slate-700 -ml-1" />
                </div>
              )}

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
                  className={`absolute -top-4 right-4 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full text-[10px] sm:text-[11px] font-bold shadow-sm ring-2 ring-bg ${item.badgeBg}`}
                >
                  {item.step}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="mt-3.5 sm:mt-5 text-sm sm:text-base font-bold text-fg leading-tight">
                {item.title}
              </h3>
              <p className="mt-1 sm:mt-2 text-xs leading-relaxed text-muted max-w-[200px]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
