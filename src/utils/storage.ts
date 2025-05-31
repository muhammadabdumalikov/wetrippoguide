import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'wetrippo-storage',
  encryptionKey: 'wetrippo-encryption-key'
});

export const StorageKeys = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
} as const;

export const setItem = (key: string, value: string) => {
  storage.set(key, value);
};

export const getItem = (key: string) => {
  return storage.getString(key);
};

export const removeItem = (key: string) => {
  storage.delete(key);
};

export const clearStorage = () => {
  storage.clearAll();
}; 