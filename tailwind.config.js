/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Palette Apple Fitness+
        accent:   { DEFAULT: '#FF3B30', light: '#FF3B3015', dark: '#CC2E25' },
        energy:   { DEFAULT: '#FF9500', light: '#FF950015' },
        success:  { DEFAULT: '#30D158', light: '#30D15815' },
        info:     { DEFAULT: '#007AFF', light: '#007AFF15' },
        purple:   { DEFAULT: '#AF52DE', light: '#AF52DE15' },
        // Surfaces
        sf: {
          bg:    '#F2F2F7',
          card:  '#FFFFFF',
          sep:   'rgba(60,60,67,0.13)',
          t1:    '#000000',
          t2:    'rgba(60,60,67,0.6)',
          t3:    'rgba(60,60,67,0.28)',
        }
      },
      fontFamily: {
        sf: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'Helvetica Neue', 'sans-serif']
      },
      borderRadius: {
        sf: '12px',
        'sf-sm': '9px',
        'sf-lg': '16px',
      }
    }
  },
  plugins: []
}
