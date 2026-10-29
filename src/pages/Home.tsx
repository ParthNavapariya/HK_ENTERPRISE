import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { COMPANY_INFO } from "../data/products"
import { navigate } from "../utils/navigation"
import Hero from "../components/home/Hero"
import CinematicSequence from "../components/home/CinematicSequence"
import ScrollCategories from "../components/home/ScrollCategories"
import Eyebrow from "../components/ui/Eyebrow"
import Button from "../components/ui/Button"
import Icon from "../components/ui/Icon"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const homeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const ctx = gsap.context(() => {
      // 1. Animate Manifesto on scroll
      const manifesto = document.querySelector(".manifesto")
      if (manifesto) {
        gsap.timeline({
          scrollTrigger: {
            trigger: manifesto,
            start: "top 80%",
            once: true,
          },
        })
          .from(manifesto.querySelector(".eyebrow"), {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power3.out",
          })
          .from(
            manifesto.querySelector(".manifesto-copy"),
            {
              opacity: 0,
              y: 55,
              duration: 1.0,
              ease: "power3.out",
            },
            "-=0.35",
          )
          .from(
            manifesto.querySelector(".manifesto-meta"),
            {
              opacity: 0,
              y: 30,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.55",
          )
      }

      // 2. Animate Process Section (The HK Standard)
      const processSec = document.querySelector(".process-section")
      if (processSec) {
        gsap.timeline({
          scrollTrigger: {
            trigger: processSec,
            start: "top 80%",
            once: true,
          },
        })
          .from(processSec.querySelector(".eyebrow"), {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power3.out",
          })
          .from(
            processSec.querySelector("h2"),
            {
              opacity: 0,
              y: 50,
              duration: 0.9,
              ease: "power3.out",
            },
            "-=0.35",
          )
          .from(
            processSec.querySelector(".section-head > p"),
            {
              opacity: 0,
              y: 25,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.5",
          )
          .from(
            processSec.querySelectorAll(".principles article"),
            {
              opacity: 0,
              y: 35,
              stagger: 0.15,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.4",
          )
      }

      // 3. Animate CTA panel
      const cta = document.querySelector(".cta-panel")
      if (cta) {
        gsap.timeline({
          scrollTrigger: {
            trigger: cta,
            start: "top 85%",
            once: true,
          },
        })
          .from(cta.querySelector(".eyebrow"), {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power3.out",
          })
          .from(
            cta.querySelector("h2"),
            {
              opacity: 0,
              y: 50,
              duration: 0.9,
              ease: "power3.out",
            },
            "-=0.35",
          )
          .from(
            cta.querySelector(".btn"),
            {
              opacity: 0,
              y: 20,
              duration: 0.6,
              ease: "power3.out",
            },
            "-=0.45",
          )
      }
    }, homeRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={homeRef}>
      <Hero />
      <section className="manifesto reveal" id="intro">
        <Eyebrow>OUR PHILOSOPHY</Eyebrow>
        <p className="manifesto-copy">
          Hardware is rarely seen.
          <br />
          Its <em>performance</em> is always felt.
        </p>
        <div className="manifesto-meta">
          <span>Designed around purpose</span>
          <p>
            From the smallest connection to the structures they support, every
            detail deserves considered engineering.
          </p>
        </div>
      </section>
      <CinematicSequence />
      <ScrollCategories />
      <section className="process-section">
        <div className="section-head light-head">
          <div>
            <Eyebrow>THE HK STANDARD</Eyebrow>
            <h2>
              Built with
              <br />
              <em>intention.</em>
            </h2>
          </div>
          <p>
            Our approach centers on clarity, consistency, and products designed
            for their intended connection.
          </p>
        </div>
        <div className="principles">
          {[
            [
              "01",
              "Purpose first",
              "Every product begins with a clear application and a practical role.",
            ],
            [
              "02",
              "Detail considered",
              "Proportions, interfaces, and finishing are presented with equal care.",
            ],
            [
              "03",
              "Quality focused",
              "Product claims and specifications are published only after approval.",
            ],
          ].map(([n, title, text]) => (
            <article key={n}>
              <span>{n}</span>
              <div className="principle-line" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="cta-panel">
        <Eyebrow light>START A CONVERSATION</Eyebrow>
        <h2>
          Find the right
          <br />
          connection.
        </h2>
        <a
          href={COMPANY_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
          style={{ textDecoration: "none" }}
        >
          <span>Enquire on WhatsApp</span>
          <Icon name="arrow" />
        </a>
        <span className="cta-code">HK / 2025</span>
      </section>
    </main>
  )
}
