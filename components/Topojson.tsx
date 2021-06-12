import React, { useRef, useEffect } from "react";
import { GeoJSON, GeoJSONProps } from "react-leaflet";
import { feature } from "topojson";

interface TopoJSONProps extends GeoJSONProps {
  data: any;
}

export const TopoJSON: React.FC<TopoJSONProps> = (props) => {
  const layerRef = useRef(null);
  const { data, ...otherProps } = props;

  function addData(layer, jsonData) {
    if (jsonData.type === "Topology") {
      for (let key in jsonData.objects) {
        let geojson = feature(jsonData, jsonData.objects[key]);
        layer.addData(geojson);
      }
    } else {
      layer.addData(jsonData);
    }
  }

  useEffect(() => {
    const layer = layerRef.current;
    addData(layer, props.data);
  }, [props.data]);

  return <GeoJSON data={undefined as any} ref={layerRef} {...otherProps} />;
};
