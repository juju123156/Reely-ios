import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Config from 'react-native-config';

const MoviePoster = ({ imageUrl, onPress, style }) => {
  const [error, setError] = React.useState(false);
  const resolvedUrl = React.useMemo(() => {
    if (!imageUrl) return null;
    if (/^https?:\/\//i.test(imageUrl)) return imageUrl;
    const base = (Config?.BASE_URL || '').replace(/\/$/, '');
    const path = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    return `${base}${path}`;
  }, [imageUrl]);
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      {resolvedUrl && !error ? (
        <Image 
          source={{ uri: resolvedUrl }} 
          style={styles.image}
          resizeMode="cover"
          onError={() => setError(true)}
        />
      ) : (
        <View style={styles.placeholder} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 120,
    height: 180,
    marginRight: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 2.5,
    borderWidth: 0.5,
    borderColor: '#333333',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(51, 51, 51, 0.5)',
    borderRadius: 2.5,
    borderWidth: 0.5,
    borderColor: '#333333',
  },
});

export default MoviePoster; 