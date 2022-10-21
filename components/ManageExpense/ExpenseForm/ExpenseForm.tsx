import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Input from '../Input/Input';
import Button from '../../UI/Button/Button';
import { getFormattedDate, toDateFormat } from '../../../utils/date';

import { IExpenseFormPorps } from './ExpenseForm.props';
import { IFormState } from '../../../globalTypes/formTypes';
import { checkValid } from '../../../utils/validation';

const ExpenseForm: React.FC<IExpenseFormPorps> = ({ onCancel, onSubmit, submitButtonName, expense }) => {
  const [inputValues, setInputValues] = useState<IFormState>({
    amount: { value: expense?.amount.toString() || '', isValid: true },
    description: { value: expense?.description || '', isValid: true },
    date: { value: expense ? getFormattedDate(expense?.date) : '', isValid: true },
  });

  const changeInputHandler = (inputId: string, value: string): void => {
    setInputValues((prev) => {
      return {
        ...prev,
        [inputId]: { value, isValid: checkValid(inputId, value) },
      };
    });
  };

  const submitHandler = (): void => {
    if (!inputValues.amount.isValid || !inputValues.date.isValid || !inputValues.description.isValid) {
      return;
    }

    const inputDate = toDateFormat(inputValues.date.value);

    const expenseData = {
      id: expense?.id,
      date: typeof inputDate !== 'string' && inputDate,
      amount: +inputValues.amount.value,
      description: inputValues.description.value,
    };
    onSubmit(expenseData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label='Amaunt'
          textInputConfig={{
            keyboardType: 'number-pad',
            value: inputValues.amount.value,
            onChangeText: (value) => changeInputHandler('amount', value),
          }}
          style={styles.rowInput}
          isValid={inputValues.amount.isValid}
        />
        <Input
          label='Date  (DD.MM.YYYY)'
          textInputConfig={{
            placeholder: 'DD.MM.YYYY',
            keyboardType: 'number-pad',
            maxLength: 10,
            value: inputValues.date.value,
            onChangeText: (value) => changeInputHandler('date', value),
          }}
          style={styles.rowInput}
          isValid={inputValues.date.isValid}
        />
      </View>
      <Input
        label='Description'
        textInputConfig={{
          keyboardType: 'default',
          multiline: true,
          autoCapitalize: 'sentences',
          value: inputValues.description.value,
          onChangeText: (value) => changeInputHandler('description', value),
        }}
        isValid={inputValues.description.isValid}
      />
      <View style={styles.buttonContainer}>
        <Button mode='flat' onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonName}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  inputsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  rowInput: {
    flex: 1,
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
});
