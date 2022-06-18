import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  expenseCategory: null,
  expense: '',
  expenseList: [],
  totalExpense: 0,
  expenseEditID: null,
  isEditingExpense: false,
};

export const expensesSlice = createSlice({
  name: 'states',
  initialState,
  reducers: {
    setExpenseCategory: (state, action) => {
      return { ...state, expenseCategory: action.payload };
    },
    setExpense: (state, action) => {
      return { ...state, expense: action.payload };
    },
    setExpenseList: (state, action) => {
      //   return { ...state, expenseList: action.payload };
      state.expenseList = action.payload;
    },
    removeExpense: (state, action) => {
      const expenseId = action.payload;
      const expenseItem = state.expenseList.filter(
        (item) => item.id !== expenseId
      );
      return { ...state, expenseList: expenseItem };
    },
    handleExpenseTotal: (state) => {
      let total = 0;
      state.expenseList.forEach((item) => {
        total += item.amount;
      });
      return { ...state, totalExpense: total.toFixed(2) };
    },
    handleEditExpenseItem: (state, action) => {
      const id = action.payload;
      const specificExpense = state.expenseList.find(
        (expense) => expense.id === id
      );
      state.expenseEditID = id;
      state.expense = specificExpense.amount;
      state.expenseCategory = specificExpense.name;
      state.isEditingExpense = true;
    },
    setIsEditingExpense: (state, action) => {
      return { ...state, isEditingExpense: action.payload };
    },
    setExpenseEditId: (state, action) => {
      return { ...state, expenseEditID: action.payload };
    },
    clearExpensesList: (state) => {
      return { ...state, expenseList: [] };
    },
  },
});

export const {
  setExpenseCategory,
  setExpense,
  setExpenseList,
  removeExpense,
  handleExpenseTotal,
  handleEditExpenseItem,
  setIsEditingExpense,
  setExpenseEditId,
  clearExpensesList,
} = expensesSlice.actions;
