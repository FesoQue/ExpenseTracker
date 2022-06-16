import React from 'react';
import PieChart from '../components/Charts/PieChart';
import './Home.css';
import { useSelector, useDispatch } from 'react-redux';

let progressPercent = 100;
const Home = () => {
  const { totalAmount, list } = useSelector((state) => state.budgetSlice);
  const { totalExpense } = useSelector((state) => state.expenseSlice);

  if (totalAmount > 0 && totalAmount > 0) {
    progressPercent = (totalExpense / totalAmount) * 100;
  } else {
    progressPercent = 100;
  }
  const bgc = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 205, 86)',
    'rgb(255, 105, 56)',
    'rgb(255, 35, 190)',
    'rgb(105, 15, 220)',
    'rgb(105, 105, 20)',
    'rgb(55, 125, 90)',
    'rgb(50, 15, 90)',
    'rgb(100, 15, 90)',
  ];
  const balance = totalAmount - totalExpense;
  const negativeBalance = -(totalAmount - totalExpense);

  return (
    <div className='container'>
      <div className='overview'>
        <div className='acct-overview'>
          <div className='acct-overview-row1'>
            <p>Budget</p>
            <span>${totalAmount}</span>
          </div>
          <div className='acct-overview-row2'>
            <div className='acct-overview-row2-col'>
              <p>Balance</p>
              <span>
                {balance < 0 ? `-$${negativeBalance}` : `$${balance}`}
              </span>
            </div>
            <div className='divider'></div>
            <div className='acct-overview-row2-col'>
              <p>Spent</p>
              <span>${totalExpense}</span>
            </div>
          </div>
        </div>
      </div>
      {/* progress bar */}
      <div className='expenses-level'>
        <p>Expenses so far</p>
        <div className='expenses-diff'>
          <span>${totalExpense}</span>
          <span>${totalAmount}</span>
        </div>
        <div className='progress'>
          <div className='bar' style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>
      {/* expenses category */}
      <div className='chart-overview'>
        <div className='chart-overview-header'>
          <p>Budgets</p>
          <span>{list.length} total</span>
        </div>
        <div className='chart-wrapper'>
          <PieChart />
        </div>
        <div className='budget-summary'>
          {list.map((item, index) => {
            return (
              <div className='budget-summary-item' key={item.id}>
                <div className='budget-summary-col1'>
                  <span
                    className='color-square'
                    style={{
                      backgroundColor: bgc[index],
                    }}
                  ></span>
                  <p>{item.name}</p>
                </div>
                <div className='budget-summary-col2'>
                  <p>{item.amount} USD - </p>
                  <p
                    style={{
                      color: bgc[index],
                      paddingLeft: '.2rem',
                    }}
                  >
                    {((item.amount / totalAmount) * 100).toFixed(2)}%{' '}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
