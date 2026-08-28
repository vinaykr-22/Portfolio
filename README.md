# Vinay Kumar Rao Pikala — Terminal Portfolio

[![License](https://img.shields.io/github/license/vinaykr-22/Portfolio.svg)](./LICENSE)
[![Top Language](https://img.shields.io/github/languages/top/vinaykr-22/Portfolio.svg)](https://github.com/vinaykr-22/Portfolio)
[![Stars](https://img.shields.io/github/stars/vinaykr-22/Portfolio.svg?style=social)](https://github.com/vinaykr-22/Portfolio/stargazers)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/vinaykr-22/Portfolio)
[![Built with Vite](https://img.shields.io/badge/built%20with-Vite-646cff.svg)](https://vitejs.dev/)

Interactive, terminal-style personal portfolio built with React, Vite, and TypeScript — optimized for recruiters and fellow developers who prefer a command-line-first experience.

What this is
------------
A responsive, accessible portfolio that exposes profile, skills, projects, and a contact form through both a "Simple view" and an interactive terminal UI (toggle with Ctrl/Cmd + K).

Highlights
----------
- Terminal-style commands: `help`, `whoami`, `projects`, `skills`, `contact`, `resume`, `github`, `linkedin` and more.
- Simple view for a traditional layout and a floating terminal for power users.
- Contact form using EmailJS (env-driven).
- Lightweight, fast frontend with Vite + React + TypeScript + Tailwind CSS.
- Analytics via Vercel Analytics.

Tech / Notable dependencies
---------------------------
- Language: TypeScript
- Framework / Runtime: React 19 + Vite
- Notable libraries: Tailwind CSS, @vercel/analytics, EmailJS (@emailjs/browser), lucide-react, @fontsource packages

Repository layout (top-level)
-----------------------------
```text
index.html                 # app entry HTML
package.json               # scripts & deps
vite.config.ts             # Vite config (React + Tailwind)
tsconfig*.json             # TypeScript configs
src/                       # application source (React components, hooks, data)
public/                    # static assets (profile image, profile.JPG, resume)
docs/                      # documentation (if present)
Vinay_Resume.pdf           # downloadable resume
README.md                  # (this file)
LICENSE                    # MIT license
```

How to run (shortest path)
---------------------------
1. Clone and install:
```bash
git clone https://github.com/vinaykr-22/Portfolio.git
cd Portfolio
npm install
```

2. Run development server:
```bash
npm run dev
# open http://localhost:5173 (or the port Vite reports)
```

3. Build for production:
```bash
npm run build
npm run preview
```

Environment variables
---------------------
The contact form (EmailJS) requires environment variables. Create a .env (or set env in your hosting provider) with the following keys:

- VITE_EMAILJS_SERVICE_ID
- VITE_EMAILJS_TEMPLATE_ID
- VITE_EMAILJS_PUBLIC_KEY

If any of these are missing the contact form will show an error and will not send messages.

Key files and where to look
---------------------------
- src/data/profile.ts — primary profile data (name, bio, projects, experience). Update here to change displayed content.
- src/components/SimpleView — main static/responsive view components.
- src/components/Terminal — terminal UI, commands, and output rendering.
- src/hooks — custom hooks (terminal state, scroll progress).
- vite.config.ts — plugin settings (React + Tailwind).
- public/ — static assets (profile image and resume PDF).

Commands available (terminal)
-----------------------------
help, whoami, skills, projects, experience, education, contact, resume, github, linkedin, clear, banner

Deployment notes
----------------
- This is a static frontend; you can host it on Vercel, Netlify, GitHub Pages, or any static host that serves the built files.
- If hosting on Vercel or other providers, add the required EmailJS env vars to the project settings to enable the contact form.
- Analytics is already wired to Vercel Analytics (ensure correct setup if you want analytics to report).

Contributing
------------
Small contributions and corrections welcome. Typical workflow:
1. Fork the repo
2. Create a branch: `git checkout -b fix/description`
3. Make changes, run `npm run dev` and test
4. Open a pull request describing the change

Credits
-------
Built by Vinay Kumar Rao Pikala — profile and data live in `src/data/profile.ts`.

License
-------
This project is licensed under the MIT License — see the included LICENSE file for details.

Contact
-------
- Email: vinaykumarra007@gmail.com
- GitHub: https://github.com/vinaykr-22
- LinkedIn: https://www.linkedin.com/in/vinay-kumar-rao-pikala-2b3048361
