import "./CreatePost.css";
import {
  updateTextActionCreator,
  uploadPostImages,
} from "./../../../redux/profile-reducer";
import CreatePost from "./CreatePost";
import { connect } from "react-redux";
import {
  dropErrors,
  setErrorMessage,
  setImagePostLoad,
  setTextPostLoad,
} from "../../../redux/error-reducer";

const mapProfileInfoToProps = (state) => {
  return {
    newPostText: state.profileInfo.newPostText,
    imageError: state.errorInfo.imagePostLoad,
    textError: state.errorInfo.textPostLoad,
    errorMessage: state.errorInfo.errorMessage,
  };
};

const CreatePostContainer = ({ addPost, ...props }) => {
  return <CreatePost addPost={addPost} {...props} />;
};

export default connect(mapProfileInfoToProps, {
  updateTextPost: updateTextActionCreator,
  uploadPostImages,
  dropErrors,
  setErrorMessage,
  setImagePostLoad,
  setTextPostLoad,
})(CreatePostContainer);
