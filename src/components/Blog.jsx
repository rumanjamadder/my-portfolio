import { motion } from 'framer-motion'
import { ArrowRight, Loader2, Newspaper } from 'lucide-react'
import { useTable } from '../hooks/useSupabaseData.js'
import { getAccent } from '../data/accents.js'
import SectionHeading from './SectionHeading.jsx'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return iso
  }
}

export default function Blog() {
  const { items: posts, loading } = useTable('blog_posts', { orderBy: 'date', ascending: false })

  return (
    <section id="blog" className="py-24 md:py-32 scroll-mt-24 bg-paper-soft/60 dark:bg-night-soft/40">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <SectionHeading
          eyebrow="08 — Bulletin"
          title="Blog"
          description="Field notes, research reflections, and write-ups from ongoing projects."
        />

        {loading ? (
          <div className="mt-14 flex items-center justify-center gap-2 py-10 text-ink-faint dark:text-bone-soft">
            <Loader2 size={16} className="animate-spin" strokeWidth={1.75} />
            <span className="text-[13px]">Loading posts…</span>
          </div>
        ) : posts.length === 0 ? (
          <div className="mt-14 rounded-[6px] border border-dashed border-line-light dark:border-line-dark p-10 text-center">
            <Newspaper size={22} strokeWidth={1.5} className="mx-auto text-ink-faint dark:text-bone-soft" />
            <p className="mt-3 text-[14px] text-ink-soft dark:text-bone-soft">No posts published yet.</p>
            <p className="mt-1 text-[12.5px] text-ink-faint dark:text-bone-soft">
              Write your first one from{' '}
              <a href="#/admin" className="text-brass dark:text-brass-light link-underline">
                the admin panel
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => {
              const accent = getAccent(post.accent)
              return (
                <motion.a
                  key={post.id}
                  href={`#/blog/${post.slug}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative flex flex-col rounded-[6px] border bg-white dark:bg-night-surface p-6 overflow-hidden hover:-translate-y-1.5 hover:shadow-card dark:hover:shadow-card-dark transition-all duration-300 ${accent.ring}`}
                >
                  <span className={`absolute top-0 left-0 right-0 h-1 ${accent.bar}`} />
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${accent.badge}`}>
                      {post.category}
                    </span>
                    <span className="font-mono text-[11px] text-ink-faint dark:text-bone-soft">
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-medium leading-snug text-balance">{post.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft dark:text-bone-soft flex-1">
                    {post.excerpt}
                  </p>
                  <span className={`mt-4 inline-flex items-center gap-1 text-[13px] font-medium ${accent.text}`}>
                    Read post
                    <ArrowRight size={13} strokeWidth={2} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </motion.a>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
