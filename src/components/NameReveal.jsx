export default function NameReveal({ name, certificateName, className = '', tooltipClassName = '' }) {
  return (
    <span className="relative inline-block group/name">
      <span
        tabIndex={0}
        className={`cursor-help bg-gradient-to-r from-brass via-burgundy to-brass dark:from-brass-light dark:via-burgundy-light dark:to-brass-light bg-clip-text text-transparent bg-[length:200%_auto] transition-[background-position] duration-700 group-hover/name:bg-right ${className}`}
      >
        {name}
      </span>
      <span
        role="tooltip"
        className={`pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-line-light dark:border-line-dark glass px-3 py-1.5 text-[11px] font-mono text-ink-soft dark:text-bone-soft opacity-0 scale-95 group-hover/name:opacity-100 group-hover/name:scale-100 group-focus-within/name:opacity-100 group-focus-within/name:scale-100 transition-all duration-200 shadow-glass z-10 ${tooltipClassName}`}
      >
        Certificate name: {certificateName}
      </span>
    </span>
  )
}
