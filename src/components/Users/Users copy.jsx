import axios from 'axios'
import './Users.css'
import staticPhoto from './../../photos/userstaticavatar.jpg';

let Users = (props) => {
    if (props.usersList.length === 0) {
        axios.get("https://social-network.samuraijs.com/api/1.0/users")
            .then(response => {
                props.setUsers(response.data.items);
                console.log(response)
            })
    }
    return (
        <div className='users_area'>
            {props.usersList.map(u => <div key={u.id}>
                <div className='user_area'>
                    <div className="avatar_button">
                        <img src={u.photos.small != null ? u.photos.small : staticPhoto} alt="User-Avatar" />
                    </div>
                    <div className="users_info">
                        <p className='users_name'>{u.name}
                            {u.followed ? <button onClick={() => {
                                props.unfolowCurrentUser(u.id)
                            }}>Unfollow</button>
                                : <button onClick={() => {
                                    props.folowCurrentUser(u.id)
                                }}>Follow</button>}</p>
                        <p className='users_bio'>{u.id}</p>
                    </div>
                </div>
            </div>)}
        </div>
    )
}
