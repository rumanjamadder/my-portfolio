import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Expand, ImageOff, Loader2 } from 'lucide-react'
import { useTable } from '../hooks/useSupabaseData.js'
import SectionHeading from './SectionHeading.jsx'
import Lightbox from './Lightbox.jsx'

export default function Gallery() {
  const { items: gallery, loading } = useTable('gallery', { orderBy: 'sort_order', ascending: true })
  const [filter, setFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const categories = useMemo(() => {
    const set = new Set(gallery.map((g) => g.category).filter(Boolean))
    return ['All', ...Array.from(set)]
  }, [gallery])

  const filtered = useMemo(
    () => (filter === 'All' ? gallery : gallery.filter((g) => g.category === filter)),
    [filter, gallery]
  )

  return (
    <section id="gallery" className="py-24 md:py-32 scroll-mt-24 bg-paper-soft/60 dark:bg-night-soft/40">
      <div className="mx-auto max-w-content px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            eyebrow="06 — Archive"
            title="Gallery"
            description="Field visits, presentations, and moments from the reading room."
          />

          {gallery.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-[12.5px] border transition-colors ${
                    filter === cat
                      ? 'bg-ink text-paper dark:bg-bone dark:text-night border-ink dark:border-bone'
                      : 'border-line-light dark:border-line-dark text-ink-soft dark:text-bone-soft hover:border-brass dark:hover:border-brass-light'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div className="mt-12 flex items-center justify-center gap-2 py-10 text-ink-faint dark:text-bone-soft">
            <Loader2 size={16} className="animate-spin" strokeWidth={1.75} />
            <span className="text-[13px]">Loading gallery…</span>
          </div>
        ) : gallery.length === 0 ? (
          <div className="mt-12 rounded-[6px] border border-dashed border-line-light dark:border-line-dark p-10 text-center">
            <ImageOff size={22} strokeWidth={1.5} className="mx-auto text-ink-faint dark:text-bone-soft" />
            <p className="mt-3 text-[14px] text-ink-soft dark:text-bone-soft">No photos added yet.</p>
            <p className="mt-1 text-[12.5px] text-ink-faint dark:text-bone-soft">
              Upload your first one from{' '}
              <a href="#/admin" className="text-brass dark:text-brass-light link-underline">
                the admin panel
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((item, i) => {
              const realIndex = gallery.findIndex((g) => g.id === item.id)
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => setLightboxIndex(realIndex)}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative rounded-[6px] overflow-hidden border border-line-light dark:border-line-dark aspect-[4/3] text-left"
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/0 to-night/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded-full glass border border-bone/20 text-bone text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {item.category}
                  </span>
                  <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-bone text-[13px] leading-snug">{item.caption}</p>
                  </div>
                  <span className="absolute top-3 right-3 w-8 h-8 rounded-full glass border border-bone/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Expand size={13} strokeWidth={1.75} className="text-bone" />
                  </span>
                </motion.button>
              )
            })}
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={gallery}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  )
}
