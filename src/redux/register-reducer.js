const REGISTER_REQUEST = 'REGISTER_REQUEST';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
const REGISTER_FAILURE = 'REGISTER_FAILURE';
const REGISTER_PASS_UPDATE_TEXT = 'REGISTER_PASS_UPDATE_TEXT';
const REGISTER_USERNAME_UPDATE_TEXT = 'REGISTER_USERNAME_UPDATE_TEXT';

const initialState = {
  password: '',
  username: '',
  isLoading: false,
  success: false,
  error: null,
};

const registrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_PASS_UPDATE_TEXT:
      return{
        ...state,
        password: action.password
      }
      case REGISTER_USERNAME_UPDATE_TEXT:
      return{
        ...state,
        username: action.username
      }
    case REGISTER_REQUEST:
      return {
        ...state,
        isLoading: true,
        success: false,
        error: null,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        error: null,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isLoading: false,
        success: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const registerUpdatePassText = (text) => ({
  type: REGISTER_PASS_UPDATE_TEXT,
  password: text
})

export const registerUpdateUsernameText = (text) => ({
  type: REGISTER_USERNAME_UPDATE_TEXT,
  username: text
})
export const registerRequest = () => ({
  type: REGISTER_REQUEST,
});

export const registerSuccess = () => ({
  type: REGISTER_SUCCESS,
});

export const registerFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

export default registrationReducer;