import React, { useContext } from 'react';

import ExpensesOutput from '../../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../../store/expenses-context';
import { getDateMinusDays } from '../../utils/date';

import { IRecentExpensesScreen } from './RecentExpensesScreen.props';

const RecentExpensesScreen: React.FC<IRecentExpensesScreen> = () => {
  const expensesCtx = useContext(ExpensesContext);
  const period = 7;

  const expensesForPeriod = expensesCtx.expenses.filter((exp) => {
    const dateMinusDays = getDateMinusDays(new Date(), period);
    return dateMinusDays < exp.date;
  });

  return (
    <ExpensesOutput
      expensesPeriod={`Last ${period} days`}
      expenses={expensesForPeriod}
      fallback={`No expenses last ${period} days`}
    />
  );
};

export default RecentExpensesScreen;
