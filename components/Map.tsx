import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";
import { PromiseValue } from "type-fest";
import styles from "./Map.module.css";
import { koppen } from "../koppen";
import { GeoJSONOptions } from "leaflet";

async function load() {
  const d = await Promise.all(
    Object.keys(koppen).map(async (code) => ({
      code,
      data: await import(`../data/${code}.json`),
    }))
  );
  return d;
}

const onGeoJSONFeature: GeoJSONOptions["onEachFeature"] = (feature, layer) => {
  if (feature.properties && feature.properties.climate) {
    const code = feature.properties.climate.split(" ")[0];
    layer.bindPopup(koppen[code].title);
  }
};

export default function Map() {
  const [json, jsonSet] = React.useState(
    [] as PromiseValue<ReturnType<typeof load>>
  );
  React.useEffect(() => {
    load().then((d) => jsonSet(d));
  }, []);

  return (
    <div className={`${styles.map} ${styles.mapWrapper}`}>
      <MapContainer
        className={`${styles.map}`}
        center={[51.505, -0.09]}
        zoom={3}
        worldCopyJump
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {json.map(({ code, data: d }) => (
          <GeoJSON
            style={{
              color: koppen[code].color,
            }}
            key={code}
            attribution='<a href="https://staging.igrac.kartoza.com/layers/igrac:other_climate_2007_koppen_geiger">igrac</a>'
            data={d as GeoJsonObject}
            onEachFeature={onGeoJSONFeature}
          />
        ))}
      </MapContainer>
    </div>
  );
}
