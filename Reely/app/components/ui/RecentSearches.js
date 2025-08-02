import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// Ionicons import 제거

const RecentSearchItem = ({ keyword, onPress, onDelete }) => (
  <View style={styles.itemContainer}>
    <TouchableOpacity onPress={() => onPress(keyword)} style={styles.keywordButton}>
      <Text style={styles.keywordText}>{keyword}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => onDelete(keyword)}>
      {/* <Icon name="close-circle" size={16} color="#666666" style={styles.deleteIcon} /> */}
      {/* 아이콘 대신 다른 이미지나 텍스트로 대체하세요 */}
    </TouchableOpacity>
  </View>
);

const RecentSearches = ({ searches, onSearchPress, onDeleteSearch, onClearAll }) => {
  if (!searches || searches.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>최근 검색어</Text>
        <TouchableOpacity onPress={onClearAll}>
          <Text style={styles.clearText}>전체 삭제</Text>
        </TouchableOpacity>
      </View>
      {searches.map((search, index) => (
        <RecentSearchItem
          key={index}
          keyword={search}
          onPress={onSearchPress}
          onDelete={onDeleteSearch}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Pretendard-Regular',
  },
  clearText: {
    fontSize: 13,
    color: '#666',
    fontFamily: 'Pretendard-Regular',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  keywordButton: {
    flex: 1,
  },
  keywordText: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Pretendard-Regular',
  },
  deleteIcon: {
    marginLeft: 10,
  },
});

export default RecentSearches; 