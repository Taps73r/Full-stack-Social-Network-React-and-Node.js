import UsersAPIComponent from "./UsersAPIComponent";
import { setCurrentPage, setIsFetching, setTotalUsersCount, setUsersAC, toggleSubscription, updateSearchUserText } from "../../redux/users-reducer";
import { connect } from 'react-redux';

let mapUsersToProps = (state) => {
    return {
        usersList: state.usersInfo.users,
        pageSize: state.usersInfo.pageSize,
        totalUsersCount: state.usersInfo.totalUsersCount,
        currentPage: state.usersInfo.currentPage,
        newUserSearchText: state.usersInfo.newUserSearchText,
        isFetching: state.usersInfo.isFetching,
        userId: state.loginInfo.userId
    }
}

let UsersContainer = connect(mapUsersToProps,
    {
        setUsers: setUsersAC,
        setCurrentPage: setCurrentPage,
        setTotalUsersCount,
        updateSearchUserText,
        setIsFetching,
        toggleSubscription
    })
    (UsersAPIComponent);

export default UsersContainer;