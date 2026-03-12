/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0066ff',
        secondary: '#00cc88',
        dark: '#0f172a',
        light: '#f8fafc',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#1e293b',
            a: {
              color: '#0066ff',
              '&:hover': {
                color: '#0052cc',
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
};
