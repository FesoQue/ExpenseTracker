import React from 'react';
import { motion } from 'framer-motion';
import { animatePages, transition } from '../animation/animate';
import { New, Stat } from '../components/icons/Icons';
import './History.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DoughnutChart from '../components/Charts/DoughnutChart';
import PieChart from '../components/Charts/PieChart';

const History = () => {
  const navigate = useNavigate();
  const { list } = useSelector((state) => state.budgetSlice);
  const { expenseList } = useSelector((state) => state.expenseSlice);
  console.log(expenseList);

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
                <p>Your Budgets History</p>
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
                      Your budget history appears here when you create your
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
                </div>
              )}
            </div>
          </div>
          {/* budget */}
          <div className='history expenses-history'>
            <div className='history-header'>
              <div>
                <Stat />
                <p>Your Expenses History</p>
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
                      Your expenses history appears here when you start
                      spending.
                    </p>
                    <button onClick={() => navigate('/expenses')}>
                      Start Spending
                    </button>
                  </div>
                </div>
              ) : (
                <div className='pie-chart-wrapper'>
                  <PieChart />{' '}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default History;
