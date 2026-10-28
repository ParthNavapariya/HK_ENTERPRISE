import { navigate } from "../utils/navigation"
import PageHero from "../components/ui/PageHero"
import Eyebrow from "../components/ui/Eyebrow"
import Button from "../components/ui/Button"

const values = [
  {
    num: "01",
    title: "Hard Work",
    desc: "Putting in long hours, learning directly on the factory floor, and giving our best every single day — just as Mr. Mayur Sakaria did from day one.",
  },
  {
    num: "02",
    title: "Quality",
    desc: "Starting with a single reliable product, now crafting a comprehensive portfolio of furniture fittings with strict tolerance and structural durability.",
  },
  {
    num: "03",
    title: "Trust",
    desc: "Believing that true business is built on transparent relationships, dependable delivery, and lasting partnerships that span decades.",
  },
]

export default function Story() {
  return (
    <main>
      {/* Dark hero header — same as About & Contact */}
      <PageHero
        eyebrow="EST. 2003 · OUR STORY"
        title={
          <>
            The Vision Behind
            <br />
            <em>HK Enterprise.</em>
          </>
        }
        description="A journey built on hard work, quality, and trust — from a small two-machine workshop in Rajkot to a growing furniture hardware manufacturer."
      />

      {/* Intro narrative — same split-copy layout as About */}
      <section className="about-intro">
        <Eyebrow>THE JOURNEY</Eyebrow>
        <div className="split-copy">
          <h2>
            From one workshop
            <br />
            to <em>lasting trust.</em>
          </h2>
          <div>
            <p>
              In 2003, Mr. Mayur Sakaria started HK Enterprise in a small
              workshop with just two machines and one product. In the beginning,
              he did the work himself, putting in long hours and giving his best
              to build the business from the ground up.
            </p>
            <p>
              The journey was not always easy. Like every business, he faced
              challenges, setbacks, and ups and downs along the way. But even
              during difficult times, he never gave up. Instead, he kept
              learning from his experiences, improving his work, and taking one
              step forward at a time.
            </p>
            <div className="about-motto">
              <span>EST. 2003</span>
              <span>Rajkot, Gujarat</span>
              <span>20+ Years of Growth</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gold ticker band — same as About */}
      <section className="range-band">
        <span>HARD WORK</span>
        <span>QUALITY</span>
        <span>TRUST</span>
        <span>RAJKOT</span>
        <span>EST. 2003</span>
        <span>FURNITURE HARDWARE</span>
      </section>

      {/* Full story — quality-section layout with 2 cols */}
      <section className="quality-section">
        <div>
          <Eyebrow>OUR GROWTH</Eyebrow>
          <h2>
            Built step
            <br />
            by <em>step.</em>
          </h2>
        </div>
        <div className="quality-list">
          <article>
            <span>01</span>
            <div>
              <h3>The Beginning</h3>
              <p>
                With time, his hard work began to pay off. The business
                gradually grew, more people joined the team, and production
                increased. Starting with just one product, HK Enterprise slowly
                expanded its range to offer many different furniture hardware
                fittings.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Steady Expansion</h3>
              <p>
                Step by step, the small workshop developed into a growing
                manufacturing business. For Mr. Mayur Sakaria, this journey has
                always been about more than business — it represents years of
                hard work, lessons learned, and the trust built with customers
                along the way.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>Looking Forward</h3>
              <p>
                Today, HK Enterprise continues to move forward with the same
                values that shaped its beginnings: hard work, quality, and
                trust. We look forward to growing further and building lasting
                relationships across India and international markets.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* Core values — same process-section / principles layout as Home */}
      <section className="process-section">
        <div className="section-head light-head">
          <div>
            <Eyebrow>CORE VALUES</Eyebrow>
            <h2>
              Principles that
              <br />
              <em>define our craft.</em>
            </h2>
          </div>
          <p>
            Every product we make carries the weight of these values — built
            into every fitting, every delivery, and every relationship.
          </p>
        </div>
        <div className="principles">
          {values.map(({ num, title, desc }) => (
            <article key={num}>
              <span>{num}</span>
              <div className="principle-line" />
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA panel — identical to Home page */}
      <section className="cta-panel">
        <Eyebrow light>START A CONVERSATION</Eyebrow>
        <h2>
          Experience hardware
          <br />
          <em>engineered with precision.</em>
        </h2>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Button onClick={() => navigate("products")}>Explore Products</Button>
          <Button secondary onClick={() => navigate("contact")}>
            Contact Us
          </Button>
        </div>
        <span className="cta-code">HK / 2025</span>
      </section>
    </main>
  )
}
