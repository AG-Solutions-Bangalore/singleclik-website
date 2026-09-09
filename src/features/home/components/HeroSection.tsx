import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Search, Building2, Users, ShieldCheck, Briefcase, Star, Sparkles } from 'lucide-react'
import { ASSETS, STATS } from '../constant'
import { Button } from '@/components/ui/Button'
import { StoreBadge } from '@/components/ui/store-badge'
import { FlipLink } from '@/components/ui/FlipLink'


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
  const [activeTab, setActiveTab] = useState<'customer' | 'business'>('customer')

  return (
    <section
      id="hero"
      aria-label="Single Click Hero Section"
      className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24"
    >
      {/* Hero background — large blue curved blob (right side, matching reference) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 -z-10 h-full w-[55%] hidden lg:block"
      >
        <svg
          viewBox="0 0 700 700"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
          preserveAspectRatio="xMaxYMid slice"
        >
          <ellipse cx="520" cy="320" rx="380" ry="340" fill="url(#heroBlob)" />
          <defs>
            <radialGradient id="heroBlob" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#BFDBFE" stopOpacity="0.65" />
              <stop offset="55%" stopColor="#93C5FD" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Background radial glow + connection lines */}
      <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />
      <div className="hero-lines pointer-events-none absolute inset-0 -z-10 opacity-70 hidden md:block" />

      {/* Floating decorative spheres on the left side */}
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -14, 0], x: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
        className="pointer-events-none absolute left-[6%] top-[18%] -z-10 h-3 w-3 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 shadow-lg shadow-blue-400/40"
      />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut', delay: 0.6 }}
        className="pointer-events-none absolute left-[14%] bottom-[28%] -z-10 h-4 w-4 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400 shadow-lg shadow-cyan-400/40"
      />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut', delay: 1.2 }}
        className="pointer-events-none absolute left-[2%] bottom-[40%] -z-10 h-2 w-2 rounded-full bg-gradient-to-br from-sky-300 to-blue-500 shadow-md shadow-blue-400/40"
      />
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, 12, 0], x: [0, 4, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut', delay: 0.3 }}
        className="pointer-events-none absolute left-[22%] top-[40%] -z-10 h-3 w-3 rounded-full bg-gradient-to-br from-blue-200 to-cyan-400 shadow-md shadow-cyan-400/30"
      />

      {/* Connection lines + small dots (decorative network) on left side */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 hidden md:block"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMinYMid slice"
        fill="none"
      >
        <line x1="40" y1="120" x2="180" y2="200" stroke="rgba(96,165,250,0.35)" strokeWidth="1" />
        <line x1="120" y1="380" x2="260" y2="320" stroke="rgba(96,165,250,0.3)" strokeWidth="1" />
        <line x1="20" y1="320" x2="160" y2="280" stroke="rgba(147,197,253,0.35)" strokeWidth="1" />
        <circle cx="40" cy="120" r="2.5" fill="rgba(96,165,250,0.55)" />
        <circle cx="180" cy="200" r="2" fill="rgba(96,165,250,0.5)" />
        <circle cx="120" cy="380" r="2.5" fill="rgba(96,165,250,0.55)" />
        <circle cx="260" cy="320" r="2" fill="rgba(96,165,250,0.45)" />
      </svg>

      {/* Right-side dot grid (matching reference) */}
      <div className="subtle-dots pointer-events-none absolute right-[2%] top-[8%] -z-10 h-48 w-48 rounded-2xl opacity-80 hidden md:block" />
      <div className="subtle-dots pointer-events-none absolute right-[6%] bottom-[18%] -z-10 h-32 w-32 rounded-2xl opacity-70 hidden md:block" />

      {/* Right-side floating sphere */}
      <motion.div
        aria-hidden="true"
        animate={{ y: [0, -10, 0], x: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 7.5, ease: 'easeInOut', delay: 0.5 }}
        className="pointer-events-none absolute right-[10%] top-[20%] -z-10 h-3 w-3 rounded-full bg-gradient-to-br from-sky-200 to-blue-400 shadow-lg shadow-blue-300/40 hidden md:block"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              className="mt-5 text-base text-muted sm:text-lg lg:max-w-xl"
            >
              Single Click connects you with verified businesses and professionals without sharing your
              personal contact. Enquire, chat, and get things done – all in one secure platform.
            </motion.p>

            {/* Mode Selectors */}
            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                type="button"
                onClick={() => setActiveTab('customer')}
                title="Search and discover verified services"
                aria-label="I'm Looking for a Service"
                aria-pressed={activeTab === 'customer'}
                variant={activeTab === 'customer' ? 'default' : 'outline'}
                size="lg"
                className="group rounded-xl px-5 font-semibold"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                <FlipLink href="#hero" title="SingleClik Homepage Hero Section" className="font-semibold">
                  I'm Looking for a Service
                </FlipLink>
              </Button>

              <Button
                type="button"
                onClick={() => setActiveTab('business')}
                title="Join as a business or service provider"
                aria-label="I'm a Business"
                aria-pressed={activeTab === 'business'}
                variant={activeTab === 'business' ? 'default' : 'outline'}
                size="lg"
                className="group rounded-xl px-5 font-semibold"
              >
                <Building2 className="h-4 w-4" aria-hidden="true" />
                <FlipLink href="#signup" className="font-semibold">
                  I'm a Business
                </FlipLink>
              </Button>
            </motion.div>

            {/* App Store Download Badges */}
            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-3">
              <StoreBadge
                store="play"
                iconSize="md"
                imgAlt="Download SingleClik app on Google Play"
                imgTitle="Download SingleClik on Google Play"
              />
              <StoreBadge
                store="app"
                iconSize="md"
                imgAlt="Download SingleClik app on Apple App Store"
                imgTitle="Download SingleClik on App Store"
              />
            </motion.div>
          </motion.div>

          {/* Right Visual (Phone Mockup + Backdrop Glow) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="relative flex items-center justify-center lg:col-span-6"
          >
            {/* Background 3D Orb/Glow & Dots */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-brand/25 via-accent-cyan/20 to-transparent blur-3xl -z-10" />
            <div className="subtle-dots absolute -right-4 top-0 h-40 w-40 rounded-full opacity-60 pointer-events-none" />

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut' }}
              className="relative flex w-full max-w-lg items-center justify-center"
            >
              <img
                src={ASSETS.mobile}
                alt="Single Click Mobile Application displaying verified services and in-app chat"
                title="Single Click Mobile App Interface"
                width="1239"
                height="1269"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="relative z-10 h-auto w-full aspect-[1239/1269] drop-shadow-[0_24px_60px_rgba(37,99,235,0.22)] transition-transform duration-500 hover:scale-[1.01]"
                onError={(e) => {
                  const target = e.currentTarget
                  if (!target.dataset.triedFallback) {
                    target.dataset.triedFallback = 'true'
                    target.src = ASSETS.app
                  }
                }}
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
          className="mt-14 rounded-2xl border border-slate-100 dark:border-slate-800 bg-bg p-5 shadow-[0_10px_35px_rgba(0,0,0,0.05)] sm:p-6 lg:mt-18"
        >
          <div className="grid grid-cols-2 gap-4 sm:divide-y divide-border/60 sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
            {STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex items-center gap-3.5 ${
                  idx === 0 ? 'pt-0 sm:pl-2' : 'pt-4 sm:pt-0 sm:pl-6'
                }`}
              >
                <div
                  className={`apple-border-shine flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-bold ${stat.color}`}
                >
                  {stat.iconType === 'users' && <Users className="h-5 w-5" aria-hidden="true" />}
                  {stat.iconType === 'shield' && <ShieldCheck className="h-5 w-5" aria-hidden="true" />}
                  {stat.iconType === 'briefcase' && <Briefcase className="h-5 w-5" aria-hidden="true" />}
                  {stat.iconType === 'star' && <Star className="h-5 w-5 fill-current" aria-hidden="true" />}
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
    </section>
  )
}
