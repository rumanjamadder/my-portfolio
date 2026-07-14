import { motion } from 'framer-motion'
import { Briefcase, MapPin } from 'lucide-react'
import { experience as staticExperience } from '../data/content.js'
import { useTable } from '../hooks/useSupabaseData.js'
import SectionHeading from './SectionHeading.jsx'

export default function Experience() {
  const { items, loading } = useTable('experience', { orderBy: 'sort_order', ascending: true })

  const experience =
    !loading && items.length > 0
      ? items.map((row) => ({
          id: row.id,
          code: row.code,
          role: row.role,
          org: row.org,
          period: row.period,
          location: row.location,
          points: (row.points || '').split('\n').map((s) => s.trim()).filter(Boolean),
        }))
      : staticExperience

  return (
    <section id="experience" className="py-24 md:py-32 scroll-mt-24">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <SectionHeading
          eyebrow="05 — Circulation History"
          title="Experience"
          description="Roles across research, documentation, and archival practice."
        />

        <div className="mt-14 space-y-6 max-w-3xl">
          {experience.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="catalog-card p-6 sm:p-7"
            >
              <span className="catalog-hole" />
              <div className="pl-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 w-8 h-8 shrink-0 rounded-full bg-paper-soft dark:bg-night-soft border border-line-light dark:border-line-dark flex items-center justify-center">
                      <Briefcase size={13} strokeWidth={1.75} className="text-burgundy dark:text-burgundy-light" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-medium leading-tight">{item.role}</h3>
                      <p className="text-[13.5px] text-ink-soft dark:text-bone-soft mt-0.5">{item.org}</p>
                      {item.location && (
                        <p className="flex items-center gap-1.5 text-[12.5px] text-ink-faint dark:text-bone-soft mt-1">
                          <MapPin size={11} strokeWidth={1.75} />
                          {item.location}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="font-mono text-[11px] text-ink-faint dark:text-bone-soft whitespace-nowrap">
                    {item.period}
                  </span>
                </div>

                {item.points && item.points.length > 0 && (
                  <ul className="mt-4 space-y-2 pl-1">
                    {item.points.map((point, idx) => (
                      <li key={idx} className="flex gap-2.5 text-[14px] leading-relaxed text-ink-soft dark:text-bone-soft">
                        <span className="mt-2 w-1 h-1 rounded-full bg-brass dark:bg-brass-light shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
