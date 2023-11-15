import axios from 'axios';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Preloader from './../common/Preloader/Preloader';
import Main from './Main';
import './Main.css';
import {
    addPostActionCreator,
    setIsFetching,
    setProfile,
    updateTextActionCreator,
} from '../../redux/profile-reducer';

function MainContainer({
    isFetching,
    newPostText,
    postData,
    profileData,
    updateTextActionCreator,
    addPostActionCreator,
    setIsFetching,
    setProfile,
    userId,
}) {
    useEffect(() => {
        const requestProfileInfo = () => {
            setIsFetching(true);

            const url = `http://localhost:3002/profile/${userId}`;

            axios.get(url)
                .then(response => {
                    setProfile(response.data);
                    setIsFetching(false);
                });
        };

        requestProfileInfo();
    }, [userId, setIsFetching, setProfile]);

    if (isFetching || !profileData) {
        return <Preloader />;
    }

    return (
        <Main
            postData={postData}
            newPostText={newPostText}
            profileData={profileData}
            updateTextActionCreator={updateTextActionCreator}
            addPostActionCreator={addPostActionCreator}
            setProfile={setProfile}
        />
    );
}

const mapStateToProps = (state) => ({
    isFetching: state.profileInfo.isFetching,
    newPostText: state.profileInfo.newPostText,
    postData: state.profileInfo.postData,
    profileData: state.profileInfo.profileData,
    userId: state.loginInfo.userId
});

const ProfileContainerWithApi = connect(
    mapStateToProps,
    {
        updateTextActionCreator,
        setProfile,
        setIsFetching,
        addPostActionCreator
    }
)(MainContainer);

export default ProfileContainerWithApi;
