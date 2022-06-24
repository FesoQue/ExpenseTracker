import { createSlice } from '@reduxjs/toolkit';

const getBudgetList = () => {
  let list = localStorage.getItem('budget');
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};
const getBudgetAmt = () => {
  let amount = localStorage.getItem('totalAmount');
  if (amount) {
    return JSON.parse(amount);
  } else {
    return 0;
  }
};

const initialState = {
  currentCategory: '',
  budget: '',
  list: getBudgetList(),
  totalAmount: getBudgetAmt(),
  editID: null,
  isEditing: false,
};

export const budgetSlice = createSlice({
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
      // return { ...state, list: [...state.list, action.payload] };
      // state.list = action.payload;
      return { ...state, list: action.payload };
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
    clearList: (state) => {
      return { ...state, list: [] };
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
  clearList,
} = budgetSlice.actions;
