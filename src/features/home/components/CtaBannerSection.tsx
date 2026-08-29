import { motion } from 'framer-motion'
import { ASSETS } from '../constant'
import { StoreBadge } from '@/components/ui/store-badge'

export const CtaBannerSection = () => {
  return (
    <section
      id="cta"
      aria-label="Ready to Get Started Call to Action"
      className="py-12 lg:py-16 bg-bg"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl bg-[#2563EB] px-5 pt-8 pb-0 sm:px-12 sm:pt-12 lg:px-14 text-white shadow-2xl"
        >
          {/* Ambient glow backgrounds */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 h-80 w-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-80 w-80 rounded-full bg-blue-700/50 blur-3xl pointer-events-none" />

          <div className="relative grid items-center gap-6 lg:grid-cols-12 lg:gap-8">
            {/* Left Content: Title, Subtitle, Action Buttons, and App Badges */}
            <div className="flex flex-col items-start pb-4 sm:pb-10 lg:pb-12 lg:col-span-7 z-10">
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-[40px] lg:leading-tight text-white">
                Ready to Get Started?
              </h2>
              <p className="mt-2.5 text-xs text-blue-100 sm:text-base max-w-md">
                Join thousands of users who are already getting things done.
              </p>

              {/* Action Buttons (2-col grid on phones, flex row on desktop) */}
              <div className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-row sm:gap-3 w-full">
                <a
                  href="#hero"
                  title="Find verified services on Single Click"
                  aria-label="I Need a Service"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-3 sm:px-6 py-2.5 text-xs sm:text-sm font-bold text-brand shadow-md transition hover:bg-slate-50 active:scale-95 text-center"
                >
                  <span>I Need a Service</span>
                </a>

                <a
                  href="#signup"
                  title="Join Single Click as a verified business"
                  aria-label="Join as Business"
                  className="inline-flex items-center justify-center rounded-lg border border-white/70 bg-transparent px-3 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-white/10 active:scale-95 text-center"
                >
                  <span>Join as Business</span>
                </a>
              </div>

              {/* App store download badges placed below CTA buttons */}
              <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-2.5 sm:gap-3">
                <StoreBadge store="play" iconSize="sm" />
                <StoreBadge store="app" iconSize="sm" />
              </div>
            </div>

            {/* Right Column: Character Illustration (Compact on phones, large on desktop) */}
            <div className="flex items-end justify-center lg:justify-end lg:col-span-5 self-end">
              <div className="relative flex items-end justify-center lg:justify-end -mb-1 sm:-mb-2 -mr-0 sm:-mr-6 lg:-mr-10 xl:-mr-12 shrink-0 pointer-events-none select-none max-sm:w-full max-sm:mt-2">
                <img
                  src={ASSETS.app}
                  alt="Single Click Community Collaboration"
                  title="Get things done with Single Click"
                  loading="lazy"
                  decoding="async"
                  className="h-40 sm:h-64 md:h-72 lg:h-[320px] xl:h-[360px] 2xl:h-[390px] w-auto max-w-full sm:max-w-none object-contain object-bottom drop-shadow-2xl"
                  onError={(e) => {
                    e.currentTarget.src = ASSETS.about
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
