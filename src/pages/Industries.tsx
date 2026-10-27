import { navigate } from "../utils/navigation"
import PageHero from "../components/ui/PageHero"
import Icon from "../components/ui/Icon"

export default function Industries() {
  const industries = [
    {
      title: "Modular Beds & Bedroom Furniture",
      desc: "Reinforced 4-corner bed clamps and heavy knock-down bed sockets engineered for dynamic loads, completely eliminating squeaks, wobble, and frame degradation.",
      image: "/products/bed-clamp/bed-clamp-1.jpg",
    },
    {
      title: "Architectural Doors & Cabinetry",
      desc: "Precision deburred lock patti fittings and heavy architectural hinges providing smooth swing cycles, tight latch tolerances, and flush mounting.",
      image: "/products/hinges/hinges-1.jpg",
    },
    {
      title: "Heavy Modular Framing & Shelving",
      desc: "Hydraulic-pressed 90° gusset L corners and center support sub-frame fittings for structural wood, plywood, and metal frame reinforcement.",
      image: "/products/l-corner/l-corner-1.jpg",
    },
  ]

  return (
    <main>
      <PageHero
        eyebrow="APPLICATIONS & INDUSTRIES"
        title={
          <>
            Hardware in
            <br />
            <em>context.</em>
          </>
        }
        description="Engineered specifically for furniture OEMs, interior contractors, and modular wood manufacturers across India."
      />
      <section className="industry-list">
        {industries.map((item, i) => (
          <article key={item.title}>
            <span>0{i + 1}</span>
            <div
              className="industry-image"
              style={{
                position: "relative",
                overflow: "hidden",
                border: "1px solid rgba(232,213,154,0.15)",
                background: "#16191f",
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <div>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
              <button onClick={() => navigate("products")}>
                <span>Explore relevant products</span>
                <Icon name="arrow" />
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
