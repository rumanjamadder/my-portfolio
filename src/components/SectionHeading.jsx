import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h2 className="font-display font-medium text-3xl sm:text-4xl tracking-tight text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft dark:text-bone-soft">
          {description}
        </p>
      )}
    </motion.div>
  )
}
