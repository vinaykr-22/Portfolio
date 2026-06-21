import type { TerminalLine } from '../../data/profile'

const typeStyles: Record<TerminalLine['type'], string> = {
  text: 'text-terminal-text',
  error: 'text-terminal-error',
  success: 'text-terminal-green',
  link: 'text-terminal-amber underline underline-offset-2 hover:opacity-80',
  heading: 'text-terminal-blue font-bold',
  muted: 'text-terminal-text/60',
  input: 'text-terminal-text',
}

interface TerminalLineItemProps {
  line: TerminalLine
}

export function TerminalLineItem({ line }: TerminalLineItemProps) {
  const className = `fade-in whitespace-pre-wrap break-words ${typeStyles[line.type]}`

  if (line.type === 'link' && line.href) {
    const isExternal = line.href.startsWith('http') || line.href.startsWith('mailto:')

    return (
      <a
        href={line.href}
        className={className}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(line.href.endsWith('.pdf') ? { download: true } : {})}
      >
        {line.content}
      </a>
    )
  }

  return <div className={className}>{line.content || '\u00A0'}</div>
}
