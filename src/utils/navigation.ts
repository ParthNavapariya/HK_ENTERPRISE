import { Page } from "../types"

export function smoothScrollToTop(duration = 350, onComplete?: () => void) {
  const startY = window.scrollY || document.documentElement.scrollTop || 0

  if (startY <= 20) {
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    onComplete?.()
    return
  }

  const startTime = performance.now()

  function step(currentTime: number) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    // easeOutCubic curve for smooth cinematic deceleration
    const ease = 1 - Math.pow(1 - progress, 3)
    const newY = startY * (1 - ease)

    window.scrollTo(0, newY)

    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      window.scrollTo(0, 0)
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
      onComplete?.()
    }
  }

  requestAnimationFrame(step)
}

export function navigate(page: Page, detail?: string) {
  const targetHash = detail ? `${page}/${detail}` : page

  // If already on the same page, smoothly scroll to top
  if (window.location.hash.slice(1) === targetHash) {
    smoothScrollToTop(350)
    return
  }

  // Immediately reset scroll position to top and update hash
  window.scrollTo(0, 0)
  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
  window.location.hash = targetHash
}
