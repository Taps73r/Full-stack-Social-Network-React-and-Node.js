const ADD_POST = 'ADD-POST';
const UPDATE_TEXT_POST = 'UPDATE-TEXT-POST';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const SET_PROFILE = 'SET_PROFILE';

let initialState = {
    postData: [{ id: 1, postMessage: 'dsadads' }, { id: 2, postMessage: 'dsad1231243ads' }],
    newPostText: '',
    isFetching: false,
    profileData: null
}
export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                postData: [...state.postData, { id: 3, postMessage: state.newPostText }],
                newPostText: ''
            }

        case UPDATE_TEXT_POST:
            return {
                ...state,
                newPostText: action.newText
            }
        case SET_PROFILE:
            {
                return { ...state, profileData: action.profileData }
            }
        case TOGGLE_IS_FETCHING: {
            return {
                ...state,
                isFetching: action.isFetching
            }
        }
        default:
            return state;
    }
}

export const updateTextActionCreator = (text) => ({
    type: UPDATE_TEXT_POST,
    newText: text
})

export const addPostActionCreator = () => ({ type: ADD_POST })
export const setIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})
export const setProfile = (profileData) => ({
    type: SET_PROFILE,
    profileData
})