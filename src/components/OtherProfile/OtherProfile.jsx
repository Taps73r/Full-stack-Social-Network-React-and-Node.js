import React, { useState } from "react";
import Post from "../Profile/Posts/Post/Post";
import staticPhoto from "./../../photos/userstaticavatar.jpg";

const OtherProfile = (props) => {
  let [isSubscribed, setIsSubscribed] = useState(
    props.profileData.followers.indexOf(props.loggedId) !== -1
  );

  const wrapBioText = (aboutMe) => {
    const maxCharsPerLine = 20;
    if (aboutMe.length > maxCharsPerLine) {
      const regex = new RegExp(`.{1,${maxCharsPerLine}}`, "g");
      const wrappedBio = aboutMe.match(regex).join("\n");
      return wrappedBio;
    }
    return aboutMe;
  };

  const handleSubscription = () => {
    if (isSubscribed) {
      props.handleSubscribe(props.loggedId, props.profileData.userId);
      setIsSubscribed(!isSubscribed);
    } else {
      props.handleSubscribe(props.loggedId, props.profileData.userId);
      setIsSubscribed(!isSubscribed);
    }
  };
  let posts;
  if (props.postData && props.postData.length > 0) {
    posts = props.postData.map((post) => {
      return (
        <Post
          key={post._id}
          likes={post.likes}
          postId={post._id}
          userId={props.loggedId}
          likeCurrentPost={props.likeCurrentPost}
          message={post.postMessage}
          photos={post.photos}
          profileData={props.profileData}
        />
      );
    });
  } else {
    posts = <p>No posts available.</p>;
  }
  let userId = props.profileData.userId;
  let fullName = props.profileData.name;
  let profilePhoto = props.profileData.photo;
  let aboutMe = props.profileData.bio;

  return (
    <div className="UserProfile">
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
          <button onClick={handleSubscription}>
            {isSubscribed ? "Unfollow" : "Follow"}
          </button>
        </div>
        <div className="Posts">{posts}</div>
      </div>
    </div>
  );
};

export default OtherProfile;
