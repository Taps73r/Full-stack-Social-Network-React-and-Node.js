import React from "react";
import axios from "axios";
import "./Users.css";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import ErrorCatcherContainer from "../common/ErrorCatcher/ErrorCatcher";

class UsersAPIComponent extends React.Component {
  componentDidMount() {
    this.requestUsers();
  }
  requestUsers = (currentPage) => {
    const token = localStorage.getItem("token");
    this.props.setIsFetching(true);
    const { pageSize, newUserSearchText } = this.props;
    const url = `http://localhost:3002/users-info?page=${currentPage}&count=${pageSize}&term=${newUserSearchText}`;

    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.props.setUsers(response.data.items);
        this.props.setTotalUsersCount(response.data.totalCount);
        this.props.setIsFetching(false);
      })
      .catch((error) => {
        this.props.setIsFetching(false);
        this.props.setErrorMessage(
          error.response.data.message,
          error.response.status
        );
      });
  };

  subscribeUser = (followerId, followingId) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:3002/subscribe",
        { followingId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        this.props.toggleSubscription(followerId, followingId);
      })
      .catch((error) => {
        this.props.setErrorMessage(
          error.response.data.message,
          error.response.status
        );
      });
  };

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.requestUsers(pageNumber);
  };

  onSearchClick = () => {
    this.props.setCurrentPage(1);
    this.requestUsers();
  };

  render() {
    return (
      <>
        {this.props.errorMessage ? <ErrorCatcherContainer /> : <></>}
        {this.props.isFetching ? (
          <Preloader />
        ) : (
          <Users
            usersList={this.props.usersList}
            unfolowCurrentUser={this.props.unfolowCurrentUser}
            folowCurrentUser={this.props.folowCurrentUser}
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            newUserSearchText={this.props.newUserSearchText}
            updateSearchUserText={this.props.updateSearchUserText}
            onSearchClick={this.onSearchClick}
            handleSubscribe={this.subscribeUser}
            userId={this.props.userId}
          />
        )}
      </>
    );
  }
}

export default UsersAPIComponent;
