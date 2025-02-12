import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <title>Code Quest</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/p2.png" />
        <meta
          name="description"
          content="Web application that provides solution to the coding exams issue"
        />
      </Head>
      <ToastContainer />
      <Component {...pageProps} />
    </RecoilRoot>
  );
}
