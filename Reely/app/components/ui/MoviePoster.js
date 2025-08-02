import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const MoviePoster = ({ imageUrl, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      {imageUrl ? (
        <Image 
          source={{ uri: imageUrl }} 
          style={styles.image}
          resizeMode="cover"
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