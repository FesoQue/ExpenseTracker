import React, { useEffect } from 'react';
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
  Close,
} from '../components/icons/Icons';
import { useSelector, useDispatch } from 'react-redux';
import {
  setActiveCategory,
  setBudget,
  setList,
  removeBudget,
  handleTotal,
  handleEditItem,
  setIsEditing,
  setEditId,
  clearList,
} from '../states/budget-slice';
import { Food, Academics } from '../components/icons/Icons';
import { motion } from 'framer-motion';
import { animatePages, transition } from '../animation/animate';

let disabled = false;

const Budgets = () => {
  const dispatch = useDispatch();

  const { currentCategory, budget, list, isEditing, editID } = useSelector(
    (state) => state.budgetSlice
  );

  // remove duplicate budgets from budget list
  var resArr = [];
  if (list) {
    list.filter((item) => {
      var i = resArr.findIndex((x) => x.name === item.name);
      if (i <= -1) {
        resArr.push(item);
      }
      return null;
    });
  }

  const handleCreateBudget = () => {
    if (isEditing) {
      const updatedList = list.map((item) => {
        if (item.id === editID) {
          return { ...item, name: currentCategory, amount: budget };
        }
        return item;
      });
      dispatch(setList(updatedList));
      dispatch(setActiveCategory(''));
      dispatch(setBudget(''));
      dispatch(setIsEditing(false));
      dispatch(setEditId(null));
    } else {
      dispatch(
        setList([
          ...list,
          {
            id: new Date().getTime().toString(),
            name: currentCategory,
            amount: budget,
          },
        ])
      );
      dispatch(setActiveCategory(''));
      dispatch(setBudget(''));
    }
  };

  const handleCancelBudget = () => {
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

  useEffect(() => {
    dispatch(handleTotal());

    localStorage.setItem('budgetList', list);
  }, [list]);

  return (
    <motion.div
      initial='out'
      animate='in'
      exit='out'
      variants={animatePages}
      transition={transition}
      className='budget-section'
    >
      <div className='container'>
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
                        ? '3px solid #ff7461'
                        : '3px solid transparent',
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
            <label htmlFor='budget'>Enter Amount</label>
            <div className='form-group'>
              <span>$</span>
              <input
                type='number'
                placeholder='enter budget'
                name='budget-amount'
                id='budget'
                value={budget}
                onChange={(e) => dispatch(setBudget(Number(e.target.value)))}
              />
            </div>
          </form>
          <div className='button-container'>
            <button
              type='button'
              className='cancel'
              onClick={handleCancelBudget}
            >
              <Close />
            </button>
            <button
              type='button'
              className='add-budget-btn'
              onClick={handleCreateBudget}
              disabled={disabled}
            >
              CREATE
            </button>
          </div>
        </div>
        <div className='budget-list-wrapper'>
          <div className='budget-list-header'>
            <h4>({resArr.length}) Budgets</h4>
            {resArr.length > 0 && (
              <button onClick={() => dispatch(clearList())}>Clear All</button>
            )}
          </div>
          <div className='budget-list'>
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
                    <button
                      className='edit'
                      onClick={() => dispatch(handleEditItem(item.id))}
                    >
                      <Edit />
                    </button>
                    <button
                      className='thrash'
                      onClick={() => dispatch(removeBudget(item.id))}
                    >
                      <Delete />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Budgets;
