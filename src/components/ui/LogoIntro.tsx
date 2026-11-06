import { useEffect, useRef, useState } from "react"
import gsap from "gsap"

interface LogoIntroProps {
  onIntroFinish?: () => void
}

// Module-level guard: strictly guarantees intro runs at most once in application lifecycle
let hasIntroEverStarted = false

export default function LogoIntro({ onIntroFinish }: LogoIntroProps) {
  const onIntroFinishRef = useRef(onIntroFinish)
  onIntroFinishRef.current = onIntroFinish

  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false
    // If already ran in this session or in this JS instance, skip immediately
    if (hasIntroEverStarted) return false
    if (sessionStorage.getItem("hk_intro_shown") === "true") return false
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem("hk_intro_shown", "true")
      return false
    }

    // Mark as started immediately to prevent any re-trigger on re-render/Strict Mode
    hasIntroEverStarted = true
    sessionStorage.setItem("hk_intro_shown", "true")
    return true
  })

  const overlayRef = useRef<HTMLDivElement>(null)
  const emblemRef = useRef<HTMLImageElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    if (!visible) {
      onIntroFinishRef.current?.()
      return
    }

    // Lock body scroll while intro animation plays
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = originalOverflow
          setVisible(false)
        },
      })
      timelineRef.current = tl

      // 1. Initial State Setup
      gsap.set(overlayRef.current, { opacity: 1 })
      gsap.set(glowRef.current, { opacity: 0, scale: 0.6 })
      gsap.set(emblemRef.current, {
        opacity: 0,
        scale: 0.82,
        y: 18,
        filter: "drop-shadow(0 0 0px rgba(201, 164, 76, 0))",
      })
      gsap.set(textRef.current, { opacity: 0, y: 14 })
      gsap.set(lineRef.current, { scaleX: 0, opacity: 0 })

      // 2. Cinematic Entrance Sequence
      tl
        // Ambient soft gold glow builds in background
        .to(glowRef.current, {
          opacity: 0.85,
          scale: 1,
          duration: 0.9,
          ease: "power2.out",
        })
        // Golden emblem smoothly scales up & floats into view with radiant glow
        .to(
          emblemRef.current,
          {
            opacity: 1,
            scale: 1,
            y: 0,
            filter: "drop-shadow(0 0 28px rgba(201, 164, 76, 0.45))",
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.75",
        )
        // Architectural divider line extends from center
        .to(
          lineRef.current,
          {
            scaleX: 1,
            opacity: 0.75,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.45",
        )
        // Typography fades in with expansive tracking
        .to(
          textRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.5",
        )
        // Elegant subtle resting shimmer hold
        .to(
          emblemRef.current,
          {
            filter: "drop-shadow(0 0 38px rgba(232, 213, 154, 0.65))",
            scale: 1.025,
            duration: 0.5,
            ease: "sine.inOut",
          },
          "+=0.15",
        )
        // 3. Cinematic Outro Transition into Homepage
        // Reveal homepage and start web entrance animations right as outro begins
        .to(
          [emblemRef.current, textRef.current, lineRef.current, glowRef.current],
          {
            opacity: 0,
            scale: 1.06,
            y: -10,
            duration: 0.5,
            ease: "power2.inOut",
          },
          "+=0.15",
        )
        .to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 0.55,
            ease: "power3.inOut",
            onStart: () => {
              // Trigger website entrance animations at this exact reveal moment
              onIntroFinishRef.current?.()
            },
          },
          "-=0.25",
        )
    }, overlayRef)

    return () => {
      document.body.style.overflow = originalOverflow
      ctx.revert()
    }
  }, [visible])

  // Allow clicking to immediately skip intro if desired
  const handleSkip = () => {
    if (timelineRef.current) {
      onIntroFinishRef.current?.()
      timelineRef.current.progress(1)
    }
  }

  if (!visible) return null

  return (
    <div
      ref={overlayRef}
      className="logo-intro-overlay"
      role="status"
      aria-live="polite"
      aria-label="Loading HK Enterprise"
      onClick={handleSkip}
    >
      <div className="logo-intro-container">
        {/* Cinematic ambient golden aura */}
        <div ref={glowRef} className="logo-intro-ambient-glow" />

        {/* Central Logo Emblem */}
        <div className="logo-intro-emblem-box">
          <img
            ref={emblemRef}
            src="/hk-emblem.png"
            alt="HK Enterprise Emblem"
            className="logo-intro-emblem-img"
          />
        </div>

        {/* Fine gold engineering line */}
        <div ref={lineRef} className="logo-intro-divider" />

        {/* Typography */}
        <div ref={textRef} className="logo-intro-brand-wrap">
          <span className="logo-intro-name">HK ENTERPRISE</span>
          <span className="logo-intro-tagline">Mfg. of Furniture Accessories</span>
        </div>
      </div>
    </div>
  )
}
