/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#000000',
        paper: '#FFFFFF',
        smoke: '#F2F2F2',
        line: '#E6E6E6',
        muted: '#707070',
        faint: '#B3B3B3',
      },
      fontFamily: {
        display: ['"Integral CF"', 'Archivo', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(2.5rem, 7vw, 5rem)', { lineHeight: '1.02', letterSpacing: '-0.02em', fontWeight: '800' }],
        h2: ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '800' }],
      },
      borderRadius: {
        card: '1.25rem',
        pill: '9999px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.04)',
        float: '0 12px 30px rgba(0,0,0,0.12)',
      },
      maxWidth: {
        shell: '1200px',
      },
    },
  },
  plugins: [],
}
