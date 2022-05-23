import React, { useRef, MouseEvent } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  TimeScale,
  Legend,
  InteractionItem,
} from "chart.js";
import type { ChartData, ChartOptions, ChartDataset } from "chart.js";

import { Line, getElementAtEvent } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import styles from "./Chart.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  TimeScale,
  Legend
);

export const options: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      align: "end",
      labels: {
        usePointStyle: true,
      },
    },
  },
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  scales: {
    x: {
      type: "time",
      time: {
        unit: "day",
        parser: "yyyy-MM-dd",
        tooltipFormat: "dd MMM yyyy",
        displayFormats: {
          day: "dd MMM",
        },
      },
    },
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
      title: {
        color: "gray",
        display: true,
        text: "Temperature",
      },
    },
  },
};

type ChartProps = {
  title: string;
  data: any[];
  onDateSelect: (date: string) => void;
};

const Chart = ({ title, data, onDateSelect }: ChartProps) => {
  const chartRef = useRef<any>(null);

  const labels = data.map((item) => item.datetime);

  const DATASETS = [
    {
      label: "High",
      data: data.map((item: any) => item.high_temp),
      backgroundColor: "rgb(0, 162, 235)",
      borderColor: "rgb(0, 162, 235)",
      yAxisID: "y",
      pointStyle: "round",
    },

    {
      label: "Low",
      data: data.map((item: any) => item.low_temp),
      backgroundColor: "rgb(0, 0, 0)",
      borderColor: "rgb(0, 0, 0)",
      yAxisID: "y",
      pointStyle: "round",
    },
  ];

  const printElementAtEvent = (element: InteractionItem[]) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];

    onDateSelect(labels[index]);
  };

  const onClick = (event: MouseEvent<HTMLCanvasElement>) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    printElementAtEvent(getElementAtEvent(chart, event));
  };

  return (
    <div className={styles.chartBox}>
      <Line
        ref={chartRef}
        options={{
          ...options,
          plugins: {
            ...options.plugins,
            title: {
              align: "center",
              display: true,
              text: title,
            },
          },
        }}
        data={{
          labels: labels,
          datasets: DATASETS,
        }}
        plugins={[TimeScale]}
        onClick={onClick}
      />
    </div>
  );
};

export default Chart;
