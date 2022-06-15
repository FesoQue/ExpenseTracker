import { configureStore } from '@reduxjs/toolkit';
import { budgetSlice } from './states/budget-slice';
import { expensesSlice } from './states/expense-slice';

export const store = configureStore({
  reducer: {
    budgetSlice: budgetSlice.reducer,
    expenseSlice: expensesSlice.reducer,
  },
});
