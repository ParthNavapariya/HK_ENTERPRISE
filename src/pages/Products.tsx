import { useMemo, useState } from "react"
import { Category } from "../types"
import { categories, products } from "../data/products"
import { navigate } from "../utils/navigation"
import PageHero from "../components/ui/PageHero"
import ProductVisual from "../components/ui/ProductVisual"
import Icon from "../components/ui/Icon"

export default function Products() {
  const [filter, setFilter] = useState<Category>("All")
  const shown = useMemo(
    () =>
      filter === "All"
        ? products
        : products.filter((p) => p.category === filter),
    [filter],
  )

  return (
    <main>
      <PageHero
        eyebrow="PRODUCT COLLECTION"
        title={
          <>
            Made to connect.
            <br />
            <em>Built to endure.</em>
          </>
        }
        description="Explore our complete line of cold-rolled steel lockpatti, 4-corner bed clamps, architectural hinges, knock-down bed sockets, and gusset-reinforced L corners."
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
