import { motion } from 'framer-motion'
import { BookMarked, Loader2 } from 'lucide-react'
import { useTable } from '../hooks/useSupabaseData.js'
import SectionHeading from './SectionHeading.jsx'

export default function ResearchInterests() {
  const { items: interests, loading } = useTable('research_interests', { orderBy: 'created_at', ascending: true })

  return (
    <section id="research" className="py-24 md:py-32 scroll-mt-24">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <SectionHeading
          eyebrow="07 — Classification"
          title="Research Interests"
          description="The questions I keep returning to, filed under their nearest classification number."
        />

        {loading ? (
          <div className="mt-14 flex items-center justify-center gap-2 py-10 text-ink-faint dark:text-bone-soft">
            <Loader2 size={16} className="animate-spin" strokeWidth={1.75} />
            <span className="text-[13px]">Loading…</span>
          </div>
        ) : interests.length === 0 ? (
          <div className="mt-14 rounded-[6px] border border-dashed border-line-light dark:border-line-dark p-10 text-center">
            <BookMarked size={22} strokeWidth={1.5} className="mx-auto text-ink-faint dark:text-bone-soft" />
            <p className="mt-3 text-[14px] text-ink-soft dark:text-bone-soft">No research interests added yet.</p>
            <p className="mt-1 text-[12.5px] text-ink-faint dark:text-bone-soft">
              Add one from{' '}
              <a href="#/admin" className="text-brass dark:text-brass-light link-underline">
                the admin panel
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="mt-14 grid sm:grid-cols-2 gap-px bg-line-light dark:bg-line-dark rounded-[6px] overflow-hidden border border-line-light dark:border-line-dark">
            {interests.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                className="bg-paper dark:bg-night p-7 sm:p-8 hover:bg-paper-soft dark:hover:bg-night-surface transition-colors duration-300"
              >
                <span className="font-mono text-2xl text-brass/70 dark:text-brass-light/60">{item.code}</span>
                <h3 className="font-display text-lg sm:text-xl font-medium mt-3">{item.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-ink-soft dark:text-bone-soft">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
