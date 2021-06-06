const fs = require("fs/promises");
const raw = require("./raw-data.json");

function makeName(e) {
  if (e === "Dfa Cold-Withouth_dry_season-Very_Cold_Winter") {
    return "Dfd";
  }
  const code = e.split(" ")[0];
  return code;
}

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

function jsonStringWithFixDfaDfd(code, json) {
  const str = JSON.stringify(json);
  if (code === "Dfd") {
    return str.replace(/Dfa/g, "Dfd");
  }
  return str;
}

function makeGeoJson(name, features) {
  const gj = {
    type: "FeatureCollection",
    features,
    totalFeatures: features.length,
    numberMatched: features.length,
    numberReturned: features.length,
  };
  return fs.writeFile(`./data/${name}.json`, jsonStringWithFixDfaDfd(name, gj));
}

async function main() {
  try {
    await fs.stat("./data");
  } catch (_) {
    await fs.mkdir("./data");
  }

  return Promise.all(
    Object.entries(propertiesSet).map(([name, features]) =>
      makeGeoJson(name, features)
    )
  );
}

main();
