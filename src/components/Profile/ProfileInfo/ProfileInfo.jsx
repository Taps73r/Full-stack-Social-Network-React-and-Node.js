import Post from './../Posts/Post/Post';
import staticPhoto from './../../../photos/userstaticavatar.jpg';
function ProfileInfo(props) {
    let posts = props.postData.map(post => {
        return <Post message={post.postMessage} />
    })
    let fullName = props.profileData.fullName;
    let profilePhoto = props.profileData.photos.large;

    return (
        <div>
            <div className='profile_content'>
                <div className="profile_avatar">
                    <img src={profilePhoto != null ? profilePhoto : staticPhoto} alt="avatar" />
                </div>
                <div className='profile_name'>
                    <h1>{fullName}</h1>
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