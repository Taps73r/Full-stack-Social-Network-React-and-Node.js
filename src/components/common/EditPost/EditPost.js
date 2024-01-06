import React from "react";

const EditPost = (props) => {
  let deletePost = () => {
    props.deleteCurrentPost();
  };
  let updatePost = () => {
    props.editPostMenuClick();
  };
  return (
    <div>
      <ul>
        <li onClick={updatePost}>Change post</li>
        <li onClick={deletePost}>Delete post</li>
      </ul>
    </div>
  );
};

export default EditPost;
