import axios from 'axios';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Preloader from './../common/Preloader/Preloader';
import Main from './Main';
import './Main.css';
import {
    addPostActionCreator,
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
        axios.post('http://localhost:3002/posts', {userId, postMessage})
        .then((response) => {
            addPostActionCreator(response.data.post);
        })
        .catch((error) => {
            console.error('Error adding post:', error);
        })
        
    }
    if (isFetching || !profileData) {
        return <Preloader />;
    }

    return (
        <Main
            postData={postData}
            profileData={profileData}
            addPost={addPost}
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
        setProfile,
        setIsFetching,
        addPostActionCreator
    }
)(MainContainer);

export default ProfileContainerWithApi;
