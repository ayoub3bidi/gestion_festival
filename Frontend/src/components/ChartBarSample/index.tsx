import React from 'react';
import { Chart, BarElement, PointElement, BarController, LinearScale, CategoryScale, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';

Chart.register(BarElement, PointElement, BarController, LinearScale, CategoryScale, Tooltip);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      display: true,
    },
    x: {
      display: true,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const ChartLineSample = ({ data }) => {
  return <Bar options={options} data={data} className="h-96" />;
};

export default ChartLineSample;