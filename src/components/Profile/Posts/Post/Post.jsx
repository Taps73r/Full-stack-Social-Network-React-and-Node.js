import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Post.css";
import EditPost from "../../../common/EditPost/EditPost";
import Comments from "../../../common/Comments/Comments";
import axios from "axios";
// TODO: Develop comment block
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
  const [commentsCount, changeCommentsCount] = useState();
  let [plusLike, addLiketoPost] = useState(likesCount);
  let [commentText, changeCommentText] = useState("");
  useEffect(() => {
    const getCommentsCount = () => {
      axios
        .get(`http://localhost:3002/comments/${props.postId}`)
        .then((response) => {
          console.log(response);
          changeCommentsCount(response.data.count);
        })
        .catch((error) => {});
    };
    getCommentsCount();
  }, [props.postId]);
  const handleSendComent = (e) => {
    e.preventDefault();
    props.sendComent(props.postId, commentText);
    changeCommentText("");
  };
  const updateCommentText = (e) => {
    const text = e.target.value;
    changeCommentText(text);
  };
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
          <button
            className={postLiked ? "liked_button" : "like_button"}
            onClick={handleLikeClick}
          >
            <span class="material-symbols-outlined">thumb_up</span>
          </button>
          <p>{`${plusLike}`}</p>
          <button
            className={showComents ? "active_coment_btn" : "coment_btn"}
            onClick={showHideComent}
          >
            <span class="material-symbols-outlined">chat_bubble</span>
          </button>
          <p>{`${commentsCount}`}</p>
        </div>
      </div>
      {showComents ? (
        <div className="coment_block">
          <form>
            <textarea
              onChange={updateCommentText}
              value={commentText}
            ></textarea>
            <button onClick={handleSendComent} type="submit">
              Send
            </button>
          </form>
          <Comments loggedId={props.userId} postId={props.postId} />
        </div>
      ) : null}
    </>
  );
}

export default Post;
