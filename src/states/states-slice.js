import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentCategory: '',
  budget: '',
  list: [],
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
      const item = {
        id: new Date().getTime().toString(),
        name: action.payload.name,
        amount: action.payload.amount,
      };
      return { ...state, list: [...state.list, item] };
    },
    removeBudget: (state, action) => {
      const budgetId = action.payload;
      const budgetItem = state.list.filter((item) => item.id !== budgetId);
      return { ...state, list: budgetItem };
    },
  },
});

export const { setActiveCategory, setBudget, setList, removeBudget } =
  statesSlice.actions;
