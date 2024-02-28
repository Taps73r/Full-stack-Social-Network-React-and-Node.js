import {
  setIsFetching,
  setProfile,
  toggleSubscriptionProfile,
} from "../../redux/other-profile-reducer";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import OtherProfile from "./OtherProfile";
import axios from "axios";
import { connect } from "react-redux";
import Preloader from "../common/Preloader/Preloader";
import { setErrorMessage } from "../../redux/error-reducer";
import ErrorCatcherContainer from "../common/ErrorCatcher/ErrorCatcher";

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
}
class OtherProfileContainer extends React.Component {
  componentDidMount() {
    let profileId = this.props.router.params.userId;
    this.requestProfileInfo(profileId);
  }
  requestProfileInfo = (userId) => {
    const token = localStorage.getItem("token");
    this.props.setIsFetching(true);
    const url = `http://localhost:3002/profile/${userId}`;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        this.props.setProfile(response.data);
        this.props.setIsFetching(false);
      })
      .catch((error) => {
        this.props.setErrorMessage(
          error.response.data.message,
          error.response.status
        );
        this.props.setIsFetching(false);
      });
  };
  subscribeUserProfile = (followerId, followingId) => {
    const token = localStorage.getItem("token");
    axios
      .post(
        "http://localhost:3002/subscribe",
        { followerId, followingId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        if (response.data.subscription === "No") {
          const no = [0];
          this.props.toggleSubscriptionProfile(no);
        }
        this.props.toggleSubscriptionProfile(
          response.data.subscription.follower
        );
      })
      .catch((error) => {
        this.props.setErrorMessage(
          error.response.data.message,
          error.response.status
        );
      });
  };
  likeCurrentPost = (postId) => {
    const token = localStorage.getItem("token");
    let userId = this.props.loginUser;
    axios
      .post(
        `http://localhost:3002/like`,
        { postId, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {})
      .catch((error) => {
        this.props.setErrorMessage(
          error.response.data.message,
          error.response.status
        );
      });
  };
  render() {
    if (this.props.isFetching || !this.props.profileData) {
      return <Preloader />;
    }
    return (
      <>
        {this.props.errorMessage ? <ErrorCatcherContainer /> : <></>}
        <OtherProfile
          likeCurrentPost={this.likeCurrentPost}
          postData={this.props.postData}
          profileData={this.props.profileData}
          loggedId={this.props.loginUser}
          handleSubscribe={this.subscribeUserProfile}
          setErrorMessage={this.props.setErrorMessage}
          errorMessage={this.props.errorMessage}
        />
      </>
    );
  }
}
let mapStateToProps = (state) => {
  return {
    postData: state.otherProfileInfo.postData,
    profileData: state.otherProfileInfo.profileData,
    loginUser: state.loginInfo.userId,
    isFetching: state.otherProfileInfo.isFetching,
    errorMessage: state.errorInfo.errorMessage,
  };
};

let OtherProfileContainerWithApi = connect(mapStateToProps, {
  setProfile,
  setErrorMessage,
  setIsFetching,
  toggleSubscriptionProfile,
})(withRouter(OtherProfileContainer));

export default OtherProfileContainerWithApi;
