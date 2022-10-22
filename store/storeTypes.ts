import { ExpenseType } from '../globalTypes/expenseType';

export enum TYPE {
  FETCH,
  ADD,
  DELETE,
  UPDATE,
}

type AddActionType = {
  type: TYPE.ADD;
  payload: ExpenseType;
};
type DeleteActionType = {
  type: TYPE.DELETE;
  payload: ExpenseType['id'];
};
type UpdateActionType = {
  type: TYPE.UPDATE;
  payload: ExpenseType;
};
type FetchActionType = {
  type: TYPE.FETCH;
  payload: ExpenseType[] | [];
};

type ExpensesStateType = ExpenseType[];
type ExpensesActionType = AddActionType | DeleteActionType | UpdateActionType | FetchActionType;

export type ExpensesReducerType = (state: ExpensesStateType, action: ExpensesActionType) => ExpensesStateType;
