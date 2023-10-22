import Head from "next/head";
import type { AppProps } from "next/app";
import { GoogleAnalytics } from "nextjs-google-analytics";
import "../global.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Köppen–Geiger Climate Classification Map</title>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@^1.7.1/dist/leaflet.css"
          crossOrigin=""
        />
        <script
          src="https://unpkg.com/leaflet@^1.7.1/dist/leaflet.js"
          crossOrigin=""
        />

        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          name="description"
          content="An Interactive Köppen–Geiger Climate Map of the entire world"
        />
        <meta
          name="keywords"
          content="Köppen, Koppen, Geiger, Climate, Classification, Interactive, Map, World"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png"></link>
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <GoogleAnalytics trackPageViews gaMeasurementId={"G-HKH1J86NRV"} />
      <Component {...pageProps} />
    </>
  );
}
