import React from 'react';
import '../App.css';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Home, Budget, Currency, History } from './icons/Icons';

const DesktopNav = () => {
  const { totalAmount } = useSelector((state) => state.budgetSlice);
  return (
    <aside>
      <div className='sidebar'>
        <div className='sidebar-budget-card'>
          <div>
            <h1>${totalAmount}</h1>
            <p>Current Budget</p>
          </div>
        </div>
        <div className='sidebar-nav'>
          <NavLink to={'/'}>
            <Home />
            <span>Home</span>
          </NavLink>
          <NavLink to={'/budgets'}>
            <Budget />
            <span>Budgets</span>
          </NavLink>
          <NavLink to={'/expenses'}>
            <Currency />
            <span>Expenses</span>
          </NavLink>
          <NavLink to={'/history'}>
            <History />
            <span>History</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};

export default DesktopNav;
