import { useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Page } from "./types"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import Home from "./pages/Home"
import About from "./pages/About"
import Products from "./pages/Products"
import ProductDetail from "./pages/ProductDetail"
import Story from "./pages/Story"
import Contact from "./pages/Contact"

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || "home")

  useEffect(() => {
    const update = () => {
      setRoute(window.location.hash.slice(1) || "home")
      // Refresh ScrollTrigger calculations cleanly on route transition
      setTimeout(() => {
        ScrollTrigger.refresh()
      }, 100)
    }

    window.addEventListener("hashchange", update)

    // Scroll reveal observer: triggers text animation right when scroll reaches each element
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed")
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      },
    )

    // Observe specific text blocks and cards across all pages
    const timer = setTimeout(() => {
      const selectors = [
        "main :not(.hero):not(.hero-copy):not(.detail-hero):not(.detail-copy) > .eyebrow",
        ".manifesto-copy",
        ".manifesto-meta",
        ".section-head h2",
        ".section-head p",
        ".principles article",
        ".cta-panel h2",
        ".cta-panel p",
        ".cta-panel .btn",
        ".about-intro h2",
        ".about-intro p",
        ".story-manifesto h2",
        ".story-manifesto p",
        ".quality-section h2",
        ".quality-section p",
        ".detail-info h2",
        ".detail-info p",
        ".specs article",
        ".industry-list article",
        ".reveal-text",
      ]
      document.querySelectorAll(selectors.join(",")).forEach((el) => {
        const rect = el.getBoundingClientRect()
        // If already in top of screen on page load, reveal immediately
        if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
          el.classList.add("is-revealed")
        } else {
          observer.observe(el)
        }
      })
    }, 80)

    return () => {
      window.removeEventListener("hashchange", update)
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [route])

  const [rawPageName, detail = ""] = route.split("/")
  // Support legacy '#industries' and '#our-story' mapping to 'story'
  const pageName =
    rawPageName === "industries" || rawPageName === "our-story"
      ? "story"
      : rawPageName

  const page = (
    ["home", "about", "story", "products", "contact", "detail"].includes(
      pageName,
    )
      ? pageName
      : "home"
  ) as Page

  return (
    <>
      <Navbar page={page} />
      {page === "home" && <Home />}
      {page === "story" && <Story />}
      {page === "about" && <About />}
      {page === "products" && <Products />}
      {page === "contact" && <Contact />}
      {page === "detail" && <ProductDetail category={detail} />}
      <Footer />
    </>
  )
}
