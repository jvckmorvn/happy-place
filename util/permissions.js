import { Alert } from 'react-native';
import { PermissionStatus } from 'expo-image-picker';

export async function verifyPermissions(status) {
  if (status === PermissionStatus.UNDETERMINED) {
    const response = await requestPermission();
    return permissionResponse.granted;
  }

  if (status === PermissionStatus.DENIED) {
    Alert.alert('Error', 'Grant permission in order to use this app.');
    return false;
  }

  return true;
}