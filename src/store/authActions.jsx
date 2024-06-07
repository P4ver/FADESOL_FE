// // redux/actions/authActions.js
// export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
// export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// export const loginSuccess = (userData) => ({
//   type: LOGIN_SUCCESS,
//   payload: userData,
// });

// export const loginFailure = (error) => ({
//   type: LOGIN_FAILURE,
//   payload: error,
// });
// export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
// export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

// export const logoutSuccess = () => ({
//   type: LOGOUT_SUCCESS,
// });

// export const logoutFailure = (error) => ({
//   type: LOGOUT_FAILURE,
//   payload: error,
// });



// redux/actions/authActions.js
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logoutFailure = (error) => ({
  type: LOGOUT_FAILURE,
  payload: error,
});
export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});
