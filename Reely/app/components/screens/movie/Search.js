import React, { useState, useCallback } from 'react';
import { Alert, View, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios';
import SearchBar from '@ui/SearchBar';
import SearchTabs from '@ui/SearchTabs';
import RecentSearches from '@ui/RecentSearches';
import SearchResults from '@ui/SearchResults';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // 최근 검색어 로드
  const loadRecentSearches = useCallback(async () => {
    try {
      const savedSearches = await AsyncStorage.getItem('recentSearches');
      if (savedSearches) {
        setRecentSearches(JSON.parse(savedSearches));
      }
    } catch (error) {
      console.error('Failed to load recent searches:', error);
    }
  }, []);

  // 최근 검색어 저장
  const saveRecentSearch = useCallback(async (keyword) => {
    try {
      let searches = [...recentSearches];
      if (!searches.includes(keyword)) {
        searches.unshift(keyword);
        searches = searches.slice(0, 10); // 최대 10개까지만 저장
        setRecentSearches(searches);
        await AsyncStorage.setItem('recentSearches', JSON.stringify(searches));
      }
    } catch (error) {
      console.error('Failed to save recent search:', error);
    }
  }, [recentSearches]);

  // 검색 실행
  const handleSearch = useCallback(async (text) => {
    const query = (text ?? searchText).trim();
    if (!query) {
      setSearchResults([]);
      return;
    }
    
    setIsSearching(true);
    await saveRecentSearch(query);
      
    try {
      const encodedText = encodeURIComponent(query);
      const token = await AsyncStorage.getItem('accessToken');
      const response = await axios.get(`${Config.BASE_URL}/api/getMoviesInfo/${encodedText}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
      });
      const url = `${Config.BASE_URL}/api/getMoviesInfo/${query}`;
      Alert.alert('🔍 요청 결과: ', JSON.stringify(response.data));  // 요청 URL 확인용
      const searchData = response.data;
      setSearchResults(Array.isArray(searchData) ? searchData : []); // 서버에서 받은 데이터를 상태에 저장
    } catch (error) {
      console.error('검색 API 호출 실패:', error);
      setSearchResults([]); // 실패 시 빈 배열 처리
    }
  
    setIsSearching(false);
  }, [searchText, saveRecentSearch]);
  
  const handleTextChange = useCallback((text) => {
    setSearchText(text);
  }, []);
  
  // 최근 검색어 삭제
  const handleDeleteSearch = useCallback(async (keyword) => {
    try {
      const newSearches = recentSearches.filter(search => search !== keyword);
      setRecentSearches(newSearches);
      await AsyncStorage.setItem('recentSearches', JSON.stringify(newSearches));
    } catch (error) {
      console.error('Failed to delete recent search:', error);
    }
  }, [recentSearches]);

  // 최근 검색어 전체 삭제
  const handleClearAll = useCallback(async () => {
    try {
      setRecentSearches([]);
      await AsyncStorage.removeItem('recentSearches');
    } catch (error) {
      console.error('Failed to clear recent searches:', error);
    }
  }, []);

  // 탭 변경
  const handleTabChange = useCallback((index) => {
    setActiveTab(index);
    if (searchText) {
      // TODO: 선택된 탭에 따라 검색 결과 다시 가져오기
    }
  }, [searchText]);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        value={searchText}
        onSearch={handleTextChange}
        onSubmit={handleSearch}
        placeholder="영화 제목, 감독, 배우, 장르, 영화사를 검색해보세요"
      />
      <SearchTabs
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />
      {!searchText && (
        <RecentSearches
          searches={recentSearches}
          onSearchPress={(keyword) => {
            setSearchText(keyword);
            handleSearch(keyword);
          }}
          onDeleteSearch={handleDeleteSearch}
          onClearAll={handleClearAll}
        />
      )}
      {searchText && (
        <SearchResults
          activeTab={activeTab}
          results={searchResults}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151515',
  },
});

export default Search; 