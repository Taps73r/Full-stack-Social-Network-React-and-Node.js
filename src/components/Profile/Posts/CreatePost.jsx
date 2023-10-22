import React from 'react';
import './CreatePost.css';

function CreatePost(props) {

    const addNewPost = () => {
        props.createNewPost();
    }

    const updateNewText = (e) => {
        const text = e.target.value;
        props.updateTextPost(text);
    }

    return (
        <div className='Profile'>
            <div>
                <textarea onChange={updateNewText} value={props.newPostText} />
                <button onClick={addNewPost}>Submit</button>
            </div>
        </div>
    )
}

export default CreatePost;
