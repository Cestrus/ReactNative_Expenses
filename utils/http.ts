import axios from 'axios';
import { ExpenseType } from '../globalTypes/expenseType';

const URL = 'https://rnative-expense-default-rtdb.europe-west1.firebasedatabase.app';

export const fetchExpensesDb = async (): Promise<ExpenseType[]> => {
  const response = await axios.get(`${URL}/expenses.json`);
  const expenses: ExpenseType[] = [];
  for (const key in response.data) {
    const exponseObj = {
      id: key,
      amount: response.data[key].amount,
      description: response.data[key].description,
      date: new Date(response.data[key].date),
    };
    expenses.push(exponseObj);
  }
  return expenses;
};

export const addExpenseDb = async (expense: ExpenseType): Promise<string> => {
  const response = await axios.post(`${URL}/expenses.json`, expense);
  return response.data.name;
};

export const deleteExpenseDb = async (id: ExpenseType['id']): Promise<number> => {
  const response = await axios.delete(`${URL}/expenses/${id}.json`);
  return response.status;
};

export const updateExpenseDb = async (id: ExpenseType['id'], expense: ExpenseType): Promise<number> => {
  const response = await axios.patch(`${URL}/expenses/${id}.json`, expense);
  return response.status;
};
