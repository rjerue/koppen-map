import React, { Suspense } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import styles from "./Map.module.css";
import { koppen } from "../koppen";
import { GeoJSONOptions } from "leaflet";
import usePromise from "react-promise-suspense";
import { TopoJSON } from "./Topojson";

const onFeature: GeoJSONOptions["onEachFeature"] = (feature, layer) => {
  if (feature.properties && feature.properties.climate) {
    const code = feature.properties.climate.split(" ")[0];
    layer.bindPopup(koppen[code].title);
  }
};

const getData = (code: string) => {
  return import(`../data/${code}.json`).then((d) => d.default);
};

const data = Object.keys(koppen).reduce(
  (accum, e) => ({ ...accum, [e]: getData(e) }),
  {} as Record<string, ReturnType<typeof getData>>
);

function retrieveData(code: string) {
  return data[code];
}

const GeoJsonLayer: React.FC<{ code: string; active: boolean }> = ({
  code,
  active,
}) => {
  const data = usePromise(getData, [code]);
  return active ? (
    <TopoJSON
      style={{
        color: koppen[code].color,
        fillOpacity: 0.5,
      }}
      key={code}
      attribution='Dataset: <a href="https://staging.igrac.kartoza.com/layers/igrac:other_climate_2007_koppen_geiger">igrac</a>'
      data={data}
      onEachFeature={onFeature}
    />
  ) : null;
};

const Map: React.FC<{ state: Record<string, boolean> }> = ({ state }) => {
  return (
    <div className={`${styles.map} ${styles.mapWrapper}`}>
      <MapContainer
        className={`${styles.map}`}
        center={[51.505, -0.09]}
        zoom={3}
        minZoom={3}
        worldCopyJump
      >
        <TileLayer
          attribution='Tiles: <a href="http://stamen.com">Stamen</a>, Map: <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.png"
        />
        {Object.keys(koppen).map((code) => {
          return (
            <Suspense key={code} fallback={<></>}>
              <GeoJsonLayer code={code} active={state[code]} />
            </Suspense>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
