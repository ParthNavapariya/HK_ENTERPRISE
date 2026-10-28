import { navigate } from "../utils/navigation"
import PageHero from "../components/ui/PageHero"
import Eyebrow from "../components/ui/Eyebrow"
import Button from "../components/ui/Button"
import Icon from "../components/ui/Icon"

export default function Story() {
  const chapters = [
    {
      year: "2003",
      tag: "THE BEGINNING",
      title: "Humble Beginnings with Two Machines & One Product",
      copy: "In 2003, Mr. Mayur Sakaria started HK Enterprise in a small workshop with just two machines and one product. In the beginning, he did the work himself, putting in long hours and giving his best to build the business from the ground up.",
      stat: "2 Machines • 1 Product",
      statLabel: "INITIAL CAPACITY",
    },
    {
      year: "2008",
      tag: "PERSEVERANCE",
      title: "Facing Challenges, Learning, and Moving Forward",
      copy: "The journey was not always easy. Like every business, he faced challenges, setbacks, and ups and downs along the way. But even during difficult times, he never gave up. Instead, he kept learning from his experiences, improving his work, and taking one step forward at a time.",
      stat: "Resilience & Grit",
      statLabel: "CORE ATTITUDE",
    },
    {
      year: "2015",
      tag: "EXPANSION",
      title: "Growing the Team and Expanding the Product Range",
      copy: "With time, his hard work began to pay off. The business gradually grew, more people joined the team, and production increased. Starting with just one product, HK Enterprise slowly expanded its range to offer many different furniture hardware fittings. Step by step, the small workshop developed into a growing manufacturing business.",
      stat: "Full Range",
      statLabel: "FURNITURE FITTINGS",
    },
    {
      year: "2020",
      tag: "FOUNDATION",
      title: "More Than Business: Built on Years of Earned Trust",
      copy: "For Mr. Mayur Sakaria, this journey has always been about more than business. It represents years of hard work, lessons learned, challenges overcome, and the trust he built with customers along the way.",
      stat: "20+ Years",
      statLabel: "CUSTOMER TRUST",
    },
    {
      year: "TODAY",
      tag: "FUTURE VISION",
      title: "Expanding Across India and International Markets",
      copy: "Today, HK Enterprise continues to move forward with the same values that shaped its beginnings: hard work, quality, and trust. With a strong foundation and a vision for the future, we look forward to growing further and building lasting relationships across India and international markets.",
      stat: "Global Vision",
      statLabel: "PAN-INDIA & BEYOND",
    },
  ]

  const values = [
    {
      num: "01",
      title: "Hard Work",
      desc: "Putting in long hours, learning on the factory floor, and giving our best every single day — just as Mr. Mayur Sakaria did from day one.",
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

  return (
    <main className="story-page">
      <PageHero
        eyebrow="THE VISION BEHIND HK ENTERPRISE"
        title={
          <>
            The Vision Behind
            <br />
            <em>HK Enterprise.</em>
          </>
        }
        description="The inspiring journey of Mr. Mayur Sakaria — building an enduring furniture hardware manufacturing enterprise step by step through hard work, resilience, and earned trust."
      />

      {/* Founder Spotlight Hero Section */}
      <section className="story-intro-section">
        <div className="story-intro-grid">
          <div className="story-intro-text">
            <Eyebrow>OUR ORIGINS • EST. 2003</Eyebrow>
            <h2>
              From two machines to an <em>enduring enterprise.</em>
            </h2>
            <p className="story-lead-p">
              In 2003, Mr. Mayur Sakaria started HK Enterprise in a small workshop with just two machines and one product. In the beginning, he did the work himself, putting in long hours and giving his best to build the business from the ground up.
            </p>
            <p>
              The journey was not always easy. Like every business, he faced challenges, setbacks, and ups and downs along the way. But even during difficult times, he never gave up. Instead, he kept learning from his experiences, improving his work, and taking one step forward at a time.
            </p>
          </div>

          <div className="founder-card">
            <div className="founder-badge">
              <span className="badge-dot" />
              <span>FOUNDER & PROPRIETOR</span>
            </div>
            <div className="founder-info">
              <h3>Mr. Mayur Sakaria</h3>
              <span className="founder-title">Founder, HK Enterprise</span>
              <p className="founder-quote">
                &ldquo;Starting with just two machines and doing the work myself taught me that steady dedication and honesty with customers always outlasts shortcuts.&rdquo;
              </p>
            </div>
            <div className="founder-stats">
              <div>
                <b>2003</b>
                <span>Year Founded</span>
              </div>
              <div className="founder-stat-divider" />
              <div>
                <b>2 &rarr; Fleet</b>
                <span>Machine Evolution</span>
              </div>
              <div className="founder-stat-divider" />
              <div>
                <b>1 &rarr; Full Suite</b>
                <span>Product Portfolio</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="story-timeline-section">
        <div className="section-head light-head">
          <div>
            <Eyebrow>THE MILESTONES</Eyebrow>
            <h2>
              Step by step,
              <br />
              <em>built to endure.</em>
            </h2>
          </div>
          <p>
            Each milestone represents years of hard work, lessons learned, and the relentless belief in steady growth.
          </p>
        </div>

        <div className="story-timeline">
          {chapters.map((ch, idx) => (
            <article className="story-chapter" key={ch.year}>
              <div className="chapter-marker">
                <span className="chapter-year">{ch.year}</span>
                <span className="chapter-index">0{idx + 1}</span>
              </div>
              <div className="chapter-content">
                <span className="chapter-tag">{ch.tag}</span>
                <h3>{ch.title}</h3>
                <p>{ch.copy}</p>
              </div>
              <div className="chapter-stat-box">
                <b>{ch.stat}</b>
                <span>{ch.statLabel}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Featured Quote Banner */}
      <section className="story-quote-section">
        <div className="quote-ambient" aria-hidden="true" />
        <div className="quote-container">
          <span className="quote-mark" aria-hidden="true">&ldquo;</span>
          <blockquote className="founder-main-quote">
            The journey of HK Enterprise is a reflection of Mr. Mayur Sakaria&rsquo;s hard work, dedication, and belief in steady growth.
          </blockquote>
          <div className="quote-author">
            <div className="quote-author-line" />
            <div>
              <strong>MR. MAYUR SAKARIA</strong>
              <span>FOUNDER • HK ENTERPRISE • RAJKOT, GUJARAT</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="story-values-section">
        <div className="section-head light-head">
          <div>
            <Eyebrow>OUR CORE VALUES</Eyebrow>
            <h2>
              The principles that
              <br />
              shape our <em>future.</em>
            </h2>
          </div>
          <p>
            Today, HK Enterprise continues to move forward with the exact same values that shaped its humble beginnings in 2003.
          </p>
        </div>

        <div className="story-values-grid">
          {values.map((v) => (
            <article className="story-value-card" key={v.title}>
              <div className="value-header">
                <span className="value-number">{v.num}</span>
                <div className="value-line" />
              </div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="wide-cta">
        <h2>
          Experience hardware crafted
          <br />
          with <em>enduring precision.</em>
        </h2>
        <div className="actions" style={{ justifyContent: "center", marginTop: "32px" }}>
          <Button onClick={() => navigate("products")}>Explore Our Products</Button>
          <Button secondary onClick={() => navigate("contact")}>
            Contact Our Team
          </Button>
        </div>
      </section>
    </main>
  )
}

