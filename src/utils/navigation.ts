import { Page } from "../types"

export function navigate(page: Page, detail?: string) {
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
  window.location.hash = detail ? `${page}/${detail}` : page
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
}
