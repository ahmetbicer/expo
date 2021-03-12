import { NativeModules, DeviceEventEmitter, EventSubscription } from 'react-native';

export function isDevMenuAvailable(): boolean {
  return !!NativeModules.ExpoDevMenu;
}

export const DevMenu = NativeModules.ExpoDevMenu;

export function addUserLoginListener(callback: () => void): EventSubscription {
  return DeviceEventEmitter.addListener('expo.dev-menu.user-login', callback);
}

export function addUserLogoutListener(callback: () => void): EventSubscription {
  return DeviceEventEmitter.addListener('expo.dev-menu.user-logout', callback);
}

export async function getMyProjectsAsync(): Promise<any> {
  return await DevMenu.getMyProjectsAsync();
}

export async function getDevSessions(): Promise<any> {
  return await DevMenu.getDevSessions();
}

export async function isLoggedAsync(): Promise<boolean> {
  return await DevMenu.isLoggedAsync();
}

export async function openProfile() {
  DevMenu.openProfile();
}

export async function openMenu() {
  DevMenu.openMenu();
}

export async function openSettings() {
  DevMenu.openSettings();
}
