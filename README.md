# Köppen–Geiger Climate Map

Back in College, I took a geography class and was enamoured by the Köppen–Geiger Climate Classification System. However, in all my years I have never found an interactive map that has every represented it well. Never until now that is!

## Commands

First Time Development:

```bash
yarn install

yarn data

yarn dev -- In subsequent runs, you just need to use this
```

Build:

```
yarn install

yarn build -- this runs the data script and a next.js build
```

## Data

Data is in GeoJSON format from here: https://staging.igrac.kartoza.com/layers/igrac:other_climate_2007_koppen_geiger. It is in the `raw-data.json` file. The `data.js` script is run by `yarn data` and will slice the data into separate JSON files. It also corrects an error where some instances of a `Dfa` climate should be `Dfd`. Theres no warmth in Siberia!
