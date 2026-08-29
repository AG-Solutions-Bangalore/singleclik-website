import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export interface QuickLinkCardProps {
  to: string
  label: string
  description: string
  icon: ReactNode
  /** Tint applied to the icon wrapper. Use one of the accent tokens. */
  accentClassName?: string
}

/**
 * A navigation card used in the 404 fallback to point users at
 * useful destinations. Visually a small tile with an icon, title,
 * description, and a directional arrow.
 */
export const QuickLinkCard = ({
  to,
  label,
  description,
  icon,
  accentClassName = 'bg-brand-soft text-brand',
}: QuickLinkCardProps) => (
  <Link
    to={to}
    className="group flex items-start gap-3 rounded-card border border-border bg-bg p-4 text-left transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
  >
    <span
      aria-hidden="true"
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-button ${accentClassName}`}
    >
      {icon}
    </span>
    <span className="flex-1 min-w-0">
      <span className="block text-sm font-semibold text-fg">{label}</span>
      <span className="mt-0.5 block text-xs text-muted">{description}</span>
    </span>
    <ArrowRight
      className="h-4 w-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-brand"
      aria-hidden="true"
    />
  </Link>
)
