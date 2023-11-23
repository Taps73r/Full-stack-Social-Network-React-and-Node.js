import { NavLink } from 'react-router-dom';
import staticPhoto from './../../photos/userstaticavatar.jpg';
let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    const loggedInUserId = props.userId;
    const maxPageButtons = 10;
    const currentPage = props.currentPage;
    let startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1);
    let endPage = startPage + maxPageButtons - 1;
    if (endPage > pagesCount) {
        endPage = pagesCount;
        startPage = Math.max(endPage - maxPageButtons + 1, 1);
    }
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }
    if (startPage > 1) {
        pages.unshift(1);
    }
    if (endPage < pagesCount) {
        pages.push(pagesCount);
    }
    const updateFindText = (e) => {
        const text = e.target.value;
        props.updateSearchUserText(text);
    }
    return (
        <>
            <div className='find_user'>
                <div className='find_user_border'>
                    <textarea onChange={updateFindText} value={props.newUserSearchText} placeholder="Find..."></textarea>
                    <button onClick={props.onSearchClick} className='find_btn'><span className="material-symbols-outlined">
                        search
                    </span></button>
                </div>
            </div>
            <div> <div className='users_area'>
                {props.usersList.map(u => <div key={u.userId}>
                    <div className='user_area'>
                        <div className="avatar_button">
                            <NavLink to={'/user-profile/' + u.userId}>
                                <img src={staticPhoto} alt="User-Avatar" />
                            </NavLink>
                        </div>
                        <div className="users_info">
                            <div className='users_name'>
                                <NavLink to={'/user-profile/' + u.userId} className='Remove_style'>
                                    <p>{u.name}</p>
                                </NavLink>
                                <button onClick={() => props.handleSubscribe(loggedInUserId, u.userId)}>
                                    {u.followers.includes(loggedInUserId) ? 'Unfollow' : 'Follow'}
                                </button>
                            </div>
                            <p className='users_bio'>{u.bio}</p>
                        </div>
                    </div>
                </div>)}
            </div>
                <div className='pagination'>
                    {
                        pages.map(p =>
                            <div id={props.currentPage === p ? 'selectedPage' : ''}
                                onClick={() => props.onPageChanged(p)}> {p} </div>
                        )}
                </div>
            </div>
        </>
    )
}

export default Users;