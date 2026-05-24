/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,html}', './data/**/*.js'],
  theme: {
    extend: {
      colors: {
        // Cool, modern neutral palette — distinctly NOT cream.
        bg: '#eef1f5',          // page background, soft cool gray
        paper: '#ffffff',        // cards
        ink: '#0f1626',          // primary text, deep ink with a navy bias
        muted: '#5e6b80',        // secondary text
        line: '#d8dde6',         // borders, dividers
        accent: '#2c4a7a',       // navy (kept)
        'accent-soft': '#dde6f3',
        'accent-deep': '#1e3558',
        good: '#1f6b40',
        'good-soft': '#d8eedd',
        bad: '#9b2d20',
        'bad-soft': '#f5dad6'
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Inter', 'SF Pro Text', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft Yahei', 'sans-serif'],
        serif: ['Source Serif 4', 'Source Serif Pro', 'Songti SC', 'Georgia', 'serif']
      },
      boxShadow: {
        card: '0 1px 0 rgba(15, 22, 38, 0.04), 0 1px 3px rgba(15, 22, 38, 0.06)',
        lift: '0 4px 16px -4px rgba(15, 22, 38, 0.12)'
      }
    }
  },
  plugins: []
};
