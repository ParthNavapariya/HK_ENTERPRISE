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
    title: "Extended 7” Profile.",
    copy: "Precision-engineered 7-inch structural clamp providing superior span and dual-point load distribution across bed corners.",
  },
  {
    num: "02",
    tag: "DETAIL",
    title: "Twin Capsule Slots.",
    copy: "Dual elongated capsule holes with 5 Aani precision hex bolts allow effortless micro-adjustment and rigid, squeak-free joinery.",
  },
  {
    num: "03",
    tag: "ENDURANCE",
    title: "Triple-Gauge Options.",
    copy: "Available in Light, Medium, and Heavy thickness options with deep white zinc plating for decades of rust resistance.",
  },
  {
    num: "04",
    tag: "SYSTEM",
    title: "Modular Integration.",
    copy: "Engineered for rapid knock-down assembly across heavy hydraulic beds, commercial frames, and modular furniture.",
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
          isDesktop: "(min-width: 1025px)",
          isTablet: "(min-width: 769px) and (max-width: 1024px)",
          isMobile: "(max-width: 768px)",
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
          gsap.set(copies.slice(1), { autoAlpha: 0, y: isMobile ? 24 : 48, filter: "blur(6px)" })
          gsap.set(copies[0], { autoAlpha: 1, y: 0, filter: "blur(0px)" })
          gsap.set(".sequence-progress i", {
            scaleX: 0,
            transformOrigin: "left",
          })
          gsap.set(".sequence-product", {
            transformPerspective: 1400,
            transformOrigin: "center center",
            rotateY: isDesktop ? -6 : -4,
            rotateX: 3,
            rotateZ: 0,
            scale: isDesktop ? 1.08 : 1.03,
            xPercent: isDesktop ? -6 : 0,
            yPercent: 0,
          })

          const timeline = gsap.timeline({
            defaults: { ease: "power2.inOut" },
            scrollTrigger: {
              trigger: sequenceRef.current,
              start: "top top",
              end: () => `+=${isDesktop ? 3200 : isTablet ? 2400 : 1800}`,
              pin: true,
              scrub: isDesktop ? 1.2 : isTablet ? 1.0 : 0.8,
              anticipatePin: 1,
              onUpdate: (self) => {
                const p = self.progress
                let active = 0
                if (p < 0.26) active = 0
                else if (p < 0.52) active = 1
                else if (p < 0.78) active = 2
                else active = 3
                setActiveChapter((prev) =>
                  prev !== active ? active : prev,
                )
              },
            },
          })

          timelineRef.current = timeline

          // Act 1: FORM (01) -> DETAIL (02)
          // Smooth camera swoop into the twin capsule slots & hex bolts
          timeline
            .to(
              copies[0],
              { autoAlpha: 0, y: isMobile ? -20 : -40, filter: "blur(6px)", duration: 1.0, ease: "power2.in" },
              1.8,
            )
            .to(
              ".sequence-product",
              {
                scale: isDesktop ? 1.62 : isTablet ? 1.38 : 1.22,
                xPercent: isDesktop ? 16 : isTablet ? 6 : 0,
                yPercent: isMobile ? -2 : -5,
                rotateY: isDesktop ? 15 : isTablet ? 10 : 6,
                rotateX: isDesktop ? -8 : isTablet ? -5 : -3,
                rotateZ: isDesktop ? 2 : isTablet ? 1 : 0,
                duration: 2.8,
                ease: "power2.inOut",
              },
              1.6,
            )
            .to(".sequence-progress i", { scaleX: 0.35, duration: 2.4, ease: "power1.inOut" }, 1.8)
            .to(
              copies[1],
              { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.0, ease: "power2.out" },
              2.6,
            )

          // Act 2: DETAIL (02) -> ENDURANCE (03)
          // Smooth 3D camera pan across heavy thickness gauge & zinc plating
          timeline
            .to(
              copies[1],
              { autoAlpha: 0, y: isMobile ? -20 : -40, filter: "blur(6px)", duration: 1.0, ease: "power2.in" },
              5.2,
            )
            .to(
              ".sequence-product",
              {
                scale: isDesktop ? 1.95 : isTablet ? 1.52 : 1.30,
                xPercent: isDesktop ? -10 : isTablet ? -3 : 0,
                yPercent: isMobile ? 3 : 5,
                rotateY: isDesktop ? -16 : isTablet ? -10 : -6,
                rotateX: isDesktop ? 10 : isTablet ? 7 : 4,
                rotateZ: isDesktop ? -2 : isTablet ? -1 : 0,
                duration: 2.8,
                ease: "power2.inOut",
              },
              5.0,
            )
            .to(".sequence-progress i", { scaleX: 0.70, duration: 2.4, ease: "power1.inOut" }, 5.2)
            .to(
              copies[2],
              { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.0, ease: "power2.out" },
              6.0,
            )

          // Act 3: ENDURANCE (03) -> SYSTEM (04)
          // Pull back to heroic full-assembly perspective
          timeline
            .to(
              copies[2],
              { autoAlpha: 0, y: isMobile ? -20 : -40, filter: "blur(6px)", duration: 1.0, ease: "power2.in" },
              8.6,
            )
            .to(
              ".sequence-product",
              {
                scale: isDesktop ? 1.02 : isTablet ? 0.98 : 1.0,
                xPercent: isDesktop ? 12 : isTablet ? 2 : 0,
                yPercent: 0,
                rotateY: 0,
                rotateX: 0,
                rotateZ: 0,
                duration: 2.8,
                ease: "power2.inOut",
              },
              8.4,
            )
            .to(".sequence-progress i", { scaleX: 1, duration: 2.4, ease: "power1.inOut" }, 8.6)
            .to(
              copies[3],
              { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1.0, ease: "power2.out" },
              9.4,
            )
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
          <span>STUDY • HK-BC-104</span>
        </div>

        <span className="sequence-top-counter">
          0{activeChapter + 1} — 04
        </span>
      </div>

      <div className="sequence-product">
        <ProductVisual
          category="Bed Clamp"
          image="/products/bed-clamp/bed-clamp-3.jpg"
          productCode="HK-BC-104"
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
