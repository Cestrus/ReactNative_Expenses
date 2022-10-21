import React, { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import IconButton from '../../components/UI/IconButton/IconButton';
import ExpenseForm from '../../components/ManageExpense/ExpenseForm/ExpenseForm';

import { GlobalStyles } from '../../constans/styles';
import { ExpensesContext } from '../../store/expenses-context';

import { IManageExpenseScreen } from './ManageExpenseScreen.props';
import { ExpenseType } from '../../globalTypes/expenseType';

const ManageExpenseScreen: React.FC<IManageExpenseScreen> = ({ route, navigation }) => {
  const { expenseId } = route.params;
  const isEditable = !!expenseId;

  const expensesCtx = useContext(ExpensesContext);
  const selectedExpense = expenseId && expensesCtx.expenses.find((exp) => exp.id === expenseId);

  useEffect(() => {
    navigation.setOptions({
      title: isEditable ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditable]);

  const cancelHandler = (): void => {
    navigation.goBack();
  };

  const confirmHandle = (expense: ExpenseType): void => {
    if (isEditable) {
      expensesCtx.updateExpense(expense);
    } else {
      expensesCtx.addExpense(expense);
    }
    navigation.goBack();
  };

  const deleteHandler = (): void => {
    expensesCtx.deleteExpense(expenseId);
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <ExpenseForm
        onSubmit={confirmHandle}
        onCancel={cancelHandler}
        submitButtonName={isEditable ? 'Update' : 'Add'}
        expense={selectedExpense}
      />
      {isEditable && (
        <View style={styles.deleteContainer}>
          <IconButton icon='trash' size={36} color={GlobalStyles.colors.error500} onPress={deleteHandler} />
        </View>
      )}
    </View>
  );
};

export default ManageExpenseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
