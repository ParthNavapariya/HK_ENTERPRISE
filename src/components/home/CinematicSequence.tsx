import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ProductVisual from "../ui/ProductVisual"

gsap.registerPlugin(ScrollTrigger)

interface Chapter {
  num: string
  tag: string
  title: string
  copy: string
}

const chapters: Chapter[] = [
  {
    num: "01",
    tag: "FORM",
    title: "Solid 90° Joint.",
    copy: "Hydraulic stamped 3.0mm cold-rolled steel with reinforced gusset bend for zero-flex structural stability.",
  },
  {
    num: "02",
    tag: "DETAIL",
    title: "5 Aani Capsule Slot.",
    copy: "Engineered capsule hole with precision bolt alignment allows smooth micro-adjustment and rattle-free lockup.",
  },
  {
    num: "03",
    tag: "ENDURANCE",
    title: "Built for 300+ kg.",
    copy: "Deep zinc passivated finish resists corrosion, wear, and heavy dynamic loads on bed and modular frames.",
  },
  {
    num: "04",
    tag: "SYSTEM",
    title: "Modular Integration.",
    copy: "Engineered for rapid knock-down assembly across commercial furniture and heavy architectural joinery.",
  },
]

export default function CinematicSequence() {
  const sequenceRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const [activeChapter, setActiveChapter] = useState(0)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia()

      media.add(
        {
          isDesktop:
            "(min-width: 1025px) and (prefers-reduced-motion: no-preference)",
          isTablet:
            "(min-width: 769px) and (max-width: 1024px) and (prefers-reduced-motion: no-preference)",
          isMobile:
            "(max-width: 768px) and (prefers-reduced-motion: no-preference)",
          reducedMotion: "(prefers-reduced-motion: reduce)",
        },
        ({ conditions }) => {
          const { isDesktop, isTablet, isMobile, reducedMotion } =
            conditions as {
              isDesktop?: boolean
              isTablet?: boolean
              isMobile?: boolean
              reducedMotion?: boolean
            }

          if (reducedMotion) {
            gsap.set(".sequence-product", {
              scale: 1,
              xPercent: 0,
              yPercent: 0,
              rotate: 0,
            })
            gsap.set(".sequence-copy", { autoAlpha: 1, y: 0 })
            gsap.set(".sequence-progress i", { scaleX: 1 })
            return
          }

          const copies = gsap.utils.toArray<HTMLElement>(".sequence-copy")
          gsap.set(copies.slice(1), { autoAlpha: 0, y: isMobile ? 22 : 45 })
          gsap.set(copies[0], { autoAlpha: 1, y: 0 })
          gsap.set(".sequence-progress i", {
            scaleX: 0,
            transformOrigin: "left",
          })

          const getStartOffset = () => {
            if (isDesktop) return "top top"
            const navEl = document.querySelector<HTMLElement>(".nav")
            const navHeight = navEl
              ? navEl.offsetHeight
              : window.innerWidth <= 400
                ? 68
                : 76
            return `top ${navHeight}px`
          }

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: sequenceRef.current,
              start: () => getStartOffset(),
              end: () => `+=${isDesktop ? 3000 : isTablet ? 2000 : 1500}`,
              pin: true,
              scrub: isDesktop ? 1.0 : isTablet ? 0.7 : 0.45,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const p = self.progress
                let active = 0
                if (p < 0.28) active = 0
                else if (p < 0.58) active = 1
                else if (p < 0.86) active = 2
                else active = 3
                setActiveChapter((prev) =>
                  prev !== active ? active : prev,
                )
              },
            },
          })

          timelineRef.current = timeline

          // Stage 1 (01 / FORM)
          timeline
            .to(".sequence-product", {
              scale: isDesktop ? 1.25 : isTablet ? 1.15 : 1.06,
              xPercent: isDesktop ? -15 : isTablet ? 4 : 0,
              yPercent: 0,
              rotate: isDesktop ? 4 : isTablet ? 3 : 2,
              duration: 2,
            })
            .to(
              copies[0],
              { autoAlpha: 0, y: isMobile ? -16 : -35, duration: 0.45 },
              1.4,
            )
            .to(copies[1], { autoAlpha: 1, y: 0, duration: 0.55 }, 1.7)

          // Stage 2 (02 / DETAIL)
          timeline
            .to(
              ".sequence-product",
              {
                scale: isDesktop ? 1.65 : isTablet ? 1.35 : 1.18,
                xPercent: isDesktop ? 16 : isTablet ? 8 : 0,
                yPercent: isMobile ? -2 : -4,
                rotate: isDesktop ? -5 : isTablet ? -3 : -2,
                duration: 2,
              },
              2.1,
            )
            .to(".sequence-progress i", { scaleX: 0.34, duration: 1 }, 2)
            .to(
              copies[1],
              { autoAlpha: 0, y: isMobile ? -16 : -35, duration: 0.45 },
              3.6,
            )
            .to(copies[2], { autoAlpha: 1, y: 0, duration: 0.55 }, 3.9)

          // Stage 3 (03 / ENDURANCE)
          timeline
            .to(
              ".sequence-product",
              {
                scale: isDesktop ? 2.1 : isTablet ? 1.55 : 1.24,
                xPercent: isDesktop ? -5 : isTablet ? 5 : 0,
                yPercent: isMobile ? 3 : 6,
                rotate: isDesktop ? 3 : isTablet ? 2 : 1,
                duration: 2,
              },
              4.2,
            )
            .to(".sequence-progress i", { scaleX: 0.68, duration: 1 }, 4.1)
            .to(
              copies[2],
              { autoAlpha: 0, y: isMobile ? -16 : -35, duration: 0.45 },
              5.7,
            )
            .to(copies[3], { autoAlpha: 1, y: 0, duration: 0.55 }, 6.0)

          // Stage 4 (04 / SYSTEM)
          timeline
            .to(
              ".sequence-product",
              {
                scale: isDesktop ? 0.9 : isTablet ? 0.95 : 1.0,
                xPercent: isDesktop ? 18 : isTablet ? 2 : 0,
                yPercent: 0,
                rotate: 0,
                duration: 2,
              },
              6.2,
            )
            .to(".sequence-progress i", { scaleX: 1, duration: 1 }, 6.2)
        },
      )
    }, sequenceRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      className="sequence"
      ref={sequenceRef}
      aria-label="Interactive Product Study"
    >
      <div className="sequence-top">
        <div className="sequence-tag">
          <span className="sequence-tag-dot" />
          <span>STUDY • HK-BC-101</span>
        </div>

        <span className="sequence-top-counter">
          0{activeChapter + 1} — 04
        </span>
      </div>

      <div className="sequence-product">
        <ProductVisual
          category="Bed Clamp"
          image="/products/bed-clamp/bed-clamp-2-clean.jpg"
          productCode="HK-BC-101"
        />
      </div>

      <div className="sequence-copies">
        {chapters.map((ch) => (
          <article className="sequence-copy" key={ch.num}>
            <span>
              {ch.num} / {ch.tag}
            </span>
            <h2>{ch.title}</h2>
            <p>{ch.copy}</p>
          </article>
        ))}
      </div>

      <div
        className="sequence-progress"
        role="progressbar"
        aria-valuenow={(activeChapter + 1) * 25}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <i />
      </div>

      <div className="sequence-hint">
        <span>SCROLL TO EXPLORE CAMERA</span>
      </div>
    </section>
  )
}
