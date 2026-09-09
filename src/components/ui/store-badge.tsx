interface StoreBadgeProps {
  /** "play" for Google Play, "app" for Apple App Store */
  store: 'play' | 'app'
  href?: string
  title?: string
  /** Visual size of the icon */
  iconSize?: 'sm' | 'md' | 'lg'
  className?: string
  imgAlt?: string
  imgTitle?: string
}

const playIcon = '/icons/icons8-google-play-48.png'
const appIcon = '/icons/appstore.svg'

const content = {
  play: {
    subtitle: 'GET IT ON',
    title: 'Google Play',
    icon: playIcon,
    alt: 'Download SingleClik app on Google Play',
    defaultTitle: 'Download SingleClik on Google Play',
    imgAlt: 'Download SingleClik app on Google Play',
    imgTitle: 'Download SingleClik on Google Play',
  },
  app: {
    subtitle: 'Download on the',
    title: 'App Store',
    icon: appIcon,
    alt: 'Download SingleClik app on Apple App Store',
    defaultTitle: 'Download SingleClik on App Store',
    imgAlt: 'Download SingleClik app on Apple App Store',
    imgTitle: 'Download SingleClik on App Store',
  },
} as const

const iconSizes = {
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-7 w-7',
} as const

/**
 * Black "Available on" badge with the official Google Play or Apple App Store
 * icon. Uses the SVG/PNG assets shipped in `/public/icons/`.
 */
export const StoreBadge = ({
  store,
  href,
  title,
  iconSize = 'md',
  className = '',
  imgAlt,
  imgTitle,
}: StoreBadgeProps) => {
  const c = content[store]
  const resolvedImgAlt = imgAlt ?? c.imgAlt
  const resolvedImgTitle = imgTitle ?? c.imgTitle
  const resolvedLinkTitle = title ?? resolvedImgTitle ?? c.defaultTitle

  const defaultHref =
    store === 'app'
      ? 'https://apps.apple.com/in/app/single-clik/id6741411619'
      : 'https://play.google.com/store/apps/details?id=com.singleclick.agsolution&pcampaignid=web_share'

  const targetHref = href ?? defaultHref
  const isExternal = targetHref.startsWith('http')

  return (
    <a
      href={targetHref}
      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      title={resolvedLinkTitle}
      aria-label={resolvedImgAlt}
      className={`group inline-flex items-center gap-2 sm:gap-2.5 rounded-xl border border-white/10 bg-black px-2.5 sm:px-4 py-1.5 sm:py-2 text-white shadow-md shadow-black/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-lg hover:shadow-black/30 active:scale-95 whitespace-nowrap shrink-0 ${className}`}
    >
      <img
        src={c.icon}
        alt={resolvedImgAlt}
        title={resolvedImgTitle}
        width={48}
        height={48}
        loading="lazy"
        decoding="async"
        className={`${iconSizes[iconSize]} shrink-0 object-contain`}
      />
      <div className="text-left leading-tight whitespace-nowrap">
        <div className="text-[8px] sm:text-[9px] font-medium uppercase tracking-wider text-slate-300">
          {c.subtitle}
        </div>
        <div className="mt-0.5 text-[11px] sm:text-xs font-semibold tracking-tight text-white">
          {c.title}
        </div>
      </div>
    </a>
  )
}
