import type { ReactNode } from 'react'
import { Heading } from './Heading'

/**
 * <Section /> — semantic <section> with built-in label.
 *
 * Wraps content in a <section aria-labelledby="..."> with an optional
 * heading. This gives screen readers a navigable outline without you
 * having to wire aria-labelledby manually.
 */
export interface SectionProps {
  id: string
  /** Visible label text. If omitted, the section is decorative / labeled by an inner element. */
  title?: string
  /** Sub-heading copy. */
  eyebrow?: string
  /** Semantic level of the section's title. */
  titleLevel?: 'h2' | 'h3'
  className?: string
  children: ReactNode
}

export const Section = ({
  id,
  title,
  eyebrow,
  titleLevel = 'h2',
  className = '',
  children,
}: SectionProps) => (
  <section
    id={id}
    aria-labelledby={title ? `${id}-title` : undefined}
    className={`mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8 ${className}`}
  >
    {(title || eyebrow) && (
      <header className="mb-6">
        {eyebrow && (
          <p className="text-sm font-medium uppercase tracking-wider text-brand">{eyebrow}</p>
        )}
        {title && (
          <Heading
            level={titleLevel}
            size={titleLevel === 'h2' ? '3xl' : '2xl'}
            id={`${id}-title`}
          >
            {title}
          </Heading>
        )}
      </header>
    )}
    {children}
  </section>
)
