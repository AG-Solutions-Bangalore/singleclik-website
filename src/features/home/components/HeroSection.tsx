import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Search, Building2, ShieldCheck, Star, Sparkles, LayoutGrid } from 'lucide-react'
import { STATS } from '../constant'
import { Button } from '@/components/ui/Button'
import { StoreBadge } from '@/components/ui/store-badge'
import { DownloadModal } from '@/components/ui/DownloadModal'

import heroPhonesImg from '@/assets/hero-phones.png'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export const HeroSection = () => {
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
      id="hero"
      aria-label="Single Clik Hero Section"
      className="relative overflow-hidden pt-4 pb-6 lg:pt-8 lg:pb-8 bg-white dark:bg-[#0B1120]"
    >
      {/* Premium Blue Wave Background matching reference geometry */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none"
      >
        {/* Main Curved Organic Wave SVG (Desktop Only) - rich solid blue without lightblue haze */}
        <svg
          className="absolute right-0 top-0 h-full w-[70%] min-w-[680px] hidden lg:block"
          viewBox="0 0 1000 650"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Unified Rich Royal Blue Wave Gradient (Pure Blue, No lightblue wash) */}
            <linearGradient id="heroSingleBlueWave" x1="10%" y1="90%" x2="90%" y2="10%">
              <stop offset="0%" stopColor="#1E40AF" />
              <stop offset="30%" stopColor="#2563EB" />
              <stop offset="70%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>

            {/* Specular Edge Highlight Gradient */}
            <linearGradient id="waveHighlightGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Single Continuous Fluid Blue Wave (floating gracefully with deep coverage under phones) */}
          <path
            d="
              M 1000 60
              C 820 40, 650 160, 500 260
              C 380 340, 280 320, 250 400
              C 225 480, 270 545, 390 545
              C 530 550, 710 550, 850 525
              C 930 505, 975 465, 1000 420
              Z
            "
            fill="url(#heroSingleBlueWave)"
          />

          {/* Sleek Luminous Top-Edge Highlight */}
          <path
            d="
              M 250 400
              C 280 320, 380 340, 500 260
              C 650 160, 820 40, 1000 60
            "
            stroke="url(#waveHighlightGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
        </svg>

        {/* Right 3x6 Dot Matrix near image */}
        <div className="absolute right-[2%] top-[18%] lg:right-[3%] lg:top-[16%] z-1 grid grid-cols-3 gap-2.5 opacity-70 hidden md:grid">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="h-1.5 w-1.5 rounded-full bg-sky-400/80" />
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start lg:col-span-6"
          >
            {/* Pill Tag */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brand-softer px-4 py-1.5 text-xs font-bold text-brand-dark dark:bg-brand-soft/30 dark:text-white"
              title="All Your Needs, One Connection"
            >
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>All Your Needs, One Connection.</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="mt-5 text-4xl font-extrabold tracking-tight text-fg sm:text-5xl lg:text-[56px] lg:leading-[1.15]"
            >
              Connect. Collaborate.
              <br />
              <span className="bg-gradient-to-r from-brand to-accent-blue bg-clip-text text-transparent">
                Get Things Done.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="mt-5 text-base text-muted dark:text-slate-300 sm:text-lg lg:max-w-xl"
            >
              Single Click connects you with verified businesses and professionals without sharing your
              personal contact. Enquire, chat, and get things done – all in one secure platform.
            </motion.p>

            {/* Action Buttons to open download modal */}
            <motion.div variants={itemVariants} className="mt-8 flex flex-nowrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <Button
                type="button"
                onClick={() => openDownload('customer')}
                title="Download Single Clik to find verified services"
                aria-label="I'm Looking for a Service"
                variant="default"
                className="group flex-1 sm:flex-initial rounded-xl px-2.5 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm md:text-base font-semibold shadow-md shadow-brand/20 transition hover:shadow-lg hover:shadow-brand/30 active:scale-95 whitespace-nowrap h-10 sm:h-12 justify-center gap-1.5 sm:gap-2"
              >
                <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" aria-hidden="true" />
                <span className="whitespace-nowrap">I'm Looking for a Service</span>
              </Button>

              <Button
                type="button"
                onClick={() => openDownload('business')}
                title="Download Single Clik to join as a verified business"
                aria-label="I'm a Business"
                className="group flex-1 sm:flex-initial rounded-xl px-2.5 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm md:text-base font-semibold bg-white text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-sm transition hover:shadow active:scale-95 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 dark:border-slate-200 whitespace-nowrap h-10 sm:h-12 justify-center gap-1.5 sm:gap-2"
              >
                <Building2 className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-slate-800 dark:text-slate-900" aria-hidden="true" />
                <span className="whitespace-nowrap">I'm a Business</span>
              </Button>
            </motion.div>

            {/* App Store Download Badges */}
            <motion.div variants={itemVariants} className="mt-8 flex flex-nowrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <StoreBadge
                store="play"
                iconSize="md"
                imgAlt="Download SingleClik app on Google Play"
                imgTitle="Download SingleClik on Google Play"
                className="flex-1 sm:flex-initial justify-center"
              />
              <StoreBadge
                store="app"
                iconSize="md"
                imgAlt="Download SingleClik app on Apple App Store"
                imgTitle="Download SingleClik on App Store"
                className="flex-1 sm:flex-initial justify-center"
              />
            </motion.div>
          </motion.div>

          {/* Right Visual (Dual Phone Mockup + Backdrop Glow) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="relative z-20 flex items-center justify-center lg:col-span-6 mt-4 lg:mt-0"
          >
            {/* Mobile-Only: Fluid Sweeping Organic Wave matching desktop geometry */}
            <div className="pointer-events-none absolute inset-0 -mx-4 -my-2 sm:-mx-6 flex items-center justify-center lg:hidden -z-10 overflow-hidden select-none">
              <svg
                className="h-full w-full min-h-[400px] drop-shadow-[0_20px_45px_rgba(37,99,235,0.25)]"
                viewBox="0 0 600 520"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="heroMobileFluidWave" x1="10%" y1="90%" x2="90%" y2="10%">
                    <stop offset="0%" stopColor="#1E40AF" />
                    <stop offset="30%" stopColor="#2563EB" />
                    <stop offset="70%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>

                  <linearGradient id="mobileHighlightGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
                    <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Sweeping organic wave anchored from top right to bottom under phones */}
                <path
                  d="
                    M 600 40
                    C 480 20, 360 120, 260 200
                    C 160 280, 80 260, 40 340
                    C 10 410, 40 470, 160 480
                    C 280 490, 460 490, 600 460
                    Z
                  "
                  fill="url(#heroMobileFluidWave)"
                />

                {/* Specular Highlight along the top crest */}
                <path
                  d="
                    M 40 340
                    C 80 260, 160 280, 260 200
                    C 360 120, 480 20, 600 40
                  "
                  stroke="url(#mobileHighlightGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
              className="relative flex w-full max-w-xl items-center justify-center p-3 sm:p-5 lg:p-0"
            >
              {/* 1. Left of Phones (Placed on the blue wave slope, close to the phone image) */}
              <motion.div
                animate={{ y: [0, -7, 0], x: [0, 2, 0] }}
                transition={{ repeat: Infinity, duration: 6.5, ease: 'easeInOut' }}
                className="absolute left-[1%] top-[42%] sm:left-[0%] sm:top-[40%] lg:left-[-2%] lg:top-[42%] z-20 h-8 w-8 sm:h-8 sm:w-8 md:h-8 md:w-8 rounded-full bg-gradient-to-br from-white/95 via-sky-200/75 to-blue-500/85 shadow-[inset_-2px_-2px_6px_rgba(29,78,216,0.45),0_8px_20px_rgba(37,99,235,0.3)] backdrop-blur-[2px]"
              >
                <div className="absolute left-1.5 top-1.5 h-2 w-2 rounded-full bg-white/90 blur-[0.5px]" />
                <div className="absolute right-1.5 bottom-1.5 h-1 w-1 rounded-full bg-white/40" />
              </motion.div>

              {/* 2. Upper-Mid Right Sphere (Inside blue wave background) */}
              <motion.div
                animate={{ y: [0, 7, 0], x: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-[36%] right-[1%] sm:right-[1%] lg:right-[-1%] z-20 h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-gradient-to-br from-white/90 via-sky-200/70 to-blue-400/85 shadow-[inset_-2px_-2px_6px_rgba(29,78,216,0.35),0_8px_20px_rgba(59,130,246,0.25)] backdrop-blur-[2px]"
              >
                <div className="absolute top-1 left-1.5 h-2 w-2 rounded-full bg-white/90" />
              </motion.div>

              {/* 3. Lower Right Sphere (Inside blue wave background) */}
              <motion.div
                animate={{ y: [0, -7, 0], x: [0, -2, 0] }}
                transition={{ repeat: Infinity, duration: 7.5, ease: 'easeInOut', delay: 1.2 }}
                className="absolute bottom-[20%] right-[2%] sm:right-[2%] lg:right-[1%] z-20 h-6 w-6 sm:h-7 sm:w-7 rounded-full bg-gradient-to-br from-cyan-300 via-sky-200/70 to-blue-500 shadow-[inset_-2px_-2px_5px_rgba(29,78,216,0.4),0_8px_18px_rgba(59,130,246,0.3)] backdrop-blur-[2px]"
              >
                <div className="absolute top-1 left-1.5 h-1.5 w-1.5 rounded-full bg-white/90" />
              </motion.div>

              <img
                src={heroPhonesImg}
                alt="Single Clik Mobile Application displaying verified members and categories"
                title="Single Clik App Interface"
                width="1200"
                height="1000"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="relative z-10 h-auto w-full drop-shadow-[0_24px_60px_rgba(37,99,235,0.25)] transition-transform duration-500 hover:scale-[1.01]"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Metrics Floating Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto mt-8 max-w-5xl rounded-2xl border border-slate-100/80 dark:border-slate-800 bg-bg/95 p-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] backdrop-blur-sm sm:px-6 sm:py-4.5 lg:mt-10"
        >
          <div className="grid grid-cols-2 gap-4 sm:divide-y divide-border/60 sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
            {STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex items-center gap-3.5 ${idx === 0 ? 'pt-0 sm:pl-2' : 'pt-4 sm:pt-0 sm:pl-6'
                  }`}
              >
                <div
                  className={`apple-border-shine flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-bold ${stat.color}`}
                >
                  {stat.iconType === 'categories' && <LayoutGrid className="h-5 w-5" aria-hidden="true" />}
                  {stat.iconType === 'business' && <Building2 className="h-5 w-5" aria-hidden="true" />}
                  {stat.iconType === 'satisfaction' && <Star className="h-5 w-5 fill-current" aria-hidden="true" />}
                  {stat.iconType === 'shield' && <ShieldCheck className="h-5 w-5" aria-hidden="true" />}
                </div>
                <div>
                  <div className="text-xl font-extrabold tracking-tight text-fg sm:text-2xl">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-muted">{stat.label}</div>
                </div>
              </div>
            ))}
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
