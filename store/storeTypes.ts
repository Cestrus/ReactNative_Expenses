import { ExpenseType } from '../globalTypes/expenseType';

export enum TYPE {
  ADD,
  DELETE,
  UPDATE,
}

type AddActionType = {
  type: TYPE.ADD;
  payload: Omit<ExpenseType, 'id'>;
};
type DeleteActionType = {
  type: TYPE.DELETE;
  payload: Pick<ExpenseType, 'id'>;
};
type UpdateActionType = {
  type: TYPE.UPDATE;
  payload: ExpenseType;
};

type ExpensesStateType = ExpenseType[];
type ExpensesActionType = AddActionType | DeleteActionType | UpdateActionType;

export type ExpensesReducerType = (state: ExpensesStateType, action: ExpensesActionType) => ExpensesStateType;
