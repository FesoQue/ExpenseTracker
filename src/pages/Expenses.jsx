import React from 'react';
import { categories } from '../category';
import { Check, Close } from '../components/icons/Icons';

const Expenses = () => {
  return (
    <div className='budget-section'>
      <div className='heading'>
        <h1>Create Your Expenses</h1>
      </div>
      <div className='categories'>
        <div className='categories-heading'>
          <h2>Choose Category</h2>
        </div>
        <ul className='categories-list'>
          {categories.map((category) => {
            return (
              <li key={category.id} className='category-item active-category'>
                <div className='icon-wrap'>{category.icon}</div>
                <p>{category.category}</p>
                <span
                  className='check'
                  // style={{
                  //   opacity: currentCategory === category.category ? 1 : 0,
                  // }}
                >
                  <Check />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      {/* enter amount */}
      <div className='budget-amt'>
        <form autoComplete='off'>
          <label htmlFor='budget'>Enter Amount</label>
          <div className='form-group'>
            <span>$</span>
            <input
              type='number'
              placeholder='enter amount'
              name='budget-amount'
              id='budget'
              value={''}
              // onChange={(e) => dispatch(setBudget(Number(e.target.value)))}
            />
          </div>
        </form>
        <div className='button-container'>
          <button type='button' className='cancel'>
            <Close />
          </button>
          <button type='button' className='add-budget-btn'>
            CREATE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
