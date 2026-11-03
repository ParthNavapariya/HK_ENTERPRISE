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
      // 1. Filter bar entrance
      const filterBar = document.querySelector(".filter-bar")
      if (filterBar) {
        gsap.fromTo(
          filterBar,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: filterBar,
              start: "top 90%",
              once: true,
            },
          },
        )
      }

      // 2. Smooth batch scroll reveal for all product cards as user scrolls
      const cards = gsap.utils.toArray<HTMLElement>(".product-grid > article")
      gsap.set(cards, { opacity: 0, y: 40 })

      ScrollTrigger.batch(cards, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.12,
            duration: 0.85,
            ease: "power3.out",
            overwrite: true,
          }),
      })

      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }, containerRef)

    return () => ctx.revert()
  }, [shown])

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
        description="Explore our complete line of heavy 4-corner bed clamps, knock-down bed sockets, precision hinges, gusset-reinforced L corners, bed storage fittings, and precision lockpatti."
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
                <div style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "18px", flexWrap: "wrap" }}>
                  <button onClick={() => navigate("detail", product.id)}>
                    <span>View Specs</span>
                    <Icon name="arrow" />
                  </button>
                  <a
                    href={`https://api.whatsapp.com/send?phone=919723771164&text=${encodeURIComponent(
                      `*Hardware Product Enquiry - HK Enterprise*\n\n` +
                      `Hello, I want to enquire about:\n` +
                      `• *Product Name:* ${product.name}\n` +
                      `• *Product Code:* ${product.code || "N/A"}\n` +
                      `• *Category:* ${product.category} Series\n\n` +
                      `Please share quotation, MOQ, and technical catalog.`
                    )}`}
                    onClick={(e) => {
                      e.preventDefault()
                      window.location.href = `https://api.whatsapp.com/send?phone=919723771164&text=${encodeURIComponent(
                        `*Hardware Product Enquiry - HK Enterprise*\n\n` +
                        `Hello, I want to enquire about:\n` +
                        `• *Product Name:* ${product.name}\n` +
                        `• *Product Code:* ${product.code || "N/A"}\n` +
                        `• *Category:* ${product.category} Series\n\n` +
                        `Please share quotation, MOQ, and technical catalog.`
                      )}`
                    }}
                    className="card-whatsapp-link"
                  >
                    <span>Enquire WhatsApp</span>
                    <Icon name="arrow" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
