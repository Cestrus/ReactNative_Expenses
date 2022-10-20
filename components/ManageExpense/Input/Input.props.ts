import type { StyleProp, TextInputProps, ViewStyle } from 'react-native';

export interface IInputProps {
  label: string;
  textInputConfig?: TextInputProps;
  style?: StyleProp<ViewStyle>;
}
