import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className='container'>
      {/* change currency using select button */}
      <select name='' id=''></select>

      <div className='overview'>
        <div className='acct-overview'>
          <div className='acct-overview-row1'>
            <p>Budget</p>
            <span>$2,090.20</span>
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
        <div>
          <span>$280.00</span>
          <span>$1,290</span>
        </div>
        <div className='progress'>
          <div className='bar'></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
