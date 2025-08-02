import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const tabs = ['영화', '인물', '장르', '영화사'];

const SearchTabs = ({ activeTab, onTabChange }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.tab, activeTab === index && styles.activeTab]}
          onPress={() => onTabChange(index)}
        >
          <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>
            {tab}
          </Text>
          {activeTab === index && <View style={styles.activeIndicator} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#222222',
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: 'relative',
  },
  activeTab: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Pretendard-Regular',
  },
  activeTabText: {
    color: '#347BED',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -1,
    left: 15,
    right: 15,
    height: 1.5,
    backgroundColor: '#347BED',
  },
});

export default SearchTabs; 