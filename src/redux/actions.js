
export const signUp = (gqlSignUp) => {
  return (dispatch, getState) => {
    dispatch(signUpPending())
    gqlSignUp()
      .then(
        data => dispatch(signUpFulfilled(data)),
        error => dispatch(signUpRejected(error))
      )
  }
}
export function signUpPending() {
  return {
    type: 'SIGN_UP_PENDING'
  }
}
export function signUpFulfilled(data) {
  return {
    type: 'SIGN_UP_FULFILLED',
    payload: data
  }
}
export function signUpRejected(err) {
  return {
    type: 'SIGN_UP_REJECTED',
    payload: err,
  }
}
export function phoneValidation() {
  return {
    type: 'PHONE_VALIDATION'
  }
}