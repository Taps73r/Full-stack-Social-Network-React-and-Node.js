import { setIsFetching, setProfile } from "../../redux/other-profile-reducer";
import React, { useEffect } from 'react';
import OtherProfile from "./OtherProfile";
import axios from "axios";
const { connect } = require("react-redux");

let OtherProfileContainer = ({
    setProfile,
    setIsFetching,
    postData,
    profileData,
    match
}) => {
    const { userId } = match.params;
    useEffect(() => {
        const requestProfileInfo = () => {
            setIsFetching(true);

            const url = `http://localhost:3002/other-user-profile/${userId}`;
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
    return (
        <OtherProfile
            postData={postData}
            profileData={profileData} />
    )
}

let mapStateToProps = (state) => {
    return {
        postData: state.otherProfileInfo.postData,
        profileData: state.otherProfileInfo.profileData
    }
}

let OtherProfileContainerWithApi = connect(mapStateToProps, {
    setProfile,
    setIsFetching
})(OtherProfileContainer);
export default OtherProfileContainerWithApi;