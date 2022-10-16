import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from '../../components/UI/Button/Button';

import IconButton from '../../components/UI/IconButton/IconButton';
import { GlobalStyles } from '../../constans/styles';

import { IManageExpenseScreen } from './ManageExpenseScreen.props';

const ManageExpenseScreen: React.FC<IManageExpenseScreen> = ({ route, navigation }) => {
  const expenseId = route.params?.expenseId;
  const isEditable = !!expenseId;

  useEffect(() => {
    navigation.setOptions({
      title: isEditable ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditable]);

  const cancelHandler = (): void => {
    console.log('cancel');
  };

  const deleteHandler = (): void => {
    console.log('delete');
  };

  const confirmHandle = (): void => {
    console.log('confirm');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button mode='flat' onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandle} style={styles.button}>
          {isEditable ? 'Update' : 'Add'}
        </Button>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 8,
    minWidth: 120,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
