// app.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import axios from 'axios';
import FooterNavigation from './FooterNavigation';

const Main = () => {
  const [data, setData] = useState(null); // `null`로 초기화
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // `null`로 초기화

  useEffect(() => {
    // API 요청 함수
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/data`); // 여기에 Spring Boot URL과 API 엔드포인트를 넣으세요.
        setData(response.data);
      } catch (err) {
        // 에러를 콘솔에 출력
        console.error('Error fetching data:', err);
        setError('데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(data)}</Text>
      <FooterNavigation/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default Main;
