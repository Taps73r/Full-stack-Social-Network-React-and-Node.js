import './CreatePost.css';
import { addPostActionCreator, updateTextActionCreator } from './../../../redux/profile-reducer';
import CreatePost from './CreatePost';
import { connect } from 'react-redux';

let mapProfileInfoToProps = (state) => {
    return{
        postData: state.profileInfo.postData,
        newPostText: state.profileInfo.newPostText
    }
}

const CreatePostContainer = connect(mapProfileInfoToProps, {
    updateTextPost: updateTextActionCreator,
    createNewPost: addPostActionCreator
})(CreatePost)

export default CreatePostContainer;
