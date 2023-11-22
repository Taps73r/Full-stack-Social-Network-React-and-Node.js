const SET_PROFILE = 'SET_PROFILE';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
let initialState = {
    postData: [],
    profileData: '',
    isFetching: false,

}
export const otherProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PROFILE:
            return {
                ...state,
                profileData: action.profileData,
                postData: action.profileData.posts || [],

            }
        case TOGGLE_IS_FETCHING:
            return { ...state, isFetching: action.isFetching }
        default:
            return state;
    }
}
export const setProfile = (profileData, postData) => ({
    type: SET_PROFILE,
    profileData,
    postData
})
export const setIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})