/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'page': '#F9FAFB', 
        'card': '#FFFFFF', 
        'primary': '#0EA5E9', // Clean cyan/sky blue
        'text-dark': '#334155',    // Slate 700
        'text-body': '#475569',    // Slate 600
        'text-muted': '#94A3B8',   // Slate 400
        'pos-green': '#10B981',    
        'neg-red': '#EF4444',      
        'border-div': '#E2E8F0',   
      },
      fontFamily: {
        'sans': ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 4px rgba(0,0,0,0.06)',
        'tooltip': '0 4px 12px rgba(0,0,0,0.12)',
      }
    },
  },
  plugins: [],
}
