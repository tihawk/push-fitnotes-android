import { SettingsKeyT, SettingsT } from "../util/interfaces";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function setSetting(key: SettingsKeyT, value: string) {
  AsyncStorage.setItem(key, value)
}

export async function getSetting(key: SettingsKeyT) {
  return await AsyncStorage.getItem(key)
}

export async function getDataExportSettings(): Promise<SettingsT['exportData']> {
  const keys: SettingsKeyT[] = ['defaultActiveTime', 'defaultRestTime', 'defaultAvgHeartrate', 'shouldGenerateHeartrate']
  const result: SettingsT['exportData'] = {} as SettingsT['exportData']
  // @ts-ignore
  (await AsyncStorage.multiGet(keys)).forEach(kvp => result[kvp[0] as SettingsKeyT] = kvp[1])
  return result
}