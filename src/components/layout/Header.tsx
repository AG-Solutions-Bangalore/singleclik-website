import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Menu, X } from 'lucide-react'

import { ThemeToggle } from '@/components/ui/theme-toggle'
import { Button } from '@/components/ui/Button'
import { ASSETS } from '@/features/home/constant'

/**
 * Site header matching Single Click design
 */
export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  const navItems = [
    { to: '/', label: 'Home', end: true },
    { to: '#how-it-works', label: 'How It Works' },
    { to: '#features', label: 'Features' },
    { to: '#categories', label: 'Categories' },
    { to: '#pricing', label: 'Pricing' },
  ]

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 w-full border-b border-border/80 bg-bg/90 backdrop-blur-md transition-colors"
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link
          to="/"
          title="Single Click - Homepage"
          aria-label="Single Click Homepage"
          className="flex items-center gap-2.5 transition-transform hover:scale-[1.02]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand to-brand-light shadow-md shadow-brand/20">
            <img
              src={ASSETS.logo}
              alt="Single Click Official Logo"
              title="Single Click"
              width="28"
              height="28"
              loading="eager"
              decoding="async"
              className="h-7 w-7 object-contain drop-shadow-sm"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback')
                if (fallback) (fallback as HTMLElement).style.display = 'flex'
              }}
            />
            <span className="logo-fallback hidden text-lg font-bold text-white">S</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-fg">
            Single <span className="text-brand">Click</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav aria-label="Primary Navigation" className="hidden items-center gap-1 md:flex lg:gap-3">
          {navItems.map((item, index) => {
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
          <Button asChild variant="outline" size="sm">
            <a href="#login" title="Log in to your Single Click account" aria-label="Log In">
              Log In
            </a>
          </Button>
          <Button asChild variant="default" size="sm">
            <a href="#signup" title="Create a new Single Click account" aria-label="Sign Up">
              Sign Up
            </a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-fg hover:bg-surface-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5 text-fg" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-border bg-bg/95 px-4 pt-2 pb-6 backdrop-blur-lg md:hidden animate-in slide-in-from-top-4">
          <nav className="flex flex-col gap-2 pt-2">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-2.5 text-base font-medium text-fg transition hover:bg-surface-2 hover:text-brand"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#resources"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl px-4 py-2.5 text-base font-medium text-fg transition hover:bg-surface-2 hover:text-brand"
            >
              Resources
            </a>
            <div className="mt-4 flex flex-col gap-2.5 pt-4 border-t border-border">
              <a
                href="#login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-11 items-center justify-center rounded-full border border-border text-center font-medium text-fg"
              >
                Log In
              </a>
              <a
                href="#signup"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-11 items-center justify-center rounded-full bg-brand text-center font-semibold text-white shadow-md shadow-brand/20"
              >
                Sign Up
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

