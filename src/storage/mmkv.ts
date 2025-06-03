import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'app-storage',
  encryptionKey: 'wetrip-storage-key',
});

// Helper functions for type-safe storage
export const setString = (key: string, value: string) => {
  storage.set(key, value);
};

export const getString = (key: string): string | undefined => {
  return storage.getString(key);
};

export const remove = (key: string) => {
  storage.delete(key);
}; 