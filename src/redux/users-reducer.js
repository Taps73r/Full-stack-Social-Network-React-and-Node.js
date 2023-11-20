const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const UPDATE_SEARCH_USER_TEXT = 'UPDATE_SEARCH_USER_TEXT';
const FIND_USER = 'FIND_USER';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_SUBSCRIPTION = 'TOGGLE_SUBSCRIPTION';

let initialState = {
    users: [],
    pageSize: 6,
    totalUsersCount: 40,
    currentPage: 1,
    newUserSearchText: '',
    isFetching: false
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case TOGGLE_SUBSCRIPTION: {
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.userId === action.userId) {
                        return {
                            ...u,
                            followers: u.followers.includes(action.followerId)
                                ? u.followers.filter(sub => sub !== action.followerId)
                                : [...u.followers, action.followerId],
                        };
                    }
                    return u;
                }),
            };
        }
        case UPDATE_SEARCH_USER_TEXT:
            return {
                ...state,
                newUserSearchText: action.newUserSearchText
            }
       
        case FIND_USER: {
            return { ...state, users: action.users }
        }
        case SET_USERS:
            {
                return { ...state, users: action.users }
            }
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage }
        }
        case SET_TOTAL_USERS_COUNT: {
            return { ...state, totalUsersCount: action.totalUsersCount }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        default:
            return state;
    }
}
export const setUsersAC = (users) => ({
    type: SET_USERS,
    users
})
export const setCurrentPage = (currentPage) => ({
    type: SET_CURRENT_PAGE,
    currentPage
})
export const setTotalUsersCount = (totalUsersCount) => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount
})
export const updateSearchUserText = (newUserSearchText) => ({
    type: UPDATE_SEARCH_USER_TEXT,
    newUserSearchText
})
export const findUser = (users) => ({
    type: FIND_USER,
    users
})
export const setIsFetching = (isFetching) => ({
    type: TOGGLE_IS_FETCHING,
    isFetching
})
export const toggleSubscription = (followerId, followingId) => ({
    type: TOGGLE_SUBSCRIPTION,
    userId: followingId,
    followerId
});