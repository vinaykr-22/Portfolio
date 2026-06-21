import { useCallback, useState } from 'react'
import type { TerminalLine } from '../data/profile'
import { executeCommand } from '../commands/registry'
import { useCommandHistory } from './useCommandHistory'

const createLine = (
  type: TerminalLine['type'],
  content: string,
  href?: string,
): TerminalLine => ({
  id: crypto.randomUUID(),
  type,
  content,
  href,
})

export function useTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [input, setInput] = useState('')
  const { push, navigate } = useCommandHistory()

  const openUrl = useCallback((url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }, [])

  const appendLines = useCallback((newLines: TerminalLine[]) => {
    setLines((prev) => [...prev, ...newLines])
  }, [])

  const submit = useCallback(
    (value: string) => {
      const trimmed = value.trim()
      if (!trimmed) return

      appendLines([createLine('input', `vinay@portfolio:~$ ${trimmed}`)])
      push(trimmed)

      const result = executeCommand(trimmed, { openUrl, appendLines })

      if (result.clear) {
        setLines([])
        return
      }

      if (result.lines && result.lines.length > 0) {
        appendLines(result.lines)
      }
    },
    [appendLines, openUrl, push],
  )

  const handleHistory = useCallback(
    (direction: 'up' | 'down') => {
      setInput((current) => navigate(direction, current))
    },
    [navigate],
  )

  const clear = useCallback(() => setLines([]), [])

  return {
    lines,
    input,
    setInput,
    submit,
    handleHistory,
    clear,
    appendLines,
  }
}
