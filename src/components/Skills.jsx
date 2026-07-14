import { motion } from 'framer-motion'
import { skills as staticSkills } from '../data/content.js'
import { useTable } from '../hooks/useSupabaseData.js'
import SectionHeading from './SectionHeading.jsx'

export default function Skills() {
  const { items, loading } = useTable('skills', { orderBy: 'sort_order', ascending: true })

  const skills =
    !loading && items.length > 0
      ? items.map((row) => ({
          group: row.group_name,
          code: row.code,
          items: (row.items || '').split(',').map((s) => s.trim()).filter(Boolean),
        }))
      : staticSkills

  return (
    <section id="skills" className="py-24 md:py-32 scroll-mt-24">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <SectionHeading
          eyebrow="03 — Subject Index"
          title="Skills"
          description="Filed like a subject catalogue, one drawer per category — call numbers included for the librarian in the room."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((group, i) => (
            <motion.div
              key={group.group}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="catalog-card group relative p-5 sm:p-6 hover:-translate-y-1 hover:shadow-card dark:hover:shadow-card-dark transition-all duration-300"
            >
              <span className="catalog-hole" />
              <div className="pl-6">
                <div className="flex items-center justify-between mb-1">
                  <span className="catalog-code">Subject Card</span>
                  <span className="font-mono text-[10px] text-ink-faint dark:text-bone-soft border border-line-light dark:border-line-dark rounded px-1.5 py-0.5">
                    {group.code}
                  </span>
                </div>
                <h3 className="font-display text-[17px] font-medium mt-2">{group.group}</h3>
              </div>

              <div className="card-stitch my-4" />

              <ul className="flex flex-wrap gap-2 pl-6">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="text-[12.5px] px-2.5 py-1 rounded-full bg-paper-soft dark:bg-night-soft text-ink-soft dark:text-bone-soft border border-line-light dark:border-line-dark group-hover:border-brass/50 dark:group-hover:border-brass-light/50 transition-colors"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
