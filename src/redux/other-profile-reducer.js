const SET_PROFILE = "SET_PROFILE";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_SUBSCRIPTION_PROFILE = "TOGGLE_SUBSCRIPTION_PROFILE";
const FETCH_POST_DATA = "FETCH_POST_DATA";
const SET_PAGE = "SET_PAGE";

let initialState = {
  postData: [],
  pagesCount: "",
  profileData: "",
  isFetching: false,
  page: 1,
};
export const otherProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_SUBSCRIPTION_PROFILE:
      return {
        ...state,
        profileData: {
          ...state.profileData,
          followers: [action.newFollowers],
        },
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case SET_PROFILE:
      return {
        ...state,
        profileData: action.profileData,
      };
    case FETCH_POST_DATA:
      return {
        ...state,
        postData: action.postData.posts,
        pagesCount: action.postData.pagesCount,
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
export const fetchPostData = (postData) => ({
  type: FETCH_POST_DATA,
  postData,
});
export const setPage = (page) => ({
  type: SET_PAGE,
  page,
});
