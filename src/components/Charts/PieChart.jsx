import React from 'react';
import { Chart } from 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const PieChart = () => {
  let expenseLabels = [];
  let expenseAmt = [];

  const { expenseList } = useSelector((state) => state.budgetSlice);

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
        label: 'My First Dataset',
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

  return <Pie data={data} />;
};

export default PieChart;
