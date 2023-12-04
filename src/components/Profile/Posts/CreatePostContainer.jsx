import './CreatePost.css';
import { updateTextActionCreator, uploadPostImages } from './../../../redux/profile-reducer';
import CreatePost from './CreatePost';
import { connect } from 'react-redux';

const mapProfileInfoToProps = (state) => {
    return {
        newPostText: state.profileInfo.newPostText
    };
};

const CreatePostContainer = ({ addPost, ...props }) => {
    return <CreatePost addPost={addPost} {...props} />;
};

export default connect(mapProfileInfoToProps, {
    updateTextPost: updateTextActionCreator,
    uploadPostImages
})(CreatePostContainer);
