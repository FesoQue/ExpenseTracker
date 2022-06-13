import React from 'react';
import './Budgets.css';
import { categories } from '../category';
import {
  Check,
  Cloth,
  Electric,
  Health,
  Internet,
  Rent,
  Shopping,
  Transport,
  Travel,
  Delete,
  Edit,
} from '../components/icons/Icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  setActiveCategory,
  setBudget,
  setList,
  removeBudget,
} from '../states/states-slice';
import { Food, Academics } from '../components/icons/Icons';

let disabled = false;

const Budgets = () => {
  const dispatch = useDispatch();

  const { currentCategory, budget, list } = useSelector(
    (state) => state.appStates
  );

  var resArr = [];
  list.filter((item) => {
    var i = resArr.findIndex((x) => x.name === item.name);
    if (i <= -1) {
      resArr.push(item);
    }
    return null;
  });

  const handleCreateBudget = () => {
    dispatch(setList({ name: currentCategory, amount: budget }));
    dispatch(setActiveCategory(''));
    dispatch(setBudget(''));
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

  if (
    (!currentCategory && !budget) ||
    (currentCategory && !budget) ||
    (!currentCategory && budget) ||
    (currentCategory && Number(budget) <= 0)
  ) {
    disabled = true;
  } else {
    disabled = false;
  }

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
              <li
                key={category.id}
                className='category-item active-category'
                onClick={() => {
                  dispatch(setActiveCategory(category.category));
                }}
                style={{
                  border:
                    currentCategory === category.category
                      ? '2px solid #ff7461'
                      : '2px solid transparent',
                }}
              >
                <div className='icon-wrap'>{category.icon}</div>
                <p>{category.category}</p>
                <span
                  className='check'
                  style={{
                    opacity: currentCategory === category.category ? 1 : 0,
                  }}
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
          <div className='form-group'>
            <label htmlFor='budget'>Enter Amount</label>
            <input
              type='number'
              placeholder='$'
              name='budget-amount'
              id='budget'
              value={budget}
              onChange={(e) => dispatch(setBudget(e.target.value))}
            />
          </div>
        </form>
        <button
          className='add-budget-btn'
          onClick={handleCreateBudget}
          disabled={disabled}
        >
          CREATE
        </button>
      </div>
      <div className='budget-list'>
        <h4>({resArr.length}) Budgets</h4>
        {resArr.map((item) => {
          return (
            <div key={item.id} className='budget'>
              <div className='budget-cart'>
                <span>
                  <CategoryIcon name={item.name} />
                </span>
                <p>{item.name}</p>
              </div>
              <p className='price'>${item.amount}</p>
              <div className='budget-actions'>
                <span className='edit'>
                  <Edit />
                </span>
                <span
                  className='thrash'
                  onClick={() => dispatch(removeBudget(item.id))}
                >
                  <Delete />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Budgets;
