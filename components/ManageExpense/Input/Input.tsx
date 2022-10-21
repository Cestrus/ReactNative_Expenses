import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../../constans/styles';

import { IInputProps } from './Input.props';

const Input: React.FC<IInputProps> = ({ label, textInputConfig, style, isValid }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.textInputContainer, !isValid && styles.alert]}>
        <TextInput
          style={textInputConfig && textInputConfig.multiline ? [styles.input, styles.inputMultiline] : styles.input}
          {...textInputConfig}
        />
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  textInputContainer: {
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: 6,
    borderColor: GlobalStyles.colors.primary700,
    borderWidth: 2,
  },
  alert: {
    borderColor: GlobalStyles.colors.error500,
    borderWidth: 2,
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.error50,
  },
});
