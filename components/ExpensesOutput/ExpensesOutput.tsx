import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GlobalStyles } from '../../constans/styles';
import ExpensesList from './ExpensesList/ExpensesList';

import { IExpensesOutputProps } from './ExpensesOutput.props';
import ExpensesSummary from './ExpensesSummary/ExpensesSummary';

const ExpensesOutput: React.FC<IExpensesOutputProps> = ({ expenses, expensesPeriod }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} expensesPeriod={expensesPeriod} />
      <ExpensesList expenses={expenses} />
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
