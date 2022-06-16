import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home } from './icons/Icons';
import { Budget } from './icons/Icons';
import { History } from './icons/Icons';
import { New } from './icons/Icons';

const Navigation = () => {
  return (
    <nav className='mobile-nav'>
      <NavLink to={'/'}>
        <Home />
      </NavLink>
      <NavLink to={'/budgets'}>
        <Budget />
      </NavLink>
      <NavLink to={'/new-expenses'}>
        <New />
      </NavLink>
      <NavLink to={'/history'}>
        <History />
      </NavLink>
    </nav>
  );
};

export default Navigation;
