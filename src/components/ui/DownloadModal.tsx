import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Smartphone, ArrowUpRight, CheckCircle2 } from 'lucide-react'

interface DownloadModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  subtitle?: string
}

const PLAY_STORE_URL =
  'https://play.google.com/store/apps/details?id=com.singleclick.agsolution&pcampaignid=web_share'
const APP_STORE_URL =
  'https://apps.apple.com/in/app/single-clik/id6741411619'

export const DownloadModal = ({
  isOpen,
  onClose,
  title = 'Download Single Clik App',
  subtitle = 'Available on iOS and Android. Connect with verified businesses and get things done securely.',
}: DownloadModalProps) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Card */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="download-modal-title"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900"
          >
            {/* Top decorative gradient ambient */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-blue-500/15 blur-2xl" />
            <div className="pointer-events-none absolute -left-12 -bottom-12 h-40 w-40 rounded-full bg-sky-400/15 blur-2xl" />

            {/* Close Cross Mark Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-white cursor-pointer shadow-sm"
              aria-label="Close download popup"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Modal Header */}
            <div className="text-center sm:text-left">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand to-accent-blue text-white shadow-lg shadow-brand/25 mb-4">
                <Smartphone className="h-6 w-6" />
              </div>
              <h3
                id="download-modal-title"
                className="text-xl sm:text-2xl font-extrabold text-fg tracking-tight"
              >
                {title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Download Options */}
            <div className="mt-6 flex flex-col gap-3.5">
              {/* Google Play Option */}
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Download Single Clik on Google Play Store"
                className="group relative flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition-all duration-200 hover:border-brand/40 hover:bg-brand-softer/40 hover:shadow-md active:scale-[0.98] dark:border-slate-800 dark:bg-slate-800/60 dark:hover:bg-slate-800"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black shadow-sm group-hover:scale-105 transition-transform duration-200">
                    <img
                      src="/icons/icons8-google-play-48.png"
                      alt="Google Play icon"
                      width={32}
                      height={32}
                      className="h-7 w-7 object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                      GET IT ON
                    </div>
                    <div className="text-base font-bold text-fg">Google Play</div>
                    <div className="text-[11px] text-muted">For Android phones & tablets</div>
                  </div>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200/70 text-slate-700 transition-colors group-hover:bg-brand group-hover:text-white dark:bg-slate-700 dark:text-slate-200">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </a>

              {/* Apple App Store Option */}
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Download Single Clik on Apple App Store"
                className="group relative flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition-all duration-200 hover:border-brand/40 hover:bg-brand-softer/40 hover:shadow-md active:scale-[0.98] dark:border-slate-800 dark:bg-slate-800/60 dark:hover:bg-slate-800"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-black shadow-sm group-hover:scale-105 transition-transform duration-200">
                    <img
                      src="/icons/appstore.svg"
                      alt="Apple App Store icon"
                      width={32}
                      height={32}
                      className="h-7 w-7 object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                      Download on the
                    </div>
                    <div className="text-base font-bold text-fg">App Store</div>
                    <div className="text-[11px] text-muted">For iPhone & iPad</div>
                  </div>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200/70 text-slate-700 transition-colors group-hover:bg-brand group-hover:text-white dark:bg-slate-700 dark:text-slate-200">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </a>
            </div>

            {/* Trust highlights */}
            <div className="mt-6 flex items-center justify-center gap-3 pt-2 text-[11px] font-medium text-muted">
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Free Download
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> Verified Businesses
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
