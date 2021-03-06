import React, { useRef, useEffect } from 'react';
import { categories } from '../category';
import {
  Academics,
  Check,
  Close,
  Cloth,
  Delete,
  Edit,
  Electric,
  Food,
  Health,
  Internet,
  Rent,
  Shopping,
  Transport,
  Travel,
} from '../components/icons/Icons';
import './Expenses.css';
import {
  setExpenseCategory,
  setExpense,
  removeExpense,
  setIsEditingExpense,
  setExpenseEditId,
  setExpenseList,
  handleEditExpenseItem,
  handleExpenseTotal,
  clearExpensesList,
} from '../states/expense-slice';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { animatePages, transition } from '../animation/animate';

let disabled = false;

const Expenses = () => {
  const dispatch = useDispatch();
  const alertRef = useRef(null);

  const {
    expenseCategory,
    expense,
    expenseList,
    expenseEditID,
    isEditingExpense,
  } = useSelector((state) => state.expenseSlice);

  const { list } = useSelector((state) => state.budgetSlice);

  // remove duplicate budgets from expense list
  var resArr = [];
  expenseList.filter((item) => {
    var i = resArr.findIndex((x) => x.name === item.name);
    if (i <= -1) {
      resArr.push(item);
    }
    return null;
  });

  const checkIsBudget = list.some((item) => {
    return item.name === expenseCategory;
  });

  const handleCreateExpenses = () => {
    if (isEditingExpense) {
      const updatedList = expenseList.map((item) => {
        if (item.id === expenseEditID) {
          return { ...item, name: expenseCategory, amount: expense };
        }
        return item;
      });
      dispatch(setExpenseList(updatedList));
      dispatch(setExpenseCategory(''));
      dispatch(setExpense(''));
      dispatch(setIsEditingExpense(false));
      dispatch(setExpenseEditId(null));
    } else {
      dispatch(
        setExpenseList([
          ...expenseList,
          {
            id: new Date().getTime().toString(),
            name: expenseCategory,
            amount: expense,
          },
        ])
      );
      dispatch(setExpenseCategory(''));
      dispatch(setExpense(''));
    }
  };

  const handleCancelExpenses = () => {
    dispatch(setExpenseCategory(''));
    dispatch(setExpense(''));
  };

  if (
    (!expenseCategory && !expense) ||
    (expenseCategory && !expense) ||
    (!expenseCategory && expense) ||
    (expenseCategory && Number(expense) <= 0) ||
    (expenseCategory && !checkIsBudget)
  ) {
    disabled = true;
  } else {
    disabled = false;
  }

  if (expenseCategory && checkIsBudget && expense) {
    disabled = false;
  }

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

  useEffect(() => {
    dispatch(setExpenseCategory(''));
    dispatch(setExpense(''));
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(handleExpenseTotal());
    localStorage.setItem('expenses', JSON.stringify(expenseList));
  }, [expenseList]);

  useEffect(() => {
    let timeoutId;
    alertRef.current.style.display = 'none';
    if (expenseCategory && !checkIsBudget) {
      alertRef.current.style.display = 'flex';
      timeoutId = setTimeout(() => {
        alertRef.current.style.display = 'none';
        dispatch(setExpenseCategory(''));
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [expenseCategory]);

  return (
    <motion.div
      initial='out'
      animate='in'
      exit='out'
      variants={animatePages}
      transition={transition}
      className='expense-section'
    >
      <div className='container'>
        <div className='heading'>
          <h1>Create Your Expenses</h1>
        </div>
        <div className='categories'>
          <div className='categories-heading'>
            <h2>Choose a Category</h2>
          </div>
          <ul className='categories-list'>
            {categories.map((category) => {
              return (
                <li
                  key={category.id}
                  className='category-item expenses-item active-category'
                  onClick={() => {
                    dispatch(setExpenseCategory(category.category));
                  }}
                  style={{
                    border:
                      expenseCategory === category.category
                        ? '3px solid #6578f7'
                        : '3px solid transparent',
                  }}
                >
                  <div className='icon-wrap expenses-icon-wrap'>
                    {category.icon}
                  </div>
                  <p>{category.category}</p>
                  <span
                    className='expenses-check check'
                    style={{
                      opacity: expenseCategory === category.category ? 1 : 0,
                      background: '#7788f4',
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
            <div className='expenses-form-group form-group'>
              <span>$</span>
              <input
                type='number'
                placeholder='enter expenses'
                name='budget-amount'
                id='budget'
                value={expense}
                onChange={(e) => dispatch(setExpense(Number(e.target.value)))}
              />
            </div>
          </form>
          <div className='button-container'>
            <button
              type='button'
              className='cancel cancel-expenses'
              onClick={handleCancelExpenses}
            >
              <Close />
            </button>
            <button
              type='button'
              className='add-expenses-btn add-budget-btn'
              onClick={handleCreateExpenses}
              disabled={disabled}
            >
              CREATE
            </button>
          </div>
        </div>
        <div className='expense-list-wrapper budget-list-wrapper'>
          <div className='budget-list-header'>
            <h4>({resArr.length}) Expenses</h4>
            {resArr.length > 0 && (
              <button onClick={() => dispatch(clearExpensesList())}>
                Clear All
              </button>
            )}
          </div>
          <div className='expense-list budget-list'>
            {resArr.map((item) => {
              return (
                <div key={item.id} className='expense budget'>
                  <div className='expense-cart budget-cart'>
                    <span>
                      <CategoryIcon name={item.name} />
                    </span>
                    <p>{item.name}</p>
                  </div>
                  <p className='expense-amt price'>${item.amount}</p>
                  <div className='budget-actions'>
                    <button
                      className='edit'
                      onClick={() => dispatch(handleEditExpenseItem(item.id))}
                    >
                      <Edit />
                    </button>
                    <button
                      className='thrash'
                      onClick={() => dispatch(removeExpense(item.id))}
                    >
                      <Delete />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div ref={alertRef} className='alert'>
          <div>
            <Close />
          </div>
          <p>
            Create a budget for your <span>{expenseCategory}</span> first!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Expenses;
