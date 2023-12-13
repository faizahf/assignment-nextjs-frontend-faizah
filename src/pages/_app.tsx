import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Source_Sans_3 } from "next/font/google";

const source_sans = Source_Sans_3({
    weight: ["400", "500", "600"],
    subsets: ["latin"],
  });

export default function App({ Component, pageProps }: AppProps) {
  return <Component className={source_sans.className} {...pageProps} />
}
