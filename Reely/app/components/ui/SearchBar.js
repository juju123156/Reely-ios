import React from 'react';
import { View, TextInput, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

// 이미지 import
const searchIcon = require('@assets/images/icons/search.png');
const closeIcon = require('@assets/images/icons/close.png');

const SearchBar = ({ 
  value = '', 
  onSearch, 
  onSubmit, 
  onFocus, 
  onCancel, 
  showCancel = false,
  placeholder = "영화 제목, 감독, 배우, 장르, 영화사를 검색해보세요" 
}) => {
  return (
    <View style={styles.searchContainer}>
      <View style={[styles.searchBox, showCancel && styles.searchBoxWithCancel]}>
      <TouchableOpacity onPress={() => onSubmit(value)}>
        <Image 
          source={searchIcon}
          style={styles.searchIcon} 
        />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#888888"
          onChangeText={onSearch}
          onFocus={onFocus}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
        />
        {value.length > 0 && (
          <TouchableOpacity onPress={() => onSearch('')}>
            <Image 
              source={closeIcon}
              style={styles.clearIcon} 
            />
          </TouchableOpacity>
        )}
      </View>
      {showCancel && (
        <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
          <Text style={styles.cancelText}>취소</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(34, 34, 34, 0.5)',
    borderRadius: 2.5,
    borderWidth: 0.5,
    borderColor: '#333333',
    padding: 5,
    paddingHorizontal: 12.5,
  },
  searchBoxWithCancel: {
    marginRight: 10,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 7.5,
    tintColor: '#888888',
  },
  clearIcon: {
    width: 16,
    height: 16,
    tintColor: '#888888',
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: 'Pretendard-Regular',
    padding: 0,
    height: 30,
  },
  cancelButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  cancelText: {
    color: '#347BED',
    fontSize: 13,
    fontFamily: 'Pretendard-Regular',
    fontWeight: '500',
  },
});

export default SearchBar; 