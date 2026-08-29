import type { ReactNode } from 'react'

/**
 * <Heading /> — semantic heading component.
 *
 * Use this rather than raw <h1>..<h6> so the visual size is independent of
 * the document outline. Pass `level` to choose the semantic rank; the
 * `size` prop then controls the visual scale.
 *
 * Document-outline rules enforced:
 *   - Exactly one <Heading level="h1" /> per page (rendered by the page
 *     component, not the layout).
 *   - Headings should never skip levels (h1 -> h3) for accessibility.
 */
export interface HeadingProps {
  /** Document outline level. Defaults to "h2". */
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /** Visual size, independent of semantic level. */
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  /** Render a different tag than the semantic level (e.g. styled card title). */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
  children: ReactNode
  id?: string
}

const sizeMap: Record<NonNullable<HeadingProps['size']>, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
}

export const Heading = ({
  level = 'h2',
  size = 'xl',
  as,
  className = '',
  children,
  id,
}: HeadingProps) => {
  const Tag = (as ?? level) as 'h1'
  return (
    <Tag id={id} className={`font-semibold tracking-tight text-fg ${sizeMap[size]} ${className}`}>
      {children}
    </Tag>
  )
}
