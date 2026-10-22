import { products } from "../../data/products"

interface ProductVisualProps {
  category: string
  hero?: boolean
  light?: boolean
  image?: string
  productCode?: string
}

export default function ProductVisual({
  category,
  hero = false,
  light = false,
  image,
  productCode,
}: ProductVisualProps) {
  const product =
    (productCode
      ? products.find((item) => item.code === productCode)
      : undefined) ??
    products.find(
      (item) =>
        category.toLowerCase().includes(item.category.toLowerCase()) ||
        item.name.toLowerCase().includes(category.toLowerCase())
    ) ?? products[0]

  const displayImage =
    image ||
    (hero && product.category === "Lockpatti"
      ? "/products/lockpatti/hero-product-clean.jpg"
      : product.image)

  return (
    <div
      className={`product-visual ${hero ? "hero-product" : ""} ${
        light ? "on-light" : ""
      }`}
    >
      <div
        className="product-visual-ambient"
        style={{ backgroundImage: `url(${displayImage})` }}
        aria-hidden="true"
      />
      <img
        className="concept-product-image"
        src={displayImage}
        alt={`${product.name} - HK Enterprise industrial hardware`}
        loading="lazy"
      />
      <div className="visual-label">
        <span>HK PRECISION SERIES</span>
        <b>
          {productCode || product.code || product.category}
        </b>
      </div>
    </div>
  )
}

