import { Page } from "../../types"
import { COMPANY_INFO } from "../../data/products"
import { navigate } from "../../utils/navigation"
import Brand from "../ui/Brand"

export default function Footer() {
  return (
    <footer>
      <div className="footer-top">
        <Brand />
        <p>
          Precision hardware for considered connections.
          <br />
          <small style={{ color: "rgba(245,245,245,0.4)" }}>
            {COMPANY_INFO.address}
          </small>
        </p>
      </div>
      <div className="footer-links">
        <div>
          <span>EXPLORE</span>
          {(["home", "about", "products", "industries"] as Page[]).map((x) => (
            <button key={x} onClick={() => navigate(x)}>
              {x === "about" ? "About Us" : x[0].toUpperCase() + x.slice(1)}
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
            href={`mailto:${COMPANY_INFO.email}`}
            style={{
              color: "rgba(245,245,245,0.55)",
              textDecoration: "none",
              fontSize: "12px",
            }}
          >
            {COMPANY_INFO.email}
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} HK ENTERPRISE</span>
        <span>RAJKOT, GUJARAT • PRECISION ARCHITECTURAL HARDWARE</span>
      </div>
    </footer>
  )
}
