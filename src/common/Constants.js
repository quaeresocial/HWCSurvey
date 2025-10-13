import Colors from "./Colors";
import ImageAssets from "./ImageAssets";

const DEBUG = false;
const API_BASE_URL = 'https://uphealthfacility.in/api/';
const IMAGE_BASE_URL = 'https://uphealthfacility.in';

export default {
  DEBUG,
  API_BASE_URL,
  IMAGE_BASE_URL
};



export const genderData = [
  {
    id: '1',
    title: 'Male',
    value: 'Male',
    selected: true,
  },
  {
    id: '2',
    title: 'Female',
    value: 'Female',
    selected: false,
  },
  {
    id: '3',
    title: 'Other',
    value: 'Other',
    selected: false,
  },
];

export var fcm_token = '';
export var user_id = '';
export var access_token = '';
export function debugLog(...msg) {
  if (DEBUG === true) console.log(msg);
}