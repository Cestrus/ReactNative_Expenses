import React, { useContext, useEffect, useState } from 'react';

import ExpensesOutput from '../../components/ExpensesOutput/ExpensesOutput';
import ErrorOverlay from '../../components/UI/ErrorOverlay/ErrorOverlay';
import LoadingOverlay from '../../components/UI/LoadingOverlay/LoadingOverlay';
import { ErrorType } from '../../globalTypes/errorType';

import { ExpensesContext } from '../../store/expenses-context';
import { getDateMinusDays } from '../../utils/date';
import { fetchExpensesDb } from '../../utils/http';

import { IRecentExpensesScreen } from './RecentExpensesScreen.props';

const RecentExpensesScreen: React.FC<IRecentExpensesScreen> = ({ navigation }) => {
  const [gotError, setGotError] = useState<ErrorType>({
    message: '',
    hasError: false,
    onConfirm: () => {},
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const expensesCtx = useContext(ExpensesContext);
  const period = 7;

  const getErrorHandler = (): void => {
    navigation.navigate('RecentExpenses');
  };

  useEffect(() => {
    async function getExpensesFromDb(): Promise<void> {
      try {
        setIsLoading(true);
        const expenses = await fetchExpensesDb();
        expensesCtx.fetchExpense(expenses);
        setIsLoading(false);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err);
          setIsLoading(false);
          setGotError({
            message: 'Didn`t load expenses from daabase! Something went wrong!',
            hasError: true,
            onConfirm: () => {
              getErrorHandler;
            },
          });
        }
      }
    }
    getExpensesFromDb();
  }, []);

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (gotError.hasError && !isLoading) {
    return <ErrorOverlay message={gotError.message} onConfirm={getErrorHandler} />;
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
