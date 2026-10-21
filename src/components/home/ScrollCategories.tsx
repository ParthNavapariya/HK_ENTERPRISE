import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { products } from "../../data/products"
import { navigate } from "../../utils/navigation"
import Eyebrow from "../ui/Eyebrow"
import Icon from "../ui/Icon"

gsap.registerPlugin(ScrollTrigger)

export default function ScrollCategories() {
  const sectionRef = useRef<HTMLElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

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
        end: () => `+=${isDesktop ? 3400 : 1700}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const next = Math.min(
            products.length - 1,
            Math.floor(self.progress * products.length),
          )
          setActive((current) => (current === next ? current : next))
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const current = products[active] || products[0]

  return (
    <section
      className={`category-story dark-section category-tone-${(active % 5) + 1}`}
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
              {products.map((product, index) => (
                <div
                  className={`category-image ${
                    active === index ? "is-active" : ""
                  }`}
                  key={product.id}
                >
                  <img
                    src={product.image}
                    alt={`${product.name} - HK Enterprise`}
                  />
                </div>
              ))}
            </div>
            <div className="story-number">{current.id}</div>
            <div className="active-product-meta">
              <span>{current.code || "ACTIVE SERIES"}</span>
              <strong>{current.name}</strong>
              <p>{current.note}</p>
            </div>
          </div>
          <div className="category-list">
            {products.map((product, index) => (
              <button
                className={active === index ? "selected" : ""}
                onClick={() => navigate("detail", product.category)}
                key={product.id}
              >
                <span>{product.id}</span>
                <strong>{product.category}</strong>
                <small>{product.note}</small>
                <Icon name="arrow" />
              </button>
            ))}
          </div>
        </div>
        <div className="category-scroll-progress">
          <i
            style={{ transform: `scaleX(${(active + 1) / products.length})` }}
          />
        </div>
        <span className="category-scroll-label">
          SCROLL TO ADVANCE / REVERSE TO RETURN
        </span>
      </div>
    </section>
  )
}
