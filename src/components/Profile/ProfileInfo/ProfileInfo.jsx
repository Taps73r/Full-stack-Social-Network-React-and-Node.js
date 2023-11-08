import Post from './../Posts/Post/Post';
import './ProfileInfo.css';
import staticPhoto from './../../../photos/userstaticavatar.jpg';
function ProfileInfo(props) {
    let posts = props.postData.map(post => {
        return <Post message={post.postMessage} />
    })
    let userId = props.profileData.userId;
    let fullName = props.profileData.fullName;
    let profilePhoto = props.profileData.photos.large;
    let aboutMe = props.profileData.aboutMe;
    return (
        <div>
            <div className='profile_content'>
                <div className="profile_avatar">
                    <img src={profilePhoto != null ? profilePhoto : staticPhoto} alt="avatar" />
                </div>
                <div className='profile_name'>
                    <p>{fullName != null ? fullName : 'Id ' + userId}</p>
                </div>
                <div className='profile_bio'>
                    <p>{aboutMe != null ? aboutMe : 'User has not set a bio.'}</p>
                </div>
            </div>
            <div className='Posts'>
                {posts}
            </div>
        </div>
    )
}

export default ProfileInfo;