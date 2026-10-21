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
import Industries from "./pages/Industries"
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
  }, [route])

  const [pageName, detail = ""] = route.split("/")
  const page = (
    ["home", "about", "products", "industries", "contact", "detail"].includes(
      pageName,
    )
      ? pageName
      : "home"
  ) as Page

  return (
    <>
      <Navbar page={page} />
      {page === "home" && <Home />}
      {page === "about" && <About />}
      {page === "products" && <Products />}
      {page === "industries" && <Industries />}
      {page === "contact" && <Contact />}
      {page === "detail" && <ProductDetail category={detail} />}
      <Footer />
    </>
  )
}
