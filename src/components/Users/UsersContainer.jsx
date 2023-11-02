import Users from "./Users";
import { folowUser, setUsersAC, unfolowUser } from "../../redux/users-reducer";
import { connect } from 'react-redux';

let mapDispatchUserToProps = (dispatch) => {
    return {
        folowCurrentUser: (userId) => {
            dispatch(folowUser(userId))
        },
        unfolowCurrentUser: (userId) => {
            dispatch(unfolowUser(userId))
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        }
    }
}
let mapUsersToProps = (state) => {
    return {
        usersList: state.usersInfo.users,
        pageSize: state.usersInfo.pageSize,
        totalUsersCount: state.usersInfo.totalUsersCount,
        currentPage: state.usersInfo.currentPage
    }
}

let UsersContainer =  connect(mapUsersToProps, mapDispatchUserToProps)(Users);

export default UsersContainer