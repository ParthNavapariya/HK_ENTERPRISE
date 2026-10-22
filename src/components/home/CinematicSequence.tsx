import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import ProductVisual from "../ui/ProductVisual"

gsap.registerPlugin(ScrollTrigger)

export default function CinematicSequence() {
  const sequenceRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const media = gsap.matchMedia()
      media.add(
        {
          desktop:
            "(min-width: 901px) and (prefers-reduced-motion: no-preference)",
          mobile:
            "(max-width: 900px) and (prefers-reduced-motion: no-preference)",
        },
        ({ conditions }) => {
          const { desktop } = conditions as { desktop: boolean }
          const copies = gsap.utils.toArray<HTMLElement>(".sequence-copy")
          gsap.set(copies.slice(1), { autoAlpha: 0, y: 50 })
          gsap.set(".sequence-progress i", {
            scaleX: 0,
            transformOrigin: "left",
          })

          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: sequenceRef.current,
              start: "top top",
              end: desktop ? "+=3600" : "+=1600",
              pin: true,
              scrub: desktop ? 1.2 : 0.6,
              anticipatePin: 1,
            },
          })

          timeline
            .to(".sequence-product", {
              scale: desktop ? 1.3 : 1.1,
              xPercent: desktop ? -27 : 0,
              rotate: desktop ? 5 : 0,
              duration: 2,
            })
            .to(copies[0], { autoAlpha: 0, y: -40, duration: 0.5 }, 1.4)
            .to(copies[1], { autoAlpha: 1, y: 0, duration: 0.6 }, 1.7)
            .to(
              ".sequence-product",
              {
                scale: desktop ? 1.75 : 1.2,
                xPercent: desktop ? 23 : 0,
                yPercent: -5,
                rotate: desktop ? -7 : 0,
                duration: 2,
              },
              2.1,
            )
            .to(".sequence-progress i", { scaleX: 0.34, duration: 1 }, 2)
            .to(copies[1], { autoAlpha: 0, y: -40, duration: 0.5 }, 3.6)
            .to(copies[2], { autoAlpha: 1, y: 0, duration: 0.6 }, 3.9)
            .to(
              ".sequence-product",
              {
                scale: desktop ? 2.25 : 1.35,
                xPercent: desktop ? -8 : 0,
                yPercent: 7,
                rotate: desktop ? 2 : 0,
                duration: 2,
              },
              4.2,
            )
            .to(".sequence-progress i", { scaleX: 0.68, duration: 1 }, 4.1)
            .to(copies[2], { autoAlpha: 0, y: -40, duration: 0.5 }, 5.7)
            .to(copies[3], { autoAlpha: 1, y: 0, duration: 0.6 }, 6)
            .to(
              ".sequence-product",
              {
                scale: desktop ? 0.82 : 0.95,
                xPercent: desktop ? 28 : 0,
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

  const chapters = [
    [
      "01 / FORM",
      "Solid 90° Joint.",
      "Hydraulic stamped 3.0mm cold-rolled steel with reinforced gusset bend for zero-flex structural stability.",
    ],
    [
      "02 / DETAIL",
      "5 Aani Capsule Slot.",
      "Engineered capsule hole with precision bolt alignment allows smooth micro-adjustment and rattle-free lockup.",
    ],
    [
      "03 / ENDURANCE",
      "Built for 300+ kg.",
      "Deep zinc passivated finish resists corrosion, wear, and heavy dynamic loads on bed and modular frames.",
    ],
    [
      "04 / SYSTEM",
      "Modular Integration.",
      "Engineered for rapid knock-down assembly across commercial furniture and heavy architectural joinery.",
    ],
  ]

  return (
    <section className="sequence" ref={sequenceRef}>
      <div className="sequence-top">
        <span>SCROLL-DRIVEN PRODUCT STUDY</span>
        <span>01 — 04</span>
      </div>
      <div className="sequence-product">
        <ProductVisual
          category="Bed Clamp"
          image="/products/bed-clamp/bed-clamp-2-clean.jpg"
          productCode="HK-BC-102"
        />
      </div>
      <div className="sequence-copies">
        {chapters.map(([number, title, copy]) => (
          <article className="sequence-copy" key={number}>
            <span>{number}</span>
            <h2>{title}</h2>
            <p>{copy}</p>
          </article>
        ))}
      </div>
      <div className="sequence-progress">
        <i />
      </div>
      <div className="sequence-hint">SCROLL TO CONTROL THE CAMERA</div>
    </section>
  )
}
