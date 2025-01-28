import React, { useState } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import styled from 'styled-components/native';

const SwitchToggle = ({ isOn, onToggle, onColor = '#005EFF', offColor = '#444444', onWheelColor = '#FFFFFF', offWheelColor = '#888888' }) => {
  const [aniValue, setAniValue] = useState(new Animated.Value(0));
  const color = isOn ? onColor : offColor;
  const wheelColor = isOn ? onWheelColor : offWheelColor;

  // 애니메이션으로 스위치 바퀴의 위치를 이동
  const moveSwitchToggle = aniValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20],
  });

  // 토글 상태에 따라 애니메이션 실행
  React.useEffect(() => {
    Animated.timing(aniValue, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [isOn]);

  return (
    <Wrap>
      <Pressable onPress={onToggle}>
        <ToggleContainer style={{ backgroundColor: color }}>
          <ToggleWheel style={[styles.toggleWheel, { 
                                                      transform: [{ translateX: moveSwitchToggle }] 
                                                      , backgroundColor : wheelColor}]} />
        </ToggleContainer>
      </Pressable>
    </Wrap>
  );
};

const Wrap = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Pressable = styled.TouchableOpacity`
  padding: 10px;
`;

const ToggleContainer = styled.View`
  width: 50px;
  height: 30px;
  padding-left: 2px;
  border-radius: 15px;
  justify-content: center;
`;
 
const ToggleWheel = styled(Animated.View)`
  width: 25px;
  height: 25px;
  background-color: #888888;
  border-radius: 12.5px;
`;

const styles = StyleSheet.create({
  toggleWheel: {
    shadowColor: '#000',
    backgroundColor: '#888888',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 1.5,
  },
});

export default SwitchToggle;
