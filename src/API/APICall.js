import Constants from '../common/Constants';
import {DeviceEventEmitter, Platform} from 'react-native';
import {getNetInfo, showToast} from '../common/common';
import {getDeviceId, getUniqueId} from 'react-native-device-info';
import {getToken} from '../common/Prefs';

async function apiRequest(
  method,
  url,
  body,
  onSuccess,
  onError,
  isAuth = false,
) {
  let query = '';
  let config = {
    method,
    headers: {'Content-Type': 'application/json'},
  };
  let deviceId = await getUniqueId();
  let common_params = {
    Deviceid: deviceId,
    deviceOs: Platform.OS == 'android' ? 'A' : 'I',
  };
  let isConnected = await getNetInfo();

  if (isConnected) {
    if (method === 'GET') {
      if (body) query = paramsToUrlQueryParams(body);
    } else {
      if (body) {
        let params = {...body, ...common_params};
        config['body'] = JSON.stringify(params);
        console.log('params===>>', params);
      }
    }
    Constants.access_token = await getToken();
    if (isAuth) {
      config['headers'] = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Constants.access_token}`,
      };
      console.log(Constants.access_token);
    }
    try {
      console.log('called Url:==> ', url);
      let response = await fetch(url + query, config);
      let responseJson = await response.json();

      if (response.ok) {
        if (onSuccess) onSuccess(responseJson);
      } else {
        if (response.status == 401) {
          DeviceEventEmitter.emit('Unauthorized', responseJson);
        } else if (onError) onError(responseJson);
      }

      return responseJson;
    } catch (error) {
      if (onError) onError(error);
      console.log(error, 'oioioi');
    }
  } else {
    let NoInternet = {no_internet: true, message: 'Interbet messag ehere'};
    showToast('No Internet');
    return NoInternet;
  }
}
async function apiRequestWithFormData(
  method,
  url,
  body,
  onSuccess,
  onError,
  isAuth = false,
) {
  let query = '';
  let config = {
    method,
  };
  let isConnected = await getNetInfo();
  if (isConnected) {
    if (body) config['body'] = body;

    if (isAuth) {
      config['headers'] = {
        Authorization: `Bearer ${Constants.access_token}`,
      };
    }
    console.log(config);
    try {
      let response = await fetch(url, config);
      console.log(response, url);
      let responseJson = await response.json();

      if (response.status >= 200 && response.status <= 299) {
        if (onSuccess) onSuccess(responseJson);
      } else {
        if (onError) onError(responseJson);
      }
      return responseJson;
    } catch (error) {
      onError(error);
      alert(error);
      console.log(error, 'oioioi');
    }
  } else {
    let NoInternet = {no_internet: true, message: 'No Internet!!!'};
    return NoInternet;
  }
}

export async function loginApi(body, success, error) {
  return apiRequest(
    'POST',
    `${Constants.API_BASE_URL}App/CheckLoginSurvey`,
    body,
    success,
    error,
    false,
  );
}

export async function recentlyAddedFacility(body, success, error) {
  return apiRequest(
    'POST',
    `${Constants.API_BASE_URL}Auth/FacilityDetailsHWCSurvey_v1`,
    body,
    success,
    error,
    true,
  );
}

export async function serviceList(body, success, error) {
  return apiRequest(
    'POST',
    `${Constants.API_BASE_URL}Auth/HWCServiceTypeList`,
    body,
    success,
    error,
    true,
  );
}

export async function serviceDetail(body, success, error) {
  return apiRequest(
    'POST',
    `${Constants.API_BASE_URL}auth/HWCSurveyById`,
    body,
    success,
    error,
    true,
  );
}

export async function allGrampanchayat(body, success, error) {
  return apiRequest(
    'POST',
    `${Constants.API_BASE_URL}App/GetBlockGrampanchayat`,
    body,
    success,
    error,
    false,
  );
}

export async function allVillageApi(body, success, error) {
  return apiRequest(
    'POST',
    `${Constants.API_BASE_URL}App/GetGrampanchayatVillage`,
    body,
    success,
    error,
    false,
  );
}

export async function updateserviceDetail(body, success, error) {
  return apiRequest(
    'POST',
    `${Constants.API_BASE_URL}auth/SaveHWCSurveyDetails`,
    body,
    success,
    error,
    true,
  );
}

export async function allDistrictApi(success, error) {
  return apiRequest(
    'POST',
    `${Constants.API_BASE_URL}App/GetStateDistrict`,
    null,
    success,
    error,
    false,
  );
}

export async function allBlockApi(body, success, error) {
  return apiRequest(
    'POST',
    `${Constants.API_BASE_URL}App/GetDistrictBlock`,
    body,
    success,
    error,
    false,
  );
}

export async function allFacilityApi(body, success, error) {
  return apiRequest(
    'POST',
    `${Constants.API_BASE_URL}App/GetFacilityNameById`,
    body,
    success,
    error,
    false,
  );
}

export async function uploadImageApi(body, success, error) {
  return apiRequestWithFormData(
    'POST',
    `${Constants.API_BASE_URL}App/UploadDocImage`,
    body,
    success,
    error,
    false,
  );
}

export async function changePasswordApi(body, success, error) {
  return apiRequest(
    'POST',
    `${Constants.API_BASE_URL}auth/ChangePassword`,
    body,
    success,
    error,
    true,
  );
}

export async function HwcSourceListApi(success, error) {
  return apiRequest(
    'GET',
    `${Constants.API_BASE_URL}auth/HWCSourceList`,
    null,
    success,
    error,
    true,
  );
}

export async function GetAamTypeAPI(success, error) {
  return apiRequest(
    'GET',
    `${Constants.API_BASE_URL}auth/GetAamType`,
    null,
    success,
    error,
    true,
  );
}

function paramsToUrlQueryParams(params) {
  var esc = encodeURIComponent;
  var query = '';
  if (params) {
    query = '?';
    query += Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
  }
  return query;
}
