import { NavLink } from "react-router-dom"
import Post from "../Profile/Posts/Post/Post";
import staticPhoto from './../../photos/userstaticavatar.jpg';
let OtherProfile = (props) => {
    let posts;
    if (props.postData && props.postData.length > 0) {
        posts = props.postData.map(post => {
            return <Post key={post.postId} message={post.postMessage} />;
        });
    } else {
        posts = <p>No posts available.</p>;
    }
    let loggedInUserId = props.loggedId;
    let userId = props.profileData.userId;
    let fullName = props.profileData.name;
    let profilePhoto = props.profileData.photo;
    let aboutMe = props.profileData.bio;
    return (
        <div className="UserProfile">
            <NavLink to='/users'>Back to Users page</NavLink>
            <div className='profile_content'>
                <div className="profile_avatar">
                    <img src={profilePhoto != null ? profilePhoto : staticPhoto} alt="avatar" />
                    <button onClick={() => props.handleSubscribe(loggedInUserId, userId)}>
                        {props.profileData.followers.includes(loggedInUserId) ? 'Unfollow' : 'Follow'}
                    </button>
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
export default OtherProfile;