import React from 'react';
import './CreatePost.css';
import {addPostActionCreator, updateTextActionCreator} from './../../../redux/profile-reducer';
import CreatePost from './CreatePost';

function CreatePostContainer(props) {

    const addPost = () => {
        props.dispatch(addPostActionCreator())
    }

    const updateText = (text) => {
        props.dispatch(updateTextActionCreator(text))
    }

    return (
        <CreatePost updateTextPost={updateText} createNewPost={addPost}/>
    )
}

export default CreatePostContainer;
