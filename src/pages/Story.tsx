import { navigate } from "../utils/navigation"
import Button from "../components/ui/Button"

export default function Story() {
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

  return (
    <main className="story-modern-page">
      {/* Subtle ambient lighting */}
      <div className="story-ambient-glow" aria-hidden="true" />

      <div className="story-container">
        {/* Cinematic Workshop Visual from Mockup */}
        <div className="story-hero-frame">
          <img
            src="/images/story-workshop.jpg"
            alt="Mr. Mayur Sakaria craftsmanship in the workshop - HK Enterprise"
            className="story-hero-image"
          />
          <div className="story-hero-glow" aria-hidden="true" />
        </div>

        {/* Section Header */}
        <div className="story-header-block">
          <span className="story-tag">EST. 2003 · OUR STORY</span>
          <h1 className="story-title">The Vision Behind HK Enterprise</h1>
          <p className="story-subtitle">
            A journey built on hard work, quality, and trust.
          </p>
        </div>

        {/* Horizontal Gold Line */}
        <div className="story-gold-divider" />

        {/* 2-Column Key Stats */}
        <div className="story-stats-grid">
          <div className="story-stat-col">
            <span className="story-stat-number">2003</span>
            <span className="story-stat-label">Where our journey began</span>
          </div>
          <div className="story-stat-col">
            <span className="story-stat-number">2 Machines</span>
            <span className="story-stat-label">One small workshop</span>
          </div>
        </div>

        {/* Narrative Prose */}
        <div className="story-narrative-block">
          <div className="story-prose-group">
            <h3>From a Small Workshop to a Growing Enterprise</h3>
            <p>
              In 2003, Mr. Mayur Sakaria started HK Enterprise with just two
              machines and one product. Through years of dedication, learning,
              and perseverance, that small beginning grew into a manufacturing
              business offering a wider range of furniture hardware fittings.
            </p>
          </div>

          <div className="story-prose-group">
            <h3>Built on Values That Last</h3>
            <p>
              Every step forward has been shaped by hard work, a commitment to
              quality, and the trust of our customers. These values continue to
              guide HK Enterprise as we look toward new opportunities across
              India and international markets.
            </p>
          </div>
        </div>

        {/* Scroll Cue & Motto Accent */}
        <div className="story-quote-accent">
          <div className="story-arrow-circle" aria-hidden="true">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
          <p className="story-motto">
            &ldquo;A journey of dedication, steady growth, and lasting trust.&rdquo;
          </p>
        </div>

        {/* Core Values Section */}
        <div className="story-values-dark-section">
          <div className="story-values-header">
            <span>CORE VALUES</span>
            <h2>Principles that define our craft.</h2>
          </div>
          <div className="story-values-grid">
            {values.map((v) => (
              <div className="story-value-dark-card" key={v.title}>
                <div className="value-dark-header">
                  <span className="value-dark-num">{v.num}</span>
                  <div className="value-dark-line" />
                </div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="story-cta-block">
          <div className="story-cta-copy">
            <h3>Experience hardware engineered with precision.</h3>
            <p>
              Explore our comprehensive range of furniture fittings manufactured in Rajkot.
            </p>
          </div>
          <div className="story-cta-actions">
            <Button onClick={() => navigate("products")}>Explore Products</Button>
            <Button secondary onClick={() => navigate("contact")}>
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
