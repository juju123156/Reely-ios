import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MoviePoster from './MoviePoster';

const SearchResults = ({ activeTab, results }) => {
  
  const navigation = useNavigation();

  // 영화 포스터 클릭 시 상세 페이지로 이동
  const handleMoviePress = (movieId) => {
    navigation.navigate('MovieDetail', { movieId });
  };

  const getRenderer = (item, index) => {
    switch (activeTab) {
      case 0: // 영화 탭
        return (
          <MoviePoster
            key={item.movieId || index}
            movieId={item.movieId}
            title={item.title}
            posterUrl={item.posterUrl}
            rating={item.rating}
            year={item.year}
            onPress={handleMoviePress}
          />
        );

        const getColumnCount = () => {
          switch (activeTab) {
            case 0:
            case 1:
              return 3;
            case 2:
            case 3:
              return 2;
            default:
              return 1;
          }
        };

        const getRenderer = (item, index) => {
          switch (activeTab) {
            case 0:
              return (
                <MoviePoster
                  key={index}
                  title={item.title}
                  posterUrl={item.posterUrl}
                  rating={item.rating}
                  year={item.year}
                />
              );
            case 1:
              return (
                <View key={index} style={styles.personItem}>
                  <Image source={{ uri: item.profileUrl }} style={styles.profileImage} />
                  <Text style={styles.personName}>{item.name}</Text>
                  <Text style={styles.personRole}>{item.role}</Text>
                </View>
              );
            case 2:
              return (
                <View key={index} style={styles.genreItem}>
                  <Text style={styles.genreName}>{item.name}</Text>
                  <Text style={styles.movieCount}>{item.movieCount}개의 영화</Text>
                </View>
              );
            case 3:
              return (
                <View key={index} style={styles.companyItem}>
                  <Image source={{ uri: item.logoUrl }} style={styles.companyLogo} />
                  <Text style={styles.companyName}>{item.name}</Text>
                  <Text style={styles.companyMovieCount}>{item.movieCount}개의 영화</Text>
                </View>
              );
            default:
              return null;
          }
        };

        const numColumns = getColumnCount();

        // 결과를 그리드 형식으로 분할
        const getGridRows = () => {
          const rows = [];
          for (let i = 0; i < results.length; i += numColumns) {
            rows.push(results.slice(i, i + numColumns));
          }
          return rows;
        };

        return (
          <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
            {getGridRows().map((row, rowIndex) => (
              <View key={rowIndex} style={styles.row}>
                {row.map((item, index) => getRenderer(item, index))}
              </View>
            ))}
          </ScrollView>
        );
      };
    }
  };
const styles = StyleSheet.create({
  contentContainer: {
    padding: 15,
    backgroundColor: '#151515',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  personItem: {
    width: '30%',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  personName: {
    fontSize: 13,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Pretendard-Regular',
    marginBottom: 4,
  },
  personRole: {
    fontSize: 11,
    color: '#AAAAAA',
    textAlign: 'center',
    fontFamily: 'Pretendard-Regular',
  },
  genreItem: {
    width: '48%',
    backgroundColor: '#222222',
    borderRadius: 8,
    padding: 15,
  },
  genreName: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Pretendard-Regular',
    fontWeight: '600',
    marginBottom: 4,
  },
  movieCount: {
    fontSize: 12,
    color: '#AAAAAA',
    fontFamily: 'Pretendard-Regular',
  },
  companyItem: {
    width: '48%',
    backgroundColor: '#222222',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  companyLogo: {
    width: 60,
    height: 60,
    marginBottom: 8,
    borderRadius: 30,
  },
  companyName: {
    fontSize: 13,
    color: '#FFFFFF',
    textAlign: 'center',
    fontFamily: 'Pretendard-Regular',
    marginBottom: 4,
  },
  companyMovieCount: {
    fontSize: 11,
    color: '#AAAAAA',
    textAlign: 'center',
    fontFamily: 'Pretendard-Regular',
  },
});

export default SearchResults;
