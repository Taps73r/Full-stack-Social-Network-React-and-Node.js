import Post from './../Posts/Post/Post';
import './ProfileInfo.css';
import staticPhoto from './../../../photos/userstaticavatar.jpg';
import CreatePostContainer from '../Posts/CreatePostContainer';
function ProfileInfo(props) {
    let posts;
    if (props.postData && props.postData.length > 0) {
        posts = props.postData.map(post => {
            return <Post key={post.postId} message={post.postMessage} photos={post.photos} />;
        });
    } else {
        posts = <p>No posts available.</p>;
    }
    let setChangingInfo = () => {
        props.changeUserInfo();
    }
    let userId = props.profileData.userId;
    let fullName = props.profileData.name;
    let profilePhoto = props.profileData.photo;
    let aboutMe = props.profileData.bio;
    return (
        <div>
            <div className='profile_content'>
                <div className="profile_avatar">
                    <img src={profilePhoto != null ? profilePhoto : staticPhoto} alt="avatar" />
                    <button onClick={setChangingInfo}>Change Info</button>
                </div>
                <div className='profile_name'>
                    <p>{fullName != null ? fullName : 'Id ' + userId}</p>
                </div>
                <div className='profile_bio'>
                    <p>{aboutMe != null ? aboutMe : 'User has not set a bio.'}</p>
                </div>
            </div>
            <CreatePostContainer addPost={props.addPost} />
            <div className='Posts'>
                {posts}
            </div>
        </div>
    )
}

export default ProfileInfo;