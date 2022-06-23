import React from 'react';
import { Chart } from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
  let expenseLabels = [];
  let expenseAmt = [];

  const { expenseList } = useSelector((state) => state.expenseSlice);

  expenseList.map((expense) => {
    return expenseLabels.push(expense.name);
  });
  expenseList.map((expense) => {
    return expenseAmt.push(expense.amount);
  });

  const data = {
    labels: [...new Set(expenseLabels)],
    datasets: [
      {
        label: 'Expenses',
        data: [...new Set(expenseAmt)],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 105, 56)',
          'rgb(255, 35, 190)',
          'rgb(50, 15, 90)',
          'rgb(105, 15, 220)',
          'rgb(105, 105, 20)',
          'rgb(100, 15, 90)',
          'rgb(55, 125, 90)',
          'rgb(255, 205, 86)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  return <Bar data={data} />;
};

export default BarChart;
