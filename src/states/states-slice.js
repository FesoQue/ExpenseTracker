import { createSlice } from '@reduxjs/toolkit';
import { act } from '@testing-library/react';

const initialState = {
  currentCategory: '',
  budget: '',
  list: [],
  arr: [],
  totalAmount: 0,
  editID: null,
  isEditing: false,
};

export const statesSlice = createSlice({
  name: 'states',
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      return { ...state, currentCategory: action.payload };
    },
    setBudget: (state, action) => {
      return { ...state, budget: action.payload };
    },
    setList: (state, action) => {
      //   return { ...state, list: action.payload };
      state.list = action.payload;
    },
    removeBudget: (state, action) => {
      const budgetId = action.payload;
      const budgetItem = state.list.filter((item) => item.id !== budgetId);
      return { ...state, list: budgetItem };
    },
    handleTotal: (state) => {
      let total = 0;
      state.list.forEach((item) => {
        total += item.amount;
      });
      return { ...state, totalAmount: total.toFixed(2) };
    },
    handleEditItem: (state, action) => {
      const id = action.payload;
      const specificBudget = state.list.find((budget) => budget.id === id);
      state.editID = id;
      state.budget = specificBudget.amount;
      state.currentCategory = specificBudget.name;
      state.isEditing = true;
    },
    setIsEditing: (state, action) => {
      return { ...state, isEditing: action.payload };
    },
    setEditId: (state, action) => {
      return { ...state, editID: action.payload };
    },
  },
});

export const {
  setActiveCategory,
  setBudget,
  setList,
  removeBudget,
  handleTotal,
  handleEditItem,
  setIsEditing,
  setEditId,
} = statesSlice.actions;
