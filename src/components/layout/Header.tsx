import { Link, NavLink } from 'react-router-dom'
import { env } from '@/lib/env'
import { ThemeToggle } from '@/components/ui/theme-toggle'

/**
 * Site header with semantic <header role="banner"> and primary nav.
 * Uses NavLink so the active link gets aria-current automatically.
 */
export const Header = () => (
  <header
    role="banner"
    className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur supports-backdrop-filter:bg-bg/60"
  >
    <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-fg">
        <span aria-hidden="true" className="inline-block h-2.5 w-2.5 rounded-full bg-brand" />
        {env.siteName}
      </Link>

      <div className="flex items-center gap-1 sm:gap-2">
        <nav aria-label="Primary" className="flex items-center gap-1 sm:gap-2">
          {[
            { to: '/', label: 'Home', end: true },
            { to: '/about', label: 'About' },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `rounded-md px-3 py-2 text-sm font-medium transition-colors ${isActive
                  ? 'bg-surface text-fg'
                  : 'text-muted hover:bg-surface hover:text-fg'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </div>
  </header>
)
