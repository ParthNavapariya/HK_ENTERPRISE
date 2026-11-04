import { useCallback, useEffect, useLayoutEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Page } from "./types"
import Navbar from "./components/layout/Navbar"
import Footer from "./components/layout/Footer"
import LogoIntro from "./components/ui/LogoIntro"
import Home from "./pages/Home"
import About from "./pages/About"
import Products from "./pages/Products"
import ProductDetail from "./pages/ProductDetail"
import Story from "./pages/Story"
import Contact from "./pages/Contact"

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [route, setRoute] = useState(window.location.hash.slice(1) || "home")
  const [introReady, setIntroReady] = useState(() => {
    if (typeof window === "undefined") return true
    if (sessionStorage.getItem("hk_intro_shown") === "true") return true
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true
    return false
  })

  const handleIntroFinish = useCallback(() => {
    setIntroReady(true)
  }, [])

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
    if (!introReady) return

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
      // Find all button groups/parents or standalone buttons outside hero and detail pages
      const allActionContainers = Array.from(
        document.querySelectorAll<HTMLElement>(
          "main:not(.detail-page) .actions:not(.hero .actions):not(.desktop-actions):not(.mobile-actions), footer",
        ),
      )

      allActionContainers.forEach((container) => {
        const btns = Array.from(container.querySelectorAll<HTMLElement>(".btn"))
        if (btns.length === 0) return

        ScrollTrigger.create({
          trigger: container,
          start: "top 95%",
          once: true,
          onEnter: () => {
            if (btns.length === 1) {
              gsap.fromTo(
                btns[0],
                { opacity: 0, x: -30 },
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.6,
                  ease: "power2.out",
                  overwrite: "auto",
                  clearProps: "transform,opacity",
                },
              )
            } else {
              // 2 buttons: simultaneous fluid slide-in without delay
              gsap.fromTo(
                btns[0],
                { opacity: 0, x: -30 },
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.6,
                  ease: "power2.out",
                  overwrite: "auto",
                  clearProps: "transform,opacity",
                },
              )
              gsap.fromTo(
                btns[1],
                { opacity: 0, x: 30 },
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.6,
                  ease: "power2.out",
                  overwrite: "auto",
                  clearProps: "transform,opacity",
                },
              )
            }
          },
        })
      })

      // Any remaining standalone buttons not inside action containers or detail page
      const standaloneBtns = Array.from(
        document.querySelectorAll<HTMLElement>(
          "main:not(.detail-page) .btn:not(.hero .btn):not(.actions .btn):not(.cta-panel .btn):not(.scroll-cue)",
        ),
      )

      if (standaloneBtns.length > 0) {
        ScrollTrigger.batch(standaloneBtns, {
          interval: 0.05,
          batchMax: 2,
          onEnter: (batch) => {
            batch.forEach((btn, idx) => {
              const fromX = idx % 2 === 0 ? -30 : 30
              gsap.fromTo(
                btn,
                { opacity: 0, x: fromX },
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.6,
                  ease: "power2.out",
                  overwrite: "auto",
                  clearProps: "transform,opacity",
                },
              )
            })
          },
          start: "top 95%",
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
  }, [route, introReady])

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
      <LogoIntro onIntroFinish={handleIntroFinish} />
      {introReady && (
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
      )}
    </>
  )
}
