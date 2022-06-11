import React from 'react';
import './Budgets.css';
import { categories } from '../category';
import { Check } from '../components/icons/Icons';

const Budgets = () => {
  return (
    <div className='budget-section'>
      <div className='heading'>
        <h1>Create Your Budget</h1>
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
                <span className='check'>
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
          <div className='form-group'>
            <label htmlFor='budget'>Enter Amount</label>
            <input
              type='number'
              placeholder='$'
              name='budget-amount'
              id='budget'
            />
          </div>
        </form>
        <button className='add-budget-btn'>CREATE</button>
      </div>
    </div>
  );
};

export default Budgets;
