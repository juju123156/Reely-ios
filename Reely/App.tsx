// app.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';

const App = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const baseUrl = Config.BASE_URL;
  console.log(Config.ENV);
  useEffect(() => {
    // API 요청 함수
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/data`); // 여기에 Spring Boot URL과 API 엔드포인트를 넣으세요.
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
