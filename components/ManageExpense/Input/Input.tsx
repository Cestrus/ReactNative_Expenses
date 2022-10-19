import React from 'react';
import { View, Text, TextInput } from 'react-native';

import { IInputProps } from './Input.props';

const Input: React.FC<IInputProps> = ({ label, textInputConfig }) => {
  return (
    <View>
      <Text>{label}</Text>
      <TextInput {...textInputConfig} />
    </View>
  );
};

export default Input;
