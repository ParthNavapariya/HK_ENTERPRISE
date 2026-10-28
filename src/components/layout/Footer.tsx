import { Page } from "../../types"
import { COMPANY_INFO } from "../../data/products"
import { navigate } from "../../utils/navigation"
import Brand from "../ui/Brand"

export default function Footer() {
  return (
    <footer>
      {/* Soft warm gold ambient glow in center */}
      <div className="footer-ambient-glow" aria-hidden="true" />

      {/* Subtle architectural engineering lines (low contrast, minimal) */}
      <svg
        className="footer-schematic-grid"
        viewBox="0 0 1200 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <line
          x1="0"
          y1="80"
          x2="1200"
          y2="80"
          stroke="rgba(201, 164, 76, 0.03)"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="280"
          x2="1200"
          y2="280"
          stroke="rgba(201, 164, 76, 0.03)"
          strokeWidth="1"
        />
        <path
          d="M 60 0 L 100 40 L 400 40"
          stroke="rgba(201, 164, 76, 0.045)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <path
          d="M 750 380 L 820 310 L 1150 310"
          stroke="rgba(232, 213, 154, 0.04)"
          strokeWidth="1"
        />
        <path
          d="M 540 30 L 560 50 L 560 150"
          stroke="rgba(201, 164, 76, 0.04)"
          strokeWidth="1"
        />
        <path
          d="M 560 140 L 560 160 M 550 150 L 570 150"
          stroke="rgba(201, 164, 76, 0.08)"
          strokeWidth="1"
        />
        <path
          d="M 150 270 L 150 290 M 140 280 L 160 280"
          stroke="rgba(232, 213, 154, 0.08)"
          strokeWidth="1"
        />
      </svg>

      <div className="footer-top">
        <Brand />
        <p>
          Precision hardware for considered connections.
          <br />
          <small>{COMPANY_INFO.address}</small>
        </p>
      </div>

      <div className="footer-body">
        {/* Left Column: Premium text-based brand section */}
        <div className="footer-brand-statement">
          <div className="footer-statement-eyebrow">
            <i aria-hidden="true" />
            <span>HK ARCHITECTURAL STANDARD</span>
          </div>
          <h3 className="footer-statement-headline">
            ENGINEERED FOR PRECISION.
            <br />
            <em>BUILT TO LAST.</em>
          </h3>
          <p className="footer-statement-copy">
            At HK Enterprise, we craft high-quality hardware solutions for modern
            spaces — combining strength, precision and trust.
          </p>
          <div className="footer-statement-specs">
            <span>COLD-ROLLED STEEL</span>
            <b>•</b>
            <span>HIGH LOAD ENDURANCE</span>
            <b>•</b>
            <span>ZERO DEFECT TOLERANCE</span>
          </div>
        </div>

        {/* Center subtle engineering divider */}
        <div className="footer-center-divider" aria-hidden="true" />

        {/* Right Columns: Explore & Enquiries */}
        <div className="footer-links">
          <div>
            <span>EXPLORE</span>
            {(["home", "about", "products", "story"] as Page[]).map((x) => (
              <button key={x} onClick={() => navigate(x)}>
                {x === "about"
                  ? "About Us"
                  : x === "story"
                  ? "Our Story"
                  : x[0].toUpperCase() + x.slice(1)}
              </button>
            ))}
          </div>
          <div>
            <span>ENQUIRIES</span>
            <button onClick={() => navigate("contact")}>Contact Us</button>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--champagne)",
                textDecoration: "none",
                fontSize: "12px",
              }}
            >
              WhatsApp ({COMPANY_INFO.phoneDisplay})
            </a>
            <a
              href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, "")}`}
              style={{
                color: "rgba(245,245,245,0.55)",
                textDecoration: "none",
                fontSize: "12px",
              }}
            >
              Direct Call: {COMPANY_INFO.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} HK ENTERPRISE</span>
        <span>RAJKOT, GUJARAT • PRECISION ARCHITECTURAL HARDWARE</span>
      </div>
    </footer>
  )
}
