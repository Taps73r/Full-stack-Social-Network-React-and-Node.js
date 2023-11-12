const initialState = {
    isAuthenticated: false, 
    user: null,
    error: null
  };
  
  const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  const LOGIN_FAILURE = 'LOGIN_FAILURE';
  const LOGOUT = 'LOGOUT';
  
  const loginReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_SUCCESS:
        return {
          ...state,
          isAuthenticated: true,
          user: action.user,
          error: null,
        };
      case LOGIN_FAILURE:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          error: action.error,
        };
      case LOGOUT:
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const loginSuccess = (user) => ({
    type: LOGIN_SUCCESS,
    user,
  });
  
  export const loginFailure = (error) => ({
    type: LOGIN_FAILURE,
    error,
  });
  
  export const logout = () => ({
    type: LOGOUT,
  });
  
  export default loginReducer;
  