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
    products.find(
      (item) =>
        category.toLowerCase().includes(item.category.toLowerCase()) ||
        item.name.toLowerCase().includes(category.toLowerCase())
    ) ?? products[0]

  const displayImage =
    image ||
    (hero && product.category === "Lockpatti"
      ? "/products/lockpatti/hero-product-crop.png"
      : product.image)

  return (
    <div
      className={`product-visual ${hero ? "hero-product" : ""} ${
        light ? "on-light" : ""
      }`}
    >
      <img
        className="concept-product-image"
        src={displayImage}
        alt={`${product.name} - HK Enterprise industrial hardware`}
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
