const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const UPDATE_SEARCH_USER_TEXT = 'UPDATE_SEARCH_USER_TEXT';
const FIND_USER = 'FIND_USER';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';

let initialState = {
    users: [],
    pageSize: 6,
    totalUsersCount: 40,
    currentPage: 1,
    newUserSearchText: '',
    isFetching: true
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {

        case UPDATE_SEARCH_USER_TEXT:
            return {
                ...state,
                newUserSearchText: action.newUserSearchText
            }
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            }
        case FIND_USER: {
            return { ...state, users: action.users }
        }
        case SET_USERS: {
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

export const folowUser = (userId) => ({
    type: FOLLOW,
    userId
})

export const unfolowUser = (userId) => ({
    type: UNFOLLOW,
    userId
})
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