import axios from 'axios';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Preloader from './../common/Preloader/Preloader';
import Main from './Main';
import './Main.css';
import {
    addPostActionCreator,
    changeUserInfo,
    setIsFetching,
    setProfile
} from '../../redux/profile-reducer';

function MainContainer({
    userId,
    isFetching,
    newPostText,
    postData,
    profileData,
    addPostActionCreator,
    setIsFetching,
    setProfile,
    setChangeUserInfo,
    changeBioText,
    changeNameText,
    changingInfo,
    avatar
}) {
    useEffect(() => {
        const requestProfileInfo = () => {
            setIsFetching(true);

            const url = `http://localhost:3002/profile/${userId}`;

            axios.get(url)
                .then(response => {
                    setProfile(response.data);
                    setIsFetching(false);
                })
                .catch(error => {
                    // Обробка помилки
                    console.error('Error fetching profile data:', error);
                    setIsFetching(false);
                });

        };
        requestProfileInfo();
    }, [userId, setIsFetching, setProfile]);

    let addPost = () => {
        let postMessage = newPostText;
        axios.post('http://localhost:3002/posts', { userId, postMessage })
            .then((response) => {
                addPostActionCreator(response.data);
            })
            .catch((error) => {
                console.error('Error adding post:', error);
            })
    }
    let changeUserInfo = () => {
        setChangeUserInfo()
    }
    let putChangedUserInfo = () => {
        const name = changeNameText;
        const bio = changeBioText;
        const photo = avatar;
        setIsFetching(true);
        axios.put(`http://localhost:3002/update-profile/${userId}`, {name, bio, photo})
        .then((response) => {
            setProfile(response.data);
            setIsFetching(false);
        })
        .catch(error => {
            // Обробка помилки
            console.error('Error fetching profile data:', error);
            setIsFetching(false);
        });
    }

    if (isFetching || !profileData) {
        return <Preloader />;
    }

    return (
        <Main
            postData={postData}
            profileData={profileData}
            addPost={addPost}
            changeUserInfo={changeUserInfo}
            putChangedUserInfo={putChangedUserInfo}
            changingInfo={changingInfo}
        />
    );
}

const mapStateToProps = (state) => ({
    isFetching: state.profileInfo.isFetching,
    newPostText: state.profileInfo.newPostText,
    postData: state.profileInfo.postData,
    profileData: state.profileInfo.profileData,
    userId: state.loginInfo.userId,
    changeBioText: state.profileInfo.changeBioText,
    changeNameText: state.profileInfo.changeNameText,
    changingInfo: state.profileInfo.changingInfo,
    avatar: state.profileInfo.avatar
});

const ProfileContainerWithApi = connect(
    mapStateToProps,
    {
        setProfile,
        setIsFetching,
        addPostActionCreator,
        setChangeUserInfo: changeUserInfo
    }
)(MainContainer);

export default ProfileContainerWithApi;
