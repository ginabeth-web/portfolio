import { onMounted, onBeforeUnmount } from 'vue'

/**
 * Adds a lightweight scroll-reveal effect to every element carrying the
 * `data-reveal` attribute. Elements start hidden (see app.css) and get the
 * `is-visible` class the first time they enter the viewport.
 *
 * Runs on the client only, so it is SSR-safe. If IntersectionObserver is
 * unavailable (or the user prefers reduced motion) everything is revealed
 * immediately.
 */
export function useScrollReveal() {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'))
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer?.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    targets.forEach((el) => observer?.observe(el))
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
    observer = null
  })
}
