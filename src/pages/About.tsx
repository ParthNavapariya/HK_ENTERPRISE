import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { navigate } from "../utils/navigation"
import PageHero from "../components/ui/PageHero"
import Eyebrow from "../components/ui/Eyebrow"
import Button from "../components/ui/Button"

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const ctx = gsap.context(() => {
      // 1. Animate .about-intro
      const intro = document.querySelector(".about-intro")
      if (intro) {
        gsap.timeline({
          scrollTrigger: {
            trigger: intro,
            start: "top 80%",
            once: true,
          },
        })
          .from(intro.querySelector(".eyebrow"), {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power3.out",
          })
          .from(
            intro.querySelector("h2"),
            {
              opacity: 0,
              y: 55,
              duration: 1.0,
              ease: "power3.out",
            },
            "-=0.35",
          )
          .from(
            intro.querySelectorAll(".split-copy p, .about-motto"),
            {
              opacity: 0,
              y: 30,
              stagger: 0.15,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.55",
          )
      }

      // 2. Animate .quality-section
      const quality = document.querySelector(".quality-section")
      if (quality) {
        gsap.timeline({
          scrollTrigger: {
            trigger: quality,
            start: "top 80%",
            once: true,
          },
        })
          .from(quality.querySelector(".eyebrow"), {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power3.out",
          })
          .from(
            quality.querySelector("h2"),
            {
              opacity: 0,
              y: 50,
              duration: 0.9,
              ease: "power3.out",
            },
            "-=0.35",
          )
          .from(
            quality.querySelectorAll(".quality-list article"),
            {
              opacity: 0,
              y: 30,
              stagger: 0.12,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.5",
          )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={containerRef}>
      <PageHero
        eyebrow="ABOUT HK ENTERPRISE"
        title={
          <>
            Precision & purpose.
            <br />
            <em>Built to endure.</em>
          </>
        }
        description="At HK Enterprise, we bring precision and purpose to furniture hardware. We believe that even the smallest component plays an essential role in creating furniture that stands the test of time."
      />
      <section className="about-intro">
        <Eyebrow>ABOUT HK ENTERPRISE</Eyebrow>
        <div className="split-copy">
          <h2>
            Precision & purpose in <em>furniture hardware.</em>
          </h2>
          <div>
            <p>
              At HK Enterprise, we bring precision and purpose to furniture hardware. We believe that even the smallest component plays an essential role in creating furniture that stands the test of time.
            </p>
            <p>
              With a focus on quality, functionality, and refined finishing, we serve furniture manufacturers, wholesalers, and hardware distributors with products designed to meet the demands of a dynamic industry.
            </p>
            <div className="about-motto">
              <span>Built on quality.</span>
              <span>Driven by trust.</span>
              <span>Committed to excellence.</span>
            </div>
          </div>
        </div>
      </section>
      <section className="range-band">
        <span>LOCKPATTI</span>
        <span>HINGES</span>
        <span>BED CLAMPS</span>
        <span>BED SOCKETS</span>
        <span>L CORNERS</span>
        <span>BED FITTINGS</span>
      </section>
      <section className="quality-section">
        <div>
          <Eyebrow>THE HK PROMISE</Eyebrow>
          <h2>
            Built on quality.
            <br />
            Driven by <em>trust.</em>
          </h2>
        </div>
        <div className="quality-list">
          {[
            {
              title: "Built on Quality",
              desc: "From heavy-gauge cold-rolled carbon steel to micron-calibrated stamping, every product is engineered for structural rigidity and lifetime endurance.",
            },
            {
              title: "Driven by Trust",
              desc: "Proudly serving furniture manufacturers, wholesalers, and hardware distributors across India with reliable supply and transparent specifications.",
            },
            {
              title: "Committed to Excellence",
              desc: "Refined finishing, burr-free deburred edges, and continuous tooling innovations designed to meet the demands of a dynamic furniture industry.",
            },
          ].map((item, i) => (
            <article key={item.title}>
              <span>0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="wide-cta">
        <h2>
          Explore the complete
          <br />
          product range.
        </h2>
        <Button onClick={() => navigate("products")}>
          Explore Our Products
        </Button>
      </section>
    </main>
  )
}
