import React from "react";
import dynamic from "next/dynamic";
import { koppen } from "../koppen";
import { Legend } from "../components/Legend";
import styles from "../Home.module.css";
import { Card } from "../components/Card";

const Map = dynamic(() => import("../components/Map"), { ssr: false });

const sorted = Object.entries(koppen).sort(([l], [r]) => {
  if (l < r) {
    return -1;
  } else if (l > r) {
    return 1;
  } else {
    return 0;
  }
});
const byFirstLetter = sorted.reduce((accum, e) => {
  const letter = e[0].charAt(0);
  const others = accum[letter] || [];
  return {
    ...accum,
    [letter]: [...others, e],
  };
}, {} as Record<string, typeof sorted>);

const Box: React.FC<{ color: string }> = ({ color }) => {
  return <div className={styles.box} style={{ backgroundColor: color }} />;
};

function defaultState(defaultValue = true) {
  return Object.keys(koppen).reduce((accum, key) => {
    return { ...accum, [key]: defaultValue };
  }, {} as Record<string, boolean>);
}

const IndexPage = () => {
  const [state, stateSet] = React.useState(defaultState());

  return (
    <div>
      <Card className={styles.card}>
        <h1 className={styles.header}>Köppen–Geiger Climate Classification</h1>
        <div>
          Made with ❤️ by <a href="https://jerue.org/">Ryan Jerue</a>
        </div>
      </Card>
      <Map state={state} />
      <Legend>
        {Object.entries(byFirstLetter).map(([letter, values]) => {
          return (
            <div key={letter} className={`column ${styles.itemCol}`}>
              {values.map(([code, { title, color }]) => {
                const active = state[code];
                return (
                  <div
                    onClick={() => stateSet({ ...state, [code]: !active })}
                    key={`${code}-legend`}
                    className={`${styles.item} ${styles.itemSm}`}
                  >
                    <Box color={active ? color : "gray"} /> {code} - {title}
                  </div>
                );
              })}
            </div>
          );
        })}
        <div className={`column ${styles.resetClear}`}>
          <button onClick={() => stateSet(defaultState())}>Reset</button>
          <button onClick={() => stateSet(defaultState(false))}>Clear</button>
        </div>
      </Legend>
    </div>
  );
};

export default IndexPage;
