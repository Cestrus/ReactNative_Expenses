import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GlobalStyles } from '../../../constans/styles';
import Button from '../Button/Button';

import { IErrorOverlayProp } from './ErrorOverlay.props';

const ErrorOverlay: React.FC<IErrorOverlayProp> = ({ message, onConfirm }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.textTitle]}>Get Error!</Text>
      <Text style={[styles.text, styles.textMessage]}>{message}</Text>
      <Button onPress={onConfirm}>Understood</Button>
    </View>
  );
};

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  text: {
    color: 'white',
    textAlign: 'center',
    marginBottom: 18,
  },
  textMessage: {
    fontSize: 14,
  },
  textTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});
