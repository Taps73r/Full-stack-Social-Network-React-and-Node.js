import React from 'react';
import './CreatePost.css';
import Post from './Post/Post';

function CreatePost(props) {

    const addNewPost = () => {
        props.createNewPost();
    }

    const updateNewText = (e) => {
        const text = e.target.value;
        props.updateTextPost(text);
    }
    let posts = props.postData.map(post => {
        return <Post message={post.postMessage} />
    })

    return (
        <div className='Profile'>
            <div className='Create-Post'>
                <textarea onChange={updateNewText} value={props.newPostText} />
                <button onClick={addNewPost}>Submit</button>
            </div>
            <div className='Posts'>
                {posts}
            </div>
        </div>
    )
}

export default CreatePost;
