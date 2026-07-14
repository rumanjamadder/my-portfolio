// Explicit class strings per accent — Tailwind's JIT compiler can't see
// dynamically-built class names like `bg-${color}`, so every combination
// used anywhere in the app is spelled out here and looked up by key.

export const ACCENTS = ['brass', 'burgundy', 'teal', 'indigo', 'coral']

export const accentStyles = {
  brass: {
    badge: 'bg-brass/10 text-brass dark:text-brass-light border-brass/30',
    bar: 'bg-brass dark:bg-brass-light',
    text: 'text-brass dark:text-brass-light',
    ring: 'border-brass/40 dark:border-brass-light/40',
  },
  burgundy: {
    badge: 'bg-burgundy/10 text-burgundy dark:text-burgundy-light border-burgundy/30',
    bar: 'bg-burgundy dark:bg-burgundy-light',
    text: 'text-burgundy dark:text-burgundy-light',
    ring: 'border-burgundy/40 dark:border-burgundy-light/40',
  },
  teal: {
    badge: 'bg-teal/10 text-teal dark:text-teal-light border-teal/30',
    bar: 'bg-teal dark:bg-teal-light',
    text: 'text-teal dark:text-teal-light',
    ring: 'border-teal/40 dark:border-teal-light/40',
  },
  indigo: {
    badge: 'bg-indigo/10 text-indigo dark:text-indigo-light border-indigo/30',
    bar: 'bg-indigo dark:bg-indigo-light',
    text: 'text-indigo dark:text-indigo-light',
    ring: 'border-indigo/40 dark:border-indigo-light/40',
  },
  coral: {
    badge: 'bg-coral/10 text-coral dark:text-coral-light border-coral/30',
    bar: 'bg-coral dark:bg-coral-light',
    text: 'text-coral dark:text-coral-light',
    ring: 'border-coral/40 dark:border-coral-light/40',
  },
}

export function getAccent(name) {
  return accentStyles[name] || accentStyles.brass
}
