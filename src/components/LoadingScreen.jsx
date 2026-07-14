import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data/content.js'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-paper dark:bg-night"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-5">
            <div className="relative w-14 h-14">
              <svg viewBox="0 0 56 56" className="w-14 h-14">
                <rect
                  x="6" y="6" width="44" height="44" rx="3"
                  fill="none"
                  stroke="currentColor"
                  className="text-line-light dark:text-line-dark"
                  strokeWidth="1.5"
                />
                <motion.rect
                  x="6" y="6" width="44" height="44" rx="3"
                  fill="none"
                  stroke="#A9812E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  pathLength={1}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-mono text-[10px] tracking-widest text-ink-soft dark:text-bone-soft">
                {profile.initials}
              </span>
            </div>
            <p className="eyebrow">Fetching Record</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
