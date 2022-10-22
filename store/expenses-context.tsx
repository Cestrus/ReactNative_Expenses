import React, { useReducer } from 'react';
import { ExpenseType } from '../globalTypes/expenseType';
import { ExpensesReducerType, TYPE } from './storeTypes';

interface IExpensesContext {
  expenses: ExpenseType[];
  fetchExpense: (expenses: ExpenseType[]) => void;
  addExpense: (expenseData: ExpenseType) => void;
  deleteExpense: (id: ExpenseType['id']) => void;
  updateExpense: (expenseData: ExpenseType) => void;
}

export const ExpensesContext = React.createContext<IExpensesContext>({
  expenses: [],
  fetchExpense: () => {},
  addExpense: () => {},
  deleteExpense: () => {},
  updateExpense: () => {},
});

const expensesReducer: ExpensesReducerType = (state, action) => {
  switch (action.type) {
    case TYPE.FETCH: {
      return [...action.payload];
    }
    case TYPE.ADD: {
      return [...state, action.payload];
    }
    case TYPE.DELETE: {
      return state.filter((p) => p.id !== action.payload);
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
  const [expensesState, dispatch] = useReducer<ExpensesReducerType>(expensesReducer, []);

  const addExpense = (expense: ExpenseType): void => {
    dispatch({ type: TYPE.ADD, payload: expense });
  };

  const deleteExpense = (id: ExpenseType['id']): void => {
    dispatch({ type: TYPE.DELETE, payload: id });
  };

  const updateExpense = (expenseData: ExpenseType): void => {
    dispatch({ type: TYPE.UPDATE, payload: { ...expenseData } });
  };

  const fetchExpense = (expenses: ExpenseType[]): void => {
    dispatch({ type: TYPE.FETCH, payload: expenses });
  };

  const contextValue: IExpensesContext = {
    expenses: expensesState,
    fetchExpense,
    addExpense,
    deleteExpense,
    updateExpense,
  };
  return <ExpensesContext.Provider value={contextValue}>{children}</ExpensesContext.Provider>;
};

export default ExpenseContextProviver;
