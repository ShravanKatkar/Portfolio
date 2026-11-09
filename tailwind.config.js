/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#070707',
          charcoal: '#101011',
          elevated: '#161618',
          card: '#0D0D0E',
        },
        editorial: {
          white: '#F4F1EA',
          subtle: '#8E8C86',
          muted: '#5C5A55',
          border: 'rgba(244, 241, 234, 0.12)',
          'border-subtle': 'rgba(244, 241, 234, 0.06)',
          accent: '#FF552E', // Burnt orange accent
          'accent-glow': 'rgba(255, 85, 46, 0.15)',
          'accent-hover': '#FF6E4A',
          charcoal: '#141416',
          dark: '#070707',
        }
      },
      fontFamily: {
        serif: ['Instrument Serif', 'Georgia', 'serif'],
        display: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        syne: ['Syne', 'sans-serif'],
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.025em',
        'wide-editorial': '0.14em',
        'widest-editorial': '0.22em',
      },
      backgroundImage: {
        'noise-pattern': "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.8\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%\" height=\"100%\" filter=\"url(%23noiseFilter)\" opacity=\"0.04\"/%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
}
