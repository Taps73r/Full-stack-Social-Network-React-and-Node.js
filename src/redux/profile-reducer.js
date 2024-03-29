const ADD_POST = "ADD-POST";
const UPDATE_TEXT_POST = "UPDATE-TEXT-POST";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const SET_PROFILE = "SET_PROFILE";
const CHANGE_USER_INFO = "CHANGE_USER_INFO";
const RETURN_CHANGE_INFO = "RETURN_CHANGE_INFO";
const UPDATE_CHANGE_BIO_TEXT = "UPDATE_CHANGE_BIO_TEXT";
const UPDATE_CHANGE_NAME_TEXT = "UPDATE_CHANGE_NAME_TEXT";
const UPLOAD_AVATAR = "UPLOAD_AVATAR";
const UPLOAD_POST_IMAGES = "UPLOAD_POST_IMAGES";
const UPDATE_POST_TEXT = "UPDATE_POST_TEXT";
const SET_POST_DATA = "SET_POST_DATA";
const SET_LIKE = "SET_LIKE";
const FETCH_POST_DATA = "FETCH_POST_DATA";

let initialState = {
  postData: [],
  newPostText: "",
  isFetching: false,
  profileData: "",
  changingInfo: false,
  changeBioText: "",
  changeNameText: "",
  avatar: "",
  newPostImages: [],
  updatePostText: "",
};
export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        postData: [...state.postData, action.post.newPost],
        newPostText: "",
        newPostImages: [],
      };
    case UPDATE_TEXT_POST:
      return {
        ...state,
        newPostText: action.newText,
      };
    case FETCH_POST_DATA:
      return {
        ...state,
        postData: action.postData,
      };
    case SET_POST_DATA:
      return {
        ...state,
        postData: action.postData.posts,
        updatePostText: "",
      };
    case UPLOAD_POST_IMAGES:
      return {
        ...state,
        newPostImages: action.images,
      };
    case SET_LIKE:
      return {};
    case UPLOAD_AVATAR:
      return {
        ...state,
        avatar: action.avatarUrl,
      };
    case SET_PROFILE:
      return {
        ...state,
        profileData: action.profileData,
      };
    case UPDATE_POST_TEXT:
      return {
        ...state,
        updatePostText: action.text,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case CHANGE_USER_INFO:
      return {
        ...state,
        changingInfo: true,
      };
    case RETURN_CHANGE_INFO:
      return {
        ...state,
        changingInfo: false,
      };
    case UPDATE_CHANGE_BIO_TEXT:
      return {
        ...state,
        changeBioText: action.changeBioText,
      };
    case UPDATE_CHANGE_NAME_TEXT:
      return {
        ...state,
        changeNameText: action.changeNameText,
      };
    default:
      return state;
  }
};

export const setPostData = (postData) => ({
  type: SET_POST_DATA,
  postData,
});
export const returnChangeUserInfo = () => ({
  type: RETURN_CHANGE_INFO,
});
export const changeUserInfo = () => ({
  type: CHANGE_USER_INFO,
});
export const updateChangeNameText = (text) => ({
  type: UPDATE_CHANGE_NAME_TEXT,
  changeNameText: text,
});
export const uploadPostImages = (images) => ({
  type: UPLOAD_POST_IMAGES,
  images,
});
export const updateChangeBioText = (text) => ({
  type: UPDATE_CHANGE_BIO_TEXT,
  changeBioText: text,
});
export const updateTextActionCreator = (text) => ({
  type: UPDATE_TEXT_POST,
  newText: text,
});

export const addPostActionCreator = (post) => ({
  type: ADD_POST,
  post,
});
export const setIsFetching = (isFetching, userId) => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
  userId,
});
export const setProfile = (profileData) => ({
  type: SET_PROFILE,
  profileData,
});
export const fetchPostData = (postData) => ({
  type: FETCH_POST_DATA,
  postData,
});
export const uploadAvatar = (avatarUrl) => ({
  type: UPLOAD_AVATAR,
  avatarUrl,
});
export const updateTextPost = (text) => ({
  type: UPDATE_POST_TEXT,
  text,
});
