import React from 'react';
import ExpensesOutput from '../../components/ExpensesOutput/ExpensesOutput';
import { DUMMY_DATA } from '../../data/dummy_data';

import { IRecentExpensesScreen } from './RecentExpensesScreen.props';

const RecentExpensesScreen: React.FC<IRecentExpensesScreen> = () => {
  return <ExpensesOutput expensesPeriod='Last 7 days' expenses={DUMMY_DATA} />;
};

export default RecentExpensesScreen;
