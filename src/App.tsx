import { useEffect, useLayoutEffect, useState } from "react"
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

  // Ensure browser never forces scroll restoration on page change
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual"
    }
  }, [])

  // Immediately scroll to the very top on every route change
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    const rafId = requestAnimationFrame(() => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      ScrollTrigger.refresh()
    })

    return () => cancelAnimationFrame(rafId)
  }, [route])

  useEffect(() => {
    const update = () => {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      setRoute(window.location.hash.slice(1) || "home")
    }

    window.addEventListener("hashchange", update)

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible"),
        ),
      { threshold: 0.12 },
    )

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el))

    return () => {
      window.removeEventListener("hashchange", update)
      observer.disconnect()
    }
  }, [])

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
