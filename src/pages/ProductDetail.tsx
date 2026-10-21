import { useEffect, useState } from "react"
import { COMPANY_INFO, products } from "../data/products"
import { navigate } from "../utils/navigation"
import Eyebrow from "../components/ui/Eyebrow"
import Button from "../components/ui/Button"
import ProductVisual from "../components/ui/ProductVisual"
import Icon from "../components/ui/Icon"

export default function ProductDetail({ category }: { category: string }) {
  const cleanParam = decodeURIComponent(category || "lp-01")
  const currentProduct =
    products.find(
      (p) =>
        p.id.toLowerCase() === cleanParam.toLowerCase() ||
        (p.code && p.code.toLowerCase() === cleanParam.toLowerCase()) ||
        p.category.toLowerCase() === cleanParam.toLowerCase() ||
        p.name.toLowerCase().includes(cleanParam.toLowerCase()),
    ) ?? products[0]

  const [activeImage, setActiveImage] = useState(currentProduct.image)

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
          <div className="actions" style={{ marginTop: "24px" }}>
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

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div className="product-visual hero-product" style={{ position: "relative" }}>
            <img
              className="concept-product-image"
              src={activeImage}
              alt={`${currentProduct.name} - HK Enterprise`}
            />
            <div className="visual-label">
              <span>HK PRECISION SERIES</span>
              <b>{currentProduct.code || currentProduct.category}</b>
            </div>
          </div>

          {currentProduct.images && currentProduct.images.length > 1 && (
            <div
              style={{
                display: "flex",
                gap: "10px",
                overflowX: "auto",
                paddingBottom: "4px",
              }}
            >
              {currentProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(img)}
                  style={{
                    width: "72px",
                    height: "72px",
                    flexShrink: 0,
                    border:
                      activeImage === img
                        ? "2px solid var(--gold)"
                        : "1px solid rgba(245,245,245,0.18)",
                    background: "#16191f",
                    padding: "2px",
                    cursor: "pointer",
                    transition: "border-color 0.2s ease",
                  }}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img
                    src={img}
                    alt={`${currentProduct.name} angle ${idx + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </button>
              ))}
            </div>
          )}
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
          {products
            .filter((p) => p.id !== currentProduct.id)
            .slice(0, 3)
            .map((p) => (
              <button
                key={p.id}
                onClick={() => navigate("detail", p.id)}
              >
                <ProductVisual category={p.category} light />
                <strong>{p.name}</strong>
                <Icon name="arrow" />
              </button>
            ))}
        </div>
      </section>
    </main>
  )
}
