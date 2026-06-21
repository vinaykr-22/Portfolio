import { getCommandNames } from '../commands/registry'

const QUICK_COMMANDS = ['help', 'whoami', 'skills', 'projects', 'contact', 'resume']

interface CommandChipsProps {
  onSelect: (command: string) => void
}

export function CommandChips({ onSelect }: CommandChipsProps) {
  const commands = QUICK_COMMANDS.filter((name) => getCommandNames().includes(name))

  return (
    <div className="border-t border-terminal-border bg-terminal-surface px-3 py-2 md:hidden">
      <p className="mb-2 text-[11px] uppercase tracking-wide text-terminal-text/50">Quick commands</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {commands.map((command) => (
          <button
            key={command}
            type="button"
            onClick={() => onSelect(command)}
            className="shrink-0 rounded border border-terminal-border px-3 py-2 text-xs text-terminal-amber transition hover:border-terminal-amber/60 hover:bg-terminal-bg"
          >
            {command}
          </button>
        ))}
      </div>
    </div>
  )
}
