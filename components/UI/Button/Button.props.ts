import { PressableProps, ViewProps } from 'react-native';

export interface IButton extends ViewProps, Pick<PressableProps, 'onPress'> {
  children: React.ReactNode | string;
  mode?: 'flat';
}
