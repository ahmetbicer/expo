import { UnavailabilityError } from '@unimodules/core';
import { Platform } from 'react-native';
import {
  PermissionResponse,
  PermissionStatus,
  PermissionExpiration,
} from 'unimodules-permissions-interface';

import ExpoAdsAdMob from './ExpoAdsAdMob';

export { PermissionResponse, PermissionStatus, PermissionExpiration };

const androidPermissionsResponse: PermissionResponse = {
  granted: true,
  expires: 'never',
  canAskAgain: true,
  status: PermissionStatus.GRANTED,
};

export async function requestPermissionsAsync(): Promise<PermissionResponse> {
  if (Platform.OS === 'android') {
    return Promise.resolve(androidPermissionsResponse);
  }

  if (!ExpoAdsAdMob.requestPermissionsAsync) {
    throw new UnavailabilityError('AdMod', 'requestPermissionsAsync');
  }
  return await ExpoAdsAdMob.requestPermissionsAsync();
}

export async function getPermissionsAsync(): Promise<PermissionResponse> {
  if (Platform.OS === 'android') {
    return Promise.resolve(androidPermissionsResponse);
  }

  if (!ExpoAdsAdMob.getPermissionsAsync) {
    throw new UnavailabilityError('AdMod', 'getPermissionsAsync');
  }
  return await ExpoAdsAdMob.getPermissionsAsync();
}

/**
 * Returns whether the AdMob API is enabled on the current device. This does not check the native configuration.
 *
 * @returns Async `boolean`, indicating whether the AdMob API is available on the current device. Currently this resolves `true` on iOS and Android only.
 */
export async function isAvailableAsync(): Promise<boolean> {
  return !!ExpoAdsAdMob.setTestDeviceIDAsync;
}

export async function setTestDeviceIDAsync(testDeviceID: string | null): Promise<void> {
  if (!ExpoAdsAdMob.setTestDeviceIDAsync) {
    throw new UnavailabilityError('expo-ads-admob', 'setTestDeviceIDAsync');
  }
  await ExpoAdsAdMob.setTestDeviceIDAsync(testDeviceID || '');
}
