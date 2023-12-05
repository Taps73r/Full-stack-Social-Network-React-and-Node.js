import React, { useState } from 'react';
import './CreatePost.css';

function CreatePost(props) {
    const [selectedImages, setSelectedImages] = useState([]);

    const addNewPost = () => {
        props.addPost();
    }

    const handleImageChange = (e) => {
        const files = e.target.files || e.dataTransfer.files;
        const newImages = Array.from(files).slice(0, 3); // Обмеження до 3 фотографій

        const promises = newImages.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        });

        Promise.all(promises)
            .then((base64Images) => {
                setSelectedImages(base64Images);
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

    const handlePreviewClick = (index) => {
        const overlay = document.getElementById("overlay");
        const enlargedImage = document.getElementById("enlargedImage");
        overlay.classList.add("active");
        enlargedImage.src = selectedImages[index];
    };

    const handleCloseClick = () => {
        const overlay = document.getElementById("overlay");
        overlay.classList.remove("active");
    };

    return (
        <div className='Profile'>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className='Create-Post'>
                    <div className="selected-images">
                        {selectedImages.map((image, index) => (
                            <img key={index} src={image} alt={`Selected ${index + 1}`} onClick={() => handlePreviewClick(index)} />
                        ))}
                    </div>
                    <label htmlFor="fileInput" id="fileInputLabel">
                        <img src="icon-photo.png" alt="" />
                        Перетягніть або виберіть фотографії (максимум 3)
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        onClick={(e) => e.target.value = null}
                    />
                    <input
                        type='text'
                        id='post_text'
                        onChange={updateNewText}
                        value={props.newPostText}
                    />
                    <button type='submit'>Submit</button>
                </div>
            </form>
            <div id="overlay" className="overlay" onClick={handleCloseClick}>
                <img id="enlargedImage" className="enlarged-image" alt="Enlarged" />
                <span className="close-icon" onClick={handleCloseClick}>&times;</span>
            </div>
        </div>
    );
}

export default CreatePost;