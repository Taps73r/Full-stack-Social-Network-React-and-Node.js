import Post from './../Posts/Post/Post';
function ProfileInfo(props) {
    let posts = props.postData.map(post => {
        return <Post message={post.postMessage} />
    })
    return (
        <div>
            <div className='profileheader'>
                <img src='https://static.vecteezy.com/system/resources/previews/001/227/759/non_2x/abstract-modern-cool-geometric-pattern-background-vector.jpg' alt="header" />
            </div>
            <div className='profile_content'>
                <div className="profile_avatar">
                    <img alt="avatar" />
                </div>
                <div className='profile_name'>
                    <h1>Name</h1>
                </div>
                </div>
                <div className='profile_bio'>
                    <h1>Bio</h1>
            </div>
            <div className='Posts'>
                {posts}
            </div>
        </div>
    )
}

export default ProfileInfo;