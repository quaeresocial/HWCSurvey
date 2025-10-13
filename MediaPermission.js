import React, { useEffect, useCallback } from 'react';
import { Platform, Alert } from 'react-native';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';

const MediaPermission = () => {
  
  const handlePermission = useCallback(async () => {
    try {
      const permissions = Platform.OS === 'ios' 
        ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY] 
        : [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE];

      const result = await requestMultiple(permissions);
      console.log('Permission Result:', result);
      
      // Check if any permission is denied and notify the user
      const deniedPermissions = Object.keys(result).filter(key => result[key] === 'denied');
      if (deniedPermissions.length > 0) {
        Alert.alert('Permission Denied', `Please grant the following permissions: ${deniedPermissions.join(', ')}`);
      }
      
    } catch (error) {
      console.log('Permission Error:', error);
      Alert.alert('Error', 'An error occurred while requesting permissions.');
    }
  }, []);

  useEffect(() => {
    handlePermission();
  }, [handlePermission]);

  return null; 
};

export default MediaPermission;
