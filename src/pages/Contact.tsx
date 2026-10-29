import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { COMPANY_INFO, categories } from "../data/products"
import { navigate } from "../utils/navigation"
import PageHero from "../components/ui/PageHero"
import Eyebrow from "../components/ui/Eyebrow"
import Button from "../components/ui/Button"
import Icon from "../components/ui/Icon"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return

    const ctx = gsap.context(() => {
      const layout = document.querySelector(".contact-layout")
      if (layout) {
        gsap.timeline({
          scrollTrigger: {
            trigger: layout,
            start: "top 80%",
            once: true,
          },
        })
          .from(layout.querySelector("aside .eyebrow"), { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" })
          .from(layout.querySelectorAll("aside > div"), {
            opacity: 0,
            y: 30,
            stagger: 0.12,
            duration: 0.8,
            ease: "power3.out",
          }, "-=0.35")
          .from(layout.querySelector(".contact-form-card"), {
            opacity: 0,
            y: 40,
            duration: 0.9,
            ease: "power3.out",
          }, "-=0.55")
      }
    }, containerRef)

    return () => ctx.revert()
  }, [sent])

  if (sent) {
    return (
      <main className="confirmation">
        <div>
          <span className="confirm-icon">
            <Icon name="mail" />
          </span>
          <Eyebrow>ENQUIRY RECEIVED</Eyebrow>
          <h1>
            Thank you for
            <br />
            <em>reaching out.</em>
          </h1>
          <p>
            Your enquiry has been received. Our team will get back to you promptly with product specifications and pricing.
          </p>
          <div className="actions" style={{ marginTop: "20px" }}>
            <Button
              onClick={() => {
                setSent(false)
                navigate("home")
              }}
            >
              Return Home
            </Button>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ textDecoration: "none" }}
            >
              <span>Chat on WhatsApp</span>
              <Icon name="arrow" />
            </a>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main ref={containerRef}>
      <PageHero
        eyebrow="CONTACT HK ENTERPRISE"
        title={
          <>
            Let’s discuss your
            <br />
            <em>requirements.</em>
          </>
        }
        description="Connect with our technical team in Rajkot for custom hardware orders, wholesale enquiries, and technical specifications."
      />
      <section className="contact-layout">
        <aside>
          <Eyebrow>OFFICIAL CONTACT</Eyebrow>
          <div>
            <span>PHONE / WHATSAPP</span>
            <p>
              <a
                href={`tel:${COMPANY_INFO.phone.replace(/\s+/g, "")}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {COMPANY_INFO.phoneDisplay}
              </a>
            </p>
          </div>
          <div>
            <span>MANUFACTURING FACILITY</span>
            <p>{COMPANY_INFO.address}</p>
          </div>
          <div>
            <span>WORKING HOURS</span>
            <p>{COMPANY_INFO.hours}</p>
          </div>
          <div style={{ paddingTop: "25px", borderTop: "1px solid var(--light-line)" }}>
            <a
              href={COMPANY_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              style={{ width: "100%", textDecoration: "none" }}
            >
              <span>Instant WhatsApp Chat</span>
              <Icon name="arrow" />
            </a>
          </div>
        </aside>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
          }}
        >
          <div className="form-grid">
            <label>
              <span>Full Name *</span>
              <input required placeholder="Your full name" />
            </label>
            <label>
              <span>Company / Workshop Name</span>
              <input placeholder="Your company or workshop" />
            </label>
            <label>
              <span>Phone / WhatsApp Number *</span>
              <input required type="tel" placeholder="+91 97237 71164" />
            </label>
            <label>
              <span>City / State *</span>
              <input required placeholder="e.g. Rajkot, Gujarat" />
            </label>
          </div>
          <label>
            <span>Product Category</span>
            <select defaultValue="">
              <option value="" disabled>
                Select a product series
              </option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
          <label>
            <span>Message *</span>
            <textarea
              required
              rows={5}
              placeholder="Tell us about your hardware quantity or custom dimension requirements"
            />
          </label>
          <Button type="submit">Send Enquiry</Button>
        </form>
      </section>
    </main>
  )
}
