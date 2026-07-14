import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, Linkedin, Github, GraduationCap, Twitter, Globe, Link2, Loader2 } from 'lucide-react'
import { profile } from '../data/content.js'
import { useSingleRow, useTable } from '../hooks/useSupabaseData.js'
import SectionHeading from './SectionHeading.jsx'

const SOCIAL_ICONS = {
  linkedin: { icon: Linkedin, label: 'LinkedIn profile' },
  github: { icon: Github, label: 'GitHub profile' },
  scholar: { icon: GraduationCap, label: 'Google Scholar profile' },
  researchgate: { icon: GraduationCap, label: 'ResearchGate profile' },
  orcid: { icon: Link2, label: 'ORCID profile' },
  twitter: { icon: Twitter, label: 'Twitter / X profile' },
  website: { icon: Globe, label: 'Personal website' },
}

// Static fallback so the icon row never disappears while data loads.
const staticSocialLinks = Object.entries(profile.social)
  .filter(([, url]) => url)
  .map(([platform, url]) => ({ id: platform, platform, url }))

export default function Contact() {
  const { data: contact, loading } = useSingleRow('contact')
  const { items: socialLinks, loading: socialLoading } = useTable('social_links', {
    orderBy: 'sort_order',
    ascending: true,
  })
  const links = !socialLoading && socialLinks.length > 0 ? socialLinks : staticSocialLinks
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!contact) return
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name || 'a visitor'}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`
  }

  if (loading || !contact) {
    return (
      <section id="contact" className="py-24 md:py-32 scroll-mt-24 bg-paper-soft/60 dark:bg-night-soft/40">
        <div className="mx-auto max-w-content px-5 md:px-8 flex items-center justify-center gap-2 py-10 text-ink-faint dark:text-bone-soft">
          <Loader2 size={16} className="animate-spin" strokeWidth={1.75} />
          <span className="text-[13px]">Loading contact details…</span>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-24 md:py-32 scroll-mt-24 bg-paper-soft/60 dark:bg-night-soft/40">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <SectionHeading eyebrow="09 — Correspondence" title={contact.heading} description={contact.blurb} />

        <div className="mt-14 grid lg:grid-cols-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-4"
          >
            <a
              href={`mailto:${contact.email}`}
              className="flex items-center gap-4 rounded-[6px] border border-line-light dark:border-line-dark p-5 bg-white/50 dark:bg-night-surface/50 hover:border-brass dark:hover:border-brass-light transition-colors"
            >
              <span className="w-10 h-10 rounded-full bg-paper-soft dark:bg-night-soft border border-line-light dark:border-line-dark flex items-center justify-center shrink-0">
                <Mail size={15} strokeWidth={1.75} className="text-brass dark:text-brass-light" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-wide text-ink-faint dark:text-bone-soft">Email</p>
                <p className="text-[14px] font-medium truncate">{contact.email}</p>
              </div>
            </a>

            {contact.phone && (
              <div className="flex items-center gap-4 rounded-[6px] border border-line-light dark:border-line-dark p-5 bg-white/50 dark:bg-night-surface/50">
                <span className="w-10 h-10 rounded-full bg-paper-soft dark:bg-night-soft border border-line-light dark:border-line-dark flex items-center justify-center shrink-0">
                  <Phone size={15} strokeWidth={1.75} className="text-brass dark:text-brass-light" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-ink-faint dark:text-bone-soft">Phone</p>
                  <p className="text-[14px] font-medium">{contact.phone}</p>
                </div>
              </div>
            )}

            {contact.location && (
              <div className="flex items-center gap-4 rounded-[6px] border border-line-light dark:border-line-dark p-5 bg-white/50 dark:bg-night-surface/50">
                <span className="w-10 h-10 rounded-full bg-paper-soft dark:bg-night-soft border border-line-light dark:border-line-dark flex items-center justify-center shrink-0">
                  <MapPin size={15} strokeWidth={1.75} className="text-brass dark:text-brass-light" />
                </span>
                <div>
                  <p className="text-[11px] uppercase tracking-wide text-ink-faint dark:text-bone-soft">Location</p>
                  <p className="text-[14px] font-medium">{contact.location}</p>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-2">
              {links.map((link) => {
                const meta = SOCIAL_ICONS[link.platform] || { icon: Link2, label: link.platform }
                const Icon = meta.icon
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={meta.label}
                    className="w-10 h-10 rounded-full border border-line-light dark:border-line-dark flex items-center justify-center hover:border-brass dark:hover:border-brass-light hover:-translate-y-0.5 transition-all"
                  >
                    <Icon size={15} strokeWidth={1.75} />
                  </a>
                )
              })}
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onSubmit={handleSubmit}
            className="lg:col-span-7 catalog-card p-6 sm:p-8"
          >
            <span className="catalog-hole" />
            <div className="pl-6 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-[12px] uppercase tracking-wide text-ink-faint dark:text-bone-soft mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full rounded-[4px] border border-line-light dark:border-line-dark bg-transparent px-3.5 py-2.5 text-[14px] focus:border-brass dark:focus:border-brass-light outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-[12px] uppercase tracking-wide text-ink-faint dark:text-bone-soft mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full rounded-[4px] border border-line-light dark:border-line-dark bg-transparent px-3.5 py-2.5 text-[14px] focus:border-brass dark:focus:border-brass-light outline-none transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-[12px] uppercase tracking-wide text-ink-faint dark:text-bone-soft mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full rounded-[4px] border border-line-light dark:border-line-dark bg-transparent px-3.5 py-2.5 text-[14px] focus:border-brass dark:focus:border-brass-light outline-none transition-colors resize-none"
                  placeholder="What would you like to discuss?"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-ink text-paper dark:bg-bone dark:text-night text-[14px] font-medium hover:opacity-85 transition-opacity"
              >
                Send message
                <Send size={14} strokeWidth={2} />
              </button>
              <p className="text-[12px] text-ink-faint dark:text-bone-soft">
                This opens your email client directly — no message data is stored anywhere.
              </p>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
