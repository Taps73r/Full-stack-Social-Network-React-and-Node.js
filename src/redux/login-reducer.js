const initialState = {
  isAuthenticated: false,
  user: '',
  error: null,
  isFetching: false,
  id: null,
  password: '',
  username: '',
};

const LOGIN_PASS_UPDATE_TEXT = 'LOGIN_PASS_UPDATE_TEXT';
const LOGIN_USERNAME_UPDATE_TEXT = 'LOGIN_USERNAME_UPDATE_TEXT';
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_PASS_UPDATE_TEXT:
      return {
        ...state,
        password: action.password
      }
    case LOGIN_USERNAME_UPDATE_TEXT:
      return {
        ...state,
        username: action.username
      }
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.user,
        error: null,
        isFetching: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.error,
        isFetching: false
      };
    default:
      return state;
  }
};

export const loginUserNameText = (text) => ({
  type: LOGIN_USERNAME_UPDATE_TEXT,
  username: text
})

export const loginPassText = (text) => ({
  type: LOGIN_PASS_UPDATE_TEXT,
  password: text
})

export const loginRequest = () => ({
  type: LOGIN_REQUEST
})

export const loginSuccess = (user, token) => ({
  type: LOGIN_SUCCESS,
  user
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});


export default loginReducer;
