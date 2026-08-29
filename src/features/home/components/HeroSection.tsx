import { useState } from 'react'
import { motion, type Variants } from 'framer-motion'
import { Search, Building2, Users, ShieldCheck, Briefcase, Star, Sparkles } from 'lucide-react'
import { ASSETS, STATS } from '../constant'
import { Button } from '@/components/ui/Button'
import { StoreBadge } from '@/components/ui/store-badge'


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
      {/* Background radial glow */}
      <div className="hero-glow pointer-events-none absolute inset-0 -z-10" />

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
              className="inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand-softer px-4 py-1.5 text-xs font-semibold text-brand dark:bg-brand-soft/20"
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
                className="rounded-xl px-5 font-semibold"
              >
                <Search className="h-4 w-4" aria-hidden="true" />
                I'm Looking for a Service
              </Button>

              <Button
                type="button"
                onClick={() => setActiveTab('business')}
                title="Join as a business or service provider"
                aria-label="I'm a Business"
                aria-pressed={activeTab === 'business'}
                variant={activeTab === 'business' ? 'default' : 'outline'}
                size="lg"
                className="rounded-xl px-5 font-semibold"
              >
                <Building2 className="h-4 w-4" aria-hidden="true" />
                I'm a Business
              </Button>
            </motion.div>

            {/* App Store Download Badges */}
            <motion.div variants={itemVariants} className="mt-8 flex flex-wrap items-center gap-3">
              <StoreBadge store="play" iconSize="md" />
              <StoreBadge store="app" iconSize="md" />
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
                width="500"
                height="600"
                loading="eager"
                decoding="async"
                className="relative z-10 w-full drop-shadow-[0_24px_60px_rgba(37,99,235,0.22)] transition-transform duration-500 hover:scale-[1.01]"
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
          <div className="grid grid-cols-2 gap-4 divide-y divide-border/60 sm:grid-cols-4 sm:divide-y-0 sm:divide-x">
            {STATS.map((stat, idx) => (
              <div
                key={stat.label}
                className={`flex items-center gap-3.5 ${
                  idx === 0 ? 'pt-0 sm:pl-2' : 'pt-4 sm:pt-0 sm:pl-6'
                }`}
              >
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-bold ${stat.color}`}
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
