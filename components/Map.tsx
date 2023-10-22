import React, { Suspense } from "react";
import { MapContainer } from "react-leaflet";
import styles from "./Map.module.css";
import { koppen } from "../koppen";
import { GeoJSONOptions } from "leaflet";
import usePromise from "react-promise-suspense";
import { TopoJSON } from "./Topojson";
import VectorBasemapLayer from "react-esri-leaflet/plugins/VectorBasemapLayer";

const onFeature: GeoJSONOptions["onEachFeature"] = (feature, layer) => {
  if (feature.properties && feature.properties.code) {
    const code = feature.properties.code;
    layer.bindPopup(koppen[code].title);
  }
};

const getData = (code: string) => {
  return import(`../data/${code}.json`).then((d) => d.default);
};

const mapData = Object.keys(koppen).reduce(
  (accum, e) => ({ ...accum, [e]: getData(e) }),
  {} as Record<string, ReturnType<typeof getData>>
);

function retrieveData(code: string) {
  return mapData[code];
}

const GeoJsonLayer: React.FC<{ code: string; active: boolean }> = ({
  code,
  active,
}) => {
  const data = usePromise(retrieveData, [code]);
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

// esri https://basemaps-api.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/tile/4/6/10.pbf?token=AAPK9250e700411749c9b0f45c5c54662f24eGi6gpLH6WTEpI4rw0r6VT0MBuAEWhFUpHonLTRzLQfho48WPf4vBRkm0QFyErIP
//   me https://basemaps-api.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer/tile/3/0/05.pbf?token=AAPK1130609626e347eb8e75e5d63e911103YzjrPTQ29pez_5weSVVPOZ9CpO29fiSLxNb1EF7MRt8G63CWGQlir1-sN7yANS2S

const Map: React.FC<{ state: Record<string, boolean> }> = ({ state }) => {
  return (
    <div className={`${styles.map} ${styles.mapWrapper}`}>
      <MapContainer
        className={`${styles.map}`}
        center={[51.505, -0.09]}
        zoom={3}
        minZoom={3}
        maxZoom={14}
        worldCopyJump
      >
        <VectorBasemapLayer
          name="ArcGIS:Topographic"
          apiKey="AAPK1130609626e347eb8e75e5d63e911103YzjrPTQ29pez_5weSVVPOZ9CpO29fiSLxNb1EF7MRt8G63CWGQlir1-sN7yANS2S"
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
