import React from "react";
import "./EditPost.css";
const EditPost = (props) => {
  let deletePost = () => {
    props.deleteCurrentPost(props.postId);
  };
  let updatePost = () => {
    props.editPostMenuClick();
  };
  return (
    <div>
      <ul className="editpost_ul">
        <li id="li_top_border_edit" onClick={updatePost}>Change post</li>
        <li id="li_bottom_border_edit" onClick={deletePost}>Delete post</li>
      </ul>
    </div>
  );
};

export default EditPost;
