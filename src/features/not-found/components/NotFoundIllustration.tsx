interface Props {
  className?: string
}

/**
 * Inline SVG illustration for the 404 page.
 *
 * Shows a stylized "lost connection" scene: a paper plane flying away
 * from a broken chain link. Uses brand colors via `currentColor` and
 * the accent palette so it adapts to dark mode automatically.
 */
export const NotFoundIllustration = ({ className = '' }: Props) => (
  <svg
    className={className}
    viewBox="0 0 400 320"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Soft background blob */}
    <ellipse cx="200" cy="280" rx="140" ry="14" fill="currentColor" opacity="0.08" />

    {/* Broken link — left half */}
    <g transform="translate(80, 130)">
      <path
        d="M0 30 a30 30 0 0 1 30 -30 h40"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
        opacity="0.35"
      />
    </g>

    {/* Broken link — right half, slightly tilted */}
    <g transform="translate(220, 100) rotate(12)">
      <path
        d="M0 0 h40 a30 30 0 0 1 0 60 h-20"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="round"
        opacity="0.35"
      />
    </g>

    {/* Sparks where the chain broke */}
    <g transform="translate(195, 165)" className="text-accent-amber">
      <path
        d="M0 -20 L4 -4 L20 0 L4 4 L0 20 L-4 4 L-20 0 L-4 -4 Z"
        fill="currentColor"
      />
    </g>
    <g transform="translate(225, 145) scale(0.6)" className="text-accent-orange">
      <path
        d="M0 -20 L4 -4 L20 0 L4 4 L0 20 L-4 4 L-20 0 L-4 -4 Z"
        fill="currentColor"
      />
    </g>
    <g transform="translate(170, 195) scale(0.5)" className="text-accent-amber">
      <path
        d="M0 -20 L4 -4 L20 0 L4 4 L0 20 L-4 4 L-20 0 L-4 -4 Z"
        fill="currentColor"
      />
    </g>

    {/* Paper plane flying off (brand color) */}
    <g transform="translate(280, 60) rotate(-15)" className="text-brand">
      <path
        d="M0 0 L60 20 L20 25 L0 0 Z M60 20 L20 25 L25 50 Z"
        fill="currentColor"
        strokeLinejoin="round"
      />
      {/* Trail */}
      <path
        d="M0 0 Q-20 30 -10 60"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="2 4"
        fill="none"
        opacity="0.4"
      />
    </g>

    {/* Floating dots */}
    <circle cx="60" cy="80" r="4" className="fill-accent-blue" opacity="0.6" />
    <circle cx="340" cy="200" r="5" className="fill-accent-green" opacity="0.6" />
    <circle cx="80" cy="240" r="3" className="fill-accent-pink" opacity="0.6" />
    <circle cx="320" cy="60" r="3" className="fill-accent-purple" opacity="0.6" />
  </svg>
)
