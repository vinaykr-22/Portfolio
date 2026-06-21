import { useCallback, useEffect, useState } from 'react'
import { BootSequence } from './components/Terminal/BootSequence'
import { CommandChips } from './components/CommandChips'
import { SimpleView } from './components/SimpleView/SimpleView'
import { TerminalInput } from './components/Terminal/TerminalInput'
import { TerminalOutput } from './components/Terminal/TerminalOutput'
import { TerminalWindow } from './components/Terminal/TerminalWindow'
import { useTerminal } from './hooks/useTerminal'
import { Terminal } from 'lucide-react'

function App() {
  const [bootComplete, setBootComplete] = useState(false)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const { lines, input, setInput, submit, handleHistory, appendLines } = useTerminal()

  // Terminal boot listener
  useEffect(() => {
    if (bootComplete || !isTerminalOpen) return
    const finishBoot = () => setBootComplete(true)
    window.addEventListener('keydown', finishBoot)
    return () => window.removeEventListener('keydown', finishBoot)
  }, [bootComplete, isTerminalOpen])

  // Keyboard shortcut (Ctrl+K or Cmd+K) to toggle terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsTerminalOpen((prev) => !prev)
      }
      if (e.key === 'Escape' && isTerminalOpen) {
        setIsTerminalOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isTerminalOpen])

  const handleSubmit = useCallback(
    (value: string) => {
      submit(value)
    },
    [submit],
  )

  const handleQuickCommand = useCallback(
    (command: string) => {
      handleSubmit(command)
    },
    [handleSubmit],
  )

  const executeGlobalCommand = useCallback((cmd: string) => {
    setIsTerminalOpen(true)
    setTimeout(() => submit(cmd), 300)
  }, [submit])

  const welcomeLines = useCallback(() => {
    appendLines([
      {
        id: crypto.randomUUID(),
        type: 'muted',
        content: "Welcome. Try 'help', 'whoami', or 'projects'.",
      },
    ])
  }, [appendLines])

  useEffect(() => {
    if (bootComplete && isTerminalOpen && lines.length === 0) {
      welcomeLines()
    }
  }, [bootComplete, lines.length, isTerminalOpen, welcomeLines])

  return (
    <div className="relative flex h-[100dvh] w-full bg-terminal-bg overflow-hidden">
      {/* Main content: Simple View */}
      <div id="main-scroll-container" className="flex-1 overflow-y-auto custom-scrollbar w-full">
        <SimpleView onExecuteCommand={executeGlobalCommand} />
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setIsTerminalOpen(true)}
        className={`absolute bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-terminal-surface border border-terminal-border text-terminal-green shadow-[0_0_20px_rgba(126,231,135,0.2)] transition-all duration-300 hover:scale-110 hover:border-terminal-green hover:shadow-[0_0_30px_rgba(126,231,135,0.4)] ${isTerminalOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100'}`}
        aria-label="Open Terminal (Cmd/Ctrl + K)"
        title="Open Terminal (Cmd/Ctrl + K)"
      >
        <Terminal className="h-6 w-6" />
      </button>

      {/* Terminal Drawer Overlay */}
      {isTerminalOpen && (
        <div 
          className="absolute inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsTerminalOpen(false)}
        />
      )}

      {/* Terminal Side Drawer */}
      <div 
        className={`absolute top-0 right-0 z-50 h-[100dvh] w-full sm:w-[500px] lg:w-[35%] transform transition-transform duration-300 ease-in-out ${isTerminalOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <TerminalWindow onClose={() => setIsTerminalOpen(false)}>
          {!bootComplete ? (
            <BootSequence onComplete={() => setBootComplete(true)} />
          ) : (
            <>
              <TerminalOutput lines={lines} />
              <CommandChips onSelect={handleQuickCommand} />
              <TerminalInput
                value={input}
                onChange={setInput}
                onSubmit={handleSubmit}
                onHistory={handleHistory}
              />
            </>
          )}
        </TerminalWindow>
      </div>
    </div>
  )
}

export default App
