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
  const triggerRef = useRef<ScrollTrigger | null>(null)
  const [active, setActive] = useState(0)

  // Guarantee active index is always within valid bounds [0, 5]
  const safeActive = Math.max(
    0,
    Math.min(showcaseProducts.length - 1, active),
  )

  const handleSelectCategory = (index: number) => {
    setActive(index)
    if (triggerRef.current) {
      const st = triggerRef.current
      const progressCenters = [0.08, 0.24, 0.40, 0.56, 0.72, 0.90]
      const targetProgress = progressCenters[index] ?? 0.5
      const targetY = st.start + targetProgress * (st.end - st.start)
      window.scrollTo({
        top: targetY,
        behavior: "smooth",
      })
    }
  }

  useLayoutEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches
    if (reduced) return

    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth > 900
      triggerRef.current = ScrollTrigger.create({
        trigger: stageRef.current,
        start: "top top",
        end: () => `+=${isDesktop ? 3000 : 1800}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onEnter: () => setActive(0),
        onLeaveBack: () => setActive(0),
        onLeave: () => setActive(showcaseProducts.length - 1),
        onUpdate: (self) => {
          const p = self.progress
          let next = 0
          if (p < 0.16) next = 0
          else if (p < 0.32) next = 1
          else if (p < 0.48) next = 2
          else if (p < 0.64) next = 3
          else if (p < 0.80) next = 4
          else next = 5
          setActive((current) => (current === next ? current : next))
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const current = showcaseProducts[safeActive] || showcaseProducts[0]

  return (
    <section
      className={`category-story dark-section category-tone-${(safeActive % 6) + 1}`}
      ref={sectionRef}
    >
      <div className="section-head">
        <div>
          <Eyebrow light>PRODUCT SERIES / 06</Eyebrow>
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
                  <div
                    className="product-visual-ambient"
                    style={{ backgroundImage: `url(${product.image})` }}
                    aria-hidden="true"
                  />
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
                    handleSelectCategory(index)
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
