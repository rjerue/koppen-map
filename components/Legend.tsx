import React from "react";
import { koppen } from "../koppen";
import styles from "./Legend.module.css";

export const Box: React.FC<{ color: string }> = ({ color }) => {
  return <div className={styles.box} style={{ backgroundColor: color }} />;
};

export const Legend = () => {
  return (
    <div>
      {Object.entries(koppen).map(([code, { title, color }]) => {
        return (
          <div key={`${code}-legend`}>
            <Box color={color} /> {code} - {title}
          </div>
        );
      })}
    </div>
  );
};
