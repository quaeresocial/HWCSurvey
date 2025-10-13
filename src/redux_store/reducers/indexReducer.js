import {
  SET_LOADING,
} from '../actions/types'

const initialState = {
  is_loading: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        is_loading: action.payload,
      }
    default:
      return state
  }
}
