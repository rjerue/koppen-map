import React from "react";
import { Card } from "./Card";
import styles from "./Legend.module.css";

export const Legend: React.FC = ({ children }) => {
  const [isOpen, isOpenSet] = React.useState(true);
  return (
    <Card className={styles.legend}>
      <button className={styles.toggle} onClick={() => isOpenSet(!isOpen)}>
        {isOpen ? "⬇️" : "⬆️"}
      </button>
      {isOpen ? (
        <div className={`${styles.legendContent}`}>
          <h2 className={styles.header}>Legend:</h2>{" "}
          <div className={`${styles.legendRow} ${styles.legendRowSm}`}>
            {children}
          </div>
        </div>
      ) : null}
    </Card>
  );
};
