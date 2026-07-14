import { motion } from 'framer-motion'
import { ArrowLeft, Loader2, Sun, Moon } from 'lucide-react'
import { profile } from '../data/content.js'
import { useTable } from '../hooks/useSupabaseData.js'
import { getAccent } from '../data/accents.js'
import NameReveal from './NameReveal.jsx'
import Footer from './Footer.jsx'

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  } catch {
    return iso
  }
}

export default function BlogPost({ slug, theme, toggleTheme }) {
  const { items: posts, loading } = useTable('blog_posts')
  const post = posts.find((p) => p.slug === slug)
  const accent = getAccent(post?.accent)

  const goHome = (e) => {
    e.preventDefault()
    window.location.hash = ''
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-line-light dark:border-line-dark">
        <div className="mx-auto max-w-content px-5 md:px-8 py-5 flex items-center justify-between">
          <a href="#" onClick={goHome} className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-[6px] border border-line-light dark:border-line-dark flex items-center justify-center font-mono text-[11px] tracking-wider group-hover:border-brass dark:group-hover:border-brass-light transition-colors">
              {profile.initials}
            </span>
            <span className="hidden sm:block font-display text-[15px] tracking-tight">
              <NameReveal name={profile.name} certificateName={profile.certificateName} />
            </span>
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 rounded-full border border-line-light dark:border-line-dark flex items-center justify-center hover:border-brass dark:hover:border-brass-light transition-colors"
          >
            {theme === 'dark' ? <Sun size={15} strokeWidth={1.75} /> : <Moon size={15} strokeWidth={1.75} />}
          </button>
        </div>
      </header>

      <main className="flex-1 py-16 md:py-24">
        <div className="mx-auto max-w-2xl px-5 md:px-8">
          <a
            href="#"
            onClick={goHome}
            className="inline-flex items-center gap-2 text-[13px] text-ink-soft dark:text-bone-soft hover:text-brass dark:hover:text-brass-light transition-colors mb-10 link-underline"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to all posts
          </a>

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-10 text-ink-faint dark:text-bone-soft">
              <Loader2 size={16} className="animate-spin" strokeWidth={1.75} />
              <span className="text-[13px]">Loading post…</span>
            </div>
          ) : !post ? (
            <div className="rounded-[6px] border border-dashed border-line-light dark:border-line-dark p-10 text-center">
              <p className="text-[15px] text-ink-soft dark:text-bone-soft">This post doesn't exist or was removed.</p>
            </div>
          ) : (
            <motion.article
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${accent.badge}`}>
                  {post.category}
                </span>
                <span className="font-mono text-[11px] text-ink-faint dark:text-bone-soft">
                  {formatDate(post.date)}
                </span>
              </div>

              <h1 className="font-display font-medium text-3xl sm:text-4xl leading-tight text-balance">
                {post.title}
              </h1>

              <div className={`mt-6 h-1 w-16 rounded-full ${accent.bar}`} />

              <div className="mt-8 space-y-5">
                {(post.content || '').split('\n').filter(Boolean).map((para, idx) => (
                  <p key={idx} className="text-[16px] leading-relaxed text-ink-soft dark:text-bone-soft">
                    {para}
                  </p>
                ))}
              </div>
            </motion.article>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
