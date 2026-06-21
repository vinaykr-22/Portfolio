import { useState } from 'react'
import { profile } from '../../data/profile'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import emailjs from '@emailjs/browser'

const statusColors: Record<string, string> = {
  Live: 'text-terminal-green border-terminal-green/40',
  'In Progress': 'text-terminal-amber border-terminal-amber/40',
  Prototype: 'text-terminal-blue border-terminal-blue/40',
}

export interface SimpleViewProps {
  onExecuteCommand?: (cmd: string) => void
}

export function SimpleView({ onExecuteCommand }: SimpleViewProps) {
  const scrollProgress = useScrollProgress('main-scroll-container')
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return

    setFormState('sending')

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      setFormState('error')
      return
    }

    emailjs.send(
      serviceId,
      templateId,
      { from_name: formData.name, from_email: formData.email, message: formData.message },
      publicKey
    ).then(() => {
      setFormState('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setFormState('idle'), 5000)
    }).catch((err) => {
      console.error('EmailJS Error:', err)
      setFormState('error')
      setTimeout(() => setFormState('idle'), 5000)
    })
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 md:px-8 md:py-12 flex items-start gap-12 relative">
      {/* Dynamic Slide Bar (Scroll Timeline) */}
      <aside className="hidden lg:block sticky top-24 h-[80vh] w-8 shrink-0">
        <div className="relative h-full w-full flex justify-center">
          {/* The Background Track */}
          <div className="absolute top-0 bottom-0 w-0.5 bg-terminal-border/40 rounded-full"></div>
          
          {/* The Illuminated Line (from top to dot) */}
          <div 
            className="absolute top-0 w-0.5 bg-terminal-green shadow-[0_0_10px_rgba(126,231,135,0.6)] rounded-full transition-all duration-100 ease-out"
            style={{ height: `${scrollProgress * 100}%` }}
          ></div>

          {/* The Moving Dot */}
          <div 
            className="absolute w-3 h-3 rounded-full bg-terminal-green shadow-[0_0_15px_rgba(126,231,135,1)] transition-all duration-100 ease-out z-10"
            style={{ top: `calc(${scrollProgress * 100}% - 6px)` }}
          ></div>
        </div>
      </aside>

      <main className="simple-view flex-1 max-w-4xl">
        <section className="mb-16 border-b border-terminal-border pb-12">
          <div className="flex flex-col-reverse md:flex-row justify-between items-center md:items-start gap-8">
            <div className="flex-1">
              <p className="mb-2 font-mono text-sm text-terminal-green">Frontend Engineer · React Developer</p>
              <h1 className="mb-3 text-3xl font-bold text-terminal-blue md:text-5xl">{profile.name}</h1>
              <p className="mb-6 max-w-2xl text-lg text-terminal-text/90 leading-relaxed">{profile.oneLiner}</p>
              <div className="flex flex-wrap gap-3 text-sm mb-6">
                <a href="#contact" className="text-terminal-amber hover:underline">
                  {profile.email}
                </a>

                <span className="text-terminal-text/40">·</span>
                <span>{profile.location}</span>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-terminal-border px-5 py-2.5 text-sm transition-all duration-300 hover:border-terminal-green hover:bg-terminal-green/10 hover:shadow-[0_0_10px_rgba(126,231,135,0.2)]"
                >
                  GitHub
                </a>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded border border-terminal-border px-5 py-2.5 text-sm transition-all duration-300 hover:border-terminal-green hover:bg-terminal-green/10 hover:shadow-[0_0_10px_rgba(126,231,135,0.2)]"
                >
                  LinkedIn
                </a>
                <a
                  href="/Vinay_Resume.pdf"
                  download
                  className="rounded border border-terminal-border px-5 py-2.5 text-sm transition-all duration-300 hover:border-terminal-green hover:bg-terminal-green/10 hover:shadow-[0_0_10px_rgba(126,231,135,0.2)]"
                >
                  Download Resume
                </a>
              </div>
            </div>
            <div className="relative group shrink-0 self-center md:self-start">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-terminal-green to-terminal-blue opacity-50 blur group-hover:opacity-100 transition duration-500"></div>
              <img 
                src="/profile.JPG" 
                alt="Profile" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 24 24' fill='none' stroke='%2330363d' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'/%3E%3Ccircle cx='12' cy='7' r='4'/%3E%3C/svg%3E";
                  target.className = "relative h-40 w-40 md:h-56 md:w-56 rounded-full border-2 border-terminal-border bg-terminal-surface object-cover p-4";
                }}
                className="relative h-40 w-40 md:h-56 md:w-56 rounded-full border-2 border-terminal-border bg-terminal-surface object-cover shadow-[0_0_20px_rgba(0,0,0,0.5)]" 
              />
            </div>
          </div>
        </section>

        <section id="about" className="mb-16 scroll-mt-12">
          <h2 className="mb-6 text-2xl font-bold text-terminal-blue">About</h2>
          <p className="max-w-3xl whitespace-pre-line leading-8 text-terminal-text/90 text-lg">{profile.summary}</p>
        </section>

        <section id="skills" className="mb-16 scroll-mt-12">
          <h2 className="mb-6 text-2xl font-bold text-terminal-blue">Skills</h2>
          <p className="mb-4 text-sm text-terminal-text/60 italic">Click a skill to search terminal projects.</p>
          <div className="grid gap-4 md:grid-cols-2">
            {profile.skillGroups.map((group) => (
              <div key={group.label} className="group rounded border border-terminal-border bg-terminal-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-terminal-green/50 hover:bg-terminal-border/20 hover:shadow-[0_4px_12px_rgba(126,231,135,0.1)]">
                <h3 className="mb-4 font-mono text-base text-terminal-green">{group.label}</h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map(skill => (
                    <button 
                      key={skill}
                      onClick={() => onExecuteCommand && onExecuteCommand(`projects ${skill}`)}
                      className="text-sm px-2.5 py-1 rounded bg-terminal-border/30 text-terminal-text/90 hover:bg-terminal-green/20 hover:text-terminal-green hover:scale-105 transition-all cursor-pointer"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="mb-16 scroll-mt-12">
          <h2 className="mb-6 text-2xl font-bold text-terminal-blue">Projects</h2>
          <div className="grid gap-6">
            {profile.projects.map((project) => (
              <article
                key={project.name}
                className="group rounded border border-terminal-border bg-terminal-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-terminal-blue/50 hover:bg-terminal-border/20 hover:shadow-[0_4px_12px_rgba(88,166,255,0.1)]"
              >
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <h3 className="font-mono text-xl text-terminal-text">{project.name}</h3>
                  <span
                    className={`rounded border px-2.5 py-0.5 text-xs font-semibold tracking-wider uppercase ${statusColors[project.status] ?? 'text-terminal-text'}`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="mb-4 text-base leading-relaxed text-terminal-text/80">{project.description}</p>
                <p className="font-mono text-xs text-terminal-text/60">{project.stack.join(' · ')}</p>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm text-terminal-amber hover:text-terminal-blue transition-colors duration-300 hover:underline"
                  >
                    View on GitHub →
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="mb-16 scroll-mt-12">
          <h2 className="mb-6 text-2xl font-bold text-terminal-blue">Experience</h2>
          <div className="space-y-6">
            {profile.experience.map((item) => (
              <article key={`${item.title}-${item.org}`} className="border-l-2 border-terminal-green pl-6 py-1 transition-all duration-300 hover:border-terminal-blue">
                <h3 className="font-mono text-lg text-terminal-text">{item.title}</h3>
                <p className="text-sm font-medium text-terminal-green mt-1">
                  {item.org} <span className="text-terminal-text/40 mx-2">·</span> {item.period}
                </p>
                <p className="mt-3 text-base leading-relaxed text-terminal-text/80">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="mb-16 scroll-mt-12">
          <h2 className="mb-6 text-2xl font-bold text-terminal-blue">Education</h2>
          <div className="space-y-5">
            {profile.education.map((item) => (
              <article key={item.institution} className="rounded border border-terminal-border bg-terminal-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-terminal-amber/50 hover:bg-terminal-border/20 hover:shadow-[0_4px_12px_rgba(255,166,87,0.1)]">
                <h3 className="font-mono text-lg text-terminal-text mb-1">{item.institution}</h3>
                <p className="text-base text-terminal-text/80 mb-2">{item.degree}</p>
                <p className="font-mono text-xs text-terminal-text/60">
                  {item.period} <span className="mx-2">·</span> {item.score}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="scroll-mt-12 mb-12">
          <h2 className="mb-6 text-2xl font-bold text-terminal-blue">Contact</h2>
          
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Form Section */}
            <div className="rounded border border-terminal-border bg-terminal-surface p-6">
              <h3 className="mb-4 font-mono text-lg text-terminal-green">Send a Message</h3>
              <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  disabled={formState === 'sending'}
                  className="w-full rounded border border-terminal-border bg-terminal-bg p-3 text-terminal-text focus:border-terminal-blue focus:outline-none focus:ring-1 focus:ring-terminal-blue disabled:opacity-50"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  disabled={formState === 'sending'}
                  className="w-full rounded border border-terminal-border bg-terminal-bg p-3 text-terminal-text focus:border-terminal-blue focus:outline-none focus:ring-1 focus:ring-terminal-blue disabled:opacity-50"
                />
                <textarea
                  placeholder="Your Message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  disabled={formState === 'sending'}
                  className="w-full resize-y rounded border border-terminal-border bg-terminal-bg p-3 text-terminal-text focus:border-terminal-blue focus:outline-none focus:ring-1 focus:ring-terminal-blue disabled:opacity-50 custom-scrollbar"
                ></textarea>
                
                <div className="flex items-center gap-4 mt-2">
                  <button
                    type="submit"
                    disabled={formState === 'sending'}
                    className="rounded bg-terminal-blue/20 border border-terminal-blue px-6 py-2.5 font-mono text-sm text-terminal-blue transition-all hover:bg-terminal-blue hover:text-terminal-bg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formState === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                  {formState === 'success' && <span className="text-sm font-mono text-terminal-green">Sent!</span>}
                  {formState === 'error' && <span className="text-sm font-mono text-[#ff5f56]">Failed to send.</span>}
                </div>
              </form>
            </div>

            {/* Links & Terminal Promo */}
            <div className="flex flex-col gap-6">
              <div className="rounded border border-terminal-border bg-terminal-surface p-6 text-base leading-8">
                <h3 className="mb-4 font-mono text-lg text-terminal-amber">Connect</h3>
                <p className="flex items-center gap-3">
                  <span className="text-terminal-text/60 w-20">Email:</span>
                  <a href={`mailto:${profile.email}`} className="text-terminal-amber hover:text-terminal-blue transition-colors hover:underline">
                    {profile.email}
                  </a>
                </p>

                <p className="flex items-center gap-3">
                  <span className="text-terminal-text/60 w-20">GitHub:</span>
                  <a href={profile.githubUrl} className="text-terminal-amber hover:text-terminal-blue transition-colors hover:underline">
                    {profile.github}
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-terminal-text/60 w-20">LinkedIn:</span>
                  <a href={profile.linkedinUrl} className="text-terminal-amber hover:text-terminal-blue transition-colors hover:underline">
                    {profile.linkedin}
                  </a>
                </p>
              </div>

              {/* Terminal Promo Box */}
              <div 
                className="rounded border border-terminal-green/50 bg-terminal-green/5 p-6 relative overflow-hidden group cursor-pointer transition-all hover:bg-terminal-green/10" 
                onClick={() => onExecuteCommand && onExecuteCommand('message')}
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-terminal-green"></div>
                <h3 className="font-mono text-sm text-terminal-green mb-2 tracking-wider uppercase">Hacker Mode</h3>
                <p className="text-terminal-text/80 text-sm mb-3">Prefer the command line? Press <kbd className="bg-terminal-border/40 px-1.5 py-0.5 rounded text-terminal-text">Ctrl+K</kbd> to open the terminal and type:</p>
                <div className="bg-terminal-bg border border-terminal-border/50 rounded p-3 font-mono text-sm text-terminal-text shadow-inner overflow-x-auto">
                  <span className="text-terminal-green">~$</span> <span className="text-terminal-blue">message</span> <span className="text-terminal-amber">&lt;Name&gt;</span> <span className="text-terminal-amber">&lt;Email&gt;</span> <span className="text-terminal-amber">&lt;Message&gt;</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
