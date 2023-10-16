import React from 'react';
import './CreatePost.css';
import {addPostActionCreator, updateTextActionCreator} from './../../../redux/state';

function CreatePost(props) {
    const newPostElement = React.createRef();

    const addPost = () => {
        props.dispatch(addPostActionCreator())
    }

    const updateText = () => {
        const text = newPostElement.current.value;
        props.dispatch(updateTextActionCreator(text))
    }

    return (
        <div className='Profile'>
            <div>
                <textarea ref={newPostElement} onChange={updateText} value={props.newPostText} />
                <button onClick={addPost}>Submit</button>
            </div>
        </div>
    )
}

export default CreatePost;
