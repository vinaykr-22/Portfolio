import type { TerminalLine } from '../data/profile'
import { profile, BANNER } from '../data/profile'
import emailjs from '@emailjs/browser'

export interface CommandContext {
  openUrl: (url: string) => void
  appendLines: (lines: TerminalLine[]) => void
}

export interface CommandDefinition {
  name: string
  aliases?: string[]
  description: string
  execute: (args: string[], context: CommandContext) => TerminalLine[] | void
}

const line = (type: TerminalLine['type'], content: string, href?: string): TerminalLine => ({
  id: crypto.randomUUID(),
  type,
  content,
  href,
})

export const commands: CommandDefinition[] = [
  {
    name: 'help',
    aliases: ['?', 'commands'],
    description: 'List all available commands',
    execute: () => {
      const rows = commands.map((cmd) => {
        const aliasText = cmd.aliases?.length ? ` (${cmd.aliases.join(', ')})` : ''
        return `  ${cmd.name.padEnd(12)}${aliasText} — ${cmd.description}`
      })
      return [
        line('heading', 'Available commands:'),
        ...rows.map((row) => line('text', row)),
        line('muted', "Tip: use Tab to autocomplete, ↑/↓ for history."),
      ]
    },
  },
  {
    name: 'whoami',
    aliases: ['about', 'bio'],
    description: 'Show name, role, and summary',
    execute: () => [
      line('success', `
__      __ _                           
\\ \\    / /(_) _ __   __ _  _   _ 
 \\ \\/\\/ / | || '_ \\ / _\` || | | |
  \\    /  | || | | | (_| || |_| |
   \\/\\/   |_||_| |_|\\__,_| \\__, |
                           |___/ `),
      line('heading', profile.name),
      line('success', profile.title),
      line('text', profile.location),
      line('text', ''),
      ...profile.summary.split('\n').map((part) => line('text', part)),
    ],
  },
  {
    name: 'skills',
    aliases: ['stack'],
    description: 'Show grouped technical skills',
    execute: (args) => {
      const showAll = args.includes('--all')
      const lines: TerminalLine[] = [line('heading', 'Technical Skills')]

      for (const group of profile.skillGroups) {
        lines.push(line('success', group.label))
        lines.push(line('text', `  ${group.items.join(', ')}`))
      }

      if (showAll) {
        lines.push(line('text', ''))
        lines.push(line('heading', 'Certifications'))
        for (const cert of profile.certifications) {
          lines.push(line('text', `  • ${cert.name} — ${cert.issuer} (${cert.date})`))
        }
      } else {
        lines.push(line('muted', "Run 'skills --all' to include certifications."))
      }

      return lines
    },
  },
  {
    name: 'projects',
    aliases: ['work'],
    description: 'List portfolio projects',
    execute: (args) => {
      const lines: TerminalLine[] = []
      
      let filteredProjects = profile.projects
      if (args.length > 0) {
        const filter = args.join(' ').toLowerCase()
        filteredProjects = profile.projects.filter(p => 
          p.stack.some(s => s.toLowerCase().includes(filter)) || 
          p.name.toLowerCase().includes(filter)
        )
        lines.push(line('heading', `Projects matching "${filter}"`))
      } else {
        lines.push(line('heading', 'Projects'))
      }

      if (filteredProjects.length === 0) {
        lines.push(line('muted', 'No projects found matching that query.'))
        return lines
      }

      filteredProjects.forEach((project, index) => {
        lines.push(line('success', `[${index + 1}] ${project.name} — ${project.status}`))
        lines.push(line('text', `    Stack: ${project.stack.join(', ')}`))
        lines.push(line('text', `    ${project.description}`))
        if (project.url) {
          lines.push(line('link', `    → ${project.url}`, project.url))
        }
        lines.push(line('text', ''))
      })

      lines.push(line('muted', 'Visit GitHub for live demos and source code.'))
      return lines
    },
  },
  {
    name: 'experience',
    aliases: ['exp'],
    description: 'Show hackathons and internships',
    execute: () => {
      const lines: TerminalLine[] = [line('heading', 'Experience & Competitions')]

      for (const item of profile.experience) {
        lines.push(line('success', `${item.title} @ ${item.org}`))
        lines.push(line('muted', `  ${item.period}`))
        lines.push(line('text', `  ${item.description}`))
        lines.push(line('text', ''))
      }

      lines.push(line('heading', 'Certifications'))
      for (const cert of profile.certifications) {
        lines.push(line('text', `  • ${cert.name} — ${cert.issuer} (${cert.date})`))
      }

      return lines
    },
  },
  {
    name: 'education',
    aliases: ['edu'],
    description: 'Show education history',
    execute: () => {
      const lines: TerminalLine[] = [line('heading', 'Education')]

      for (const item of profile.education) {
        lines.push(line('success', item.institution))
        lines.push(line('text', `  ${item.degree}`))
        lines.push(line('text', `  ${item.period} · ${item.score}`))
        lines.push(line('text', ''))
      }

      return lines
    },
  },
  {
    name: 'contact',
    aliases: ['reach'],
    description: 'Show contact information',
    execute: () => [
      line('heading', 'Contact'),
      line('link', `  Email: ${profile.email}`, `mailto:${profile.email}`),
      line('text', `  Phone: ${profile.phone}`),
      line('link', `  GitHub: ${profile.github}`, profile.githubUrl),
      line('link', `  LinkedIn: ${profile.linkedin}`, profile.linkedinUrl),
    ],
  },
  {
    name: 'resume',
    aliases: ['cv'],
    description: 'Download resume PDF',
    execute: () => [
      line('heading', 'Resume'),
      line('link', '  Download Vinay_Resume.pdf', '/Vinay_Resume.pdf'),
    ],
  },
  {
    name: 'github',
    description: 'Open GitHub profile',
    execute: (_args, context) => {
      context.openUrl(profile.githubUrl)
      return [line('success', `Opening ${profile.githubUrl}`)]
    },
  },
  {
    name: 'linkedin',
    description: 'Open LinkedIn profile',
    execute: (_args, context) => {
      context.openUrl(profile.linkedinUrl)
      return [line('success', `Opening ${profile.linkedinUrl}`)]
    },
  },
  {
    name: 'clear',
    aliases: ['cls'],
    description: 'Clear terminal output',
    execute: () => [],
  },
  {
    name: 'sudo',
    description: 'Execute a command as superuser',
    execute: (args) => {
      if (args.length === 0) return [line('error', 'usage: sudo <command>')]
      return [
        line('error', 'vinay is not in the sudoers file. This incident will be reported.')
      ]
    }
  },
  {
    name: 'matrix',
    description: 'Enter the matrix',
    execute: (args, context) => {
      context.appendLines([line('success', 'Wake up, Neo...')])
      setTimeout(() => context.appendLines([line('success', 'The Matrix has you...')]), 1500)
      setTimeout(() => context.appendLines([line('success', 'Follow the white rabbit.')]), 3000)
      setTimeout(() => context.appendLines([line('success', 'Knock, knock, Neo.')]), 4500)
    }
  },
  {
    name: 'message',
    aliases: ['email', 'contact_me'],
    description: 'Send a message directly to Vinay',
    execute: (args, context) => {
      if (args.length < 3) {
        return [
          line('error', 'Usage: message <Name> <Email> <Message>'),
          line('muted', 'Example: message John john@test.com Hi Vinay, love your portfolio!')
        ]
      }
      
      const name = args[0]
      const email = args[1]
      const msg = args.slice(2).join(' ')
      
      context.appendLines([line('text', `Preparing to send message from ${name} (${email})...`)])
      
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (!serviceId || !templateId || !publicKey) {
        setTimeout(() => context.appendLines([
          line('error', '[Failed] EmailJS credentials are missing.'),
          line('muted', 'Please configure VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY in your .env file.')
        ]), 800)
        return
      }

      setTimeout(() => context.appendLines([line('muted', '[Connecting to mail server...]')]), 500)
      
      emailjs.send(
        serviceId,
        templateId,
        { from_name: name, from_email: email, message: msg },
        publicKey
      ).then(() => {
        context.appendLines([line('success', 'Message sent successfully! Vinay will get back to you soon.')])
      }).catch((err) => {
        console.error('EmailJS Error:', err)
        context.appendLines([line('error', 'Failed to send message. Please try again later.')])
      })
    }
  },
  {
    name: 'banner',
    aliases: ['neofetch'],
    description: 'Show ASCII banner and quick stats',
    execute: () => [
      line('success', BANNER),
      line('text', ''),
      line('text', `  ${profile.name}`),
      line('text', `  ${profile.title}`),
      line('text', `  ${profile.location}`),
      line('text', ''),
      line('text', '  CGPA: 8.6/10'),
      line('text', '  Hackathons: 2'),
      line('text', '  Projects: 5+'),
      line('text', '  Stack: React · Vite · AWS'),
    ],
  },
]

const commandMap = new Map<string, CommandDefinition>()

for (const command of commands) {
  commandMap.set(command.name, command)
  for (const alias of command.aliases ?? []) {
    commandMap.set(alias, command)
  }
}

export function resolveCommand(input: string): { command: CommandDefinition; args: string[] } | null {
  const trimmed = input.trim()
  if (!trimmed) return null

  const [name, ...args] = trimmed.split(/\s+/)
  const command = commandMap.get(name.toLowerCase())
  if (!command) return null

  return { command, args }
}

export function getCommandNames(): string[] {
  return commands.map((cmd) => cmd.name)
}

export function autocomplete(input: string): string | null {
  const trimmed = input.trim().toLowerCase()
  if (!trimmed) return null

  const matches = getCommandNames().filter((name) => name.startsWith(trimmed))
  if (matches.length === 1) return matches[0]
  return null
}

export function executeCommand(
  input: string,
  context: CommandContext,
): { lines?: TerminalLine[]; clear?: boolean } {
  const resolved = resolveCommand(input)

  if (!resolved) {
    return {
      lines: [
        line('error', `Command not found: ${input.trim()}`),
        line('muted', "Type 'help' to see available commands."),
      ],
    }
  }

  const { command, args } = resolved

  if (command.name === 'clear') {
    return { lines: [], clear: true }
  }

  const result = command.execute(args, context)
  return { lines: result || undefined }
}
