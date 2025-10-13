import React, { useEffect, useState } from 'react';
import { Alert, Linking, Platform, PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { request, check, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions';
import { promptForEnableLocationIfNeeded } from 'react-native-android-location-enabler';

const RequestLocationPermission = async () => {
  if (Platform.OS === 'android') {
    // Request location permission for Android
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } else {
    // Request location permission for iOS
    const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    return status === RESULTS.GRANTED;
  }
};

const CheckLocationServicesEnabled = () => {
  Geolocation.getCurrentPosition(
    (position) => {
      console.log('Location is enabled', position);
    },
    (error) => {
      if (error.code === 1) {
        Alert.alert('Permission Denied', 'Location permission is required to use this app.', [
          {
            text: 'Open Settings',
            onPress: () => openSettings(),
          },
          { text: 'Cancel', style: 'cancel' },
        ]);
      } else if (error.code === 2) {
        handleEnabledPressed()
      }
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
};

async function handleEnabledPressed() {
    if (Platform.OS === 'android') {
      try {
        const enableResult = await promptForEnableLocationIfNeeded();
        console.log('enableResult', enableResult);
        // The user has accepted to enable the location services
        // data can be :
        //  - "already-enabled" if the location services has been already enabled
        //  - "enabled" if user has clicked on OK button in the popup
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          // The user has not accepted to enable the location services or something went wrong during the process
          // "err" : { "code" : "ERR00|ERR01|ERR02|ERR03", "message" : "message"}
          // codes :
          //  - ERR00 : The user has clicked on Cancel button in the popup
          //  - ERR01 : If the Settings change are unavailable
          //  - ERR02 : If the popup has failed to open
          //  - ERR03 : Internal error
        }
      }
    }
  }

const LocationChecker = () => {
  useEffect(() => {
    const requestPermissionAndCheckLocation = async () => {
      const permissionGranted = await RequestLocationPermission();
      if (permissionGranted) {
        CheckLocationServicesEnabled(); // Check if GPS is enabled
      }
    };

    requestPermissionAndCheckLocation();
  }, []);

  return null; // You can use this in any screen component where you want this behavior
};

export default LocationChecker;
