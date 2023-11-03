import React from 'react';
import axios from 'axios'
import './Users.css'
import Users from './Users';

class UsersAPIComponent extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount)
            })
    }
    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            })
    }
    render() {
        return <Users
            usersList={this.props.usersList}
            unfolowCurrentUser={this.props.unfolowCurrentUser}
            folowCurrentUser={this.props.folowCurrentUser}
            totalUsersCount={this.props.totalUsersCount}
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            onPageChanged={this.onPageChanged}
            newUserSearchText={this.props.newUserSearchText}
            updateSearchUserText={this.props.updateSearchUserText}
             />
    }
}

export default UsersAPIComponent;