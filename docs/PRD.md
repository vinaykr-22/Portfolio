# Product Requirements Document — Terminal Portfolio

## Product

**Vinay Kumar Rao Pikala — Terminal Portfolio**

Interactive CLI portfolio where visitors explore the profile by typing commands.

## Goals

| Goal | Success metric |
|---|---|
| Memorable first impression | Boot sequence + working terminal within 2s on 4G |
| Showcase React skill | SPA with stateful CLI, history, tab completion |
| Recruiter fallback | "Simple view" toggle exposes same content without CLI |
| Performance | Lighthouse Performance >= 90, Accessibility >= 95 |
| Mobile usable | Command chips on mobile; input always visible |
| Deployable | Static build deployable to Vercel/Netlify |

## Commands

| Command | Aliases | Output |
|---|---|---|
| `help` | `?`, `commands` | List all commands |
| `whoami` | `about`, `bio` | Name, role, location, summary |
| `skills` | `stack` | Grouped skills; `--all` includes certifications |
| `projects` | `work` | 5 projects with status, stack, description |
| `experience` | `exp` | Hackathons, internship, certifications |
| `education` | `edu` | University and college history |
| `contact` | `reach` | Email, phone, social links |
| `resume` | `cv` | Download link to PDF |
| `github` | — | Opens GitHub profile |
| `linkedin` | — | Opens LinkedIn profile |
| `clear` | `cls` | Clears terminal output |
| `banner` | `neofetch` | ASCII art + quick stats |

## Tech stack

- React 19 + Vite 6 + TypeScript
- Tailwind CSS 4
- Lucide React icons
- Deploy: Vercel static
