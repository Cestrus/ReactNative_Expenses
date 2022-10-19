import type { TextInput, TextInputProps } from 'react-native';

export interface IInputProps extends TextInput {
  label: string;
  textInputConfig: TextInputProps;
}
