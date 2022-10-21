import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../../constans/styles';
import { IExpensesSummaryProps } from './ExpensesSummary.props';

const ExpensesSummary: React.FC<IExpensesSummaryProps> = ({ expenses, expensesPeriod }) => {
  const sum = expenses.reduce((prev, curr) => prev + curr.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{expensesPeriod}</Text>
      <Text style={styles.sum}>${sum.toFixed(2)}</Text>
    </View>
  );
};

export default ExpensesSummary;

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  period: {
    fontSize: 14,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: 'bold',
    color: GlobalStyles.colors.primary500,
  },
});
