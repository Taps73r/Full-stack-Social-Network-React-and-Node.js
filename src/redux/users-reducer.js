const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
    users: [ ],
    pageSize: 6,
    totalUsersCount: 40,
    currentPage: 1
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
       
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
        case SET_USERS: {
            return { ...state, users: [...state.users, ...action.users] }
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