import { useState } from 'react'
import { motion } from 'framer-motion'
import { ASSETS } from '../constant'
import { StoreBadge } from '@/components/ui/store-badge'
import { DownloadModal } from '@/components/ui/DownloadModal'

export const CtaBannerSection = () => {
  const [downloadModal, setDownloadModal] = useState<{
    isOpen: boolean
    title: string
    subtitle: string
  }>({
    isOpen: false,
    title: '',
    subtitle: '',
  })

  const openDownload = (type: 'customer' | 'business') => {
    if (type === 'customer') {
      setDownloadModal({
        isOpen: true,
        title: 'Download Single Clik App',
        subtitle:
          'Get the app to search verified services, send enquiries, and chat securely without sharing your phone number.',
      })
    } else {
      setDownloadModal({
        isOpen: true,
        title: 'Join Single Clik for Business',
        subtitle:
          'Download the app to register your business, receive client enquiries directly, and grow your revenue.',
      })
    }
  }

  return (
    <section
      id="cta"
      aria-label="Ready to Get Started Call to Action"
      className="py-6 lg:py-8 bg-bg"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl bg-[#2563EB] px-5 pt-8 pb-0 sm:px-12 sm:pt-12 lg:px-14 lg:pt-10 lg:pb-8 text-white shadow-2xl"
        >
          {/* Ambient glow backgrounds */}
          <div className="absolute top-0 right-0 -mt-16 -mr-16 h-80 w-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -mb-16 -ml-16 h-80 w-80 rounded-full bg-blue-700/50 blur-3xl pointer-events-none" />

          {/* Sparkle decoration - desktop only */}
          <div className="pointer-events-none absolute right-32 top-6 hidden lg:block">
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M20 30 L23 38 L31 41 L23 44 L20 52 L17 44 L9 41 L17 38 Z" fill="white" opacity="0.35" />
              <path d="M80 18 L82 24 L88 26 L82 28 L80 34 L78 28 L72 26 L78 24 Z" fill="white" opacity="0.4" />
              <path d="M55 70 L58 78 L66 81 L58 84 L55 92 L52 84 L44 81 L52 78 Z" fill="white" opacity="0.3" />
              <circle cx="100" cy="60" r="3" fill="white" opacity="0.5" />
              <circle cx="15" cy="80" r="2" fill="white" opacity="0.6" />
              <circle cx="90" cy="95" r="2.5" fill="white" opacity="0.45" />
            </svg>
          </div>

          <div className="relative grid items-center gap-6 lg:grid-cols-12 lg:gap-4 lg:h-[160px]">
            {/* Left Content: Title, Subtitle, Action Buttons (desktop: no badges here) */}
            <div className="flex flex-col items-start pb-4 sm:pb-10 lg:pb-0 lg:col-span-5 z-10">
              <h2 className="text-2xl font-extrabold tracking-tight sm:text-4xl lg:text-[32px] lg:leading-tight text-white">
                Ready to Get Started?
              </h2>
              <p className="mt-2.5 text-xs text-blue-100 sm:text-base max-w-md">
                Join thousands of users who are already getting things done.
              </p>

              {/* Action Buttons */}
              <div className="mt-6 grid grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-row sm:gap-3 w-full">
                <button
                  type="button"
                  onClick={() => openDownload('customer')}
                  title="Download Single Clik app to find services"
                  aria-label="I Need a Service"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-3 sm:px-6 py-2.5 text-xs sm:text-sm font-bold text-brand shadow-md transition hover:bg-slate-50 active:scale-95 text-center cursor-pointer"
                >
                  <span>I Need a Service</span>
                </button>

                <button
                  type="button"
                  onClick={() => openDownload('business')}
                  title="Download Single Clik app to join as a verified business"
                  aria-label="Join as Business"
                  className="inline-flex items-center justify-center rounded-lg border border-white/70 bg-transparent px-3 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold text-white transition hover:bg-white/10 active:scale-95 text-center cursor-pointer"
                >
                  <span>Join as Business</span>
                </button>
              </div>

              {/* App store badges — mobile only (below CTA buttons, now in 1 line) */}
              <div className="mt-4 sm:mt-5 flex flex-nowrap items-center gap-2 sm:gap-3 w-full sm:w-auto lg:hidden">
                <StoreBadge
                  store="play"
                  iconSize="sm"
                  imgAlt="Get the SingleClik app from Google Play"
                  imgTitle="SingleClik Google Play App"
                  className="flex-1 sm:flex-initial justify-center"
                />
                <StoreBadge
                  store="app"
                  iconSize="sm"
                  imgAlt="Get the SingleClik app from Apple App Store"
                  imgTitle="SingleClik Apple App Store"
                  className="flex-1 sm:flex-initial justify-center"
                />
              </div>
            </div>

            {/* Center Column: Store Badges — desktop only */}
            <div className="hidden lg:flex lg:col-span-4 items-center justify-start gap-3 z-10">
              <StoreBadge
                store="play"
                iconSize="sm"
                imgAlt="Download SingleClik mobile app from Google Play"
                imgTitle="SingleClik Mobile App – Google Play"
              />
              <StoreBadge
                store="app"
                iconSize="sm"
                imgAlt="Download SingleClik mobile app from App Store"
                imgTitle="SingleClik Mobile App – App Store"
              />
            </div>

            {/* Right Column: Character Illustration */}
            <div className="flex items-end justify-center lg:col-span-3 lg:relative lg:h-full">
              <div className="relative flex items-end justify-center -mb-1 sm:-mb-2 lg:absolute lg:-bottom-12 lg:-right-12 lg:mb-0 shrink-0 pointer-events-none select-none max-sm:w-full max-sm:mt-2">
                <img
                  src={ASSETS.app}
                  alt="Single Click Community Collaboration"
                  title="Get things done with Single Click"
                  loading="lazy"
                  decoding="async"
                  className="h-40 sm:h-64 md:h-72 lg:h-[190px] xl:h-[210px] w-auto max-w-full sm:max-w-none object-contain object-bottom drop-shadow-2xl"
                  onError={(e) => {
                    e.currentTarget.src = ASSETS.about
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Download Modal Popup */}
      <DownloadModal
        isOpen={downloadModal.isOpen}
        onClose={() => setDownloadModal((prev) => ({ ...prev, isOpen: false }))}
        title={downloadModal.title}
        subtitle={downloadModal.subtitle}
      />
    </section>
  )
}