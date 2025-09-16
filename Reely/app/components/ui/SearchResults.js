import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MoviePoster from './MoviePoster';

const SearchResults = ({ activeTab, results }) => {
  const navigation = useNavigation();

  const handleMoviePress = (movieId) => {
    navigation.navigate('MovieDetail', { movieId });
  };

  // 탭별 열 개수
  const getColumnCount = () => {
    switch (activeTab) {
      case 0: // 영화
        return 3;
      case 1: // 인물
        return 2;
      default:
        return 3;
    }
  };

  const numColumns = getColumnCount();

  // 포스터 있는 항목만 먼저 선별
  const filteredResults = React.useMemo(
    () => (Array.isArray(results) ? results.filter(item => !!item?.posterPath) : []),
    [results]
  );

  // 결과를 그리드 형태로 자르기
  const getGridRows = () => {
    const rows = [];
    for (let i = 0; i < filteredResults.length; i += numColumns) {
      rows.push(filteredResults.slice(i, i + numColumns));
    }
    return rows;
  };

  return (
    <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {getGridRows().map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.row}>
          {row.map((item, index) => {
              const key = `${item?.movieId ?? 'm'}-${item?.posterFileId ?? index}-r${rowIndex}`;
              return (
                <MoviePoster
                  key={key}
                  imageUrl={item.posterPath}
                  onPress={() => handleMoviePress(item.movieId)}
                  style={styles.poster}
                />
              );
          })}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
    backgroundColor: '#151515',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 15,
  },
  poster: {
    marginHorizontal: 5,
  },
});

export default SearchResults;
