import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize, Sparkles } from 'lucide-react'

export const VideoShowcaseSection = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  return (
    <section
      aria-label="Single Click Video Demo"
      className="py-12 lg:py-16 bg-bg"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0A1128] via-[#1C3FAA] to-[#161F6D] p-8 sm:p-12 lg:p-16 text-white shadow-2xl"
        >
          {/* Subtle background glow effect */}
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand/30 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-accent-indigo/20 blur-3xl pointer-events-none" />

          <div className="relative grid items-center gap-10 lg:grid-cols-12">
            {/* Left Column: Text Content */}
            <div className="flex flex-col items-start lg:col-span-6">
              <span
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-medium text-blue-200 backdrop-blur-md"
                title="Single Click in Action"
              >
                <Sparkles className="h-3 w-3 text-blue-300" aria-hidden="true" />
                See Single Click in Action
              </span>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-[38px] lg:leading-tight">
                A Smarter Way to Connect
                <br />
                and Get Things Done
              </h2>

              <p className="mt-4 text-sm leading-relaxed text-blue-100/80 sm:text-base">
                Watch how Single Click helps you connect with the right businesses, chat securely, and
                get your work done – all without sharing your personal contact.
              </p>

              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                title="Watch Single Click introductory video"
                aria-label={isPlaying ? 'Pause Product Video' : 'Watch Product Video'}
                className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/40 transition hover:bg-brand-hover active:scale-95"
              >
                <span>Watch Video</span>
                <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              </button>
            </div>

            {/* Right Column: Interactive Video Player Mockup */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-slate-950/80 shadow-2xl backdrop-blur-md">
                {/* Video Stage Area */}
                <div className="relative flex aspect-video w-full flex-col items-center justify-center bg-gradient-to-b from-slate-900 via-[#0B1536] to-slate-950 p-6">
                  {/* Central Logo */}
                  <div className="flex flex-col items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="group flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-brand to-accent-blue shadow-xl shadow-brand/40 transition-transform"
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="h-7 w-7 text-white" aria-hidden="true" />
                      ) : (
                        <Play className="h-7 w-7 text-white fill-current ml-1" aria-hidden="true" />
                      )}
                    </motion.button>
                    <span className="text-lg font-bold tracking-tight text-white drop-shadow">
                      Single <span className="text-blue-400">Click</span>
                    </span>
                  </div>
                </div>

                {/* Video Controls Bar */}
                <div className="flex items-center justify-between border-t border-white/10 bg-black/60 px-4 py-3 text-xs text-slate-300">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="text-slate-300 hover:text-white"
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                      )}
                    </button>
                    <span className="font-mono text-[11px] text-slate-400">0:00 / 1:35</span>
                  </div>

                  {/* Scrubber progress bar */}
                  <div className="mx-4 flex-1">
                    <div className="h-1.5 w-full rounded-full bg-white/20">
                      <motion.div
                        animate={{ width: isPlaying ? '65%' : '25%' }}
                        transition={{ duration: 1.5 }}
                        className="h-1.5 rounded-full bg-brand"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className="text-slate-300 hover:text-white"
                      aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <VolumeX className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Volume2 className="h-4 w-4" aria-hidden="true" />
                      )}
                    </button>
                    <button
                      type="button"
                      className="text-slate-300 hover:text-white"
                      aria-label="Toggle Fullscreen"
                      title="Fullscreen"
                    >
                      <Maximize className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
