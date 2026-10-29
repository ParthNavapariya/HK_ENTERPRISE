import { useEffect, useMemo, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Category } from "../types"
import { categories, products } from "../data/products"
import { navigate } from "../utils/navigation"
import PageHero from "../components/ui/PageHero"
import ProductVisual from "../components/ui/ProductVisual"
import Icon from "../components/ui/Icon"

gsap.registerPlugin(ScrollTrigger)

export default function Products() {
  const containerRef = useRef<HTMLElement>(null)
  const [filter, setFilter] = useState<Category>("All")
  const shown = useMemo(
    () =>
      filter === "All"
        ? products
        : products.filter((p) => p.category === filter),
    [filter],
  )

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const ctx = gsap.context(() => {
      const catalog = document.querySelector(".catalog")
      if (catalog) {
        gsap.timeline({
          scrollTrigger: {
            trigger: catalog,
            start: "top 85%",
            once: true,
          },
        })
          .from(catalog.querySelector(".filter-bar"), {
            opacity: 0,
            y: 25,
            duration: 0.7,
            ease: "power3.out",
          })
          .from(
            catalog.querySelectorAll(".product-grid > article:nth-child(-n+6)"),
            {
              opacity: 0,
              y: 40,
              stagger: 0.1,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.35",
          )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <main ref={containerRef}>
      <PageHero
        eyebrow="PRODUCT COLLECTION"
        title={
          <>
            Made to connect.
            <br />
            <em>Built to endure.</em>
          </>
        }
        description="Explore our complete line of heavy 4-corner bed clamps, knock-down bed sockets, precision hinges, gusset-reinforced L corners, bed storage fittings, and cold-rolled steel lockpatti."
      />
      <section className="catalog">
        <div className="filter-bar">
          <span>FILTER BY SERIES ({shown.length} PRODUCTS)</span>
          <div>
            {(["All", ...categories] as Category[]).map((cat) => (
              <button
                className={filter === cat ? "active" : ""}
                onClick={() => setFilter(cat)}
                key={cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="product-grid">
          {shown.map((product) => (
            <article className="product-card" key={product.id}>
              <ProductVisual
                category={product.category}
                light
                image={product.image}
                productCode={product.code}
              />
              <div className="card-copy">
                <span>
                  {product.code ? `${product.code} • ` : ""}
                  {product.category.toUpperCase()}
                </span>
                <h2>{product.name}</h2>
                <p>{product.note}</p>
                <button onClick={() => navigate("detail", product.id)}>
                  <span>View Details & Specs</span>
                  <Icon name="arrow" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
