import type { NextPage } from "next";
import { useEffect, useState } from "react";
import useSWR, { Key, Fetcher } from "swr";
import dynamic from "next/dynamic";
const ChartComponent = dynamic(() => import("@/components/chart/Chart"), {
  ssr: false,
});

import styles from "../styles/Home.module.css";

import Header from "@/components/header/Header";
import SearchBar from "@/components/search/SearchBar";
import Card from "@/components/card/Card";

const data = {
  degree: 26,
  datetime: "28 Jan",
  weather: {
    description: "clear sky",
  },
};

const fetcher: Fetcher = (url: string) => fetch(url).then((r) => r.json());

const Home: NextPage = () => {
  const [search, setSearch] = useState("Istanbul");
  const [selected, setSelected] = useState(null);

  const { data, error } = useSWR(
    `https://api.weatherbit.io/v2.0/forecast/daily?city=${search}&key=${process.env.NEXT_PUBLIC_WEATHERBIT_API_KEY}`,
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const onSearch = (searchTerm: string) => {
    setSearch(searchTerm);
  };

  console.log(selected);
  console.log(data);

  return (
    <div>
      <Header />

      <div className={styles.main}>
        <SearchBar onSearch={onSearch} />
        <div className={styles.infoContainer}>
          <div>
            <ChartComponent
              title={`Average High & Low Temperatures for ${search}`}
              data={data.data}
              onDateSelect={(date: string) => {
                const item = data.data.find(
                  (item: any) => item.datetime === date
                );
                setSelected(item);
              }}
            />
          </div>
          <div>
            <Card selected={selected} city={data.city_name} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
