import './Users.css'
let Users = (props) => {

    if (props.usersList.length === 0) {
        props.setUsers([
            {
                id: 1, urlavatar: 'https://i.pinimg.com/originals/52/44/51/52445112a105eff7356c28288f9a11ac.png',
                name: 'Taps73r', bio: 'Frontend developer, looking for a job...', subscribe: false
            },
            {
                id: 2, urlavatar: 'https://i.pinimg.com/originals/52/44/51/52445112a105eff7356c28288f9a11ac.png',
                name: 'Dima', bio: '.NET developer, looking for a job...', subscribe: false
            },
            {
                id: 3, urlavatar: 'https://i.pinimg.com/originals/52/44/51/52445112a105eff7356c28288f9a11ac.png',
                name: 'Darina', bio: 'Student, looking for Taps73r <3', subscribe: false
            },
            {
                id: 4, urlavatar: 'https://i.pinimg.com/originals/52/44/51/52445112a105eff7356c28288f9a11ac.png',
                name: 'Taps73r', bio: 'Frontend developer, looking for a job...', subscribe: false
            },
            {
                id: 5, urlavatar: 'https://i.pinimg.com/originals/52/44/51/52445112a105eff7356c28288f9a11ac.png',
                name: 'Dima', bio: '.NET developer, looking for a job...', subscribe: false
            },
            {
                id: 6, urlavatar: 'https://i.pinimg.com/originals/52/44/51/52445112a105eff7356c28288f9a11ac.png',
                name: 'Darina', bio: 'Student, looking for Taps73r <3', subscribe: false
            }
        ])
    }

    return (
        <div className='users_area'>
            {props.usersList.map(u => <div key={u.id}>
                <div className='user_area'>
                    <div className="avatar_button">
                        <img src={u.urlavatar} alt="User-Avatar" />
                    </div>
                    <div className="users_info">
                        <p className='users_name'>{u.name}
                            {u.subscribe ? <button onClick={() => {
                                props.unfolowCurrentUser(u.id)
                            }}>Unfollow</button>
                                : <button onClick={() => {
                                    props.folowCurrentUser(u.id)
                                }}>Follow</button>}</p>
                        <p className='users_bio'>{u.bio}</p>
                    </div>
                </div>
            </div>)}
        </div>
    )
}

export default Users;