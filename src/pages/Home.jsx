import React from 'react';
import PieChart from '../components/Charts/PieChart';
import './Home.css';
import { useSelector, useDispatch } from 'react-redux';

const Home = () => {
  const { totalAmount } = useSelector((state) => state.appStates);

  return (
    <div className='container'>
      {/* change currency using select button */}
      <select name='' id=''></select>

      <div className='overview'>
        <div className='acct-overview'>
          <div className='acct-overview-row1'>
            <p>Budget</p>
            <span>${totalAmount}</span>
          </div>
          <div className='acct-overview-row2'>
            <div className='acct-overview-row2-col'>
              <p>Balance</p>
              <span>$2,090.20</span>
            </div>
            <div className='divider'></div>
            <div className='acct-overview-row2-col'>
              <p>Spent</p>
              <span>$1,290</span>
            </div>
          </div>
        </div>
      </div>
      {/* progress bar */}
      <div className='expenses-level'>
        <p>Expenses so far</p>
        <div className='expenses-diff'>
          <span>$280.00</span>
          <span>${totalAmount}</span>
        </div>
        <div className='progress'>
          <div className='bar'></div>
        </div>
      </div>
      {/* expenses category */}
      <div className='expenses-overview'>
        <div className='expenses-overview-header'>
          <p>Recent</p>
          <p>View all</p>
        </div>
        <div className='expenses-chart'>
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default Home;
