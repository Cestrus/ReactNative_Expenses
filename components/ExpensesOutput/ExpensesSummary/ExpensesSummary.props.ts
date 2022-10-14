import { ExpenseType } from '../../../globalTypes/expenseType';

export interface IExpensesSummaryProps {
  expenses: ExpenseType[];
  expensesPeriod: string;
}
