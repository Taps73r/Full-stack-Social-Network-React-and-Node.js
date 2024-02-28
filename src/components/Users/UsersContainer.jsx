import UsersAPIComponent from "./UsersAPIComponent";
import {
  setCurrentPage,
  setIsFetching,
  setTotalUsersCount,
  setUsersAC,
  toggleSubscription,
  updateSearchUserText,
} from "../../redux/users-reducer";
import { connect } from "react-redux";
import { setErrorMessage } from "../../redux/error-reducer";

let mapUsersToProps = (state) => {
  return {
    usersList: state.usersInfo.users,
    pageSize: state.usersInfo.pageSize,
    totalUsersCount: state.usersInfo.totalUsersCount,
    currentPage: state.usersInfo.currentPage,
    newUserSearchText: state.usersInfo.newUserSearchText,
    isFetching: state.usersInfo.isFetching,
    userId: state.loginInfo.userId,
    errorMessage: state.errorInfo.errorMessage,
  };
};

let UsersContainer = connect(mapUsersToProps, {
  setUsers: setUsersAC,
  setCurrentPage: setCurrentPage,
  setTotalUsersCount,
  updateSearchUserText,
  setIsFetching,
  toggleSubscription,
  setErrorMessage,
})(UsersAPIComponent);

export default UsersContainer;
