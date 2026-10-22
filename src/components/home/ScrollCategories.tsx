import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { showcaseProducts } from "../../data/products"
import { navigate } from "../../utils/navigation"
import Eyebrow from "../ui/Eyebrow"
import Icon from "../ui/Icon"

gsap.registerPlugin(ScrollTrigger)

export default function ScrollCategories() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  // Guarantee active index is always within valid bounds [0, 4]
  const safeActive = Math.max(
    0,
    Math.min(showcaseProducts.length - 1, active),
  )

  useLayoutEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (reduced) return

    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth > 900
      ScrollTrigger.create({
        trigger: stageRef.current,
        start: "top top",
        end: () => `+=${isDesktop ? 2400 : 1400}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onEnter: () => setActive(0),
        onLeaveBack: () => setActive(0),
        onUpdate: (self) => {
          const next = Math.max(
            0,
            Math.min(
              showcaseProducts.length - 1,
              Math.floor(self.progress * showcaseProducts.length),
            ),
          )
          setActive((current) => (current === next ? current : next))
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const current = showcaseProducts[safeActive] || showcaseProducts[0]

  return (
    <section
      className={`category-story dark-section category-tone-${(safeActive % 5) + 1}`}
      ref={sectionRef}
    >
      <div className="section-head">
        <div>
          <Eyebrow light>PRODUCT SERIES / 05</Eyebrow>
          <h2>
            Engineered for
            <br />
            Every <em>Connection.</em>
          </h2>
        </div>
        <p>
          Explore our core precision hardware lines manufactured in Rajkot. Each series is engineered for structural rigidity and seamless assembly.
        </p>
      </div>
      <div className="category-stage" ref={stageRef}>
        <div className="story-layout">
          <div className="story-visual">
            <div className="category-aura" />
            <div className="category-image-stack">
              {showcaseProducts.map((product, index) => (
                <div
                  className={`category-image ${
                    safeActive === index ? "is-active" : ""
                  }`}
                  key={product.id}
                >
                  <img
                    src={product.image}
                    alt={`${product.name} - HK Enterprise`}
                    loading="eager"
                  />
                </div>
              ))}
            </div>
            <div className="story-number">
              {String(safeActive + 1).padStart(2, "0")}
            </div>
            <div className="active-product-meta">
              <span>{current.code || `SERIES 0${safeActive + 1}`}</span>
              <strong>{current.name}</strong>
              <p>{current.note}</p>
            </div>
          </div>
          <div className="category-list">
            {showcaseProducts.map((product, index) => (
              <button
                className={safeActive === index ? "selected" : ""}
                onClick={() => {
                  if (safeActive === index) {
                    navigate("detail", product.id)
                  } else {
                    setActive(index)
                  }
                }}
                key={product.id}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{product.category}</strong>
                <small>{product.note}</small>
                <Icon name="arrow" />
              </button>
            ))}
          </div>
        </div>
        <div className="category-scroll-progress">
          <i
            style={{
              transform: `scaleX(${(safeActive + 1) / showcaseProducts.length})`,
            }}
          />
        </div>
        <span className="category-scroll-label">
          SCROLL TO ADVANCE / REVERSE TO RETURN
        </span>
      </div>
    </section>
  )
}
