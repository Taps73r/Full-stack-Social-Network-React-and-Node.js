import React from 'react';
import './CreatePost.css';

function CreatePost(props) {
    const addNewPost = () => {
        props.addPost();
    }
    const handleImageChange = (e) => {
        const files = e.target.files;
        const newImages = Array.from(files).map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        });

        Promise.all(newImages)
            .then((base64Images) => {
                props.uploadPostImages(base64Images);
            })
            .catch((error) => console.error('Помилка конвертації зображень в base64:', error));
    };
    const updateNewText = (e) => {
        const text = e.target.value;
        props.updateTextPost(text);
    }
    const handleSubmit = () => {
        addNewPost();
    }
    return (
        <div className='Profile'>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className='Create-Post'>
                    <input type="file" accept="image/*" multiple onChange={handleImageChange} />
                    <input type='text' id='post_text' onChange={updateNewText} value={props.newPostText} />
                    <button type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost;
