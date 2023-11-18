const initialState = {
  isAuthenticated: false,
  error: null,
  isFetching: false,
  userId: '',
  password: '',
  username: '',
  token: null
};

const LOGIN_PASS_UPDATE_TEXT = 'LOGIN_PASS_UPDATE_TEXT';
const LOGIN_USERNAME_UPDATE_TEXT = 'LOGIN_USERNAME_UPDATE_TEXT';
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAILURE = 'LOGIN_FAILURE';
const RESET_DATA = 'RESET_DATA';

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
        user: action.user.username,
        error: null,
        isFetching: false,
        token: action.user.token,
        userId: action.user.userId
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.error,
        isFetching: false
      };
    case RESET_DATA:
      return {
        ...state,
        isAuthenticated: false,
        error: null,
        isFetching: false,
        userId: '',
        password: '',
        username: '',
        token: null
      }
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

export const loginSuccess = (user, token, userId) => ({
  type: LOGIN_SUCCESS,
  user
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});

export const resetData = () => ({
  type: RESET_DATA
})

export default loginReducer;
