import React, { useState } from "react";
import "./Coments.css";
import axios from "axios";

let Coments = (props) => {
  const [showOtherComents, showHideComments] = useState(false);
  const getComments = (postId) => {
    console.log(postId)
    axios
    .get(`http://localhost:3002/comments/${postId}`)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {

    })
  };
  const [responseComments] = useState()
  const handleShowHideComments = () => {
    getComments(props.postId);
    showHideComments(!showOtherComents);
  };
  return (
    <div>
      <button onClick={handleShowHideComments}>
        {showOtherComents ? "Show Comments" : "Hide Comments"}
      </button>
      <div className="comments_block">
        {showOtherComents ? <div></div> : null}
      </div>
    </div>
  );
};

export default Coments;
