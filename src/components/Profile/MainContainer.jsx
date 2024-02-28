import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import Preloader from "./../common/Preloader/Preloader";
import Main from "./Main";
import "./Main.css";
import {
  addPostActionCreator,
  changeUserInfo,
  setIsFetching,
  setPostData,
  setProfile,
  updateTextPost,
} from "../../redux/profile-reducer";
import { setErrorMessage } from "../../redux/error-reducer";
import ErrorCatcherContainer from "../common/ErrorCatcher/ErrorCatcher";

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
  avatar,
  newPostImages,
  updatePostText,
  updateTextPost,
  setPostData,
  errorMessage,
  setErrorMessage,
}) {
  useEffect(() => {
    const requestProfileInfo = () => {
      setIsFetching(true);
      const token = localStorage.getItem("token");
      const url = `http://localhost:3002/profile/${userId}`;
      axios
        .get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setProfile(response.data);
          setIsFetching(false);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.message, error.response.status);
          setIsFetching(false);
        });
    };
    requestProfileInfo();
  }, [userId, setIsFetching, setProfile, setErrorMessage]);

  let addPost = () => {
    setIsFetching(true);
    let postMessage = newPostText;
    let photos = newPostImages;
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:3002/posts",
        { userId, postMessage, photos },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        addPostActionCreator(response.data);
        setIsFetching(false);
      })
      .catch((error) => {
        setIsFetching(false);
        setErrorMessage(error.response.data.message, error.response.status);
      });
  };
  let changeUserInfo = () => {
    setChangeUserInfo();
  };
  let putChangedUserInfo = () => {
    const name = changeNameText;
    const bio = changeBioText;
    const token = localStorage.getItem("token");
    const photo = avatar;
    setIsFetching(true);
    axios
      .put(
        `http://localhost:3002/update-profile`,
        {
          name,
          bio,
          photo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setProfile(response.data);
        setIsFetching(false);
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message, error.response.status);
        setIsFetching(false);
      });
  };
  let deleteCurrentPost = (postId) => {
    const token = localStorage.getItem("token");
    setIsFetching(true);
    axios
      .delete(`http://localhost:3002/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPostData(response.data);
        setIsFetching(false);
      })
      .catch((error) => {
        setIsFetching(false);
        setErrorMessage(error.response.data.message, error.response.status);
      });
  };
  let updateCurrentPost = (postId) => {
    setIsFetching(true);
    let updatedText = updatePostText;
    const token = localStorage.getItem("token");
    axios
      .put(
        `http://localhost:3002/posts/${postId}`,
        { updatedText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setPostData(response.data);
        setIsFetching(false);
      })
      .catch((error) => {
        setIsFetching(false);
        setErrorMessage(error.response.data.message, error.response.status);
      });
  };
  let likeCurrentPost = (postId) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://localhost:3002/like`,
        { postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        setErrorMessage(error.response.data.message, error.response.status);
      });
  };
  if (isFetching || !profileData) {
    return <Preloader />;
  }
  return (
    <>
      {errorMessage ? <ErrorCatcherContainer /> : <></>}
      <Main
        postData={postData}
        profileData={profileData}
        addPost={addPost}
        likeCurrentPost={likeCurrentPost}
        changeUserInfo={changeUserInfo}
        putChangedUserInfo={putChangedUserInfo}
        changingInfo={changingInfo}
        userId={userId}
        updatePostText={updatePostText}
        updateTextPost={updateTextPost}
        deleteCurrentPost={deleteCurrentPost}
        updateCurrentPost={updateCurrentPost}
        setErrorMessage={setErrorMessage}
        errorMessage={errorMessage}
      />
    </>
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
  avatar: state.profileInfo.avatar,
  newPostImages: state.profileInfo.newPostImages,
  updatePostText: state.profileInfo.updatePostText,
  errorMessage: state.errorInfo.errorMessage,
});

const ProfileContainerWithApi = connect(mapStateToProps, {
  setProfile,
  setErrorMessage,
  setIsFetching,
  addPostActionCreator,
  setChangeUserInfo: changeUserInfo,
  updateTextPost,
  setPostData,
})(MainContainer);

export default ProfileContainerWithApi;
