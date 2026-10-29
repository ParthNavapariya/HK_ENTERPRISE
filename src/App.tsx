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

    // Scroll reveal observer: triggers text animation when scroll reaches the section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed")
            entry.target.classList.add("visible")
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      },
    )

    // Observe all key content sections and text blocks after mount
    const timer = setTimeout(() => {
      const selectors = [
        ".reveal",
        ".reveal-text",
        ".reveal-group",
        ".manifesto",
        ".section-head",
        ".principles",
        ".cta-panel",
        ".about-intro",
        ".story-manifesto",
        ".industry-list",
        ".quality-section",
        ".detail-info",
        ".specs",
        ".related",
        ".product-card",
      ]
      document
        .querySelectorAll(selectors.join(","))
        .forEach((el) => observer.observe(el))
    }, 60)

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
