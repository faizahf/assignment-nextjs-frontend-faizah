import Layout from '@/components/Layout/Layout';
import { store } from '@/stores/store';
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Source_Sans_3 } from "next/font/google";
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

const source_sans = Source_Sans_3({
    weight: ["400", "500", "600"],
    subsets: ["latin"],
  });

export default function App({ Component, pageProps }: AppProps) {
  return (
  <Provider store={store}>
    <Layout>
      <Component className={source_sans.className} {...pageProps} />
      <ToastContainer />
    </Layout>
  </Provider>
  )
}
