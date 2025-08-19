// MovieDetail.js
import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
// import api from '../lib/api'; // 실제 API 모듈이 있다면 사용

const MovieDetail = () => {
  const route = useRoute();
  const { movieId, initialData } = route.params || {};
  const [movie, setMovie] = useState(initialData || null);
  const [loading, setLoading] = useState(!initialData);

  useEffect(() => {
    let mounted = true;

    const fetchDetail = async () => {
      try {
        // 예시 API 호출 — 실제 엔드포인트로 교체
        // const { data } = await api.get(`/movies/${movieId}`);
        // if (mounted) setMovie(data);

        // 데모용 딜레이(실제 삭제)
        await new Promise((r) => setTimeout(r, 300));
        if (mounted && !movie) {
          // initialData가 없었다면 최소 데이터 세팅(데모)
          setMovie({
            movieId,
            title: '제목 로드됨',
            posterUrl: '',
            rating: 4.3,
            year: 2022,
            overview: '서버에서 받아온 줄거리...',
          });
        }
      } catch (e) {
        console.warn('fetch movie detail failed:', e);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    if (!initialData && movieId) {
      fetchDetail();
    } else {
      setLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, [movieId]);

  if (loading && !movie) {
    return (
      <View style={styles.center}>
        <ActivityIndicator color="#fff" />
      </View>
    );
  }

  if (!movie) {
    return (
      <View style={styles.center}>
        <Text style={{ color: '#fff' }}>영화 정보를 불러올 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      {!!movie.posterUrl && (
        <Image source={{ uri: movie.posterUrl }} style={styles.poster} resizeMode="cover" />
      )}
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.meta}>
        {movie.year} · ★ {movie.rating ?? '-'}
      </Text>
      {!!movie.overview && <Text style={styles.overview}>{movie.overview}</Text>}
      {/* 필요한 상세 섹션들 추가(감독/출연, 예고편, 스틸컷 등) */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#151515' },
  center: {
    flex: 1,
    backgroundColor: '#151515',
    alignItems: 'center',
    justifyContent: 'center',
  },
  poster: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  meta: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 12,
  },
  overview: {
    color: '#ccc',
    fontSize: 13,
    lineHeight: 19,
  },
});

export default MovieDetail;
