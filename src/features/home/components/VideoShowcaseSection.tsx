import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Maximize, Sparkles } from 'lucide-react'

const VIDEO_SRC = 'https://singleclik.com/api/public/assets/images/web_images/add.mp4'
// Lightweight JPG poster so the slot renders instantly while the MP4 streams in.
// Replace with a real ~30–60KB frame grab from the video if you have one.
const VIDEO_POSTER =
  'https://singleclik.com/api/public/assets/images/web_images/add-poster.jpg'

const formatTime = (seconds: number): string => {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

export const VideoShowcaseSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)

  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isScrubbing, setIsScrubbing] = useState(false)
  const [hasEnded, setHasEnded] = useState(false)
  const [isBuffering, setIsBuffering] = useState(false)

  // 1) Lazy-load: only attach the video when the section is near the viewport.
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setShouldLoadVideo(true)
      return
    }
    const node = sectionRef.current
    if (!node) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShouldLoadVideo(true)
            io.disconnect()
            break
          }
        }
      },
      { rootMargin: '200px 0px', threshold: 0.01 },
    )
    io.observe(node)
    return () => io.disconnect()
  }, [])

  // 2) Wire native video events. We batch `timeupdate` into a single
  // rAF tick to avoid 4×/sec React re-renders of the whole section.
  useEffect(() => {
    if (!shouldLoadVideo) return
    const video = videoRef.current
    if (!video) return

    const tickProgress = () => {
      if (!isScrubbing) setCurrentTime(video.currentTime)
      rafRef.current = null
    }
    const scheduleTick = () => {
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(tickProgress)
    }

    const onLoaded = () => {
      setDuration(video.duration || 0)
      setIsBuffering(false)
      // Kick off autoplay once metadata is ready (browsers allow it because muted).
      void video.play().catch(() => {
        /* autoplay blocked — user can press play */
      })
    }
    const onPlay = () => {
      setIsPlaying(true)
      setHasEnded(false)
    }
    const onPause = () => setIsPlaying(false)
    const onEnded = () => {
      setIsPlaying(false)
      setHasEnded(true)
    }
    const onWaiting = () => setIsBuffering(true)
    const onPlaying = () => setIsBuffering(false)

    video.addEventListener('timeupdate', scheduleTick)
    video.addEventListener('loadedmetadata', onLoaded)
    video.addEventListener('durationchange', onLoaded)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('ended', onEnded)
    video.addEventListener('waiting', onWaiting)
    video.addEventListener('playing', onPlaying)

    return () => {
      video.removeEventListener('timeupdate', scheduleTick)
      video.removeEventListener('loadedmetadata', onLoaded)
      video.removeEventListener('durationchange', onLoaded)
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('waiting', onWaiting)
      video.removeEventListener('playing', onPlaying)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [shouldLoadVideo, isScrubbing])

  const togglePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused || video.ended) {
      void video.play()
    } else {
      video.pause()
    }
  }, [])

  const toggleMute = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }, [])

  const handleFullscreen = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (document.fullscreenElement) {
      void document.exitFullscreen()
    } else {
      void video.requestFullscreen()
    }
  }, [])

  const seekToRatio = useCallback((ratio: number) => {
    const video = videoRef.current
    if (!video || !Number.isFinite(video.duration)) return
    const clamped = Math.min(Math.max(ratio, 0), 1)
    video.currentTime = clamped * video.duration
    setCurrentTime(video.currentTime)
  }, [])

  const updateScrubFromEvent = useCallback(
    (clientX: number) => {
      const bar = progressRef.current
      if (!bar) return
      const rect = bar.getBoundingClientRect()
      const ratio = (clientX - rect.left) / rect.width
      seekToRatio(ratio)
    },
    [seekToRatio],
  )

  const onProgressPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!duration) return
    setIsScrubbing(true)
    updateScrubFromEvent(e.clientX)
    ;(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId)
  }

  const onProgressPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isScrubbing) return
    updateScrubFromEvent(e.clientX)
  }

  const onProgressPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsScrubbing(false)
    try {
      ;(e.currentTarget as HTMLDivElement).releasePointerCapture(e.pointerId)
    } catch {
      /* already released */
    }
  }

  const progressRatio = duration > 0 ? Math.min(currentTime / duration, 1) : 0

  return (
    <section
      ref={sectionRef}
      aria-label="Single Click Video Demo"
      className="py-6 lg:py-8 bg-bg"
    >
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0A1128] via-[#1C3FAA] to-[#161F6D] p-5 sm:p-7 lg:p-8 text-white shadow-2xl"
        >
          {/* Subtle background glow effect */}
          <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-brand/30 blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-accent-indigo/20 blur-3xl pointer-events-none" />

          <div className="relative grid items-center gap-6 lg:grid-cols-12">
            {/* Left Column: Text Content */}
            <div className="flex flex-col items-start lg:col-span-6">
              <span
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-xs font-medium text-blue-200 backdrop-blur-md"
                title="Single Click in Action"
              >
                <Sparkles className="h-3 w-3 text-blue-300" aria-hidden="true" />
                See Single Click in Action
              </span>

              <h2 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-[34px] lg:leading-tight">
                A Smarter Way to Connect
                <br />
                and Get Things Done
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-blue-100/80 sm:text-base">
                Watch how Single Click helps you connect with the right businesses, chat securely, and
                get your work done – all without sharing your personal contact.
              </p>

              <button
                type="button"
                onClick={togglePlay}
                title="Watch Single Click introductory video"
                aria-label={isPlaying ? 'Pause Product Video' : 'Watch Product Video'}
                className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/40 transition hover:bg-brand-hover active:scale-95"
              >
                <span>{isPlaying ? 'Pause Video' : hasEnded ? 'Replay Video' : 'Watch Video'}</span>
                {isPlaying ? (
                  <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
                ) : (
                  <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                )}
              </button>
            </div>

            {/* Right Column: Interactive Video Player */}
            <div className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-slate-950/80 shadow-2xl backdrop-blur-md">
                {/* Video Stage Area */}
                <div className="relative w-full bg-black">
                  {shouldLoadVideo ? (
                    <video
                      ref={videoRef}
                      src={VIDEO_SRC}
                      poster={VIDEO_POSTER}
                      preload="metadata"
                      muted
                      loop
                      playsInline
                      // @ts-expect-error - non-standard but widely supported
                      fetchpriority="low"
                      decoding="async"
                      className="block aspect-[21/9] w-full object-cover"
                      aria-label="Single Click product showcase video"
                    >
                      <track kind="captions" />
                    </video>
                  ) : (
                    // Reserve the exact same layout space while the video hasn't loaded.
                    <div
                      className="block aspect-[21/9] w-full bg-slate-900"
                      aria-hidden="true"
                    />
                  )}

                  {/* Lightweight buffering indicator (no spinner lib) */}
                  {shouldLoadVideo && isBuffering && !isPlaying && (
                    <div
                      className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30"
                      aria-live="polite"
                    >
                      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    </div>
                  )}
                </div>

                {/* Video Controls Bar */}
                <div className="flex items-center gap-3 border-t border-white/10 bg-black/70 px-4 py-2.5 text-slate-300">
                  <button
                    type="button"
                    onClick={togglePlay}
                    disabled={!shouldLoadVideo}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-200 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? (
                      <Pause className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                    )}
                  </button>

                  {/* Time display */}
                  <span className="shrink-0 font-mono text-[11px] tabular-nums text-slate-400">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>

                  {/* Scrubber progress bar */}
                  <div
                    ref={progressRef}
                    role="slider"
                    aria-label="Seek video"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(progressRatio * 100)}
                    onPointerDown={onProgressPointerDown}
                    onPointerMove={onProgressPointerMove}
                    onPointerUp={onProgressPointerUp}
                    onPointerCancel={onProgressPointerUp}
                    className="group relative flex h-6 flex-1 cursor-pointer items-center"
                  >
                    <div className="relative h-1 w-full rounded-full bg-white/15 transition-colors group-hover:bg-white/25">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-brand"
                        style={{ width: `${progressRatio * 100}%` }}
                      />
                      <div
                        className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow ring-2 ring-brand transition-opacity group-hover:opacity-100"
                        style={{ left: `${progressRatio * 100}%` }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={toggleMute}
                    disabled={!shouldLoadVideo}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-200 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
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
                    onClick={handleFullscreen}
                    disabled={!shouldLoadVideo}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-200 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                    aria-label="Toggle Fullscreen"
                    title="Fullscreen"
                  >
                    <Maximize className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}