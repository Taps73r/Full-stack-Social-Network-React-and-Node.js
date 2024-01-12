import React from "react";
import "./Comments.css";
import { NavLink } from "react-router-dom";
import staticPhoto from "./../../../photos/userstaticavatar.jpg";
const CommentsData = (props) => {
  const handleDeleteComment = () => {
    props.deleteComment(props.comment.comment._id);
  };
  return (
    <div>
      <div className="comment_text">
        <div className="photo_name_userComment">
          <NavLink to={`/user-profile/${props.comment.user.userId}`}>
            <img
              src={
                props.comment.user.photo != null
                  ? props.comment.user.photo
                  : staticPhoto
              }
              alt="User-Avatar"
            />
          </NavLink>
          <NavLink to={`/user-profile/${props.comment.user.userId}`}>
            <p>{props.comment.user.name}</p>
          </NavLink>
        </div>
        <div>
          <p>{props.comment.comment.commentText}</p>
        </div>
        {props.loggedId === props.comment.comment.userId ? (
          <button onClick={handleDeleteComment}>
            <span className="material-symbols-outlined">delete</span>
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default CommentsData;
