import React from 'react';
import axios from 'axios'
import './Users.css'
import staticPhoto from './../../photos/userstaticavatar.jpg';

class Users extends React.Component {
    componentDidMount() {
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                this.props.setUsers(response.data.items);
            })
    }
    render() {
        let pagesCount = this.props.totalUsersCount / this.props.pageSize;
        let pages = [];

        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        return <div> <div className='users_area'>
            {this.props.usersList.map(u => <div key={u.id}>
                <div className='user_area'>
                    <div className="avatar_button">
                        <img src={u.photos.small != null ? u.photos.small : staticPhoto} alt="User-Avatar" />
                    </div>
                    <div className="users_info">
                        <p className='users_name'>{u.name}
                            {u.followed ? <button onClick={() => {
                                this.props.unfolowCurrentUser(u.id)
                            }}>Unfollow</button>
                                : <button onClick={() => {
                                    this.props.folowCurrentUser(u.id)
                                }}>Follow</button>}</p>
                        <p className='users_bio'>{u.id}</p>
                    </div>
                </div>
            </div>)}
        </div>
            <div className='pagination'>
                {pages.map(p => <div className={this.props.currentPage === p && 'selectedPage'}> {p} </div>)}
            </div>
        </div>
    }
}

export default Users;