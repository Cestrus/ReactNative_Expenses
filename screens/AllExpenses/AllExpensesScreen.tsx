import React, { useContext } from 'react';
import ExpensesOutput from '../../components/ExpensesOutput/ExpensesOutput';

import { IAllExpensesScreen } from './AllExpensesScreen.props';
import { ExpensesContext } from '../../store/expenses-context';

const AllExpensesScreen: React.FC<IAllExpensesScreen> = () => {
  const expensesCtx = useContext(ExpensesContext);

  return <ExpensesOutput expensesPeriod={'Total'} expenses={expensesCtx.expenses} fallback={`No expenses yet`} />;
};

export default AllExpensesScreen;
