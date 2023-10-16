import React from 'react';
import './CreatePost.css';

function CreatePost(props) {
    const newPostElement = React.createRef();

    const addPost = () => {
        props.dispatch({ type: 'ADD-POST' })
    }

    const updateText = () => {
        const text = newPostElement.current.value;
        props.dispatch({ type: 'UPDATE-TEXT-POST', newText: text})
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
