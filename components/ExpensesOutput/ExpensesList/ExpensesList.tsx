import React from 'react';
import { FlatList } from 'react-native';

import { IExpensesListProps } from './ExpensesList.props';
import ExpensesItem from '../ExpensesItem/ExpensesItem';

const ExpensesList: React.FC<IExpensesListProps> = ({ expenses }) => {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item }): JSX.Element => <ExpensesItem {...item} />}
      keyExtractor={(item): string => item.id}
    />
  );
};

export default ExpensesList;
