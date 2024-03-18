import React, { useState } from "react";
import "./Comments.css";
import axios from "axios";
import CommentsData from "./CommentsData";
import ErrorCatcherContainer from "../ErrorCatcher/ErrorCatcher";

const Comments = (props) => {
  const [showOtherComments, setShowOtherComments] = useState(false);
  const [responseComments, setCommentsFromResponse] = useState([]);
  let [commentText, changeCommentText] = useState("");

  const deleteComment = (commentId) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`https://converso-social-network-api.onrender.com/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCommentsFromResponse(response.data.comments);
      })
      .catch((error) => {
        props.setErrorMessage(
          error.response.data.message,
          error.response.status
        );
      });
  };
  const sendComent = (postId, commentText) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `https://converso-social-network-api.onrender.com/comments/${postId}`,
        { commentText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setCommentsFromResponse([
          ...responseComments,
          response.data.newComment,
        ]);
      })
      .catch((error) => {
        props.setErrorMessage(
          error.response.data.message,
          error.response.status
        );
      });
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
    const token = localStorage.getItem("token");
    axios
      .get(
        `https://converso-social-network-api.onrender.com/comments/${props.postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setCommentsFromResponse(response.data.comments);
      })
      .catch((error) => {
        props.setErrorMessage(
          error.response.data.message,
          error.response.status
        );
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
      {props.errorMessage ? <ErrorCatcherContainer /> : <></>}
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
