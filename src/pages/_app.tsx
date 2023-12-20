import Layout from "@/components/Layout/Layout";
import { store } from "@/stores/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Head from "next/head";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Provider store={store}>
        <Layout>
          <Component className={poppins.variable} {...pageProps} />
          <ToastContainer />
        </Layout>
      </Provider>
    </>
  );
}
