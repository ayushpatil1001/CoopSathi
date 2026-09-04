/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gov: {
          blue: {
            DEFAULT: '#0A2540',
            50: '#F0F5FA',
            100: '#E1EBF5',
            200: '#C2D7EC',
            300: '#94BCDE',
            400: '#5F9CCE',
            500: '#327CB9',
            600: '#1D629E',
            700: '#134A7B',
            800: '#0E365C',
            900: '#0A2540',
            950: '#051424',
          },
          green: {
            DEFAULT: '#138808',
            50: '#F1F9F1',
            100: '#DEF3DF',
            200: '#BEE5BF',
            300: '#8ED291',
            400: '#54B758',
            500: '#138808',
            600: '#107507',
            700: '#0E5D07',
            800: '#0E4909',
            900: '#0D3D0A',
            950: '#052104',
          },
          saffron: {
            DEFAULT: '#FF9933',
            50: '#FFF7ED',
            100: '#FFEDD5',
            200: '#FED7AA',
            300: '#FDBA74',
            400: '#FB923C',
            500: '#FF9933',
            600: '#EA580C',
            700: '#C2410C',
            800: '#9A3412',
            900: '#7C2D12',
          },
          gold: '#D97706',
          sand: '#FBF9F5',
          slate: '#F8FAFC',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'gov': '0 4px 20px -2px rgba(10, 37, 64, 0.08), 0 2px 6px -1px rgba(10, 37, 64, 0.04)',
        'gov-lg': '0 10px 30px -4px rgba(10, 37, 64, 0.12), 0 4px 12px -2px rgba(10, 37, 64, 0.06)',
      }
    },
  },
  plugins: [],
}
