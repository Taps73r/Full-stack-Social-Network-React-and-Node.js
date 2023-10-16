import React from 'react';
import './CreatePost.css';
import {addPostActionCreator, updateTextActionCreator} from './../../../redux/state';

function CreatePost(props) {

    const addPost = () => {
        props.dispatch(addPostActionCreator())
    }

    const updateText = (e) => {
        const text = e.target.value;
        props.dispatch(updateTextActionCreator(text))
    }

    return (
        <div className='Profile'>
            <div>
                <textarea onChange={updateText} value={props.newPostText} />
                <button onClick={addPost}>Submit</button>
            </div>
        </div>
    )
}

export default CreatePost;
