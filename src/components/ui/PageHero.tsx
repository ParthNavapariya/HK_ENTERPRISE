import React from "react"
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
  return (
    <section className="page-hero">
      <Eyebrow light>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p>{description}</p>
      <div className="page-count">HK — ENTERPRISE</div>
    </section>
  )
}
