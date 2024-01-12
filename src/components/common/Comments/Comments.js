import React, { useState } from "react";
import "./Comments.css";
import axios from "axios";
import CommentsData from "./CommentsData";

const Comments = (props) => {
  const [showOtherComments, setShowOtherComments] = useState(false);
  const [responseComments, setCommentsFromResponse] = useState([]);

  const deleteComment = (commentId) => {
    const postId = props.postId;
    axios
      .delete(`http://localhost:3002/comments/${commentId}`, { postId })
      .then((response) => {})
      .catch((error) => {});
  };

  const getComments = () => {
    axios
      .get(`http://localhost:3002/comments/${props.postId}`)
      .then((response) => {
        setCommentsFromResponse(response.data.comments);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  };

  const handleShowHideComments = () => {
    if (!showOtherComments) {
      getComments(props.postId);
    }
    setShowOtherComments(!showOtherComments);
  };
  let commentsMapping;
  if (responseComments && responseComments.length > 0) {
    commentsMapping = responseComments.map((comment) => (
      <CommentsData
        loggedId={props.loggedId}
        deleteComment={deleteComment}
        comment={comment}
        key={comment._id}
      />
    ));
  }
  return (
    <div>
      <button onClick={handleShowHideComments}>
        {showOtherComments ? "Show Comments" : "Hide Comments"}
      </button>
      <div className="comments_block">
        {showOtherComments && <div>{commentsMapping}</div>}
      </div>
    </div>
  );
};

export default Comments;
