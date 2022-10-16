import React from 'react';
import { Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { IIconButtonProps } from './IconButton.props';

const IconButton: React.FC<IIconButtonProps> = ({ onPress, icon, color, size }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }): StyleProp<ViewStyle> => pressed && styles.pressed}>
      <View style={styles.container}>
        <Ionicons name={icon} color={color} size={size} />
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    marginHorizontal: 8,
    marginVertical: 2,
    padding: 6,
  },
  pressed: {
    opacity: 0.75,
  },
});
