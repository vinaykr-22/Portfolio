import type { ReactNode } from 'react'
import { Terminal, X } from 'lucide-react'

interface TerminalWindowProps {
  children: ReactNode
  headerRight?: ReactNode
  onClose?: () => void
}

export function TerminalWindow({ children, headerRight, onClose }: TerminalWindowProps) {
  return (
    <div className="scanline relative flex h-full w-full flex-col bg-terminal-bg shadow-2xl border-l border-terminal-border">
      <header className="flex items-center justify-between border-b border-terminal-border bg-terminal-surface px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-terminal-text/80 md:text-sm">
          <Terminal className="h-4 w-4 text-terminal-green" aria-hidden="true" />
          <span>
            <span className="text-terminal-blue">vinay</span>@portfolio — bash
          </span>
        </div>
        <div className="flex items-center gap-2">
          {headerRight}
          {onClose && (
            <button onClick={onClose} className="p-1 text-terminal-text/60 hover:text-terminal-error transition-colors rounded">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </header>
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  )
}
