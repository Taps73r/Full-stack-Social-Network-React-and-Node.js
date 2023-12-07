import React, { useState } from 'react';
import './CreatePost.css';

function CreatePost(props) {

    const [selectedImages, setSelectedImages] = useState([]);

    const addNewPost = () => {
        props.addPost();
    };

    const handleImageChange = (e) => {
        const files = e.target.files || e.dataTransfer.files;
        const newImages = Array.from(files).slice(0, 3);

        const imagePromises = newImages.map((file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onload = () => resolve(reader.result);
                reader.onerror = (error) => reject(error);
            });
        });

        Promise.all(imagePromises)
            .then((base64Images) => {
                const validationPromises = base64Images.map((base64Image) => {
                    return new Promise((resolve, reject) => {
                        const img = new Image();
                        img.src = base64Image;

                        img.onload = () => {
                            if (img.width >= 600 && img.height >= 400) {
                                resolve(base64Image);
                            } else {
                                reject(new Error('Розмір зображення нижче вказаних вимог'));
                            }
                        };

                        img.onerror = (error) => reject(error);
                    });
                });

                return Promise.all(validationPromises);
            })
            .then((validatedImages) => {
                setSelectedImages(validatedImages);
                props.uploadPostImages(validatedImages);
            })
            .catch((error) => {
                setSelectedImages([]);
                console.error('Помилка конвертації зображень в base64 або розмір нижче вказаних вимог:', error);
                showOverlay(error.message || 'Розмір зображення нижче вказаних вимог');
            });
    };

    const showOverlay = (message) => {
        const overlay = document.getElementById('overlay');
        const overlayMessage = document.getElementById('overlayMessage');

        overlay.classList.add('active');
        overlayMessage.innerText = message;
    };

    const handleCloseOverlayClick = () => {
        const overlay = document.getElementById('overlay');
        overlay.classList.remove('active');
    };
    const updateNewText = (e) => {
        const text = e.target.value;
        props.updateTextPost(text);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (selectedImages.length === 0) {
            props.setImagePostLoad();
            props.uploadPostImages('');
        }
        else {
            const text = props.newPostText.trim();
            props.dropErrors();
            if (!text) {
                props.setTextPostLoad();
                props.updateTextPost('');
            }
            else {
                addNewPost();
                props.dropErrors();
            }
        }
    };

    const handlePreviewClick = (index) => {
        const overlay = document.getElementById('overlay');
        const enlargedImage = document.getElementById('enlargedImage');
        overlay.classList.add('active');
        enlargedImage.src = selectedImages[index];
    };

    return (
        <div className="Profile">
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className={props.imageError ? 'Create-Post Error' : 'Create-Post'}>
                    <div className="selected-images">
                        {selectedImages.map((image, index) => (
                            <img key={index} src={image} alt={`Selected ${index + 1}`} onClick={() => handlePreviewClick(index)} />
                        ))}
                    </div>
                    <label htmlFor="fileInput" id={props.imageError ? 'error_foto' : 'fileInputLabel'}>
                        <img src="icon-photo.png" alt="" />
                        {props.imageError ? 'Error pictures' : 'Перетягніть або виберіть фотографії (максимум 3)'}
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        onClick={(e) => (e.target.value = null)}
                    />
                    {props.textError ? <p className='text-error'>Text Error</p> : <></>}
                    <textarea type="text" id="post_text" onChange={updateNewText} value={props.newPostText} />
                    <button type="submit">Submit</button>
                </div>
            </form>
            <div id="overlay" className="overlay" onClick={handleCloseOverlayClick}>
                <div id="overlayMessage" className="overlay-message"></div>
                <span className="close-icon" onClick={handleCloseOverlayClick}>
                    &times;
                </span>
            </div>
        </div>
    );
}

export default CreatePost;
