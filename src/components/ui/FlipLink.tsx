/**
 * FlipLink — animated flip-text link/button
 * On hover: current text slides up, duplicate slides in from below.
 * Usage:
 *   <FlipLink href="#hero">I Need a Service</FlipLink>
 *   <FlipLink as="button" onClick={fn}>Click Me</FlipLink>
 */

type FlipLinkBaseProps = {
  children: string
  className?: string
}

type FlipLinkAnchorProps = FlipLinkBaseProps & {
  as?: 'a'
  href: string
  title?: string
  'aria-label'?: string
  onClick?: never
}

type FlipLinkButtonProps = FlipLinkBaseProps & {
  as: 'button'
  href?: never
  title?: string
  'aria-label'?: string
  onClick?: () => void
}

type FlipLinkProps = FlipLinkAnchorProps | FlipLinkButtonProps

const Inner = ({ children }: { children: string }) => (
  <span className="relative inline-block overflow-hidden h-[1.2em] leading-[1.2em]">
    <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
      {children}
    </span>
    <span className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
      {children}
    </span>
  </span>
)

export const FlipLink = ({
  as,
  href,
  children,
  className = '',
  title,
  'aria-label': ariaLabel,
  onClick,
}: FlipLinkProps) => {
  const base = `group inline-flex items-center justify-center overflow-hidden ${className}`

  if (as === 'button') {
    return (
      <button
        type="button"
        title={title}
        aria-label={ariaLabel}
        onClick={onClick}
        className={base}
      >
        <Inner>{children}</Inner>
      </button>
    )
  }

  return (
    <a href={href} title={title} aria-label={ariaLabel} className={base}>
      <Inner>{children}</Inner>
    </a>
  )
}
