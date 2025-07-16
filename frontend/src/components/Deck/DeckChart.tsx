import React from "react";
import { Chart } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BubbleController,
  ScatterController,
  RadarController,
  PolarAreaController,
  Title,
  Tooltip,
  Legend,
  registerables,
} from "chart.js";

ChartJS.register(...registerables);

type GenericChartProps = {
  type: ChartType;
  data: any;
  options?: any;
};

export const DeckChart: React.FC<GenericChartProps> = ({
  type,
  data,
  options,
}) => {
  return <Chart type={type} data={data} options={options} />;
};
