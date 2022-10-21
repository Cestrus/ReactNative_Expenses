import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import Input from '../Input/Input';
import Button from '../../UI/Button/Button';
import { getFormattedDate, toDateFormat } from '../../../utils/date';

import { IExpenseFormPorps } from './ExpenseForm.props';
import { IFormState } from '../../../globalTypes/formTypes';

const ExpenseForm: React.FC<IExpenseFormPorps> = ({ onCancel, onSubmit, submitButtonName, expense }) => {
  const [inputValue, setInputValue] = useState<IFormState>({
    amount: expense?.amount.toString() || '',
    description: expense?.description || '',
    date: expense ? getFormattedDate(expense?.date) : '',
  });

  const [isValidValues, setIsValidValues] = useState({
    amount: expense?.amount ? true : false,
    description: expense?.description ? true : false,
    date: expense?.date ? true : false,
  });

  const changeValueHandler = (inputId: string, value: string): void => {
    setInputValue((prev) => {
      return {
        ...prev,
        [inputId]: value,
      };
    });
  };

  const submitHandler = (): void => {
    const inputDate = toDateFormat(inputValue.date);

    const expenseData = {
      id: expense?.id,
      date: typeof inputDate !== 'string' && inputDate,
      amount: +inputValue.amount,
      description: inputValue.description,
    };

    const isAmountValid = !isNaN(+expenseData.amount) && +expenseData.amount > 0;
    const isDescriptionValid = expenseData.description.trim().length > 0;
    const isDateValid = !!expenseData.date;
    console.log(isDateValid);

    setIsValidValues({
      date: isDateValid,
      amount: isAmountValid,
      description: isDescriptionValid,
    });
    console.log(isValidValues);
    if (!isAmountValid || !isDescriptionValid || !isDateValid) {
      return;
    }
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
            value: inputValue.amount,
            onChangeText: (value) => changeValueHandler('amount', value),
          }}
          style={styles.rowInput}
          isValid={isValidValues.amount}
        />
        <Input
          label='Date  (DD.MM.YYYY)'
          textInputConfig={{
            placeholder: 'DD.MM.YYYY',
            keyboardType: 'number-pad',
            maxLength: 10,
            value: inputValue.date,
            onChangeText: (value) => changeValueHandler('date', value),
          }}
          style={styles.rowInput}
          isValid={isValidValues.date}
        />
      </View>
      <Input
        label='Description'
        textInputConfig={{
          keyboardType: 'default',
          multiline: true,
          autoCapitalize: 'sentences',
          value: inputValue.description,
          onChangeText: (value) => changeValueHandler('description', value),
        }}
        isValid={isValidValues.description}
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
