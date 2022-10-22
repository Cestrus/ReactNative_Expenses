import React, { useContext, useEffect, useState } from 'react';

import ExpensesOutput from '../../components/ExpensesOutput/ExpensesOutput';
import LoadingOverlay from '../../components/UI/LoadingOverlay/LoadingOverlay';

import { ExpensesContext } from '../../store/expenses-context';
import { getDateMinusDays } from '../../utils/date';
import { fetchExpensesDb } from '../../utils/http';

import { IRecentExpensesScreen } from './RecentExpensesScreen.props';

const RecentExpensesScreen: React.FC<IRecentExpensesScreen> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const expensesCtx = useContext(ExpensesContext);
  const period = 7;

  useEffect(() => {
    async function getExpensesFromDb(): Promise<void> {
      setIsLoading(true);
      const expenses = await fetchExpensesDb();
      expensesCtx.fetchExpense(expenses);
      setIsLoading(false);
    }
    getExpensesFromDb();
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

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
