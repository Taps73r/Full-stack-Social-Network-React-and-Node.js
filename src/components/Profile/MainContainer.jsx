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

function MainContainer(props) {
    useEffect(() => {
        const requestProfileInfo = () => {
            props.setIsFetching(true);

            const url = `http://localhost:3002/profile/${props.userId}`;

            axios.get(url)
                .then(response => {
                    props.setProfile(response.data);
                    props.setIsFetching(false);
                })
                .catch(error => {
                    // Обробка помилки
                    console.error('Error fetching profile data:', error);
                    props.setIsFetching(false);
                });
        };

        requestProfileInfo();
    }, [props.userId, props.setIsFetching, props.setProfile]);

    if (props.isFetching || !props.profileData) {
        return <Preloader />;
    }

    return (
        <Main
            postData={props.postData}
            newPostText={props.newPostText}
            profileData={props.profileData}
            updateTextActionCreator={props.updateTextActionCreator}
            addPostActionCreator={props.addPostActionCreator}
            setProfile={props.setProfile}
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
