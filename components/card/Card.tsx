import React from "react";
import { format } from "date-fns";
import styles from "./Card.module.css";

type CardProps = {
  city: string;
  selected: {
    temp: number;
    datetime: string;
    weather: {
      icon: string;
      description: string;
    };
  };
};

const Card = ({ selected, city }: CardProps) => {
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
        <img
          src={`/icons/${selected?.weather?.icon}.png`}
          alt="icon"
          className={styles.card__icon}
        />
        <p className={styles.card__state}>{selected?.weather?.description}</p>
      </div>
    </div>
  );
};

export default Card;
