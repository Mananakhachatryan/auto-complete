/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Include all files where Tailwind classes may be used
  ],
  theme: {
    extend: {
      colors: {
        headerBg: '#1976d2',
        main: 'rgba(80, 87, 101, 1)',
        active: 'rgba(241, 90, 41, 1)',
      },
      spacing: {
        headerHeight: '104px',
      },
    },
  },
  plugins: [],
}
