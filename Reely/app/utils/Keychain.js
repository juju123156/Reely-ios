/*
import * as Keychain from 'react-native-keychain';

// 🔒 데이터 저장
export const saveSecureData = async (key, value) => {
  try {
    await Keychain.setGenericPassword(key, value);
    console.log('✅ 데이터 저장 성공');
  } catch (error) {
    console.error('❌ 데이터 저장 실패:', error);
  }
};

// 🔑 데이터 불러오기
export const getSecureData = async (key) => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials && credentials.username === key) {
      console.log('🔓 데이터 불러오기 성공:', credentials.password);
      return credentials.password;
    }
    console.log('⚠️ 저장된 데이터 없음');
    return null;
  } catch (error) {
    console.error('❌ 데이터 불러오기 실패:', error);
    return null;
  }
};

// 🗑️ 데이터 삭제
export const deleteSecureData = async () => {
  try {
    await Keychain.resetGenericPassword();
    console.log('🗑️ 데이터 삭제 성공');
  } catch (error) {
    console.error('❌ 데이터 삭제 실패:', error);
  }
};
*/