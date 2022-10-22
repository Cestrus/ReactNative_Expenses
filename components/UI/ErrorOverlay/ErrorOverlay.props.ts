import { ViewProps } from 'react-native';

export interface IErrorOverlayProp extends ViewProps {
  message: string;
  onConfirm: () => void;
}
