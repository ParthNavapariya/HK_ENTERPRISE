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
    return () => window.removeEventListener("hashchange", update)
  }, [])

  // Observe .reveal elements whenever route changes
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible"),
        ),
      { threshold: 0.12 },
    )

    // Observe .reveal elements whenever route changes
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el))

    // Scroll reveal animation for all action buttons across pages
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!reduced) {
      // Find all buttons that are not inside hero (hero has its own timeline)
      const scrollButtons = Array.from(
        document.querySelectorAll<HTMLElement>(
          "main .btn:not(.hero-copy .btn):not(.scroll-cue), footer .btn",
        ),
      )

      if (scrollButtons.length > 0) {
        ScrollTrigger.batch(scrollButtons, {
          interval: 0.1,
          batchMax: 4,
          onEnter: (batch) => {
            batch.forEach((btn, idx) => {
              // Primary / odd buttons slide in smoothly from left (-36px), secondary / even from right (+36px)
              const fromX = btn.classList.contains("btn-secondary") || idx % 2 === 1 ? 36 : -36
              gsap.fromTo(
                btn,
                {
                  opacity: 0,
                  x: fromX,
                  scale: 0.96,
                },
                {
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  duration: 0.75,
                  delay: idx * 0.1,
                  ease: "power3.out",
                  overwrite: "auto",
                  clearProps: "transform",
                },
              )
            })
          },
          start: "top 92%",
          once: true,
        })
      }
    }

    return () => {
      observer.disconnect()
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.id?.startsWith("btn-batch")) t.kill()
      })
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
      {page === "contact" && <Contact productParam={detail} />}
      {page === "detail" && <ProductDetail category={detail} />}
      <Footer />
    </>
  )
}
