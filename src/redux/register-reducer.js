const initialState = {
    isRegistered: false, 
    error: null
  };
  
  const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
  const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';
  
  const registrationReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTRATION_SUCCESS:
        return {
          ...state,
          isRegistered: true,
          error: null,
        };
      case REGISTRATION_FAILURE:
        return {
          ...state,
          isRegistered: false,
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export const registrationSuccess = () => ({
    type: REGISTRATION_SUCCESS
  });
  
  export const registrationFailure = (error) => ({
    type: REGISTRATION_FAILURE,
    error
  });
  
  export default registrationReducer;