import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

import Header from "@/components/header/Header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Weather Forecaster</title>
        <meta name="description" content="Weather Forecaster Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
         <Header />
         <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
