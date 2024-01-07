import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Post.css";
import EditPost from "../../../common/EditPost/EditPost";

function Post(props) {
  let likesCount = props.likes?.count || 0;
  let userId = props.userId;
  let profileId = props.profileData.userId;
  const [expanded] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [updateTextMenu, setUpdateTextMenu] = useState(false);
  //!!TO DO доробити лайки
  const [postLiked, likePost] = useState(true);

  const handleLikeClick = () => {
    debugger
    props.likeCurrentPost(props.postId);
    likePost(postLiked);
  };
  const handleMenuClick = () => {
    setMenuOpen(!isMenuOpen);
  };
  const editPostMenuClick = () => {
    setUpdateTextMenu(!updateTextMenu);
    setMenuOpen(!isMenuOpen);
  };
  let updateCurrentPostText = (e) => {
    const text = e.target.value;
    props.updateTextPost(text);
  };
  let sendUpdatePost = (e) => {
    e.preventDefault();
    props.updateCurrentPost(props.postId);
    setMenuOpen(!isMenuOpen);
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const wrapText = (text, maxLength) => {
    const words = text.split(" ");
    let currentLine = "";
    let result = "";

    for (const word of words) {
      if ((currentLine + word).length <= maxLength) {
        currentLine += word + " ";
      } else {
        result += currentLine.trim() + "\n";
        currentLine = word + " ";
      }
    }
    result += currentLine.trim();
    return result;
  };
  const photos = props.photos.map((photo, index) => (
    <div key={index}>
      <img src={photo} alt={`Post ${index + 1}`} />
    </div>
  ));

  const messageToShow = expanded ? props.message : wrapText(props.message, 46);
  return (
    <div className="posts">
      <div className="userPhoto">
        <div className="post_username_position">
          <img src={props.profileData.photo} alt="" />
          <p>{props.profileData.name}</p>
        </div>
        <div>
          {userId === profileId ? (
            <span
              className="material-symbols-outlined"
              onClick={handleMenuClick}
            >
              more_vert
            </span>
          ) : null}
          {isMenuOpen && (
            <EditPost
              postId={props.postId}
              deleteCurrentPost={props.deleteCurrentPost}
              editPostMenuClick={editPostMenuClick}
            />
          )}
        </div>
      </div>
      <div className="postPhotos">
        {updateTextMenu ? (
          <form className="EditForm">
            <textarea
              type="text"
              id="post_text"
              placeholder="Enter the text of your post here..."
              onChange={updateCurrentPostText}
              value={props.updatePostText}
            />
            <button
              type="submit"
              className="btn-post-save"
              onClick={sendUpdatePost}
            >
              Save
            </button>
          </form>
        ) : (
          <p style={{ wordWrap: "break-word", overflowWrap: "break-word" }}>
            {messageToShow}
          </p>
        )}
        <Slider {...settings}>{photos}</Slider>
      </div>
      <div className="likes_and_count">
        <button className={postLiked ? "liked_button": "like_button"} onClick={handleLikeClick}>
          <span class="material-symbols-outlined">thumb_up</span>
        </button>
        <p>{`${likesCount}`}</p>
      </div>
    </div>
  );
}

export default Post;
