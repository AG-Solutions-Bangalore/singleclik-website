import { motion } from 'framer-motion'
import { Lock, ShieldCheck, Users, Sparkles } from 'lucide-react'
import { ASSETS, ABOUT_PILLARS } from '../constant'

export const AboutSection = () => {
  return (
    <section
      id="about"
      aria-label="About Single Click"
      className="relative py-16 lg:py-24 bg-surface/50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6"
          >
            <span
              className="text-xs font-bold uppercase tracking-wider text-brand"
              title="About Single Click"
            >
              ABOUT US
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-fg sm:text-4xl lg:text-[40px] lg:leading-tight">
              Bridging People & Businesses
              <br />
              for a Smarter Tomorrow
            </h2>

            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Single Click was built with a simple idea – make connections easy, private, and
              effective. We empower businesses to grow and help people find the right services
              without the hassle of sharing personal contact details.
            </p>

            {/* 3 Pillars - Clean icon-first row matching reference design */}
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {ABOUT_PILLARS.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.1 }}
                  className="flex items-start gap-3"
                  title={`${pillar.title} - ${pillar.description}`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-semibold shadow-sm ${pillar.color}`}
                  >
                    {pillar.icon === 'lock' && <Lock className="h-4 w-4" aria-hidden="true" />}
                    {pillar.icon === 'shield-check' && <ShieldCheck className="h-4 w-4" aria-hidden="true" />}
                    {pillar.icon === 'users' && <Users className="h-4 w-4" aria-hidden="true" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-fg leading-snug">{pillar.title}</h3>
                    <p className="mt-0.5 text-xs text-muted leading-snug">{pillar.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Visual Image with Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 24 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative flex items-center justify-center lg:col-span-6"
          >
            {/* Background decoration */}
            <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-brand/10 to-accent-indigo/10 blur-xl -z-10" />
            <div className="subtle-dots absolute -bottom-6 -right-6 h-32 w-32 rounded-full opacity-40 pointer-events-none" />

            <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border/80 bg-bg p-2 shadow-2xl">
              <img
                src={ASSETS.about}
                alt="Single Click Community - Bridging People and Verified Businesses"
                title="Empowering Connections with Single Click"
                width="600"
                height="500"
                loading="lazy"
                decoding="async"
                className="w-full rounded-2xl object-cover"
                onError={(e) => {
                  e.currentTarget.src =
                    'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=80'
                }}
              />

              {/* Floating Center Single Click Logo */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand to-accent-blue text-white font-bold text-xl shadow-xl shadow-brand/40 ring-4 ring-bg"
                title="Single Click Logo"
              >
                S
              </motion.div>

              {/* Floating Badge Top Right */}
              <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
                className="absolute top-6 right-6 hidden sm:flex items-center gap-2 rounded-full border border-border bg-bg/95 px-3.5 py-1.5 shadow-lg backdrop-blur-md"
                title="Empowering Connections"
              >
                <Sparkles className="h-3.5 w-3.5 text-accent-purple" aria-hidden="true" />
                <span className="text-xs font-semibold text-fg">Empowering Connections</span>
              </motion.div>

              {/* Floating Badge Bottom Left */}
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute bottom-6 left-6 hidden sm:flex items-center gap-2.5 rounded-2xl border border-border bg-bg/95 p-3 shadow-xl backdrop-blur-md"
                title="Building Connections, Creating Opportunities"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand text-white font-bold text-xs">
                  S
                </div>
                <div>
                  <div className="text-xs font-bold text-fg">Building Connections</div>
                  <div className="text-[10px] text-muted">Creating Opportunities</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
