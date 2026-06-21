import { useCallback, useState } from 'react'

export function useCommandHistory() {
  const [history, setHistory] = useState<string[]>([])
  const [index, setIndex] = useState(-1)
  const [draft, setDraft] = useState('')

  const push = useCallback((command: string) => {
    const trimmed = command.trim()
    if (!trimmed) return

    setHistory((prev) => {
      if (prev[prev.length - 1] === trimmed) return prev
      return [...prev, trimmed]
    })
    setIndex(-1)
    setDraft('')
  }, [])

  const navigate = useCallback(
    (direction: 'up' | 'down', currentValue: string) => {
      if (history.length === 0) return currentValue

      if (direction === 'up') {
        if (index === -1) {
          setDraft(currentValue)
          const nextIndex = history.length - 1
          setIndex(nextIndex)
          return history[nextIndex]
        }

        if (index > 0) {
          const nextIndex = index - 1
          setIndex(nextIndex)
          return history[nextIndex]
        }

        return history[0]
      }

      if (index === -1) return currentValue

      if (index < history.length - 1) {
        const nextIndex = index + 1
        setIndex(nextIndex)
        return history[nextIndex]
      }

      setIndex(-1)
      return draft
    },
    [draft, history, index],
  )

  return { push, navigate }
}
