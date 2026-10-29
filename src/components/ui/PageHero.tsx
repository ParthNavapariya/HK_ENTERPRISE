import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import Eyebrow from "./Eyebrow"

interface PageHeroProps {
  eyebrow: string
  title: React.ReactNode
  description: string
}

export default function PageHero({
  eyebrow,
  title,
  description,
}: PageHeroProps) {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const ctx = gsap.context(() => {
      const el = heroRef.current
      if (!el) return
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(el.querySelector(".eyebrow"), { opacity: 0, y: 20, duration: 0.6 })
        .from(el.querySelector("h1"), { opacity: 0, y: 55, duration: 1.0 }, "-=0.35")
        .from(el.querySelector("p"), { opacity: 0, y: 25, duration: 0.8 }, "-=0.55")
        .from(el.querySelector(".page-count"), { opacity: 0, duration: 0.8 }, "-=0.5")
    }, heroRef)

    return () => ctx.revert()
  }, [title])

  return (
    <section className="page-hero" ref={heroRef}>
      <Eyebrow light>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="page-count">HK — ENTERPRISE</div>
    </section>
  )
}
