import {
  Alert,
  BackHandler,
  Dimensions,
  Linking,
  PixelRatio,
  Platform,
  Share,
} from 'react-native'
import Constants from './Constants'
import Toast from 'react-native-simple-toast'
import moment from 'moment'
export const deviceWidth = Dimensions.get('window').width
import NetInfo from '@react-native-community/netinfo'
import {getAddressFromLatLong} from '../API/APICall'
import Strings from './Strings'
export function myAlert (msg, yesCallback, positiveText = 'Continue') {
  Alert.alert(
    'Confirmation',
    msg,
    [
      {
        text: positiveText,
        onPress: () => {
          yesCallback()
        },
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
    ],
    {cancelable: false},
  )
}
export function showToast (msg) {
  !!msg && Toast.show(msg)
}

export function isEmpty (value) {
  return !!!value
}

export function isValidEmail (email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

export function isValidName(name) {
  if (!name) return false
  name = name.trim()
  const re = /^[\p{L}]+([\p{L}'., -]*[\p{L}])?$/u
  return re.test(name)
}

export function isValidIndianMobileNumber(number) {
  // Remove spaces and country code if present
  const cleaned = number.trim().replace(/^(\+91[\-\s]?|0)/, '');

  // Must start with 6, 7, 8, or 9 and be exactly 10 digits
  const re = /^[6789]\d{9}$/;

  // Reject numbers with all identical digits (e.g., 9999999999)
  const allSameDigits = /^(\d)\1{9}$/;

  return re.test(cleaned) && !allSameDigits.test(cleaned);
}



export function openUrl (url) {
  Linking.canOpenURL(url).then(
    supported => {
      supported && Linking.openURL(url)
    },
    err => console.log(err),
  )
}

export function share () {
  Share.share({
    title: Constants.APP_NAME,
    message: Constants.SHARE_MESSAGE,
  }).then(({action, activityType}) => {
    console.log(action == Share.sharedAction, activityType)
  })
}

export function shareText (msg) {
  Share.share({title: Constants.APP_NAME, message: msg}).then(
    ({action, activityType}) => {
      console.log(action == Share.sharedAction, activityType)
    },
  )
}

export function shareViaWhatsapp (text) {
  const url = `whatsapp://send?text=${text}`
  Linking.canOpenURL(url).then(
    supported => {
      supported && Linking.openURL(url)
    },
    err => console.log(err),
  )
}

export const exitAlert = () => {
  Alert.alert(
    'Confirm exit',
    'Do you want to quit the app?',
    [
      {text: 'Rate App', onPress: () => rateApp()},
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: () => BackHandler.exitApp()},
    ],
    {cancelable: false},
  )
}

export function normalize (size) {
  const scale = deviceWidth / 360
  let newSize = scale * size
  if (Platform.OS == 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 1
}

export function getWidth (size) {
  const scale = deviceWidth / 360
  let newSize = scale * size

  return Math.round(newSize)
}
export function getElapsedTime (startDateTime, endDateTime) {
  let elapsedSeconds = moment
    .duration(moment(endDateTime).diff(moment(startDateTime)))
    .asSeconds()
  if (elapsedSeconds < 0) elapsedSeconds = 0
  return elapsedSeconds
}

export function getFormattedTime (elapsedSeconds) {
  let days = 0
  let hours = 0
  let minutes = 0
  let seconds = 0

  if (parseInt(elapsedSeconds) >= parseInt(86400)) {
    days = parseInt(elapsedSeconds) / parseInt(86400)
    elapsedSeconds = parseInt(elapsedSeconds) - parseInt(days) * parseInt(86400)
  }
  if (parseInt(elapsedSeconds) >= parseInt(3600)) {
    hours = parseInt(elapsedSeconds) / parseInt(3600)
    elapsedSeconds = parseInt(elapsedSeconds) - parseInt(hours) * parseInt(3600)
  }
  if (parseInt(elapsedSeconds) >= parseInt(60)) {
    minutes = parseInt(elapsedSeconds) / parseInt(60)
    elapsedSeconds = parseInt(elapsedSeconds) - parseInt(minutes) * parseInt(60)
  }

  seconds = parseInt(elapsedSeconds)

  if (parseInt(days) > 0) {
    return parseInt(days) + 'd ' + parseInt(hours) + 'h'
  } else if (parseInt(hours) > 0) {
    return parseInt(hours) + 'h ' + parseInt(minutes) + 'm'
  } else {
    let min = ''
    let sec = ''
    if (minutes < 10) min = '0' + parseInt(minutes)
    else min = parseInt(minutes)

    if (seconds < 10) sec = '0' + parseInt(seconds)
    else sec = parseInt(seconds)

    //setInitialTimeRemaining(min + ':' + sec +'');
    return min + 'm ' + sec + 's'
  }
}

export function getTimeWithAgo (unix_timestamp) {
  var date = new Date(unix_timestamp * 1000)

  return moment(date).fromNow()
}
export async function getNetInfo () {
  return NetInfo.fetch().then(state => {
    return state.isConnected
  })
}

export async function getAddressLatLng (lat, long) {
  let address = await getAddressFromLatLong(lat, long)

  var add = address.results[0].address_components
  let filter = add.filter(item => {
    console.log(item)
    return item.types.includes('locality')
  })
  console.log(filter)

  return filter[0].short_name
}
export const isImgLink = url => {
  if (typeof url !== 'string') {
    return false
  }
  return (
    url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) !== null
  )
}
export function getCurrentDateTime (format = 'yyyy-MM-DD HH:mm:ss') {
  let date_time = moment().format(format)
  console.log(date_time.toString())
  return date_time
}
export function getDateTime (date, format = 'yyyy-MM-DD hh:mm:ss') {
  let date_time = moment(date).format(format)

  return date == 'NA' || date == undefined ? '-' : date_time
}

export function calculateDistance (
  lattitude1,
  longittude1,
  lattitude2,
  longittude2,
) {
  const toRadian = n => (n * Math.PI) / 180

  let lat2 = lattitude2
  let lon2 = longittude2
  let lat1 = lattitude1
  let lon1 = longittude1

  console.log(lat1, lon1 + '===' + lat2, lon2)
  let R = 6371 // km
  let x1 = lat2 - lat1
  let dLat = toRadian(x1)
  let x2 = lon2 - lon1
  let dLon = toRadian(x2)
  let a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadian(lat1)) *
      Math.cos(toRadian(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  let d = R * c
  console.log('distance==?', d * 1000)

  let distance = d * 1000 - 400

  if (distance < 0) distance = 0
  console.log('distance2==?', distance)

  return distance
}
export function getInitialFromName (name) {
  if (!!name) return name.charAt(0).toUpperCase()
  else return ''
}
export function showSingleBtnDialog (
  title,
  msg,
  callback,
  negativeCallback,
  positiveText = 'Yes',
  negativeText = 'No',
) {
  Alert.alert(
    title,
    msg,
    [
      {
        text: positiveText,
        onPress: () => {
          callback()
        },
        style: 'cancel',
      },
      {
        text: negativeText,
        onPress: () => {
          negativeCallback()
        },
        style: 'cancel',
      },
    ],
    {cancelable: false},
  )
}
export function showError (error) {
  !!error.message && alert(error.message)
}
export function removeSpecialChar (val) {
  try {
    if (val) {
      if (val === undefined || val === Strings.rupee_symbol || val === '-')
        return 0
      else if (val === 0) return 0
      return val.toString().replace(/[^\d\.\-]/g, '')
    } else {
      return 0
    }
  } catch (error) {}
}
