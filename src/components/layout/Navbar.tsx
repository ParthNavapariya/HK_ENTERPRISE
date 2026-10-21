import { useEffect, useState } from "react"
import { Page } from "../../types"
import { navigate } from "../../utils/navigation"
import Brand from "../ui/Brand"
import Button from "../ui/Button"
import Icon from "../ui/Icon"

export default function Navbar({ page }: { page: Page }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const links: [string, Page][] = [
    ["Home", "home"],
    ["About Us", "about"],
    ["Products", "products"],
    ["Industries", "industries"],
    ["Contact", "contact"],
  ]

  return (
    <header className={`nav ${scrolled || page !== "home" ? "nav-solid" : ""}`}>
      <Brand />
      <nav
        className={`nav-links ${open ? "open" : ""}`}
        aria-label="Primary navigation"
      >
        {links.map(([label, target]) => (
          <button
            key={target}
            className={page === target ? "active" : ""}
            onClick={() => {
              navigate(target)
              setOpen(false)
            }}
          >
            {label}
          </button>
        ))}
        <div className="mobile-cta">
          <Button
            onClick={() => {
              navigate("products")
              setOpen(false)
            }}
          >
            Explore Products
          </Button>
        </div>
      </nav>
      <div className="desktop-cta">
        <Button onClick={() => navigate("products")}>Explore Products</Button>
      </div>
      <button
        className="menu-btn"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <Icon name={open ? "close" : "menu"} />
      </button>
    </header>
  )
}
