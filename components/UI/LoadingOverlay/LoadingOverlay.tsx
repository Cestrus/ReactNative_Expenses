import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../../constans/styles';

const LoadingOverlay: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color='white' size='large' />
    </View>
  );
};

export default LoadingOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
