import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Download } from 'lucide-react'
import { navLinks, profile } from '../data/content.js'
import { useSingleRow } from '../hooks/useSupabaseData.js'
import NameReveal from './NameReveal.jsx'

export default function Navbar({ theme, toggleTheme }) {
  const { data: heroRow } = useSingleRow('hero')
  const { data: settingsRow } = useSingleRow('site_settings')
  const name = heroRow?.name || profile.name
  const certificateName = heroRow?.certificate_name || profile.certificateName
  const initials = heroRow?.initials || profile.initials
  const cvPath = settingsRow?.resume_url || profile.cvPath
  const [active, setActive] = useState('about')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`mx-auto max-w-content px-5 md:px-8 flex items-center justify-between rounded-full transition-all duration-500 ${
          scrolled
            ? 'glass border border-line-light dark:border-line-dark shadow-glass py-2.5 px-5 md:px-6 max-w-[68rem]'
            : 'py-1'
        }`}
      >
        <a
          href="#about"
          onClick={(e) => {
            e.preventDefault()
            handleNavClick('#about')
          }}
          className="flex items-center gap-2.5 group"
        >
          <span className="w-8 h-8 rounded-[6px] border border-line-light dark:border-line-dark flex items-center justify-center font-mono text-[11px] tracking-wider text-ink dark:text-bone group-hover:border-brass dark:group-hover:border-brass-light transition-colors">
            {initials}
          </span>
          <span className="hidden sm:block font-display text-[15px] tracking-tight">
            <NameReveal name={name} certificateName={certificateName} />
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                handleNavClick(link.href)
              }}
              className={`relative px-3 py-2 text-[13px] font-body transition-colors rounded-full ${
                active === link.href.slice(1)
                  ? 'text-ink dark:text-bone'
                  : 'text-ink-soft dark:text-bone-soft hover:text-ink dark:hover:text-bone'
              }`}
            >
              {active === link.href.slice(1) && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-brass/10 dark:bg-brass-light/10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{link.label}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 rounded-full border border-line-light dark:border-line-dark flex items-center justify-center text-ink dark:text-bone hover:border-brass dark:hover:border-brass-light transition-colors"
          >
            {theme === 'dark' ? <Sun size={15} strokeWidth={1.75} /> : <Moon size={15} strokeWidth={1.75} />}
          </button>

          <a
            href={cvPath}
            download
            className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full bg-ink text-paper dark:bg-bone dark:text-night text-[13px] font-medium hover:opacity-85 transition-opacity"
          >
            <Download size={13} strokeWidth={2} />
            Résumé
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="lg:hidden w-9 h-9 rounded-full border border-line-light dark:border-line-dark flex items-center justify-center text-ink dark:text-bone"
          >
            {menuOpen ? <X size={16} strokeWidth={1.75} /> : <Menu size={16} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            aria-label="Mobile"
            className="lg:hidden mx-4 mt-2 glass border border-line-light dark:border-line-dark rounded-2xl shadow-glass overflow-hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(link.href)
                }}
                className={`flex items-center gap-3 px-5 py-3.5 text-[14px] border-b border-line-light dark:border-line-dark last:border-none ${
                  active === link.href.slice(1)
                    ? 'text-ink dark:text-bone bg-brass/5'
                    : 'text-ink-soft dark:text-bone-soft'
                }`}
              >
                <span className="font-mono text-[10px] text-brass dark:text-brass-light">{link.code}</span>
                {link.label}
              </a>
            ))}
            <a
              href={cvPath}
              download
              className="flex items-center gap-2 px-5 py-3.5 text-[14px] text-ink dark:text-bone"
            >
              <Download size={13} strokeWidth={2} />
              Download résumé
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
