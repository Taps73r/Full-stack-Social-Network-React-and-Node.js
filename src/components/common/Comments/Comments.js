import React, { useState } from "react";
import "./Comments.css";
import axios from "axios";
import CommentsData from "./CommentsData";

const Comments = (props) => {
  const [showOtherComments, setShowOtherComments] = useState(false);
  const [responseComments, setCommentsFromResponse] = useState([]);
  let [commentText, changeCommentText] = useState("");

  const deleteComment = (commentId) => {
    axios
      .delete(`http://localhost:3002/comments/${commentId}`)
      .then((response) => {
        setCommentsFromResponse(response.data.comments);
      })
      .catch((error) => {});
  };
  const sendComent = (postId, commentText) => {
    const userId = props.loggedId;
    console.log(postId, commentText, userId);
    axios
      .post(`http://localhost:3002/comments/${postId}`, { userId, commentText })
      .then((response) => {
        setCommentsFromResponse([
          ...responseComments,
          response.data.newComment,
        ]);
      })
      .catch((response) => {});
  };
  const handleSendComent = (e) => {
    e.preventDefault();
    sendComent(props.postId, commentText);
    changeCommentText("");
    props.addCommentToCount();
  };
  const updateCommentText = (e) => {
    const text = e.target.value;
    changeCommentText(text);
  };
  const getComments = () => {
    axios
      .get(`http://localhost:3002/comments/${props.postId}`)
      .then((response) => {
        console.log(response.data)
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
    commentsMapping = responseComments.map((comment, index) => (
      <CommentsData
        deleteCommentFromCount={props.deleteCommentFromCount}
        loggedId={props.loggedId}
        profileId={props.profileId}
        deleteComment={deleteComment}
        comment={comment}
        key={index}
      />
    ));
  }
  return (
    <div className="all-comment-block">
      <div className="coment_block">
        <form>
          <textarea
            onChange={updateCommentText}
            id="post_comment-text"
            value={commentText}
            maxLength={20}
            placeholder="Enter here text of your comment"
          ></textarea>
          <button onClick={handleSendComent} type="submit">
            Send
          </button>
        </form>
      </div>
      <button id="show-more-comments" onClick={handleShowHideComments}>
        {showOtherComments ? "Hide Comments" : "Show Comments"}
      </button>
      <div className="comments_block">
        {showOtherComments && <div>{commentsMapping}</div>}
      </div>
    </div>
  );
};

export default Comments;
