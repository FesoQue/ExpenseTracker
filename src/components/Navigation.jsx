import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Budget, Currency, History } from './icons/Icons';

const Navigation = () => {
  return (
    <nav className='mobile-nav'>
      <NavLink to={'/'}>
        <Home />
      </NavLink>
      <NavLink to={'/budgets'}>
        <Budget />
      </NavLink>
      <NavLink to={'/expenses'}>
        <Currency />
      </NavLink>
      <NavLink to={'/history'}>
        <History />
      </NavLink>
    </nav>
  );
};

export default Navigation;
