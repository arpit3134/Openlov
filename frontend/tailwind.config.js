/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0A0A0A',
          surface: '#121212',
          elevated: '#18181b',
        },
        foreground: {
          DEFAULT: '#EDEDED',
          secondary: '#A1A1AA',
          muted: '#52525b',
        },
        brand: {
          primary: '#3B82F6',
          glow: 'rgba(59, 130, 246, 0.5)',
          accent: '#84CC16',
        },
        border: {
          DEFAULT: 'rgba(255, 255, 255, 0.08)',
          active: 'rgba(255, 255, 255, 0.15)',
        },
        light: {
          bg: '#FAFAF9',
          surface: '#FFFFFF',
          elevated: '#F5F5F4',
          text: '#1C1917',
          secondary: '#57534E',
          muted: '#A8A29E',
          border: '#E7E5E4',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Manrope', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.5)' },
        },
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15) 0%, rgba(10, 10, 10, 0) 70%)',
        'card-hover': 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)',
      },
    },
  },
  plugins: [],
};
