import React from "react";
import { format } from "date-fns";
import styles from "./Card.module.css";

type CardProps = {
  city: string;
  selected: any;
};

const Card = ({ selected, city }: CardProps) => {
  if (!selected) return null;

  const date = selected && format(new Date(selected.datetime), "dd MMM");
  return (
    <div className={styles.card}>
      <div className={styles.card__temperature}>
        <span>{selected?.temp}&#8451;</span>
      </div>
      <div className={styles.card__col}>
        <div className={styles.card__city}>
          <span>{city}</span>
        </div>
        <div className={styles.card__date}>
          <span>{date}</span>
        </div>
      </div>
      <div className={styles.card__row}>
        <div className={styles.card__state}>
          <span>{selected?.weather?.description}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
