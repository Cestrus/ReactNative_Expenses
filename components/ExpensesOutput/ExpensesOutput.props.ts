import { ExpenseType } from '../../globalTypes/expenseType';

export interface IExpensesOutputProps {
  expenses: ExpenseType[];
  expensesPeriod: string;
  style?: Record<string, string | number>;
}
