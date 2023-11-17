const ADD_POST = 'ADD-POST';
const UPDATE_TEXT_POST = 'UPDATE-TEXT-POST';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_PROFILE = 'SET_PROFILE';

let initialState = {
    postData: [],
    newPostText: '',
    isFetching: false,
    profileData: ''
}
export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                postData: [...state.postData, action.post],
                newPostText: ''
            }

        case UPDATE_TEXT_POST:
            return {
                ...state,
                newPostText: action.newText
            }
        case SET_PROFILE:
            return {
                ...state,
                profileData: action.profileData,
                postData: action.profileData.posts || [],
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        default:
            return state;
    }
}

export const updateTextActionCreator = (text) => ({
    type: UPDATE_TEXT_POST,
    newText: text
})

export const addPostActionCreator = (post) => ({
    type: ADD_POST,
    post
})
export const setIsFetching = (isFetching, userId) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching,
    userId
})
export const setProfile = (profileData, postData) => ({
    type: SET_PROFILE,
    profileData,
    postData
})