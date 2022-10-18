import React, { useReducer } from 'react';
import { ExpenseType } from '../globalTypes/expenseType';
import { DUMMY_DATA } from '../data/dummy_data';
import { ExpensesReducerType, TYPE } from './storeTypes';

interface IExpensesContext {
  expenses: ExpenseType[];
  addExpense: (expenseData: Omit<ExpenseType, 'id'>) => void;
  deleteExpense: (id: ExpenseType['id']) => void;
  updateExpense: (id: ExpenseType['id'], expenseData: Omit<ExpenseType, 'id'>) => void;
}

export const ExpensesContext = React.createContext<IExpensesContext>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

const expensesReducer: ExpensesReducerType = (state, action) => {
  switch (action.type) {
    case TYPE.ADD: {
      const id = new Date().toString + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    }
    case TYPE.DELETE: {
      return state.filter((p) => p.id !== action.payload.id);
    }
    case TYPE.UPDATE: {
      const expensesWithoutUpdate = state.filter((exp) => exp.id !== action.payload.id);
      const updateExpense = {
        id: action.payload.id,
        description: action.payload.description,
        amount: action.payload.amount,
        date: new Date(action.payload.date),
      };
      return [...expensesWithoutUpdate, updateExpense];
    }
    default:
      return state;
  }
};

const ExpenseContextProviver: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [expensesState, dispatch] = useReducer<ExpensesReducerType>(expensesReducer, DUMMY_DATA);

  const addExpense = (expenseData: Omit<ExpenseType, 'id'>): void => {
    dispatch({ type: TYPE.ADD, payload: { ...expenseData } });
  };

  const deleteExpense = (id: ExpenseType['id']): void => {
    dispatch({ type: TYPE.DELETE, payload: { id } });
  };

  const updateExpense = (id: ExpenseType['id'], expenseData: Omit<ExpenseType, 'id'>): void => {
    dispatch({ type: TYPE.UPDATE, payload: { ...expenseData, id } });
  };

  const contextValue: IExpensesContext = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };
  return <ExpensesContext.Provider value={contextValue}>{children}</ExpensesContext.Provider>;
};

export default ExpenseContextProviver;
