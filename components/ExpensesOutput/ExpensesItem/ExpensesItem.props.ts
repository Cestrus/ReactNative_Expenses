import { ExpenseType } from '../../../globalTypes/expenseType';

export interface IExpensesItemProps extends ExpenseType {
  // expense: ExpenseType;
  onPress: () => void;
}
