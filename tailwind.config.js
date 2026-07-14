/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FAF7F0',
          soft: '#F1ECE0',
        },
        ink: {
          DEFAULT: '#1C1A17',
          soft: '#5B564C',
          faint: '#8B8578',
        },
        night: {
          DEFAULT: '#14171C',
          soft: '#1B1F26',
          surface: '#1F242C',
        },
        bone: {
          DEFAULT: '#EDEAE2',
          soft: '#A7A296',
        },
        brass: {
          DEFAULT: '#A9812E',
          light: '#C9A227',
        },
        burgundy: {
          DEFAULT: '#7A2A2E',
          light: '#C1595E',
        },
        line: {
          light: '#DDD5C3',
          dark: '#2B303A',
        },
        teal: {
          DEFAULT: '#2F7B6D',
          light: '#4FA593',
        },
        indigo: {
          DEFAULT: '#3F4BA0',
          light: '#6C74C9',
        },
        coral: {
          DEFAULT: '#C2542D',
          light: '#E07B4F',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        body: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      maxWidth: {
        content: '72rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(28, 26, 23, 0.06), 0 8px 24px -12px rgba(28, 26, 23, 0.18)',
        'card-dark': '0 1px 2px rgba(0,0,0,0.3), 0 12px 28px -14px rgba(0,0,0,0.55)',
        glass: '0 1px 0 rgba(255,255,255,0.4) inset, 0 8px 32px -16px rgba(28,26,23,0.25)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        blink: 'blink 1s step-start infinite',
      },
    },
  },
  plugins: [],
}
