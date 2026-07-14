import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'
import { education as staticEducation } from '../data/content.js'
import { useTable } from '../hooks/useSupabaseData.js'
import SectionHeading from './SectionHeading.jsx'

export default function Education() {
  const { items, loading } = useTable('education', { orderBy: 'sort_order', ascending: true })

  // Map Supabase rows to the exact shape the JSX below already expects, and
  // fall back to the static list while loading (or if the table is empty)
  // so the timeline is never shown blank.
  const education =
    !loading && items.length > 0
      ? items.map((row) => ({
          id: row.id,
          code: row.code,
          period: row.period,
          degree: row.degree,
          institution: row.institution,
          faculty: row.faculty,
          dorm: row.dorm,
          status: row.status,
          highlightStatus: row.highlight,
          details: row.details,
          result: row.result,
        }))
      : staticEducation

  return (
    <section id="education" className="py-24 md:py-32 scroll-mt-24 bg-paper-soft/60 dark:bg-night-soft/40">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <SectionHeading
          eyebrow="02 — Record"
          title="Education"
          description="Academic path from primary school through ongoing graduate research at the University of Dhaka."
        />

        <div className="relative mt-14 max-w-3xl">
          <div className="absolute left-[15px] top-2 bottom-2 w-px bg-line-light dark:bg-line-dark" />

          <ol className="space-y-10">
            {education.map((item, i) => (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="relative pl-11"
              >
                <span className="absolute left-0 top-1 w-8 h-8 rounded-full bg-paper dark:bg-night border border-line-light dark:border-line-dark flex items-center justify-center">
                  <GraduationCap size={14} strokeWidth={1.75} className="text-brass dark:text-brass-light" />
                </span>

                <div className="catalog-card p-5 sm:p-6">
                  <span className="catalog-hole" />
                  <div className="pl-6">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="catalog-code">{item.code}</span>
                      <span className="font-mono text-[11px] text-ink-faint dark:text-bone-soft">{item.period}</span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-medium">{item.degree}</h3>
                    <p className="text-[14px] text-burgundy dark:text-burgundy-light mt-1">{item.institution}</p>

                    {(item.faculty || item.dorm) && (
                      <p className="text-[12.5px] text-ink-faint dark:text-bone-soft mt-1">
                        {[item.faculty, item.dorm].filter(Boolean).join(' · ')}
                      </p>
                    )}

                    {item.status && (
                      <span
                        className={`inline-block mt-3 px-3 py-1 rounded-full text-[12px] font-medium ${
                          item.highlightStatus
                            ? 'bg-brass/15 text-brass dark:bg-brass-light/15 dark:text-brass-light border border-brass/30 dark:border-brass-light/30'
                            : 'bg-paper-soft dark:bg-night-soft text-ink-soft dark:text-bone-soft border border-line-light dark:border-line-dark'
                        }`}
                      >
                        {item.status}
                      </span>
                    )}

                    {item.details && (
                      <p className="text-[14px] leading-relaxed text-ink-soft dark:text-bone-soft mt-3">
                        {item.details}
                      </p>
                    )}

                    {item.result && (
                      <p className="text-[13px] font-medium mt-3 text-ink-faint dark:text-bone-soft">{item.result}</p>
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
