import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Post.css";
import EditPost from "../../../common/EditPost/EditPost";
import Comments from "../../../common/Comments/Comments";
import axios from "axios";
import { NavLink } from "react-router-dom";
import staticPhoto from "../../../../photos/userstaticavatar.jpg";

function Post(props) {
  const likesCount = props.likes?.length || 0;
  const userId = props.userId;
  const profileId = props.profileData.userId;
  const [expanded] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [updateTextMenu, setUpdateTextMenu] = useState(false);
  const [showComents, setShowComents] = useState(false);
  const [postLiked, likePost] = useState(
    props.likes.includes(userId) ? true : false
  );
  let [commentsCount, changeCommentsCount] = useState();
  let [plusLike, addLiketoPost] = useState(likesCount);
  useEffect(() => {
    const getCommentsCount = () => {
      const token = localStorage.getItem("token");
      axios
        .get(`http://localhost:3002/comments/${props.postId}/count`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          changeCommentsCount(response.data.count);
        })
        .catch((error) => {});
    };
    getCommentsCount();
  }, [props.postId]);

  const showHideComent = () => {
    setShowComents(!showComents);
  };
  const handleLikeClick = () => {
    const newLikeState = !postLiked;
    props.likeCurrentPost(props.postId);
    if (newLikeState) {
      addLiketoPost(plusLike + 1);
    } else {
      addLiketoPost(plusLike - 1);
    }
    likePost(newLikeState);
  };
  const deleteCommentFromCount = () => {
    changeCommentsCount(--commentsCount);
  };
  const addCommentToCount = () => {
    changeCommentsCount(++commentsCount);
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
    <>
      <div className="posts">
        <div className="userPhoto">
          <div className="post_username_position">
            <NavLink to={`/user-profile/${props.profileData.userId}`}>
              <img
                src={
                  props.profileData.photo != null
                    ? props.profileData.photo
                    : staticPhoto
                }
                alt=""
              />
            </NavLink>
            <NavLink
              id="post_userLink"
              to={`/user-profile/${props.profileData.userId}`}
            >
              <p>{props.profileData.name}</p>
            </NavLink>
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
          <button
            className={postLiked ? "liked_button" : "like_button"}
            onClick={handleLikeClick}
          >
            <span className="material-symbols-outlined">thumb_up</span>
          </button>
          <p>{`${plusLike}`}</p>
          <button
            className={showComents ? "active_coment_btn" : "coment_btn"}
            onClick={showHideComent}
          >
            <span className="material-symbols-outlined">chat_bubble</span>
          </button>
          <p>{`${commentsCount}`}</p>
        </div>
      </div>
      {showComents ? (
        <Comments
          addCommentToCount={addCommentToCount}
          deleteCommentFromCount={deleteCommentFromCount}
          postId={props.postId}
          loggedId={props.userId}
          profileId={profileId}
        />
      ) : null}
    </>
  );
}

export default Post;
