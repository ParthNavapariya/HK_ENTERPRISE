import { navigate } from "../utils/navigation"
import Hero from "../components/home/Hero"
import CinematicSequence from "../components/home/CinematicSequence"
import ScrollCategories from "../components/home/ScrollCategories"
import Eyebrow from "../components/ui/Eyebrow"
import Button from "../components/ui/Button"

export default function Home() {
  return (
    <main>
      <Hero />
      <section className="manifesto reveal" id="intro">
        <Eyebrow>OUR PHILOSOPHY</Eyebrow>
        <p className="manifesto-copy">
          Hardware is rarely seen.
          <br />
          Its <em>performance</em> is always felt.
        </p>
        <div className="manifesto-meta">
          <span>Designed around purpose</span>
          <p>
            From the smallest connection to the structures they support, every
            detail deserves considered engineering.
          </p>
        </div>
      </section>
      <CinematicSequence />
      <ScrollCategories />
      <section className="process-section">
        <div className="section-head light-head">
          <div>
            <Eyebrow>THE HK STANDARD</Eyebrow>
            <h2>
              Built with
              <br />
              <em>intention.</em>
            </h2>
          </div>
          <p>
            Our approach centers on clarity, consistency, and products designed
            for their intended connection.
          </p>
        </div>
        <div className="principles">
          {[
            [
              "01",
              "Purpose first",
              "Every product begins with a clear application and a practical role.",
            ],
            [
              "02",
              "Detail considered",
              "Proportions, interfaces, and finishing are presented with equal care.",
            ],
            [
              "03",
              "Quality focused",
              "Product claims and specifications are published only after approval.",
            ],
          ].map(([n, title, text]) => (
            <article key={n}>
              <span>{n}</span>
              <div className="principle-line" />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="cta-panel">
        <Eyebrow light>START A CONVERSATION</Eyebrow>
        <h2>
          Find the right
          <br />
          connection.
        </h2>
        <Button onClick={() => navigate("contact")}>Send an Enquiry</Button>
        <span className="cta-code">HK / 2025</span>
      </section>
    </main>
  )
}
