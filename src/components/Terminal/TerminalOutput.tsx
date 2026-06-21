import { useEffect, useRef } from 'react'
import type { TerminalLine } from '../../data/profile'
import { TerminalLineItem } from './TerminalLine'

interface TerminalOutputProps {
  lines: TerminalLine[]
}

export function TerminalOutput({ lines }: TerminalOutputProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  return (
    <div
      className="flex-1 overflow-y-auto px-4 py-3 text-[13px] leading-relaxed md:text-sm"
      aria-live="polite"
      aria-relevant="additions"
    >
      {lines.length === 0 ? (
        <p className="text-terminal-text/50">Output will appear here. Type a command below.</p>
      ) : (
        <div className="space-y-1">
          {lines.map((line) => (
            <TerminalLineItem key={line.id} line={line} />
          ))}
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}
