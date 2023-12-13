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
        'navy-blue': '#10107B',
      },
    },
  },
  daisyui: {
    themes: ['light'],
 },
  plugins: [require('daisyui')],
}
export default config
