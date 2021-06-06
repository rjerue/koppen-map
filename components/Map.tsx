import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { GeoJsonObject } from "geojson";
import styles from "./Map.module.css";
import { koppen } from "../koppen";
import { GeoJSONOptions } from "leaflet";

type GeoJsonState = {
  code: string;
  data: GeoJsonObject;
}[];

function load(set: React.Dispatch<React.SetStateAction<GeoJsonState>>) {
  Object.keys(koppen).map(async (code) => {
    const addition = {
      code,
      data: await import(`../data/${code}.json`),
    };
    set((s) => s.concat(addition));
  });
}

const onGeoJSONFeature: GeoJSONOptions["onEachFeature"] = (feature, layer) => {
  if (feature.properties && feature.properties.climate) {
    const code = feature.properties.climate.split(" ")[0];
    layer.bindPopup(koppen[code].title);
  }
};

const Map: React.FC<{ state: Record<string, boolean> }> = ({ state }) => {
  const [json, jsonSet] = React.useState([] as GeoJsonState);
  React.useEffect(() => {
    load(jsonSet);
  }, []);

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
        {json.map(({ code, data: d }) => {
          const active = state[code];
          return active ? (
            <GeoJSON
              style={{
                color: koppen[code].color,
                fillOpacity: 0.5,
              }}
              key={code}
              attribution='Dataset: <a href="https://staging.igrac.kartoza.com/layers/igrac:other_climate_2007_koppen_geiger">igrac</a>'
              data={d as GeoJsonObject}
              onEachFeature={onGeoJSONFeature}
            />
          ) : null;
        })}
      </MapContainer>
    </div>
  );
};

export default Map;
