import UsersAPIComponent from "./UsersAPIComponent";
import { folowUser, setCurrentPage, setIsFetching, setTotalUsersCount, setUsersAC, unfolowUser, updateSearchUserText } from "../../redux/users-reducer";
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
        },
        updateSearchUserText: (text) => {
            dispatch(updateSearchUserText(text))
        },
        setIsFetching: (isFetching) => {
            dispatch(setIsFetching(isFetching))
        }
    }
}
let mapUsersToProps = (state) => {
    return {
        usersList: state.usersInfo.users,
        pageSize: state.usersInfo.pageSize,
        totalUsersCount: state.usersInfo.totalUsersCount,
        currentPage: state.usersInfo.currentPage,
        newUserSearchText: state.usersInfo.newUserSearchText,
        isFetching: state.usersInfo.isFetching
    }
}

let UsersContainer =  connect(mapUsersToProps, mapDispatchUserToProps)(UsersAPIComponent);

export default UsersContainer;