import axios from 'axios';
import { ExpenseType } from '../globalTypes/expenseType';

const URL = 'https://rnative-expense-default-rtdb.europe-west1.firebasedatabase.app';

export const fetchExpensesDb = async (): Promise<ExpenseType[]> => {
  try {
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
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

export const addExpenseDb = async (expense: ExpenseType): Promise<string> => {
  try {
    const response = await axios.post(`${URL}/expenses.json`, expense);
    if (response.status === 200) {
      return response.data.name;
    } else {
      throw new Error('No added to database! Something went wrong!');
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
      return;
    }
  }
};

export const deleteExpenseDb = async (id: ExpenseType['id']): Promise<number> => {
  try {
    const response = await axios.delete(`${URL}/expenses/${id}.json`);
    if (response.status === 200) {
      return response.status;
    } else {
      throw new Error('Don`t delete expense! Something went wrong!');
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

export const updateExpenseDb = async (id: ExpenseType['id'], expense: ExpenseType): Promise<number> => {
  try {
    const response = await axios.patch(`${URL}/expenses/${id}.json`, expense);
    if (response.status === 200) {
      return response.status;
    } else {
      throw new Error('Couldn`t updated! Something went wrong!');
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};
