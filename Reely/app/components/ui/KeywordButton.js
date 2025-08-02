import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const KeywordButton = ({ keyword, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{keyword}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginRight: 15,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
  },
});

export default KeywordButton; 