import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import IconButton from '../../components/UI/IconButton/IconButton';
import ExpenseForm from '../../components/ManageExpense/ExpenseForm/ExpenseForm';

import { GlobalStyles } from '../../constans/styles';
import { ExpensesContext } from '../../store/expenses-context';
import { addExpenseDb, deleteExpenseDb, updateExpenseDb } from '../../utils/http';

import { IManageExpenseScreen } from './ManageExpenseScreen.props';
import { ExpenseType } from '../../globalTypes/expenseType';
import LoadingOverlay from '../../components/UI/LoadingOverlay/LoadingOverlay';

const ManageExpenseScreen: React.FC<IManageExpenseScreen> = ({ route, navigation }) => {
  const { expenseId } = route.params;
  const isEditable = !!expenseId;
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const confirmHandle = async (expense: ExpenseType): Promise<void> => {
    setIsLoading(true);
    if (isEditable && expense.id) {
      const expForUpdateDb: Omit<ExpenseType, 'id'> = {
        amount: expense.amount,
        date: expense.date,
        description: expense.description,
      };
      const status = await updateExpenseDb(expense.id, expForUpdateDb);
      if (status === 200) {
        expensesCtx.updateExpense(expense);
      }
    } else {
      const expenseId = await addExpenseDb(expense);
      expensesCtx.addExpense({ ...expense, id: expenseId });
    }
    setIsLoading(false);
    navigation.goBack();
  };

  const deleteHandler = async (): Promise<void> => {
    setIsLoading(true);
    const status = await deleteExpenseDb(expenseId);
    if (status === 200) {
      expensesCtx.deleteExpense(expenseId);
    }
    setIsLoading(false);
    navigation.goBack();
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

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
