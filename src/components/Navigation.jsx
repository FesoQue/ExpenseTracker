import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home } from './icons/Icons';
import { Budget } from './icons/Icons';
import { History } from './icons/Icons';
import { New } from './icons/Icons';

const Navigation = () => {
  return (
    <nav>
      <NavLink to={'/'}>
        <Home />
      </NavLink>
      <NavLink to={'/budgets'}>
        <Budget />
      </NavLink>
      <NavLink to={'/history'}>
        <History />
      </NavLink>
      <NavLink to={'/new-expenses'}>
        <New />
      </NavLink>
    </nav>
  );
};

export default Navigation;
