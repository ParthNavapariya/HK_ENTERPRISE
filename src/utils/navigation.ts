import { Page } from "../types"

export function navigate(page: Page, detail?: string) {
  window.location.hash = detail ? `${page}/${detail}` : page
  window.scrollTo({ top: 0, left: 0, behavior: "instant" })
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}
