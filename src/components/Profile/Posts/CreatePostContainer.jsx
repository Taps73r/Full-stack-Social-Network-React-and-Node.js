import React from 'react';
import './CreatePost.css';
import { addPostActionCreator, updateTextActionCreator } from './../../../redux/profile-reducer';
import CreatePost from './CreatePost';
import Post from './Post/Post';
import ContextStore from '../../../redux/store-context';

function CreatePostContainer() {

    return (
        <ContextStore.Consumer>
            {
                (store) => {
                    
                    const addPost = () => {
                        store.dispatch(addPostActionCreator())
                    }

                    const updateText = (text) => {
                        store.dispatch(updateTextActionCreator(text))
                    }
                    let posts = store.getState().profileInfo.postData.map(post => {
                        return <Post message={post.postMessage} />
                    })
                    return (
                        <>
                            <CreatePost updateTextPost={updateText} createNewPost={addPost} />
                            {posts}
                        </>
                    );

                }
            }
        </ContextStore.Consumer>
    )
}

export default CreatePostContainer;
