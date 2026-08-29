import { env } from '@/lib/env'

export const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer
      role="contentinfo"
      className="mt-16 border-t border-border bg-surface"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-2 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <p>© {year} {env.siteName}. All rights reserved.</p>
        <p>
          Built with Vite · React · Tailwind v4
        </p>
      </div>
    </footer>
  )
}
