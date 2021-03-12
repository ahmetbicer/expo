import { NativeModules } from 'react-native';

const DevLauncher = NativeModules.EXDevLauncherInternal;

export async function getRecentlyOpenedApps(): Promise<{ [key: string]: string | null }[]> {
  return await DevLauncher.getRecentlyOpenedApps();
}

export async function loadApp(url: string): Promise<void> {
  return await DevLauncher.loadApp(url);
}
