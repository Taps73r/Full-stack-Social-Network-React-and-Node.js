import React from "react";

const CommentsData = (props) => {
  const handleDeleteComment = () => {
    props.deleteComment(props.comment._id);
  };
  return (
    <div className="comment_text">
      {props.comment.commentText}
      {props.loggedId === props.comment.userId ? (
        <button onClick={handleDeleteComment}>Delete</button>
      ) : null}
    </div>
  );
};

export default CommentsData;