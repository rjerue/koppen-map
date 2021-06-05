const fs = require("fs/promises");
const raw = require("./raw-data.json");
const makeName = (e) => e.split(" ")[0];

function duplicate360(feature) {
  const coordinates = feature.geometry.coordinates[0][0];
  const added = coordinates.map(([l, r]) => [l + 360, r]);
  const subtracted = coordinates.map(([l, r]) => [l - 360, r]);
  return {
    ...feature,
    geometry: {
      ...feature.geometry,
      coordinates: [[coordinates], [added], [subtracted]],
    },
  };
}

const propertiesSet = raw.features.reduce((set, e, i) => {
  const climate = makeName(e.properties.climate);
  const others = set[climate] || [];
  return { ...set, [climate]: [...others, duplicate360(e)] };
}, {});

function makeGeoJson(name, features) {
  const climate = name;
  const gj = {
    type: "FeatureCollection",
    features,
    totalFeatures: features.length,
    numberMatched: features.length,
    numberReturned: features.length,
  };
  return fs.writeFile(`./data/${climate}.json`, JSON.stringify(gj));
}

Object.entries(propertiesSet).map(([name, features]) =>
  makeGeoJson(name, features)
);
fs.writeFile(
  "./data.json",
  JSON.stringify({
    climates: Object.keys(propertiesSet),
  })
);
