import { motion } from 'framer-motion'
import { ArrowUpRight, FolderOpen, Loader2 } from 'lucide-react'
import { useTable } from '../hooks/useSupabaseData.js'
import SectionHeading from './SectionHeading.jsx'

export default function Projects() {
  const { items: projects, loading } = useTable('projects', { orderBy: 'created_at', ascending: false })

  return (
    <section id="projects" className="py-24 md:py-32 scroll-mt-24 bg-paper-soft/60 dark:bg-night-soft/40">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <SectionHeading
          eyebrow="04 — Holdings"
          title="Projects"
          description="Research and applied work in metadata, documentation, and archival systems."
        />

        {loading ? (
          <LoadingState />
        ) : projects.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="mt-14 grid md:grid-cols-2 gap-6">
            {projects.map((project, i) => (
              <motion.a
                key={project.id}
                href={project.link || '#'}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (i % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="catalog-card group relative flex flex-col p-6 sm:p-7 hover:-translate-y-1.5 hover:shadow-card dark:hover:shadow-card-dark transition-all duration-300"
              >
                <span className="catalog-hole" />
                <div className="flex items-start justify-between pl-6 mb-5">
                  <span className="catalog-code">{project.code}</span>
                  <span className="font-mono text-[11px] text-ink-faint dark:text-bone-soft">{project.period}</span>
                </div>

                <h3 className="font-display text-xl sm:text-[22px] font-medium leading-snug text-balance">
                  {project.title}
                </h3>

                <p className="mt-3 text-[14px] leading-relaxed text-ink-soft dark:text-bone-soft flex-1">
                  {project.summary}
                </p>

                <div className="card-stitch my-5" />

                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex flex-wrap gap-2">
                    {(project.tags || '')
                      .split(',')
                      .map((t) => t.trim())
                      .filter(Boolean)
                      .map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-0.5 rounded-full border border-line-light dark:border-line-dark text-ink-faint dark:text-bone-soft"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[13px] font-medium text-brass dark:text-brass-light whitespace-nowrap link-underline">
                    {project.link_label || 'View'}
                    <ArrowUpRight
                      size={14}
                      strokeWidth={2}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

function LoadingState() {
  return (
    <div className="mt-14 flex items-center justify-center gap-2 py-10 text-ink-faint dark:text-bone-soft">
      <Loader2 size={16} className="animate-spin" strokeWidth={1.75} />
      <span className="text-[13px]">Loading projects…</span>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="mt-14 rounded-[6px] border border-dashed border-line-light dark:border-line-dark p-10 text-center">
      <FolderOpen size={22} strokeWidth={1.5} className="mx-auto text-ink-faint dark:text-bone-soft" />
      <p className="mt-3 text-[14px] text-ink-soft dark:text-bone-soft">No projects added yet.</p>
      <p className="mt-1 text-[12.5px] text-ink-faint dark:text-bone-soft">
        Add your first one from{' '}
        <a href="#/admin" className="text-brass dark:text-brass-light link-underline">
          the admin panel
        </a>
        .
      </p>
    </div>
  )
}
