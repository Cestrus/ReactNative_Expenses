import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '../../constans/styles';
import ExpensesList from './ExpensesList/ExpensesList';

import { IExpensesOutputProps } from './ExpensesOutput.props';
import ExpensesSummary from './ExpensesSummary/ExpensesSummary';

const ExpensesOutput: React.FC<IExpensesOutputProps> = ({ expenses, expensesPeriod, fallback }) => {
  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={expenses} expensesPeriod={expensesPeriod} />
      {expenses.length ? <ExpensesList expenses={expenses} /> : <Text style={styles.fallback}>{fallback}</Text>}
    </View>
  );
};

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  fallback: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});
