import type { NextPage } from "next";
import { useEffect, useState } from "react";
import useSWR, { Key, Fetcher } from "swr";
import dynamic from "next/dynamic";
import { css } from "@emotion/react";
import ScaleLoader from "react-spinners/ScaleLoader";

import SearchBar from "@/components/search/SearchBar";
import Card from "@/components/card/Card";
const ChartComponent = dynamic(() => import("@/components/chart/Chart"), {
  ssr: false,
});

import styles from "../styles/Home.module.css";

const fetcher: Fetcher = (url: string) => fetch(url).then((r) => r.json());

const override = css`
  display: block;
  margin: 0 auto;
`;

const Home: NextPage = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [selected, setSelected] = useState<any>(null);

  const { data, error } = useSWR(
    mounted
      ? `https://api.weatherbit.io/v2.0/forecast/daily?city=${search}&key=${process.env.NEXT_PUBLIC_WEATHERBIT_API_KEY}`
      : null,
    fetcher
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (data !== undefined && search !== "") {
      setSelected((data as any).data[0]);
    }
  }, [search, data]);

  const onSearch = (searchTerm: string) => {
    setSearch(searchTerm);
  };

  if (error) {
    return (
      <div className={styles.main}>
        <SearchBar onSearch={onSearch} />

        <div className={styles.noCityContainer}>
          <h2 className={`${styles.noCityTitle} ${styles.error}`}>
            City doesn't exist!
          </h2>
          <p className={styles.noCityText}>
            Type a valid city name to get weekly forecast data
          </p>
        </div>
      </div>
    );
  }

  if (!data)
    return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <ScaleLoader
          color={"#545454"}
          loading
          css={override}
          width={20}
          height={50}
        />
      </div>
    );

  return (
    <div className={styles.main}>
      <SearchBar onSearch={onSearch} />
      {search === "" ? (
        <div className={styles.noCityContainer}>
          <h2 className={styles.noCityTitle}>No city is selected!</h2>
          <p className={styles.noCityText}>
            Type any city name to get weekly forecast data
          </p>
        </div>
      ) : (
        <div className={styles.infoContainer}>
          <div>
            <ChartComponent
              title={`Average High & Low Temperatures for ${
                (data as any).city_name
              }`}
              data={(data as any).data}
              onDateSelect={(date: string) => {
                const item = (data as any).data.find(
                  (item: any) => item.datetime === date
                );
                setSelected(item);
              }}
            />
          </div>
          <div>
            <Card selected={selected} city={(data as any).city_name} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
