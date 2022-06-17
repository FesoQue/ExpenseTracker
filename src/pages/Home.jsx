import React, { useEffect, useRef } from 'react';
import PieChart from '../components/Charts/PieChart';
import './Home.css';
import { useSelector, useDispatch } from 'react-redux';
import { Currency, Card, New } from '../components/icons/Icons';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const progressBar = useRef(null);
  const navigate = useNavigate();

  let progressPercent = 0;

  const { totalAmount, list } = useSelector((state) => state.budgetSlice);
  const { totalExpense } = useSelector((state) => state.expenseSlice);

  if (totalExpense > 0 && totalAmount > 0) {
    progressPercent = (totalExpense / totalAmount) * 100;
  } else if (totalAmount > 0) {
    progressPercent = 0;
  } else if (totalExpense > 0) {
    progressPercent = 100;
  } else {
    progressPercent = 0;
  }

  const bgc = [
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
  ];

  const balance = totalAmount - totalExpense;
  const negativeBalance = -(totalAmount - totalExpense);

  useEffect(() => {
    progressBar.current.style.width = `${progressPercent}%`;
  }, [progressPercent]);

  return (
    <div className='container'>
      <div className='overview'>
        <div className='acct-overview'>
          <div className='acct-overview-row1'>
            <p>Budget</p>
            <span>${totalAmount}</span>
          </div>
          <div className='acct-overview-row2'>
            <div className='acct-overview-row2-col col-card1'>
              <div className='svg-wrap'>
                <Currency />
              </div>
              <p>
                <span>Current</span> Balance
              </p>
              <span>
                {balance < 0 ? `-$${negativeBalance}` : `$${balance}`}
              </span>
            </div>
            <div className='divider'></div>
            <div className='acct-overview-row2-col col-card2'>
              <div className='svg-wrap2'>
                <Card />
              </div>
              <p>
                <span>Amount</span> Spent
              </p>
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
          <div className='bar' ref={progressBar}></div>
        </div>
      </div>
      {/* expenses category */}
      <div className='chart-overview'>
        <div className='chart-overview-header'>
          <h2>Activity</h2>
          <div>
            <p>Budgets</p>
            <span>{list.length} total</span>
          </div>
        </div>
        {list.length === 0 ? (
          <div className='create-budget-card'>
            <div className='cb-icon-wrap'>
              <span>
                <New />
              </span>
            </div>
            <p>
              Your chart/activity appears here when you create your personal
              budget{' '}
            </p>
            <button onClick={() => navigate('/budgets')}>
              Start budgeting
            </button>
          </div>
        ) : (
          <div className='d-flex'>
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
                          backgroundColor: bgc.slice(0, list.length)[index],
                        }}
                      ></span>
                      <p>{item.name}</p>
                    </div>
                    <div className='budget-summary-col2'>
                      <p>{item.amount} USD - </p>
                      <p
                        style={{
                          color: bgc.slice(0, list.length)[index],
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
        )}
      </div>
    </div>
  );
};

export default Home;
