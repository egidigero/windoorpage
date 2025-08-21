import * as React from "react"

export function useScrollPosition() {
  const [scrollY, setScrollY] = React.useState(0)

  React.useEffect(() => {
    let animationFrame: number | null = null

    const updateScroll = () => {
      setScrollY(window.scrollY)
      animationFrame = null
    }

    const handleScroll = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateScroll)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame)
      }
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return scrollY
}
