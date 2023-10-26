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

let mapDispatchToProps = (dispatch) => {
    return{
        updateTextPost: (text) => {
            dispatch(updateTextActionCreator(text))
        },
        createNewPost: () => {
            dispatch(addPostActionCreator())
        }
    }
}

const CreatePostContainer = connect(mapProfileInfoToProps, mapDispatchToProps)(CreatePost)

export default CreatePostContainer;
