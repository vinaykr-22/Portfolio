import { useEffect, useState } from 'react'
import { BOOT_LINES } from '../../data/profile'

interface BootSequenceProps {
  onComplete: () => void
  isReady?: boolean
}

export function BootSequence({ onComplete, isReady = true }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<string[]>([])
  const [done, setDone] = useState(false)
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (!isReady) return

    if (reducedMotion) {
      setVisibleLines(BOOT_LINES)
      setDone(true)
      onComplete()
      return
    }

    let lineIndex = 0
    let charIndex = 0
    let current = ''

    const interval = window.setInterval(() => {
      const target = BOOT_LINES[lineIndex]
      current += target[charIndex]
      charIndex += 1

      setVisibleLines((prev) => {
        const next = [...prev]
        next[lineIndex] = current
        return next
      })

      if (charIndex >= target.length) {
        lineIndex += 1
        charIndex = 0
        current = ''

        if (lineIndex >= BOOT_LINES.length) {
          window.clearInterval(interval)
          setDone(true)
          onComplete()
        }
      }
    }, 18)

    return () => window.clearInterval(interval)
  }, [onComplete, reducedMotion, isReady])

  const skip = () => {
    if (!done) {
      setVisibleLines(BOOT_LINES)
      setDone(true)
      onComplete()
    }
  }

  return (
    <button
      type="button"
      onClick={skip}
      className="flex h-full w-full flex-col justify-center bg-terminal-bg px-6 text-left text-[13px] leading-relaxed md:text-sm"
      aria-label="Skip boot sequence"
    >
      {BOOT_LINES.map((line, index) => (
        <div key={line} className="text-terminal-green">
          {visibleLines[index] ?? ''}
          {!done && index === visibleLines.length - 1 && (
            <span className="ml-0.5 inline-block h-[1em] w-[0.55em] bg-terminal-green cursor-blink" />
          )}
        </div>
      ))}
      {done && (
        <p className="mt-4 text-terminal-text/60">Press any key or click to continue...</p>
      )}
    </button>
  )
}
