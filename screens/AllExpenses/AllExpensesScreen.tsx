import React from 'react';
import ExpensesOutput from '../../components/ExpensesOutput/ExpensesOutput';

import { IAllExpensesScreen } from './AllExpensesScreen.props';
import { DUMMY_DATA } from '../../data/dummy_data';

const AllExpensesScreen: React.FC<IAllExpensesScreen> = () => {
  return <ExpensesOutput expensesPeriod={'Total'} expenses={DUMMY_DATA} />;
};

export default AllExpensesScreen;
