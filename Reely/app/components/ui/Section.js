import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const Section = ({ title, horizontal = true, children, style }) => {
  return (
    <View style={[styles.section, style]}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView 
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        style={styles.content}
      >
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontFamily: 'Pretendard-Regular',
    marginBottom: 16,
  },
  content: {
    flexGrow: 0,
  },
});

export default Section; 