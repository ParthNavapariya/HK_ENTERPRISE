import { useEffect, useMemo, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { COMPANY_INFO, products } from "../data/products"
import { navigate } from "../utils/navigation"
import Eyebrow from "../components/ui/Eyebrow"
import Button from "../components/ui/Button"
import ProductVisual from "../components/ui/ProductVisual"
import Icon from "../components/ui/Icon"

gsap.registerPlugin(ScrollTrigger)

export default function ProductDetail({ category }: { category: string }) {
  const containerRef = useRef<HTMLElement>(null)
  const cleanParam = decodeURIComponent(category || "bc-01")
  const currentProduct =
    products.find(
      (p) =>
        p.id.toLowerCase() === cleanParam.toLowerCase() ||
        (p.code && p.code.toLowerCase() === cleanParam.toLowerCase()) ||
        p.category.toLowerCase() === cleanParam.toLowerCase() ||
        p.name.toLowerCase().includes(cleanParam.toLowerCase()),
    ) ?? products[0]

  const [activeImage, setActiveImage] = useState(currentProduct.image)
  const [zoomOpen, setZoomOpen] = useState(false)

  useEffect(() => {
    setActiveImage(currentProduct.image)
    window.scrollTo(0, 0)
  }, [currentProduct])

  const relatedProducts = useMemo(() => {
    // Show all other products in the same category series (e.g. all other Bed Clamps)
    const sameSeries = products.filter(
      (p) =>
        p.id !== currentProduct.id &&
        p.category === currentProduct.category,
    )

    if (sameSeries.length > 0) {
      return sameSeries
    }

    return products.filter((p) => p.id !== currentProduct.id)
  }, [currentProduct])

  const relatedGridRef = useRef<HTMLDivElement>(null)
  const [relatedIndex, setRelatedIndex] = useState(0)
  const isInteractingRef = useRef(false)

  // Reset related carousel on product change
  useEffect(() => {
    setRelatedIndex(0)
    if (relatedGridRef.current) {
      relatedGridRef.current.scrollTo({ left: 0, behavior: "instant" })
    }
  }, [currentProduct])

  // Automatic mobile carousel slideshow
  useEffect(() => {
    if (relatedProducts.length <= 1) return

    const timer = setInterval(() => {
      if (window.innerWidth > 900 || isInteractingRef.current) return

      setRelatedIndex((prev) => {
        const next = (prev + 1) % relatedProducts.length
        if (relatedGridRef.current) {
          const container = relatedGridRef.current
          const cardWidth = container.clientWidth
          container.scrollTo({
            left: next * cardWidth,
            behavior: "smooth",
          })
        }
        return next
      })
    }, 3500)

    return () => clearInterval(timer)
  }, [relatedProducts])

  const handleRelatedScroll = () => {
    if (!relatedGridRef.current) return
    const container = relatedGridRef.current
    const cardWidth = container.clientWidth
    if (cardWidth > 0) {
      const idx = Math.round(container.scrollLeft / cardWidth)
      if (idx !== relatedIndex && idx >= 0 && idx < relatedProducts.length) {
        setRelatedIndex(idx)
      }
    }
  }

  const handleTouchStart = () => {
    isInteractingRef.current = true
  }

  const handleTouchEnd = () => {
    setTimeout(() => {
      isInteractingRef.current = false
    }, 2500)
  }

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const ctx = gsap.context(() => {
      // 1. Smooth entrance animation for product hero
      const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } })
      heroTimeline
        .from(".detail-copy .eyebrow", {
          opacity: 0,
          y: 20,
          duration: 0.6,
        })
        .from(
          ".detail-copy h1",
          {
            opacity: 0,
            y: 40,
            duration: 0.9,
          },
          "-=0.35",
        )
        .from(
          ".detail-copy > p",
          {
            opacity: 0,
            y: 25,
            duration: 0.7,
          },
          "-=0.5",
        )
        .from(
          ".detail-product-visual",
          {
            opacity: 0,
            scale: 0.92,
            y: 30,
            duration: 1.05,
          },
          "-=0.65",
        )
        // Button 1 from left, Button 2 from right (matching the rest of the site)
        .fromTo(
          ".desktop-actions .btn:first-child, .mobile-actions .btn:first-child",
          {
            opacity: 0,
            x: -30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            clearProps: "transform,opacity",
          },
          "-=0.45",
        )
        .fromTo(
          ".desktop-actions .btn:last-child, .mobile-actions .btn:last-child",
          {
            opacity: 0,
            x: 30,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            clearProps: "transform,opacity",
          },
          "-=0.6",
        )
        .from(
          ".detail-thumbnails button",
          {
            opacity: 0,
            y: 15,
            stagger: 0.08,
            duration: 0.5,
          },
          "-=0.4",
        )

      // 2. Specifications scroll reveal
      const detailInfo = document.querySelector(".detail-info")
      if (detailInfo) {
        gsap.timeline({
          scrollTrigger: {
            trigger: detailInfo,
            start: "top 82%",
            once: true,
          },
        })
          .from(detailInfo.querySelector(".eyebrow"), {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: "power3.out",
          })
          .from(
            detailInfo.querySelector("h2"),
            {
              opacity: 0,
              y: 45,
              duration: 0.9,
              ease: "power3.out",
            },
            "-=0.35",
          )
          .from(
            detailInfo.querySelectorAll(".specs article"),
            {
              opacity: 0,
              y: 28,
              stagger: 0.12,
              duration: 0.75,
              ease: "power3.out",
            },
            "-=0.45",
          )
      }

      // 3. Related hardware scroll reveal
      const related = document.querySelector(".related")
      if (related) {
        gsap.timeline({
          scrollTrigger: {
            trigger: related,
            start: "top 85%",
            once: true,
          },
        })
          .fromTo(
            related.querySelector(".eyebrow"),
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              clearProps: "all",
            },
          )
          .fromTo(
            related.querySelectorAll(".related-grid > button"),
            {
              opacity: 0,
              y: 25,
            },
            {
              opacity: 1,
              y: 0,
              stagger: 0.1,
              duration: 0.6,
              ease: "power2.out",
              clearProps: "transform,opacity",
            },
            "-=0.3",
          )
      }

      requestAnimationFrame(() => {
        ScrollTrigger.refresh()
      })
    }, containerRef)

    return () => ctx.revert()
  }, [currentProduct])

  const productWhatsappUrl = `https://api.whatsapp.com/send?phone=919723771164&text=${encodeURIComponent(
    `*Hardware Product Enquiry - HK Enterprise*\n\n` +
    `Hello, I would like to enquire about:\n` +
    `• *Product Name:* ${currentProduct.name}\n` +
    `• *Product Code:* ${currentProduct.code || currentProduct.category}\n` +
    `• *Category:* ${currentProduct.category} Series\n` +
    (currentProduct.finish ? `• *Finish:* ${currentProduct.finish}\n` : "") +
    (currentProduct.thickness ? `• *Thickness:* ${currentProduct.thickness}\n` : "") +
    (currentProduct.available ? `• *Available:* ${currentProduct.available}\n` : "") +
    `\nPlease share pricing, minimum order quantity (MOQ), and catalog specifications.`
  )}`

  const handleWhatsappEnquiry = (e: React.MouseEvent) => {
    e.preventDefault()
    window.location.href = productWhatsappUrl
  }

  return (
    <main ref={containerRef}>
      <section className="detail-hero">
        <div className="detail-copy">
          <Eyebrow light>
            {currentProduct.code ? `${currentProduct.code} • ` : ""}
            {currentProduct.category.toUpperCase()} SERIES
          </Eyebrow>
          <h1>{currentProduct.name}</h1>
          <p>{currentProduct.description || currentProduct.note}</p>
          <div className="actions desktop-actions">
            <a
              href={productWhatsappUrl}
              onClick={handleWhatsappEnquiry}
              className="btn"
              style={{ textDecoration: "none" }}
            >
              <span>Enquire on WhatsApp</span>
              <Icon name="arrow" />
            </a>
            <Button
              secondary
              onClick={() => navigate("contact", currentProduct.id)}
            >
              Custom Form Enquiry
            </Button>
          </div>
        </div>

        <div className="detail-visual-wrapper">
          <div
            className="detail-product-visual"
            onClick={() => setZoomOpen(true)}
            title="Click to view full image in high resolution"
          >
            <div
              className="detail-ambient"
              style={{ backgroundImage: `url(${activeImage})` }}
              aria-hidden="true"
            />
            <img
              className="detail-image"
              src={activeImage}
              alt={`${currentProduct.name} - HK Enterprise`}
            />
          </div>

          <div className="actions mobile-actions">
            <a
              href={productWhatsappUrl}
              onClick={handleWhatsappEnquiry}
              className="btn"
              style={{ textDecoration: "none" }}
            >
              <span>Enquire on WhatsApp</span>
              <Icon name="arrow" />
            </a>
            <Button
              secondary
              onClick={() => navigate("contact", currentProduct.id)}
            >
              Custom Form Enquiry
            </Button>
          </div>
        </div>
      </section>

      <section className="detail-info">
        <div>
          <Eyebrow>PRODUCT SPECIFICATIONS</Eyebrow>
          <h2>
            Designed around
            <br />
            the <em>connection.</em>
          </h2>
        </div>
        <div className="specs">
          <article>
            <span>DESCRIPTION</span>
            <p>{currentProduct.description || currentProduct.note}</p>
          </article>
          <article>
            <span>FINISH & DETAILS</span>
            <p>
              <strong>Finish:</strong> {currentProduct.finish || "Rust-Resistant Passivated"}
              {currentProduct.thickness && (
                <>
                  <br />
                  <strong>Thickness:</strong> {currentProduct.thickness}
                </>
              )}
              {currentProduct.available && (
                <>
                  <br />
                  <strong>Available:</strong> {currentProduct.available}
                </>
              )}
            </p>
          </article>
          {currentProduct.features && currentProduct.features.length > 0 && (
            <article>
              <span>KEY FEATURES</span>
              <p>{currentProduct.features.join(" • ")}</p>
            </article>
          )}
        </div>
      </section>

      <section className="related">
        <div className="related-head">
          <Eyebrow>RELATED {currentProduct.category.toUpperCase()} SERIES ({relatedProducts.length})</Eyebrow>
        </div>
        <div
          className="related-grid"
          ref={relatedGridRef}
          onScroll={handleRelatedScroll}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {relatedProducts.map((p) => (
            <button
              key={p.id}
              onClick={() => navigate("detail", p.id)}
            >
              <ProductVisual
                category={p.category}
                light
                image={p.image}
                productCode={p.code}
              />
              <strong>{p.name}</strong>
              <Icon name="arrow" />
            </button>
          ))}
        </div>
        <div className="related-dots" aria-hidden="true">
          {relatedProducts.map((_, idx) => (
            <span
              key={idx}
              className={`related-dot ${idx === relatedIndex ? "active" : ""}`}
              onClick={() => {
                setRelatedIndex(idx)
                if (relatedGridRef.current) {
                  relatedGridRef.current.scrollTo({
                    left: idx * relatedGridRef.current.clientWidth,
                    behavior: "smooth",
                  })
                }
              }}
            />
          ))}
        </div>
      </section>

      {zoomOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="High resolution product view"
          onClick={() => setZoomOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(10, 12, 16, 0.94)",
            backdropFilter: "blur(12px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            cursor: "zoom-out",
          }}
        >
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            style={{
              position: "absolute",
              top: "24px",
              right: "24px",
              background: "rgba(22, 25, 31, 0.85)",
              border: "1px solid rgba(232, 213, 154, 0.3)",
              color: "#fff",
              padding: "10px 18px",
              borderRadius: "4px",
              fontSize: "12px",
              letterSpacing: "0.15em",
              cursor: "pointer",
              zIndex: 10000,
            }}
            aria-label="Close full view"
          >
            ✕ CLOSE
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "92vw",
              maxHeight: "90vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "default",
            }}
          >
            <img
              src={activeImage}
              alt={`${currentProduct.name} - Full Preview`}
              style={{
                maxWidth: "100%",
                maxHeight: "82vh",
                objectFit: "contain",
                borderRadius: "4px",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.8)",
                border: "1px solid rgba(232, 213, 154, 0.2)",
                background: "#111318",
              }}
            />
            <div
              style={{
                marginTop: "14px",
                color: "var(--champagne)",
                fontSize: "13px",
                letterSpacing: "0.08em",
                textAlign: "center",
              }}
            >
              <strong>{currentProduct.code}</strong> • {currentProduct.name}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

