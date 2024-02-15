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
          // Обробка помилки
          console.error("Error fetching profile data:", error);
          setIsFetching(false);
        });
    };
    requestProfileInfo();
  }, [userId, setIsFetching, setProfile]);

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
        console.error("Error adding post:", error);
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
        // Обробка помилки
        console.error("Error fetching profile data:", error);
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
        console.error(error);
      });
  };
  if (isFetching || !profileData) {
    return <Preloader />;
  }
  return (
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
  avatar: state.profileInfo.avatar,
  newPostImages: state.profileInfo.newPostImages,
  updatePostText: state.profileInfo.updatePostText,
});

const ProfileContainerWithApi = connect(mapStateToProps, {
  setProfile,
  setIsFetching,
  addPostActionCreator,
  setChangeUserInfo: changeUserInfo,
  updateTextPost,
  setPostData,
})(MainContainer);

export default ProfileContainerWithApi;
