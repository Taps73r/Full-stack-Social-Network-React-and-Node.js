import React from "react";
import "./Comments.css";
import { NavLink } from "react-router-dom";
import staticPhoto from "./../../../photos/userstaticavatar.jpg";
const CommentsData = (props) => {
  const handleDeleteComment = () => {
    props.deleteComment(props.comment.comment._id);
    props.deleteCommentFromCount();
  };
  return (
    <div>
      <div className="comment_text">
        <div className="photo_name_userComment">
          <div className="post_username_position">
            <NavLink to={`/user-profile/${props.comment.comment.userId}`}>
              <img
                src={
                  props.comment.user.photo != null
                    ? props.comment.user.photo
                    : staticPhoto
                }
                alt="User-Avatar"
              />
            </NavLink>
            <NavLink
              id="post_userName"
              to={`/user-profile/${props.comment.comment.userId}`}
            >
              <p>{props.comment.user.name}</p>
            </NavLink>
          </div>
        </div>
        <div>
          <p>{props.comment.comment.commentText}</p>
        </div>
        {props.loggedId === props.comment.comment.userId ||
        props.loggedId === props.profileId ? (
          <button onClick={handleDeleteComment}>
            <span className="material-symbols-outlined">delete</span>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default CommentsData;
