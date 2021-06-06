import React from "react";
import { koppen } from "../koppen";
import { Card } from "./Card";
import styles from "./Legend.module.css";

export const Box: React.FC<{ color: string }> = ({ color }) => {
  return <div className={styles.box} style={{ backgroundColor: color }} />;
};

export const Legend = () => {
  const [isOpen, isOpenSet] = React.useState(true);
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
  console.log("b", byFirstLetter);
  return (
    <Card
      style={{
        bottom: -2,
        left: -2,
        right: 0,
        width: "100%",
        position: "fixed",
      }}
    >
      <button className={styles.toggle} onClick={() => isOpenSet(!isOpen)}>
        {isOpen ? "⬇️" : "⬆️"}
      </button>
      <div className={`row ${styles.legendRow}`}>
        {isOpen &&
          Object.entries(byFirstLetter).map(([letter, values]) => {
            return (
              <div key={letter} className={`column ${styles.itemCol}`}>
                {values.map(([code, { title, color }]) => {
                  return (
                    <div key={`${code}-legend`}>
                      <Box color={color} /> {code} - {title}
                    </div>
                  );
                })}
              </div>
            );
          })}
      </div>
    </Card>
  );
};
