import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import IconButton from '../../components/UI/IconButton/IconButton';
import ExpenseForm from '../../components/ManageExpense/ExpenseForm/ExpenseForm';
import ErrorOverlay from '../../components/UI/ErrorOverlay/ErrorOverlay';
import LoadingOverlay from '../../components/UI/LoadingOverlay/LoadingOverlay';

import { GlobalStyles } from '../../constans/styles';
import { ExpensesContext } from '../../store/expenses-context';
import { addExpenseDb, deleteExpenseDb, updateExpenseDb } from '../../utils/http';

import { IManageExpenseScreen } from './ManageExpenseScreen.props';
import { ExpenseType } from '../../globalTypes/expenseType';
import { ErrorType } from '../../globalTypes/errorType';

const ManageExpenseScreen: React.FC<IManageExpenseScreen> = ({ route, navigation }) => {
  const { expenseId } = route.params;
  const isEditable = !!expenseId;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gotError, setGotError] = useState<ErrorType>({
    message: '',
    hasError: false,
    onConfirm: () => {},
  });

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

  const errorHandler = (): void => {
    setGotError({
      message: '',
      hasError: false,
      onConfirm: () => {},
    });
    navigation.goBack();
  };

  const confirmHandle = async (expense: ExpenseType): Promise<void> => {
    setIsLoading(true);
    if (isEditable && expense.id) {
      try {
        const expForUpdateDb: Omit<ExpenseType, 'id'> = {
          amount: expense.amount,
          date: expense.date,
          description: expense.description,
        };
        const status = await updateExpenseDb(expense.id, expForUpdateDb);
        if (status === 200) {
          expensesCtx.updateExpense(expense);
        }
      } catch (err) {
        if (err instanceof Error) {
          setIsLoading(false);
          console.log(err);
          setGotError({
            hasError: true,
            message: 'No added to database! Something went wrong!',
            onConfirm: errorHandler,
          });
        }
      }
    } else {
      try {
        const expenseId = await addExpenseDb(expense);
        expensesCtx.addExpense({ ...expense, id: expenseId });
      } catch (err) {
        if (err instanceof Error) {
          setIsLoading(false);
          console.log(err);
          setGotError({
            hasError: true,
            message: 'No added to database! Something went wrong!',
            onConfirm: errorHandler,
          });
        }
      }
    }
    setIsLoading(false);
    navigation.goBack();
  };

  const deleteHandler = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const status = await deleteExpenseDb(expenseId);
      if (status === 200) {
        expensesCtx.deleteExpense(expenseId);
      }
    } catch (err) {
      if (err instanceof Error) {
        setIsLoading(false);
        console.log(err);
        setGotError({
          hasError: true,
          message: 'Don`t delete expense! Something went wrong!',
          onConfirm: errorHandler,
        });
      }
    }
    setIsLoading(false);
    navigation.goBack();
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }

  if (gotError.hasError && !isLoading) {
    return <ErrorOverlay message={gotError.message} onConfirm={gotError.onConfirm} />;
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
