export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        medical: {
          primary: '#1e40af',
          secondary: '#3b82f6',
          accent: '#60a5fa',
          success: '#10b981',
          warning: '#f59e0b',
          danger: '#ef4444',
        }
      },
      fontFamily: {
        'medical': ['Inter', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
