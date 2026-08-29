import type { HTMLAttributes } from 'react'

export const Card = ({ className = '', ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`rounded-card border border-border bg-bg shadow-card ${className}`}
    {...rest}
  />
)
