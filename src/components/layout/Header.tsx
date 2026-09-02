import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  CreditCard,
  HelpCircle,
  Home,
  LayoutGrid,
  Menu,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'

import { StoreBadge } from '@/components/ui/store-badge'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { ASSETS } from '@/features/home/constant'

/**
 * Site header with agency-grade responsive mobile sidebar
 */
export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll and close on Escape when mobile sidebar is open
  useEffect(() => {
    if (!mobileMenuOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [mobileMenuOpen])

  const desktopNavItems = [
    { to: '/', label: 'Home', end: true },
    { to: '#how-it-works', label: 'How It Works' },
    { to: '#features', label: 'Features' },
    { to: '#categories', label: 'Categories' },
    { to: '#pricing', label: 'Pricing' },
  ]

  const agencyNavItems = [
    {
      to: '/',
      label: 'Home',
      desc: 'Discover verified services',
      icon: Home,
      color: 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400',
    },
    {
      to: '#how-it-works',
      label: 'How It Works',
      desc: '5-step seamless flow',
      icon: Workflow,
      color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400',
    },
    {
      to: '#about',
      label: 'Why Single Click',
      desc: 'Zero phone sharing & trust',
      icon: Sparkles,
      color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400',
    },
    {
      to: '#categories',
      label: 'Top Categories',
      desc: '30+ verified service domains',
      icon: LayoutGrid,
      color: 'bg-orange-50 text-orange-600 dark:bg-orange-950/60 dark:text-orange-400',
    },
    {
      to: '#pricing',
      label: 'Pricing & Plans',
      desc: 'For users and verified businesses',
      icon: CreditCard,
      color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400',
    },
    {
      to: '#privacy',
      label: 'Privacy & Security',
      desc: 'Bank-grade encrypted chat',
      icon: ShieldCheck,
      color: 'bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400',
    },
    {
      to: '#faq',
      label: 'Help Center & FAQs',
      desc: '24/7 answers & support',
      icon: HelpCircle,
      color: 'bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400',
    },
  ]

  return (
    <>
      <header
        role="banner"
        className="sticky top-0 z-40 w-full border-b border-border/80 bg-bg/90 backdrop-blur-md transition-colors"
      >
        <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link
            to="/"
            title="Single Click - Homepage"
            aria-label="Single Click Homepage"
            className="flex items-center gap-2.5 transition-transform hover:scale-[1.02]"
          >
            <img
              src={ASSETS.logo}
              alt="Single Click Official Logo"
              title="Single Click"
              width="48"
              height="48"
              loading="eager"
              decoding="async"
              className="h-12 w-12 object-contain drop-shadow-sm"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback')
                if (fallback) (fallback as HTMLElement).style.display = 'flex'
              }}
            />
            <span className="logo-fallback hidden text-lg font-bold text-fg">S</span>
            <span className="text-xl font-bold tracking-tight text-fg">
              Single <span className="text-brand">Click</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav aria-label="Primary Navigation" className="hidden items-center gap-1 md:flex lg:gap-3">
            {desktopNavItems.map((item, index) => {
              const isHome = index === 0
              return (
                <a
                  key={item.label}
                  href={item.to}
                  title={item.label}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                    isHome
                      ? 'text-brand font-semibold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-brand after:rounded-full'
                      : 'text-slate-600 dark:text-slate-300 hover:text-brand'
                  }`}
                >
                  {item.label}
                </a>
              )
            })}

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setResourcesOpen(!resourcesOpen)}
                onBlur={() => setTimeout(() => setResourcesOpen(false), 200)}
                className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 transition-colors hover:text-brand"
                aria-expanded={resourcesOpen}
                aria-haspopup="true"
                title="View resources"
              >
                <span>Resources</span>
                <ChevronDown className="h-3.5 w-3.5 text-muted transition-transform duration-200" aria-hidden="true" />
              </button>
              {resourcesOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl border border-border bg-bg p-2 shadow-xl animate-in fade-in zoom-in-95 z-50">
                  <a
                    href="#about"
                    title="About Platform"
                    className="block rounded-xl px-3 py-2 text-sm text-fg/80 hover:bg-surface-2 hover:text-brand"
                  >
                    About Platform
                  </a>
                  <a
                    href="#faq"
                    title="Help Center and FAQs"
                    className="block rounded-xl px-3 py-2 text-sm text-fg/80 hover:bg-surface-2 hover:text-brand"
                  >
                    Help Center & FAQs
                  </a>
                  <a
                    href="#privacy"
                    title="Privacy and Trust"
                    className="block rounded-xl px-3 py-2 text-sm text-fg/80 hover:bg-surface-2 hover:text-brand"
                  >
                    Privacy & Trust
                  </a>
                </div>
              )}
            </div>
          </nav>

          {/* Action Buttons */}
          <div className="hidden items-center gap-3 md:flex">
            <ThemeToggle />
            <a
              href="#login"
              title="Log in to your Single Click account"
              aria-label="Log In"
              className="inline-flex items-center rounded-lg border border-border bg-bg px-4 py-2 text-sm font-semibold text-fg shadow-xs transition-all hover:border-brand/40 hover:text-brand hover:bg-brand-softer active:scale-95"
            >
              Log In
            </a>
            <a
              href="#signup"
              title="Create a new Single Click account"
              aria-label="Sign Up"
              className="group inline-flex items-center gap-1.5 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white shadow-md shadow-brand/25 transition-all hover:bg-brand-hover active:scale-95"
            >
              <span>Sign Up</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-[-45deg]" aria-hidden="true" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-fg transition-colors hover:bg-surface-2"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-sidebar"
            >
              <motion.span
                animate={mobileMenuOpen ? 'open' : 'closed'}
                variants={{
                  closed: { rotate: 0 },
                  open: { rotate: 180 },
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="flex h-5 w-5 items-center justify-center"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileMenuOpen ? (
                    <motion.span
                      key="x"
                      initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      transition={{ duration: 0.18 }}
                      className="absolute flex h-5 w-5 items-center justify-center"
                    >
                      <X className="h-5 w-5" />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                      transition={{ duration: 0.18 }}
                      className="absolute flex h-5 w-5 items-center justify-center"
                    >
                      <Menu className="h-5 w-5" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.span>
            </button>
          </div>
        </div>
      </header>

      {/* Agency-Level Mobile Drawer rendered into document.body */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-[99999] md:hidden">
                {/* Backdrop with frosted dark glass */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
                  aria-hidden="true"
                />

                {/* Sidebar Drawer Panel */}
                <motion.aside
                  id="mobile-sidebar"
                  initial={{ x: '-100%', opacity: 0.8 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: '-100%', opacity: 0.8 }}
                  transition={{ type: 'spring', stiffness: 340, damping: 34 }}
                  className="fixed inset-y-0 left-0 flex w-[88vw] max-w-[360px] flex-col border-r border-slate-200/80 bg-white/95 text-fg shadow-[25px_0_60px_rgba(0,0,0,0.3)] backdrop-blur-2xl dark:border-slate-800/90 dark:bg-[#0B1120]/95"
                  role="dialog"
                  aria-modal="true"
                  aria-label="Mobile navigation"
                >
                  {/* Subtle Top Ambient Glow */}
                  <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-brand/10 to-transparent pointer-events-none" />

                  {/* Sidebar Header */}
                  <div className="relative flex h-20 items-center justify-between border-b border-border/80 px-6">
                    <Link
                      to="/"
                      onClick={() => setMobileMenuOpen(false)}
                      title="Single Click - Homepage"
                      aria-label="Single Click Homepage"
                      className="flex items-center gap-3"
                    >
                      <img
                        src={ASSETS.logo}
                        alt="Single Click Official Logo"
                        title="Single Click"
                        width="48"
                        height="48"
                        className="h-12 w-12 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                      <div className="flex flex-col">
                        <span className="text-lg font-extrabold tracking-tight text-fg leading-none">
                          Single <span className="text-brand">Click</span>
                        </span>
                        <span className="mt-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                          ● Verified Platform
                        </span>
                      </div>
                    </Link>

                    {/* Close Button */}
                    <button
                      type="button"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-surface/80 text-fg transition-all hover:bg-surface-2 active:scale-95"
                      aria-label="Close menu"
                      title="Close menu"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Scrollable Navigation List */}
                  <nav className="relative flex-1 overflow-y-auto px-4 py-5 scrollbar-thin">
                    <div className="mb-2 px-2 text-[11px] font-bold uppercase tracking-wider text-muted">
                      Navigation
                    </div>

                    <div className="flex flex-col gap-1.5">
                      {agencyNavItems.map((item, idx) => {
                        const Icon = item.icon
                        return (
                          <motion.a
                            key={item.label}
                            href={item.to}
                            onClick={() => setMobileMenuOpen(false)}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.04 + idx * 0.035, duration: 0.25, ease: 'easeOut' }}
                            whileTap={{ scale: 0.98 }}
                            className="group flex items-center justify-between rounded-2xl border border-transparent p-2.5 transition-all hover:border-brand/20 hover:bg-brand-softer/50 dark:hover:bg-brand-soft/10"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-semibold shadow-xs transition-transform duration-300 group-hover:scale-105 ${item.color}`}
                              >
                                <Icon className="h-5 w-5" aria-hidden="true" />
                              </div>
                              <div className="flex flex-col text-left">
                                <span className="text-sm font-bold text-fg group-hover:text-brand transition-colors">
                                  {item.label}
                                </span>
                                <span className="text-[11px] text-muted line-clamp-1">
                                  {item.desc}
                                </span>
                              </div>
                            </div>

                            <ChevronRight
                              className="h-4 w-4 text-muted/60 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand"
                              aria-hidden="true"
                            />
                          </motion.a>
                        )
                      })}
                    </div>

                    {/* App Download Mini-Card in Sidebar */}
                    <div className="mt-5 rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/10 via-brand-softer/40 to-transparent p-4 dark:from-brand-soft/20 dark:via-surface-2 dark:to-transparent">
                      <div className="flex items-center gap-2 text-xs font-bold text-brand">
                        <Smartphone className="h-4 w-4" />
                        <span>Get Single Click App</span>
                      </div>
                      <p className="mt-1 text-[11px] text-muted">
                        Zero spam, privacy-safe quotes on iOS & Android.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <StoreBadge store="play" iconSize="sm" />
                        <StoreBadge store="app" iconSize="sm" />
                      </div>
                    </div>
                  </nav>

                  {/* Footer Actions (Sign Up & Log In) */}
                  <div className="relative border-t border-border/80 bg-surface/50 p-5 backdrop-blur-md">
                    <div className="flex flex-col gap-2.5">
                      <a
                        href="#signup"
                        onClick={() => setMobileMenuOpen(false)}
                        className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand font-bold text-white shadow-md shadow-brand/25 transition-all hover:bg-brand-hover active:scale-98"
                      >
                        <span>Join Single Click</span>
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </a>

                      <a
                        href="#login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex h-11 w-full items-center justify-center rounded-xl border border-border bg-bg font-semibold text-fg transition-all hover:bg-surface-2 active:scale-98"
                      >
                        <span>Sign In</span>
                      </a>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-muted">
                      <span>© 2024 Single Click</span>
                      <span className="text-brand font-medium">100% Private</span>
                    </div>
                  </div>
                </motion.aside>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  )
}
