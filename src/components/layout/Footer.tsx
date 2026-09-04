import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp, Globe } from 'lucide-react'
import { ASSETS, FOOTER_SECTIONS } from '@/features/home/constant'
import { StoreBadge } from '@/components/ui/store-badge'

export const Footer = () => {
  const [showGoTop, setShowGoTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowGoTop(true)
      } else {
        setShowGoTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      role="contentinfo"
      className="relative border-t border-slate-800 bg-[#0A0F1D] text-slate-300 transition-colors"
    >
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-6 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
          {/* Brand & Description (full on mobile, 2 cols on desktop) */}
          <div className="flex flex-col items-start lg:col-span-2">
            <a href="/" title="Single Clik" aria-label="Single Clik Homepage" className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <img
                src={ASSETS.logo}
                alt="Single Clik Official Logo"
                title="Single Clik"
                width="44"
                height="44"
                loading="lazy"
                decoding="async"
                className="h-9 w-9 sm:h-11 sm:w-11 object-contain shrink-0"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <span className="font-brand-logo text-xl sm:text-2xl font-bold tracking-tight text-white whitespace-nowrap">
                Single <span className="text-brand">Clik</span>
              </span>
            </a>

            <p className="mt-3 text-xs leading-relaxed text-slate-300 max-w-sm">
              Connecting people and businesses, getting things done – the smart way.
            </p>

            {/* Social Icons (Facebook, Instagram, LinkedIn) */}
            <div className="mt-4 sm:mt-6 flex items-center gap-2.5" aria-label="Social Media Channels">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61594009292985"
                target="_blank"
                rel="noopener noreferrer"
                className="apple-border-shine flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/80 text-slate-300 transition hover:bg-brand hover:text-white"
                aria-label="Visit Single Clik on Facebook"
                title="Facebook"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/singleclik_official?igsi=MW9veGViNWhjZzQ0"
                target="_blank"
                rel="noopener noreferrer"
                className="apple-border-shine flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/80 text-slate-300 transition hover:bg-accent-pink hover:text-white"
                aria-label="Visit Single Clik on Instagram"
                title="Instagram"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#linkedin"
                className="apple-border-shine flex h-8 w-8 items-center justify-center rounded-full bg-slate-800/80 text-slate-300 transition hover:bg-brand hover:text-white"
                aria-label="Visit Single Clik on LinkedIn"
                title="LinkedIn"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns (3 columns on all screen sizes) */}
          <div className="grid grid-cols-3 gap-2 sm:gap-6 lg:col-span-3">
            {FOOTER_SECTIONS.map((section) => (
              <div key={section.title} className="flex flex-col items-start">
                <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-200">
                  {section.title}
                </h3>
                <ul className="mt-2.5 space-y-1.5 text-xs">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        title={link.href === '#hero' ? 'SingleClik Homepage Hero Section' : link.label}
                        className="text-slate-400 hover:text-white transition-colors text-[11px] sm:text-xs block"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Centered App Download Badges Row */}
        <div className="mt-5 sm:mt-7 flex flex-nowrap items-center justify-center gap-2 sm:gap-3 w-full" aria-label="Download our mobile app">
          <StoreBadge
            store="play"
            iconSize="sm"
            imgAlt="Install SingleClik app from Google Play"
            imgTitle="Install SingleClik from Google Play"
          />
          <StoreBadge
            store="app"
            iconSize="sm"
            imgAlt="Install SingleClik app from Apple App Store"
            imgTitle="Install SingleClik from Apple App Store"
          />
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-slate-800/80 pt-4 text-xs text-slate-300 sm:flex-row">
          <p>© 2024 Single Clik. All rights reserved.</p>

          <div className="flex items-center gap-4 sm:mr-18">
            <button
              type="button"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Language selection"
            >
              <Globe className="h-3.5 w-3.5" aria-hidden="true" />
              <span>English ▾</span>
            </button>
          </div>
        </div>
      </div>

      {/* Fixed Floating Go To Top Button */}
      <AnimatePresence>
        {showGoTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 16 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={scrollToTop}
            className="fixed bottom-7 right-7 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white shadow-[0_10px_28px_rgba(37,99,235,0.45)] ring-4 ring-white/20 transition-all hover:bg-brand-hover hover:shadow-[0_14px_34px_rgba(37,99,235,0.6)] focus:outline-none"
            aria-label="Back to top of page"
            title="Back to top"
          >
            <ArrowUp className="h-6 w-6 stroke-[2.5]" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  )
}


