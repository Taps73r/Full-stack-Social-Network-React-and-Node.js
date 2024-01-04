const SET_PROFILE = "SET_PROFILE";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_SUBSCRIPTION_PROFILE = "TOGGLE_SUBSCRIPTION_PROFILE";

let initialState = {
  postData: [],
  profileData: "",
  isFetching: false,
};
export const otherProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SUBSCRIPTION_PROFILE:
      return {
        ...state,
        profileData: {
          ...state.profileData,
          followers: action.newFollowers,
        },
      };
    case SET_PROFILE:
      return {
        ...state,
        profileData: action.profileData,
        postData: action.profileData.posts || [],
      };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    default:
      return state;
  }
};
export const setProfile = (profileData) => ({
  type: SET_PROFILE,
  profileData,
});
export const setIsFetching = (isFetching) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});
export const toggleSubscriptionProfile = (newFollowers) => ({
  type: TOGGLE_SUBSCRIPTION_PROFILE,
  newFollowers,
});
