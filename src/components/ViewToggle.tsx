import { LayoutTemplate, Terminal } from 'lucide-react'

export type ViewMode = 'terminal' | 'simple'

interface ViewToggleProps {
  mode: ViewMode
  onChange: (mode: ViewMode) => void
}

export function ViewToggle({ mode, onChange }: ViewToggleProps) {
  return (
    <div className="flex items-center gap-1 rounded border border-terminal-border p-1">
      <button
        type="button"
        onClick={() => onChange('terminal')}
        className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs transition ${
          mode === 'terminal'
            ? 'bg-terminal-bg text-terminal-green'
            : 'text-terminal-text/70 hover:text-terminal-text'
        }`}
        aria-pressed={mode === 'terminal'}
      >
        <Terminal className="h-3.5 w-3.5" aria-hidden="true" />
        Terminal
      </button>
      <button
        type="button"
        onClick={() => onChange('simple')}
        className={`inline-flex items-center gap-1 rounded px-2 py-1 text-xs transition ${
          mode === 'simple'
            ? 'bg-terminal-bg text-terminal-green'
            : 'text-terminal-text/70 hover:text-terminal-text'
        }`}
        aria-pressed={mode === 'simple'}
      >
        <LayoutTemplate className="h-3.5 w-3.5" aria-hidden="true" />
        Simple view
      </button>
    </div>
  )
}
