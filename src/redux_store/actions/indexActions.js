import {SET_LOADING} from './types'

export const setLoading = value => dispatch => {
  dispatch({
    type: SET_LOADING,
    payload: value,
  })
}



