import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import Preloader from './../common/Preloader/Preloader';
import Main from './Main';
import './Main.css';
import { addPostActionCreator, setIsFetching, setProfile, updateTextActionCreator } from '../../redux/profile-reducer';


class MainContainer extends React.Component {

    componentDidMount() {
        this.requestProfileInfo();
    }

    requestProfileInfo = () => {
        this.props.setIsFetching(true);
        // const { } = this.props;
        const url = `https://social-network.samuraijs.com/api/1.0/profile/2`;

        axios.get(url)
            .then(response => {
                this.props.setProfile(response.data);
                this.props.setIsFetching(false);
            });
    }

    render() {
        if (this.props.isFetching) {
            return <Preloader />;
        }

        if (!this.props.profileData) {
            return <Preloader />;
        }
        return (
            <Main
                postData={this.props.postData}
                newPostText={this.props.newPostText}
                profileData={this.props.profileData}
                updateTextActionCreator={this.props.updateTextActionCreator}
                addPostActionCreator={this.props.addPostActionCreator}
                setProfile={this.props.setProfile}
            />
        )
    }
}
let mapStateToProps = (state) => {
    return {
        isFetching: state.profileInfo.isFetching,
        newPostText: state.profileInfo.newPostText,
        postData: state.profileInfo.postData,
        profileData: state.profileInfo.profileData
    }
}

let ProfileContainerWithApi = connect(mapStateToProps, {
    updateTextActionCreator,
    setProfile,
    setIsFetching,
    addPostActionCreator
})(MainContainer);

export default ProfileContainerWithApi;