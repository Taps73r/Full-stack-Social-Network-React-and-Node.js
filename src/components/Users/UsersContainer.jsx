import UsersAPIComponent from "./UsersAPIComponent";
import { folowUser, setCurrentPage, setTotalUsersCount, setUsersAC, unfolowUser } from "../../redux/users-reducer";
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
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPage(pageNumber))
        },
        setTotalUsersCount: (totalUsersCount) => {
            dispatch(setTotalUsersCount(totalUsersCount))
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

let UsersContainer =  connect(mapUsersToProps, mapDispatchUserToProps)(UsersAPIComponent);

export default UsersContainer;