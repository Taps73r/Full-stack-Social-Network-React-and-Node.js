import React from 'react';
import axios from 'axios';
import './Users.css';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';

class UsersAPIComponent extends React.Component {
    componentDidMount() {
        this.requestUsers();
    }
    requestUsers = (currentPage) => {
        this.props.setIsFetching(true);
        const { pageSize, newUserSearchText } = this.props;
        const url = `https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}&term=${newUserSearchText}`;

        axios.get(url)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
                this.props.setIsFetching(false);
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.requestUsers(pageNumber);
    }

    onSearchClick = () => {
        this.props.setCurrentPage(1);
        this.requestUsers();
    }

    render() {
        return (
            <>
                {
                    this.props.isFetching ? <Preloader /> : <Users
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
                    />
                }
            </>
        );
    }
}

export default UsersAPIComponent;
