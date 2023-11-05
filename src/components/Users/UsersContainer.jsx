import UsersAPIComponent from "./UsersAPIComponent";
import { folowUser, setCurrentPage, setIsFetching, setTotalUsersCount, setUsersAC, unfolowUser, updateSearchUserText } from "../../redux/users-reducer";
import { connect } from 'react-redux';

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

let UsersContainer = connect(mapUsersToProps,
    {
        folowCurrentUser: folowUser,
        unfolowCurrentUser: unfolowUser,
        setUsers: setUsersAC,
        setCurrentPage: setCurrentPage,
        setTotalUsersCount,
        updateSearchUserText,
        setIsFetching
    })
    (UsersAPIComponent);

export default UsersContainer;