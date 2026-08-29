import { motion } from 'framer-motion'
import { Check, ShieldCheck } from 'lucide-react'
import { ASSETS, PRIVACY_POINTS } from '../constant'

export const PrivacySection = () => {
  return (
    <section
      id="privacy"
      aria-label="Privacy and Security Standards"
      className="py-16 lg:py-24 bg-bg"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl border border-brand/15 bg-gradient-to-br from-brand-softer/60 via-bg to-brand-softer/30 p-8 sm:p-12 lg:p-16 dark:from-brand-soft/10 dark:via-surface dark:to-surface"
        >
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Column: 3D Shield / Security Illustration */}
            <div className="relative flex items-center justify-center lg:col-span-6">
              <div className="absolute -inset-8 rounded-full bg-brand/20 blur-3xl -z-10 pointer-events-none" />
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="relative flex w-full max-w-lg lg:max-w-xl items-center justify-center"
              >
                <img
                  src={ASSETS.privacy}
                  alt="Single Click Zero Phone Sharing Security Shield"
                  title="Your Privacy is Our Priority"
                  loading="lazy"
                  decoding="async"
                  className="w-full max-w-sm sm:max-w-md lg:max-w-lg h-auto aspect-auto drop-shadow-[0_20px_50px_rgba(37,99,235,0.25)] transition-transform duration-500 hover:scale-105 object-contain"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=80'
                  }}
                />
              </motion.div>
            </div>

            {/* Right Column: Benefits Checklist */}
            <div className="flex flex-col items-start lg:col-span-6">
              {/* Badge */}
              <div
                className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-softer px-4 py-1.5 text-xs font-semibold text-brand dark:bg-brand-soft/20"
                title="Why Choose Single Click"
              >
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Why Choose Single Click?</span>
              </div>

              {/* Heading */}
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
                Your Privacy. Our Priority.
              </h2>

              {/* Checklist */}
              <ul className="mt-6 space-y-3.5" aria-label="Privacy benefits list">
                {PRIVACY_POINTS.map((point, idx) => (
                  <motion.li
                    key={point}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-sm">
                      <Check className="h-3.5 w-3.5 stroke-[3]" aria-hidden="true" />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-fg/90">{point}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Action Button */}
              <button
                type="button"
                title="Learn more about Single Click's privacy architecture"
                aria-label="Learn More About Privacy"
                className="mt-8 inline-flex items-center justify-center rounded-lg bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-hover active:scale-95"
              >
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
