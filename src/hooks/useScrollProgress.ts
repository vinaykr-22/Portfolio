import { useState, useEffect } from 'react'

export function useScrollProgress(containerId: string) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) return

    const handleScroll = () => {
      const scrollTop = container.scrollTop
      const scrollHeight = container.scrollHeight - container.clientHeight
      
      if (scrollHeight === 0) {
        setProgress(0)
      } else {
        setProgress(scrollTop / scrollHeight)
      }
    }

    container.addEventListener('scroll', handleScroll)
    // Call once to initialize
    handleScroll()

    return () => container.removeEventListener('scroll', handleScroll)
  }, [containerId])

  return progress
}
