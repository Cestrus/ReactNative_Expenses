import React, { useState } from 'react';
import { ExpenseType } from '../globalTypes/expenseType';

interface IExpensesContext {
  expenses: ExpenseType[];
  addExpense: (expense: ExpenseType) => void;
  deleteExpense: (id: string) => void;
}

export const ExpensesContext = React.createContext<IExpensesContext>({
  expenses: [],
  addExpense: () => {},
  deleteExpense: () => {},
});

const ExpenseContextProviver: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);

  const addExpense = (expense: ExpenseType): void => {
    setExpenses((prev) => [...prev, expense]);
  };

  const deleteExpense = (id: string): void => {
    setExpenses((prev) => prev.filter((p) => p.id !== id));
  };

  const contextValue: IExpensesContext = {
    expenses,
    addExpense,
    deleteExpense,
  };
  return <ExpensesContext.Provider value={contextValue}>{children}</ExpensesContext.Provider>;
};

export default ExpenseContextProviver;
