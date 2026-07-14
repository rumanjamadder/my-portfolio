import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Lightbox({ images, index, onClose, onNavigate }) {
  const item = images[index]

  const handleKey = useCallback(
    (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate((index + 1) % images.length)
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length)
    },
    [index, images.length, onClose, onNavigate]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  if (!item) return null

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={item.caption}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[90] flex items-center justify-center bg-night/92 backdrop-blur-sm p-4 sm:p-8"
        onClick={onClose}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close image viewer"
          className="absolute top-5 right-5 w-10 h-10 rounded-full border border-bone/20 text-bone flex items-center justify-center hover:border-brass-light transition-colors"
        >
          <X size={18} strokeWidth={1.75} />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onNavigate((index - 1 + images.length) % images.length)
          }}
          aria-label="Previous image"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-bone/20 text-bone flex items-center justify-center hover:border-brass-light transition-colors"
        >
          <ChevronLeft size={18} strokeWidth={1.75} />
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onNavigate((index + 1) % images.length)
          }}
          aria-label="Next image"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-bone/20 text-bone flex items-center justify-center hover:border-brass-light transition-colors"
        >
          <ChevronRight size={18} strokeWidth={1.75} />
        </button>

        <motion.figure
          key={item.id}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-3xl w-full"
        >
          <div className="rounded-[6px] overflow-hidden border border-bone/15 bg-night-surface">
            <img
              src={item.src}
              alt={item.caption}
              className="w-full max-h-[70vh] object-contain bg-night"
              onError={(e) => {
                e.currentTarget.src =
                  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><rect width="100%" height="100%" fill="%231F242C"/></svg>'
              }}
            />
          </div>
          <figcaption className="mt-4 flex items-center justify-between gap-4 text-bone">
            <p className="text-[14px]">{item.caption}</p>
            <span className="font-mono text-[11px] text-bone-soft whitespace-nowrap">
              {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
          </figcaption>
        </motion.figure>
      </motion.div>
    </AnimatePresence>
  )
}
