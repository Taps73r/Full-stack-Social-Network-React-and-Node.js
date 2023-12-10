import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
    dropErrors,
    setImageProfileLoad,
    setTextBioLoad,
    setTextNameLoad,
} from '../../redux/error-reducer';
import {
    returnChangeUserInfo,
    updateChangeBioText,
    updateChangeNameText,
    uploadAvatar,
} from '../../redux/profile-reducer';
import './ProfileInfo/ProfileInfo.css';

let ChangeUserInfoComponent = (props) => {
    const [imageLoadedText, setImageLoadedText] = useState('Drag here');

    let submitData = (file) => {
        props.putChangedUserInfo(file);
        props.returnChangeUserInfo();
    };
    let newNameText = (e) => {
        const text = e.target.value;
        props.updateChangeNameText(text);
    }
    let newBioText = (e) => {
        const text = e.target.value;
        props.updateChangeBioText(text);
    }
    let returnChanging = () => {
        props.returnChangeUserInfo();
    };

    let handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64Data = reader.result;

                const img = new Image();
                img.src = base64Data;

                img.onload = () => {
                    if (img.width >= 150 && img.height >= 150) {
                        props.uploadAvatar(base64Data);
                        props.dropErrors();
                        setImageLoadedText('Image loaded');
                    } else {
                        props.setImageProfileLoad();
                    }
                };
            };

            reader.readAsDataURL(file);
        }
    };

    let handleSubmit = (e) => {
        e.preventDefault();
        props.dropErrors();
        const file = e.target.querySelector('input[type="file"]').files[0];
        const textName = props.changeNameText.trim();
        const textBio = props.changeBioText.trim();

        if (textName.length > 12) {
            props.setTextNameLoad();
            return;
        }
        if (textBio.length > 50) {
            props.setTextBioLoad();
            return;
        }
        submitData(file);
    };

    return (
        <div className="Change_info">
            <button onClick={returnChanging}>Return</button>
            <div className="change_info_form">
                <form className="formChange" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <div className="header_and_return">
                        <p>Change your info</p>
                    </div>
                    <div className="name_bio">
                        <p>Name</p>
                        <p className='error_ava'>{props.textNameProfileLoad ? 'Maximum character limit for the name 12' : ''}</p>
                        <p></p>
                        <input
                            type="text"
                            id="username"
                            value={props.changeNameText}
                            onChange={newNameText}
                            placeholder="Enter your nickname here..."
                        />
                        <p>Bio</p>
                        <p className='error_ava'>{props.textBioProfileLoad ? "Maximum character limit for the bio: 50": ''}</p>
                        <textarea
                            placeholder="Enter your biography here..."
                            type="text"
                            id="bio"
                            value={props.changeBioText}
                            onChange={newBioText}
                        />
                    </div>
                    <p className="ava_text">Avatar</p>
                    <div className="centerbtn">
                        <p className='error_ava'>{props.imageError ? 'Minimum height or width of the photo: 150 pixels.': ''}</p>
                        <label htmlFor="avatar_input" id={props.imageError ? 'fileInputLabelError' : 'fileInputLabel2'}>
                            <img src="icon-photo.png" alt="" />
                            {props.imageError ? 'Error photo' : imageLoadedText}
                        </label>
                        <input
                            type="file"
                            id="avatar_input"
                            accept="image/*"
                            onChange={handleFileChange}
                            onClick={(e) => (e.target.value = null)}
                        />
                        <button type="submit">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

let mapStateToProps = (state) => {
    return {
        changeBioText: state.profileInfo.changeBioText,
        changeNameText: state.profileInfo.changeNameText,
        imageError: state.errorInfo.imageAvatarLoad,
        textNameProfileLoad: state.errorInfo.textNameProfileLoad,
        textBioProfileLoad: state.errorInfo.textBioProfileLoad,
    };
};

let ChangeUserInfo = connect(mapStateToProps, {
    returnChangeUserInfo,
    updateChangeNameText,
    updateChangeBioText,
    uploadAvatar,
    dropErrors,
    setTextBioLoad,
    setTextNameLoad,
    setImageProfileLoad,
})(ChangeUserInfoComponent);

export default ChangeUserInfo;
