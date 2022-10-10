import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (key, value) => {
  try {
    await AsyncStorage.setItem(`@${key}`, value);
  } catch (e) {
    // saving error
    console.log('hata', e);
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(`@${key}`);
    if (value !== null) {
      // Data okunabilir ise
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (e) {
    // error reading value
    return null;
  }
};

export const removeStorageData = async (key) => {
  try {
    await AsyncStorage.removeItem(`@${key}`);
  } catch (e) {
    console.log('hata', e);
  }
};
