import Head from "next/head";
import dynamic from "next/dynamic";
import { Card } from "../components/Card";
import { Legend } from "../components/Legend";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

const IndexPage = () => (
  <div>
    <Head>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
        integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
        crossOrigin=""
      />
      <script
        src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
        integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
        crossOrigin=""
      />
    </Head>
    <Map />
    <Card
      style={{
        bottom: 10,
        left: 10,
      }}
    >
      <Legend />
    </Card>
  </div>
);

export default IndexPage;
