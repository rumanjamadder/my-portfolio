import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, Mail, ArrowDown } from 'lucide-react'
import { profile } from '../data/content.js'
import { useSingleRow } from '../hooks/useSupabaseData.js'
import NameReveal from './NameReveal.jsx'

function useTypingEffect(words, { typingSpeed = 65, deletingSpeed = 35, pause = 1500 } = {}) {
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]

    if (!deleting && subIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause)
      return () => clearTimeout(t)
    }

    if (deleting && subIndex === 0) {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
      return
    }

    const t = setTimeout(() => {
      setSubIndex((s) => s + (deleting ? -1 : 1))
    }, deleting ? deletingSpeed : typingSpeed)

    return () => clearTimeout(t)
  }, [subIndex, deleting, index, words, typingSpeed, deletingSpeed, pause])

  return words[index % words.length].substring(0, subIndex)
}

export default function Hero() {
  const { data: heroRow } = useSingleRow('hero')
  const { data: settingsRow } = useSingleRow('site_settings')

  // Merge live data over the static defaults so the page renders instantly
  // (no loading flash) and silently upgrades once Supabase responds.
  const hero = {
    name: heroRow?.name || profile.name,
    certificateName: heroRow?.certificate_name || profile.certificateName,
    initials: heroRow?.initials || profile.initials,
    tagline: heroRow?.tagline || profile.tagline,
    photo: heroRow?.photo_url || profile.photo,
    roles: heroRow?.roles
      ? heroRow.roles.split(',').map((r) => r.trim()).filter(Boolean)
      : profile.roles,
    readerCardNo: heroRow?.reader_card_no || '2024.108',
    programme: heroRow?.programme || 'MA ISLM',
    institution: heroRow?.institution || profile.university,
    status: heroRow?.status || 'Active',
  }
  const cvPath = settingsRow?.resume_url || profile.cvPath

  const typed = useTypingEffect(hero.roles)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden"
    >
      {/* ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-24 w-[32rem] h-[32rem] rounded-full bg-brass/10 blur-3xl" />
        <div className="absolute bottom-0 -left-24 w-[28rem] h-[28rem] rounded-full bg-burgundy/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-content w-full px-5 md:px-8 grid lg:grid-cols-[1.1fr_0.9fr] gap-14 lg:gap-10 items-center">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="eyebrow mb-5"
          >
            {profile.department} · {profile.university}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-balance font-display font-medium text-[2.6rem] leading-[1.08] sm:text-6xl lg:text-[4rem] tracking-tight"
          >
            <NameReveal name={hero.name} certificateName={hero.certificateName} />
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 h-8 flex items-center"
          >
            <span className="font-mono text-[15px] sm:text-base text-burgundy dark:text-burgundy-light">
              {typed}
              <span className="inline-block w-[2px] h-[1em] bg-burgundy dark:bg-burgundy-light ml-0.5 align-middle animate-blink" />
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-[16px] leading-relaxed text-ink-soft dark:text-bone-soft"
          >
            {hero.tagline} I research how libraries organise, preserve, and open up
            access to knowledge — from metadata schemes to the reading room floor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href={cvPath}
              download
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-paper dark:bg-bone dark:text-night text-[14px] font-medium hover:opacity-85 transition-opacity"
            >
              <Download size={15} strokeWidth={2} />
              Download CV
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-line-light dark:border-line-dark text-[14px] font-medium hover:border-brass dark:hover:border-brass-light transition-colors"
            >
              <Mail size={15} strokeWidth={2} />
              Get in touch
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-sm"
        >
          {/* the "library card" signature element */}
          <div className="catalog-card p-6 sm:p-7">
            <span className="catalog-hole" />
            <div className="flex items-start justify-between mb-6 pl-6">
              <span className="catalog-code">Reader Card</span>
              <span className="catalog-code">No. {hero.readerCardNo}</span>
            </div>

            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 rounded-[4px] overflow-hidden border border-line-light dark:border-line-dark bg-paper-soft dark:bg-night-soft">
                <img
                  src={hero.photo}
                  alt={`Portrait of ${hero.name}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling.style.display = 'flex'
                  }}
                />
                <div
                  className="w-full h-full hidden items-center justify-center font-display text-3xl text-ink-faint dark:text-bone-soft"
                >
                  {hero.initials}
                </div>
              </div>
            </div>

            <div className="card-stitch mb-5" />

            <dl className="space-y-3 text-[13px]">
              <div className="flex justify-between gap-4">
                <dt className="text-ink-faint dark:text-bone-soft">Name</dt>
                <dd className="text-right font-medium">{hero.name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-faint dark:text-bone-soft">Programme</dt>
                <dd className="text-right font-medium">{hero.programme}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-faint dark:text-bone-soft">Institution</dt>
                <dd className="text-right font-medium">{hero.institution}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-ink-faint dark:text-bone-soft">Status</dt>
                <dd className="text-right font-medium text-brass dark:text-brass-light">{hero.status}</dd>
              </div>
            </dl>
          </div>

          {/* subtle stacked card behind for depth */}
          <div className="absolute inset-0 -z-10 translate-x-3 translate-y-3 rounded-[6px] border border-line-light dark:border-line-dark bg-paper-soft/60 dark:bg-night-soft/60" />
        </motion.div>
      </div>

      <motion.a
        href="#about"
        onClick={(e) => {
          e.preventDefault()
          document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-ink-faint dark:text-bone-soft"
        aria-label="Scroll to About section"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown size={14} strokeWidth={1.5} />
        </motion.span>
      </motion.a>
    </section>
  )
}
