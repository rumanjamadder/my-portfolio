import { motion } from 'framer-motion'
import { profile } from '../data/content.js'
import { useSingleRow } from '../hooks/useSupabaseData.js'
import SectionHeading from './SectionHeading.jsx'

export default function About() {
  const { data: aboutRow } = useSingleRow('about')

  const about = {
    paragraph1: aboutRow?.paragraph_1 || profile.about,
    paragraph2: aboutRow?.paragraph_2 || profile.aboutSecondary,
    basedIn: aboutRow?.based_in || profile.location,
    focus: aboutRow?.focus || 'Archives & Documentation',
    degreeStatus: aboutRow?.degree_status || 'MA ISLM, final semester',
    languages: aboutRow?.languages || 'Bengali, English + 2',
  }

  return (
    <section id="about" className="py-24 md:py-32 scroll-mt-24">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <SectionHeading eyebrow="01 — Profile" title="About" />

        <div className="grid lg:grid-cols-12 gap-10 mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <p className="text-[19px] sm:text-[21px] leading-relaxed font-display font-normal text-balance">
              {about.paragraph1}
            </p>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-soft dark:text-bone-soft max-w-2xl">
              {about.paragraph2}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <div className="rounded-[6px] border border-line-light dark:border-line-dark p-6 bg-white/60 dark:bg-night-surface/60">
              <p className="eyebrow mb-4">At a glance</p>
              <ul className="space-y-4 text-[14px]">
                <li className="flex justify-between gap-4 pb-4 border-b border-line-light dark:border-line-dark">
                  <span className="text-ink-faint dark:text-bone-soft">Based in</span>
                  <span className="font-medium text-right">{about.basedIn}</span>
                </li>
                <li className="flex justify-between gap-4 pb-4 border-b border-line-light dark:border-line-dark">
                  <span className="text-ink-faint dark:text-bone-soft">Focus</span>
                  <span className="font-medium text-right">{about.focus}</span>
                </li>
                <li className="flex justify-between gap-4 pb-4 border-b border-line-light dark:border-line-dark">
                  <span className="text-ink-faint dark:text-bone-soft">Degree</span>
                  <span className="font-medium text-right">{about.degreeStatus}</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span className="text-ink-faint dark:text-bone-soft">Languages</span>
                  <span className="font-medium text-right">{about.languages}</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
