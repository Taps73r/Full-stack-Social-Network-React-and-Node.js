import Post from "./../Posts/Post/Post";
import "./ProfileInfo.css";
import staticPhoto from "./../../../photos/userstaticavatar.jpg";
import CreatePostContainer from "../Posts/CreatePostContainer";

function ProfileInfo(props) {
  let posts;
  if (props.postData && props.postData.length > 0) {
    posts = props.postData.map((post) => {
      return (
        <Post
          key={post._id}
          likes={post.likes}
          postId={post._id}
          userId={props.userId}
          likeCurrentPost={props.likeCurrentPost}
          updatePostText={props.updatePostText}
          updateTextPost={props.updateTextPost}
          deleteCurrentPost={props.deleteCurrentPost}
          updateCurrentPost={props.updateCurrentPost}
          message={post.postMessage}
          photos={post.photos}
          profileData={props.profileData}
        />
      );
    });
  } else {
    posts = <p>No posts available.</p>;
  }

  let setChangingInfo = () => {
    props.changeUserInfo();
  };
  function wrapBioText(aboutMe) {
    const maxCharsPerLine = 20;
    if (aboutMe.length > maxCharsPerLine) {
      const regex = new RegExp(`.{1,${maxCharsPerLine}}`, "g");
      const wrappedBio = aboutMe.match(regex).join("\n");
      return wrappedBio;
    }
    return aboutMe;
  }

  let userId = props.profileData.userId;
  let fullName = props.profileData.name;
  let profilePhoto = props.profileData.photo;
  let aboutMe = props.profileData.bio;

  return (
    <div className="profile_content">
      <div className="profile_avatar">
        <div className="profile_name_bio">
          <img
            src={profilePhoto != null ? profilePhoto : staticPhoto}
            alt="avatar"
          />
          <div className="name_bio">
            <div className="profile_name">
              <p>{fullName != null ? fullName : "Id " + userId}</p>
            </div>
            <div className="profile_bio">
              <p>
                {aboutMe != null
                  ? wrapBioText(aboutMe)
                  : "User has not set a bio."}
              </p>
            </div>
          </div>
        </div>
        <button onClick={setChangingInfo}>Change Info</button>
      </div>
      <CreatePostContainer addPost={props.addPost} />
      <div className="Posts">{posts}</div>
    </div>
  );
}

export default ProfileInfo;
