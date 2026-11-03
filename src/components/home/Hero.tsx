import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { navigate } from "../../utils/navigation"
import Button from "../ui/Button"
import Eyebrow from "../ui/Eyebrow"
import ProductVisual from "../ui/ProductVisual"

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (reduced) return

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add(
        {
          desktop: "(min-width: 901px)",
          mobile: "(max-width: 900px)",
        },
        (context) => {
          const { desktop } = context.conditions as { desktop: boolean }

          const timeline = gsap.timeline({ defaults: { ease: "power3.out" } })
          timeline
            .from(".hero-copy .eyebrow", { opacity: 0, y: 20, duration: 0.6 })
            .from(
              ".hero-copy h1",
              { opacity: 0, y: 70, duration: 1.1 },
              "-=.25",
            )
            .from(
              ".hero-copy > p",
              { opacity: 0, y: 30, duration: 0.8 },
              "-=.55",
            )
          const heroActionBtns = desktop
            ? heroRef.current?.querySelectorAll<HTMLElement>(".desktop-hero-actions .btn")
            : heroRef.current?.querySelectorAll<HTMLElement>(".mobile-hero-actions .btn")

          if (heroActionBtns && heroActionBtns.length === 1) {
            timeline.from(
              heroActionBtns[0],
              {
                opacity: 0,
                x: -30,
                duration: 0.65,
                ease: "power2.out",
                clearProps: "transform,opacity",
              },
              "-=.5",
            )
          } else if (heroActionBtns && heroActionBtns.length > 1) {
            timeline
              .from(
                heroActionBtns[0],
                {
                  opacity: 0,
                  x: -30,
                  duration: 0.65,
                  ease: "power2.out",
                  clearProps: "transform,opacity",
                },
                "-=.5",
              )
              .from(
                heroActionBtns[1],
                {
                  opacity: 0,
                  x: 30,
                  duration: 0.65,
                  ease: "power2.out",
                  clearProps: "transform,opacity",
                },
                "-=.65",
              )
          }

          timeline
            .from(
              ".hero-product",
              {
                opacity: 0,
                scale: 0.82,
                x: desktop ? 100 : 30,
                rotate: desktop ? 7 : 0,
                duration: 1.4,
              },
              "-=1.15",
            )
            .from(
              ".hero-streak span",
              { scaleX: 0, stagger: 0.12, duration: 1.2 },
              "-=1",
            )

          if (desktop) {
            gsap.to(".hero-product", {
              yPercent: 10,
              scale: 1.08,
              ease: "none",
              scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            })
          }
        },
      )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-glow" />
      <div className="hero-streak">
        <span />
        <span />
        <span />
      </div>
      <div className="hero-copy">
        <Eyebrow light>ENGINEERED HARDWARE / 01</Eyebrow>
        <h1>
          Precision in
          <br />
          Every <em>Detail.</em>
        </h1>
        <p>
          Discover thoughtfully engineered hardware solutions for modern
          furniture and industrial applications.
        </p>
        <div className="actions desktop-hero-actions">
          <Button onClick={() => navigate("products")}>Explore Products</Button>
          <Button secondary onClick={() => navigate("contact")}>
            Contact Us
          </Button>
        </div>
      </div>
      <ProductVisual category="Bed Clamp" productCode="HK-BC-104" hero />
      <div className="actions mobile-hero-actions">
        <Button onClick={() => navigate("products")}>Explore Products</Button>
        <Button secondary onClick={() => navigate("contact")}>
          Contact Us
        </Button>
      </div>
      <div className="hero-index">
        <span>HK / PRODUCT STUDY</span>
        <span>01 — 06</span>
      </div>
      <button
        className="scroll-cue"
        onClick={() =>
          document
            .querySelector("#intro")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <i />
        <span>SCROLL TO DISCOVER</span>
      </button>
    </section>
  )
}
