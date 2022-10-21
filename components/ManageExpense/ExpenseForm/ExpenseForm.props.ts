import { ExpenseType } from '../../../globalTypes/expenseType';

export interface IExpenseFormPorps extends Partial<ExpenseType> {
  onSubmit: (expense: ExpenseType) => void;
  onCancel: () => void;
  submitButtonName: 'Add' | 'Update';
  expense: ExpenseType | undefined;
}
