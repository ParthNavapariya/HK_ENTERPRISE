import { navigate } from "../utils/navigation"
import PageHero from "../components/ui/PageHero"
import Eyebrow from "../components/ui/Eyebrow"
import Button from "../components/ui/Button"

export default function About() {
  return (
    <main>
      <PageHero
        eyebrow="ABOUT HK ENTERPRISE"
        title={
          <>
            Quietly essential.
            <br />
            <em>Precisely considered.</em>
          </>
        }
        description="Based in Rajkot's industrial heartland, HK Enterprise specializes in high-tolerance architectural hardware, heavy-gauge bed clamps, and precision furniture fittings."
      />
      <section className="about-intro">
        <Eyebrow>OUR APPROACH</Eyebrow>
        <div className="split-copy">
          <h2>
            Strength lies in the <em>details.</em>
          </h2>
          <div>
            <p>
              At HK Enterprise, hardware is more than just fasteners and plates—it is the structural backbone of furniture and architectural spaces. Our stamping and press tools are calibrated for micron-level tolerances to guarantee a perfect flush fit.
            </p>
            <p>
              From heavy-duty 4-corner bed clamps to deburred lock strike plates, every piece is stamped from high-gauge cold-rolled steel and passivated for lasting corrosion resistance.
            </p>
          </div>
        </div>
      </section>
      <section className="range-band">
        <span>LOCKPATTI</span>
        <span>HINGES</span>
        <span>BED CLAMPS</span>
        <span>BED SOCKETS</span>
        <span>L CORNERS</span>
        <span>BED FITTINGS</span>
      </section>
      <section className="quality-section">
        <div>
          <Eyebrow>QUALITY, DEFINED</Eyebrow>
          <h2>
            A measured
            <br />
            approach to <em>quality.</em>
          </h2>
        </div>
        <div className="quality-list">
          {[
            {
              title: "Tooling Precision",
              desc: "Heavy hydraulic stamping dies engineered for burr-free deburred edges and accurate countersunk holes.",
            },
            {
              title: "High-Grade Steel",
              desc: "Selected cold-rolled carbon steel and heavy gauge MS tested for maximum joint rigidity and dynamic load resistance.",
            },
            {
              title: "Anti-Corrosion Finish",
              desc: "Electroplated yellow zinc and silver passivated coatings for lifelong rust protection in humid climates.",
            },
          ].map((item, i) => (
            <article key={item.title}>
              <span>0{i + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="wide-cta">
        <h2>
          Explore the complete
          <br />
          product range.
        </h2>
        <Button onClick={() => navigate("products")}>
          Explore Our Products
        </Button>
      </section>
    </main>
  )
}
