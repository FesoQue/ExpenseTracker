import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { animatePages, transition } from '../animation/animate';
import {
  Academics,
  Cloth,
  Electric,
  Food,
  Health,
  Internet,
  New,
  Rent,
  Shopping,
  Stat,
  Transport,
  Travel,
} from '../components/icons/Icons';
import './History.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DoughnutChart from '../components/Charts/DoughnutChart';
import BarChart from '../components/Charts/BarChart';
import Moment from 'react-moment';

const History = () => {
  const navigate = useNavigate();
  const { list } = useSelector((state) => state.budgetSlice);
  const { expenseList } = useSelector((state) => state.expenseSlice);

  // remove duplicate budgets from budget list
  let budgetList = [];
  if (list) {
    list.filter((item) => {
      var i = budgetList.findIndex((x) => x.name === item.name);
      if (i <= -1) {
        budgetList.push(item);
      }
      return null;
    });
  }
  let expensesList = [];
  if (expenseList) {
    expenseList.filter((item) => {
      var i = expensesList.findIndex((x) => x.name === item.name);
      if (i <= -1) {
        expensesList.push(item);
      }
      return null;
    });
  }

  const Duration = ({ time }) => {
    return <Moment date={new Date(time)} format='DD MMM hh:mm' />;
  };

  const CategoryIcon = ({ name }) => {
    return (
      <>
        {name === 'Food' && <Food />}
        {name === 'Education' && <Academics />}
        {name === 'Cloth' && <Cloth />}
        {name === 'Travel' && <Travel />}
        {name === 'Health' && <Health />}
        {name === 'Transport' && <Transport />}
        {name === 'Internet' && <Internet />}
        {name === 'Shopping' && <Shopping />}
        {name === 'Rent' && <Rent />}
        {name === 'Electricity' && <Electric />}
      </>
    );
  };
  const backgroundColor = [
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial='out'
      animate='in'
      exit='out'
      variants={animatePages}
      transition={transition}
      className='history-section'
    >
      <div className='container'>
        <div className='history-wrapper'>
          {/* budget */}
          <div className='history budget-history'>
            <div className='history-header'>
              <div>
                <Stat />
                <p>Your Budget History/Stat</p>
              </div>
            </div>
            <div className='budget-content history-content'>
              {list.length === 0 ? (
                <div className='d-center'>
                  <div className='create-budget-card'>
                    <div className='cb-icon-wrap'>
                      <span>
                        <New />
                      </span>
                    </div>
                    <p>
                      Your budget stats appears here when you create your
                      budget.{' '}
                    </p>
                    <button onClick={() => navigate('/budgets')}>
                      Start budgeting
                    </button>
                  </div>
                </div>
              ) : (
                <div className=''>
                  <div className='history-chart chart-wrapper'>
                    <DoughnutChart />
                  </div>
                  <div className='history-budget-list'>
                    {budgetList.map((list, index) => {
                      return (
                        <div className='history-budget-list-item' key={list.id}>
                          <div className='hbl-col1'>
                            <span>
                              <CategoryIcon name={list.name} />
                            </span>
                            <div className=''>
                              <p>{list.name}</p>
                              <p>
                                <Duration time={Number(list.id)} />
                              </p>
                            </div>
                          </div>
                          <div className='hbl-col2'>
                            <p
                              style={{
                                color: backgroundColor[index],
                              }}
                            >
                              {list.amount}
                            </p>
                            <p>USD</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* budget */}
          <div className='history expenses-history'>
            <div className='history-header'>
              <div>
                <Stat />
                <p>Your Expenses History/Stat</p>
              </div>
            </div>
            <div className='expenses-content history-content'>
              {expenseList.length === 0 ? (
                <div className='d-center'>
                  <div className='create-budget-card'>
                    <div className='cb-icon-wrap'>
                      <span>
                        <New />
                      </span>
                    </div>
                    <p>
                      Your expenses stats appears here when you start spending.
                    </p>
                    <button onClick={() => navigate('/expenses')}>
                      Start Spending
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className='pie-chart-wrapper'>
                    <BarChart />{' '}
                  </div>
                  <div className='history-budget-list'>
                    {expensesList.map((list, index) => {
                      return (
                        <div
                          className='history-expense-list-item history-budget-list-item'
                          key={list.id}
                        >
                          <div className='hbl-col1'>
                            <span>
                              <CategoryIcon name={list.name} />
                            </span>
                            <div className=''>
                              <p>{list.name}</p>
                              <p>
                                <Duration time={Number(list.id)} />
                              </p>
                            </div>
                          </div>
                          <div className='hbl-col2'>
                            <p
                              style={{
                                color: backgroundColor[index],
                              }}
                            >
                              -{list.amount}
                            </p>
                            <p>USD</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default History;
