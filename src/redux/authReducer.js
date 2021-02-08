import { SIGN_UP, LOG_IN, PHONE_VALIDATION } from "./actionsTypes";
import createReducer from "../helpers/createReducer";
import {prop} from "ramda";

export const PENDING = '_PENDING'
export const FULFILLED = '_FULFILLED'
export const REJECTED = '_REJECTED'
export const CLEAR = '_CLEAR'

export const actionPending = actionName => `${actionName}${PENDING}`
export const actionFulfilled = actionName => `${actionName}${FULFILLED}`
export const actionRejected = actionName => `${actionName}${REJECTED}`
export const actionClear = actionName => `${actionName}${CLEAR}`

const initialState = {
  loading: false,
  error: false,
  success: false,
  isSignedUp: false,
  data: null,
  phoneValidation: false,
}

export const reducers = {
  [PHONE_VALIDATION](state) {
    return {
      ...state,
      phoneValidation: true
    }
  },
  [actionPending(SIGN_UP)](state) {
    return {
      ...state,
      loading: true,
    }
  },
  [actionFulfilled(SIGN_UP)](state, { payload }) {
    return {
      ...state,
      data: prop('data', payload),
      loading: false,
      isSignedUp: true,
      phoneValidation: false,
    }
  },
  [actionRejected(SIGN_UP)](state, { payload }) {
    return {
      ...state,
      loading: false,
      error: prop('message', payload),
      isSignedUp: false,
    }
  },
  [actionPending(LOG_IN)](state, {}) {
    return {
      ...state,
      loading: true,
    }
  },
  [actionFulfilled(LOG_IN)](state, payload) {
    return {
      ...state,
      payload,
      loading: false,
    }
  },
  [actionRejected(LOG_IN)](state, payload) {
    return {
      ...state,
      payload,
      loading: false,
      error: true,
    }
  },
}

export default createReducer(initialState, reducers)