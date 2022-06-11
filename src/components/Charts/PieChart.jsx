import React from 'react';
import { Chart } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

const PieChart = () => {
  const data = {
    labels: ['Education', 'Travel', 'Health', 'Groceries'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default PieChart;