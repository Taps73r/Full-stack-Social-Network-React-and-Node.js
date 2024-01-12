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
        console.log(response.data);
        setCommentsFromResponse([...responseComments, response.data.newComment]);
      })
      .catch((response) => {});
  };
  const handleSendComent = (e) => {
    e.preventDefault();
    sendComent(props.postId, commentText);
    changeCommentText("");
  };
  const updateCommentText = (e) => {
    const text = e.target.value;
    changeCommentText(text);
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
      <div className="coment_block">
        <form>
          <textarea onChange={updateCommentText} value={commentText}></textarea>
          <button onClick={handleSendComent} type="submit">
            Send
          </button>
        </form>
      </div>
      <button onClick={handleShowHideComments}>
        {showOtherComments ? "Hide Comments" : "Show Comments"}
      </button>
      <div className="comments_block">
        {showOtherComments && <div>{commentsMapping}</div>}
      </div>
    </div>
  );
};

export default Comments;
