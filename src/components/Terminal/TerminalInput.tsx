import { useEffect, useRef } from 'react'
import { autocomplete } from '../../commands/registry'

interface TerminalInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (value: string) => void
  onHistory: (direction: 'up' | 'down') => void
  disabled?: boolean
}

export function TerminalInput({
  value,
  onChange,
  onSubmit,
  onHistory,
  disabled = false,
}: TerminalInputProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus()
    }
  }, [disabled])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      onSubmit(value)
      onChange('')
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      onHistory('up')
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      onHistory('down')
      return
    }

    if (event.key === 'Tab') {
      event.preventDefault()
      const match = autocomplete(value)
      if (match) onChange(match)
    }
  }

  return (
    <form
      className="flex items-center gap-2 border-t border-terminal-border bg-terminal-surface px-4 py-3"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(value)
        onChange('')
      }}
    >
      <label htmlFor="terminal-input" className="shrink-0 text-[13px] md:text-sm">
        <span className="text-terminal-blue">vinay</span>
        <span className="text-terminal-text">@</span>
        <span className="text-terminal-green">portfolio</span>
        <span className="text-terminal-text">:~$</span>
      </label>
      <div className="relative flex min-w-0 flex-1 items-center">
        <input
          id="terminal-input"
          ref={inputRef}
          type="text"
          value={value}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent text-[13px] text-terminal-text outline-none md:text-sm"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          aria-label="Terminal command input"
        />
        {!value && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-0 h-[1.1em] w-[0.55em] bg-terminal-green cursor-blink"
          />
        )}
      </div>
    </form>
  )
}
