import staticPhoto from './../../photos/userstaticavatar.jpg';
let Users = (props) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
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
                <input type="text" onChange={updateFindText} value={props.newUserSearchText} placeholder="Find..." />
                    <button><span class="material-symbols-outlined">
                        search
                    </span></button>
                </div>
            </div>
            <div> <div className='users_area'>
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