import {Linking, PermissionsAndroid, Platform} from 'react-native';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import Geolocation from '@react-native-community/geolocation'
import GetLocation from 'react-native-get-location';
import { showSingleBtnDialog } from '../common/common';

export async function requestAndroidLocationPermission() {
 
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    console.log("dfbhbhgghg==============================",granted)
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
      return PermissionsAndroid.RESULTS.GRANTED;
      // alert("You can use the location");
    } else {

      showSingleBtnDialog("Alert","Location permission is not approved, please allow",()=>{
        if (Platform.OS === 'ios') {
          Linking.openURL('app-settings:');
        } else {
          Linking.openSettings();
        }
      },()=>{},"Go to setting","Cancel")
    }
  } catch (err) {
    console.warn(err);
  }
}

export async function requestAndroidCameraPermission() {
  try {
    const granted = await PermissionsAndroid.requestMultiple([PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, PermissionsAndroid.PERMISSIONS.CAMERA]
     ,
      {
        title: 'CFC Kanpur',
        message: 'CFC Kanpur required some permissions',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
      return PermissionsAndroid.RESULTS.GRANTED;
      // alert("You can use the location");
    } else {
      console.log('location permission denied');
      // alert("Location permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
}

export async function checkIosLocationPermision() {
  try {
    // await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE).then((result) => {
    //   console.log(result)
    // });
    const permission = check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then(async result => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            return RESULTS.UNAVAILABLE;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            const res = await request(
              PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
            ).then(result => {
              return result;
            });
            console.log(res);
            return res;
          case RESULTS.LIMITED:
            console.log('The permission is limited: some actions are possible');
            return RESULTS.LIMITED;
          case RESULTS.GRANTED:
            return result;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            return RESULTS.BLOCKED;
        }
      })
      .catch(error => {
        // …
      });
    return permission;
  } catch (e) {}
}

export async function getCurrentLocation() {
  const permission = await permissionCheck();
  try {
    const options = {
      enableHighAccuracy: true,
      timeout: 15000,
      distanceFilter: 10,
      maximumAge: 10000,
      forceLocationManager: true,
    };
    const position = await getPosition(options);
    return position;
  } catch (err) {
    // alert(err.message)
    console.error(err.message);
  }
}

export async function getCurrentLocation2() {
  const permission = await permissionCheck();

  if (!permission) {
    // alert('Location Permission is denied. Please enable it in settings.');
  } else {
    try {
      const options = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      };
      const position = await GetLocation.getCurrentPosition(options);
      console.log(position,"hererrere");
      return position;
    } catch (err) {
      //  alert(err.message)
    }
  }
}

function getPosition(options) {
  return new Promise((resolve, reject) =>
    Geolocation.getCurrentPosition(resolve, reject, options),
  );
}

export async function permissionCheck() {
  let permission =
    Platform.OS == 'ios'
      ? await checkIosLocationPermision()
      : await requestAndroidLocationPermission();
  return permission;
}


export async function requestLocationPermission() {
  try {
    const permissionStatus = await request(Platform.select({
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    }));

    if (permissionStatus === RESULTS.GRANTED) {
      console.log('Location permission granted=====');
      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          (position) => {
            console.log(position,'==============================')
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
          },
          (error) => {
            console.log('Error:', error.message);
            reject(error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      });
    } else {
      console.log('Location permission denied');
      return null;
    }
  } catch (error) {
    console.log('Error requesting location permission:', error);
    return null;
  }
}







