import React from 'react';
import { Chart } from 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const DoughnutChart = () => {
  let expenseLabels = [];
  let expenseAmt = [];

  const { list } = useSelector((state) => state.budgetSlice);

  list.map((expense) => {
    return expenseLabels.push(expense.name);
  });
  list.map((expense) => {
    return expenseAmt.push(expense.amount);
  });

  const data = {
    labels: [...new Set(expenseLabels)],
    datasets: [
      {
        label: 'Budgets',
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

  return <Doughnut data={data} />;
};

export default DoughnutChart;
