// src/utils/handleBackButton.js
import { useEffect } from 'react';
import { BackHandler } from 'react-native';



// useBackButtonHandler 훅: 컴포넌트에서 사용되는 훅으로, 하드웨어 뒤로가기 버튼 동작을 처리
const useBackButtonHandler = (isModalOpened, setIsModalOpened) => {
  useEffect(() => {
    // handleBackButton 함수는 이전에 설명했던 것처럼 Modal 상태에 따라 뒤로가기 버튼을 제어
    const handleBackButton = () => {
      if (isModalOpened) {
        //setIsModalOpened(false);  // 모달을 닫기
        return false;  // 기본 뒤로가기를 방지
      }
      return false;  // 모달이 없으면 기본 뒤로가기 동작을 허용
    };
    
    // 하드웨어 뒤로가기 버튼이 눌렸을 때의 동작 처리
    const backHandlerListener = BackHandler.addEventListener(
      'hardwareBackPress',handleBackButton);

    // Cleanup: 컴포넌트가 언마운트되면 리스너를 제거
    return () => {
      backHandlerListener.remove();
    };
  }, [isModalOpened]);  // isModalOpened 상태가 변할 때마다 effect가 재실행됨
};

export { useBackButtonHandler };
