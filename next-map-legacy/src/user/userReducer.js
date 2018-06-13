import {
  USER_SIGN_IN_SUCCESS,
  USER_SIGN_OUT_SUCCESS,
  USER_OBTAIN_LOGIN_STATE_SUCCESS
} from './userActions'

const initialState = {
  currentUser: null,
  loggedIn: false
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_SIGN_IN_SUCCESS:
      return {
        currentUser: action.payload,
        loggedIn: true
      }
    case USER_SIGN_OUT_SUCCESS:
      return {
        currentUser: null,
        loggedIn: false
      }
    case USER_OBTAIN_LOGIN_STATE_SUCCESS:
      return {
        currentUser: action.payload.user,
        loggedIn: action.payload.signed_in
      }
    default:
      return state
  }
}

export default user
