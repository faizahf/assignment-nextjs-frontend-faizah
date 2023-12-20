import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    'node_modules/daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#7848F4',
        'secondary': '#F3EFFF',
        'dark': '#131336',
        'grey': '#7E7E7E',
        'silver': '#A1A1AA',
        'gold': '#DAA511',
        'platinum': '#334155'
      },
      fontFamily: {
        poppins: ['var(--font-poppins)'],
      },
    },
  },
  daisyui: {
    themes: ['light'],
 },
  plugins: [require('daisyui')],
}
export default config
