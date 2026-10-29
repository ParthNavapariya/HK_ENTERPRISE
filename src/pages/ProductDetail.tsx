import { useEffect, useState } from "react"
import { COMPANY_INFO, products } from "../data/products"
import { navigate } from "../utils/navigation"
import Eyebrow from "../components/ui/Eyebrow"
import Button from "../components/ui/Button"
import ProductVisual from "../components/ui/ProductVisual"
import Icon from "../components/ui/Icon"

export default function ProductDetail({ category }: { category: string }) {
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
  }, [currentProduct])

  return (
    <main>
      <section className="detail-hero">
        <div className="detail-copy">
          <Eyebrow light>
            {currentProduct.code ? `${currentProduct.code} • ` : ""}
            {currentProduct.category.toUpperCase()} SERIES
          </Eyebrow>
          <h1>{currentProduct.name}</h1>
          <p>{currentProduct.description || currentProduct.note}</p>
          <div className="actions desktop-actions">
            <Button onClick={() => navigate("contact")}>
              Enquire About Product
            </Button>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ textDecoration: "none" }}
            >
              <span>WhatsApp Us</span>
              <Icon name="arrow" />
            </a>
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
            <div className="visual-label">
              <span>HK PRECISION SERIES</span>
              <b>{currentProduct.code || currentProduct.category}</b>
            </div>
            <div
              className="detail-zoom-pill"
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                zIndex: 4,
                background: "rgba(14, 17, 22, 0.75)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(232, 213, 154, 0.25)",
                color: "var(--champagne)",
                fontSize: "10px",
                letterSpacing: "0.12em",
                padding: "6px 12px",
                borderRadius: "4px",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                pointerEvents: "none",
              }}
            >
              <span>FULL VIEW</span>
            </div>
          </div>

          {currentProduct.images && currentProduct.images.length > 1 && (
            <div className="detail-thumbnails">
              {currentProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  className={`detail-thumb-btn ${activeImage === img ? "active" : ""}`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt={`${currentProduct.name} angle ${idx + 1}`}
                  />
                </button>
              ))}
            </div>
          )}

          <div className="actions mobile-actions">
            <Button onClick={() => navigate("contact")}>
              Enquire About Product
            </Button>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ textDecoration: "none" }}
            >
              <span>WhatsApp Us</span>
              <Icon name="arrow" />
            </a>
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
            <span>MATERIAL & FINISH</span>
            <p>
              <strong>Material:</strong> {currentProduct.material || "High Grade Steel"}
              <br />
              <strong>Finish:</strong> {currentProduct.finish || "Rust-Resistant Passivated"}
              {currentProduct.thickness && (
                <>
                  <br />
                  <strong>Thickness:</strong> {currentProduct.thickness}
                </>
              )}
            </p>
          </article>
          <article>
            <span>DIMENSIONS & LOAD</span>
            <p>
              {currentProduct.dimensions && (
                <>
                  <strong>Dimensions:</strong> {currentProduct.dimensions}
                  <br />
                </>
              )}
              {currentProduct.loadCapacity && (
                <>
                  <strong>Rating:</strong> {currentProduct.loadCapacity}
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
        <Eyebrow>RELATED HARDWARE IN RANGE</Eyebrow>
        <div>
          {[
            ...products.filter(
              (p) =>
                p.id !== currentProduct.id &&
                p.category === currentProduct.category,
            ),
            ...products.filter(
              (p) =>
                p.id !== currentProduct.id &&
                p.category !== currentProduct.category,
            ),
          ]
            .slice(0, 3)
            .map((p) => (
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

