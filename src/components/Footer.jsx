import { profile, navLinks } from '../data/content.js'
import { useSingleRow } from '../hooks/useSupabaseData.js'

export default function Footer() {
  const { data: heroRow } = useSingleRow('hero')
  const { data: settingsRow } = useSingleRow('site_settings')
  const year = new Date().getFullYear()
  const name = heroRow?.name || profile.name
  const footerTagline = settingsRow?.footer_tagline || 'Catalogued and maintained by hand.'
  const footerNote = settingsRow?.footer_note || 'Built with React · Tailwind CSS'

  return (
    <footer className="border-t border-line-light dark:border-line-dark py-12">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <p className="font-display text-lg">{name}</p>
            <p className="text-[13px] text-ink-soft dark:text-bone-soft mt-1">
              {profile.department}, {profile.university}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-[13px] text-ink-soft dark:text-bone-soft hover:text-brass dark:hover:text-brass-light transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-line-light dark:border-line-dark flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-mono text-[11px] text-ink-faint dark:text-bone-soft">
            © {year} {name}. {footerTagline}
          </p>
          <div className="flex items-center gap-4">
            <p className="font-mono text-[11px] text-ink-faint dark:text-bone-soft">
              {footerNote}
            </p>
            <a
              href="#/admin"
              className="font-mono text-[11px] text-ink-faint dark:text-bone-soft hover:text-brass dark:hover:text-brass-light transition-colors"
            >
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
