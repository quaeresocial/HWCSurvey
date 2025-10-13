import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from "./Constants";


const TOKEN = "token" + Constants.RN_CODEBASE_VERSION;

export async function setPrefs(key, value) {
    return await AsyncStorage.setItem(key, value);
}

export async function getPrefs(key) {
    return await AsyncStorage.getItem(key);
}

export async function setToken(token) {
    return await AsyncStorage.setItem(TOKEN, token);
}
export async function getToken() {
    return await AsyncStorage.getItem(TOKEN);
}

export async function clearAll() {
    return await AsyncStorage.clear();
  }
