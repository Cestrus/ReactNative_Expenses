import React from 'react';
import { FlatList } from 'react-native';

import { IExpensesListProps } from './ExpensesList.props';
import ExpensesItem from '../ExpensesItem/ExpensesItem';

const ExpensesList: React.FC<IExpensesListProps> = ({ expenses }) => {
  const pressHandler = (): void => {
    console.log('press');
  };

  return (
    <FlatList
      data={expenses}
      renderItem={({ item }): JSX.Element => <ExpensesItem {...item} onPress={pressHandler} />}
      keyExtractor={(item): string => item.id}
    />
  );
};

export default ExpensesList;
